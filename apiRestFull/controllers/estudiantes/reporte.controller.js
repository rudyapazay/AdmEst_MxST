'use strict'

const estudianteMDL = require('../../models/estudiante.model');
const fs = require('fs');
const pdf = require('pdfjs');
const path = require('path');

async function pdfEstudianteByGrado(req,res){
    var yearActual = new Date().getFullYear().toString();

    var estudiantes = await estudianteMDL.find({'referencia.primero.year':yearActual})
        .sort({'referencia.primero.seccion':+1, 'apellidos':+1, 'nombre':+1});

    var reporte = new pdf.Document();
    const table = reporte.table({
        widths: [30, 20, 100, 200,200],
        borderWidth: 0,
    });
    estudiantes.forEach((estudiante, i)=>{
        const row = table.row();
        row.cell(" " + i );
        row.cell(estudiante.referencia.primero.seccion);
        row.cell(estudiante.dni);
        row.cell(" " + estudiante.nombre);
        row.cell(" " +estudiante.apellidos);
        
    });

    reporte.pipe(fs.createWriteStream('./temp/reporte.pdf'));  
    await reporte.end().then(()=>{
        fs.exists('./temp/reporte.pdf', (exists)=>{
            res.sendFile(path.resolve('./temp/reporte.pdf'));
        });
    });

    
       //fs.close();
    
    //console.log(reporte);
}

module.exports={
    pdfEstudianteByGrado
}