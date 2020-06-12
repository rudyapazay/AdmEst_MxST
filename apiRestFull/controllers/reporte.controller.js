'use strict'

const estudianteMDL = require('../models/estudiante.model');
const familiasMDL = require('../models/familia.model');

const pdfMake = require('pdfmake'); 

const fs = require('fs');
const pdf = require('pdfjs');
const path = require('path');

var fonts = {
    Roboto:{
        normal:'fonts/AGENCY.ttf',
        bold:'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics:'fonts/Roboto-MediumItalic.ttf'
    }
}

// creacion de footer de reportes
function footerContent(){
var fechaActual = new Date();

var meses = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SET','OCT','NOV', 'DIC'];

// pie de pagina de los reportes
return [
    {
        text:' ',
        fontSize: 6
    },    
    {
        canvas:[{
            type: 'line',
            x1: 0, y1: 0,
            x2: 900, y2: 0,
            lineWidth: 1,
        }]
    },
    {
        text : ' ',
        fontSize: 3
    },
    {
        columns:[
            {
                text: 'Emblematica Institucion Educativa "Santo Tomás"' , 
                alignment:"center"
            },
            {
                text: "Reporte generado a las " + 
                    fechaActual.getHours() + ':'+
                    fechaActual.getMinutes() + ' del '+
                    fechaActual.getDate() + '/' +
                    meses[fechaActual.getMonth()] + '/'+
                    fechaActual.getFullYear(),
                alignment:"center"

            }
        ]
    },
    {
      columns:[
        {
          text: 'Av. Emancipacion N° 310 - Santo Tomás - Chumbivilcas - Cusco ',
          alignment:'center',
          fontSize:8
        },
        { 
          text: 'Reporte en SERAFIN - Dev. by RUDY APAZA - Cel: 929905152',
          fontSize:8,
          alignment:'center'
        }

      ]
    }
  ]
}


// Creacion de pdf del padron de padres de familias
async function generarPadronFamilias(req, res){
    var familias = await familiasMDL.aggregate([
        {$match:{estado:'Activo'}},
        {$sort:{carpeta:+1}},
        {$lookup:{from:'estudiantes', localField:'_id',foreignField:'familia', as:'estudiantes'}},
        {$project:{'estudiantes.QRCode':0}},
    ]);
    var reporte = new pdfMake(fonts);
    var tableContent = [
        [
            {text:'Nro.', bold:true},
            {text:'Codigo', bold:true}, 
            {text:'Carpeta',bold:true}, 
            {text:'Padres de Familia', bold:true}, 
            {text:'DNI Nro.', bold:true}, 
            {text:'Celular', bold:true}, 
            {text:'Estudiantes' , bold:true}, 
            {text:'DNI Nro.', bold:true}
        ]
    ];
    

    var familia_conteo = 0;
    familias.forEach((familia, index)=>{
        var familia_act = false ;
        /* Verificacion de familia*/
        familia.estudiantes.forEach((estudiante, index)=>{
            if(estudiante.estado == 'activo' || estudiante.estado =='pendiente'){
                familia_act=true;
            }
        });

        if(familia_act){
            familia_conteo += 1;
            var tableColumns = [familia_conteo, familia.codigo, 
                {text:familia.carpeta
                } 
            ];
            var padresFamilia = [];
            var padresDNI = [];
            var padresCelular = []; 
            
            if(familia.padre ){
                padresFamilia.push({text:familia.padre.apellidos.toUpperCase() + ', '+familia.padre.nombre.toUpperCase() });
    
                padresDNI.push({text:familia.padre.dni });
                padresCelular.push({text: familia.padre.celular });
            }
    
            if(familia.madre){
                padresFamilia.push({text:familia.madre.apellidos.toUpperCase() + ', '+ familia.madre.nombre.toUpperCase() });
    
                padresDNI.push({text:familia.madre.dni });
                padresCelular.push({text: familia.madre.celular });
            }
    
            if(familia.apoderado){
                padresFamilia.push+({text:familia.apoderado.apellidos.toUpperCase() + ', '+ familia.apoderado.nombre.toUpperCase() });
                
                padresDNI.push({text:familia.apoderado.dni });
                padresCelular.push({text: familia.apoderado.celular });
            }
    
            
            var familiaEstudiante = [];
            var estudiantedni  = []
            
            familia.estudiantes.forEach((estudiante, index)=>{
                if(estudiante.estado == 'activo' || estudiante.estado =='pendiente'){
    
                    familiaEstudiante.push({text: estudiante.apellidos + ', '+estudiante.nombre 
                    + ' (' + estudiante.resumen.grade + '° -'+ estudiante.resumen.seccion+ ')'});
                    
                    estudiantedni.push({text:estudiante.dni});
                }
            });
    
            tableColumns.push(padresFamilia);
            tableColumns.push(padresDNI);
            tableColumns.push(padresCelular);
            tableColumns.push(familiaEstudiante);
            tableColumns.push(estudiantedni);
            tableContent.push(tableColumns);
        }
        
        //fin de la insercion de la fila
    });
    //console.log(tableContent);
    var yearActual = new Date().getFullYear();

    var docDefinition = {
        pageSize: 'A4',
        pageMargins:[30,35,30,45],
        pageOrientation:'landscape',
        footer:footerContent(), 
        content: [
            {   text: 'PADRON DE PADRES FAMILIA  ' + yearActual ,
                alignment:'center',
                fontSize: 16,
                bold: true},
            {
                table:{
                    headerRows: 1,
                    widths:['auto', 'auto', 'auto', 'auto', 'auto', 55 , 'auto', 'auto'],
                    body : tableContent
                },
                layout: {
                    fillColor: function (rowIndex, node, columnIndex) {
                        return (rowIndex % 2 === 0) ? '#EEEEEE' : null;
                    }
                }
            }
        ],
        styles:{
            small:{
                fontSize:12
            },
            tiny:{
                fontSize:8,
                bold:true

            }
        }
    };

    //final de documento
    
    var pdfDoc = reporte.createPdfKitDocument(docDefinition);

    pdfDoc.pipe(fs.createWriteStream('./temp/padronFamilias.pdf'));
    if(pdfDoc.end()){
        res.status(200).send({message:"Creacion de reporte correctamente"});
    }
}

// funcion para descargar el padron de padres de familias
async function descargarPadronFamilias(req,res){
    fs.exists('./temp/padronFamilias.pdf', (exists)=>{
        res.sendFile(path.resolve('./temp/padronFamilias.pdf'));
    });
}


module.exports={
    generarPadronFamilias,
    descargarPadronFamilias
}