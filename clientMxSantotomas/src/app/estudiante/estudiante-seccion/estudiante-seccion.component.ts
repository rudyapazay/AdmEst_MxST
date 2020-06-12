import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { EstudianteMdl } from 'src/app/models/estudiante-mdl';

import { faUser, faMale, faFemale, faUserEdit, 
        faIdCard, faUsers, faUserCog, faTrash, faPrint, 
        faCalendarCheck, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import { GlobalService } from 'src/app/services/global.service';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { FamiliaMdl } from 'src/app/models/famlia-mdl';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-estudiante-seccion',
  templateUrl: './estudiante-seccion.component.html',
  styleUrls: ['./estudiante-seccion.component.css']
})
export class EstudianteSeccionComponent implements OnInit {
  faUser = faUser; faMale = faMale; faFemale = faFemale;
  faUserEdit = faUserEdit; faIdCard = faIdCard; faUsers=faUsers; 
  faUserCog = faUserCog; faTrash=faTrash; faPrint=faPrint; 
  faCalendarCheck=faCalendarCheck; faUserPlus = faUserPlus; 

  public estudiantes:any;
  public grado:string;
  public seccion:string; 
  public _estudiantes:EstudianteMdl[];

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _estudianteService:EstudianteService,
    private _globalService:GlobalService
  ) { 
    this._estudiantes= [new EstudianteMdl];

  }

  ngOnInit() {
    this.getEstudianteGradoSeccion();
  }

  getEstudianteGradoSeccion(){
    this._route.params.forEach((params:Params)=>{
      this.grado = params['grado'];
      this.seccion = params['seccion'];
      this._estudianteService.getEstudianteGradoSeccion(this.grado,this.seccion).subscribe(
        result=>{
          this.estudiantes = result.estudiantes;
          //console.log(this.estudiantes);
        },
        err=>{
          console.log(err);
        }
      );
    });
  }

  cambiarGrado(g){
    this.grado = g;
    this._router.navigate(['/estudiantes/'+this.grado+'/'+this.seccion]);
    //console.log(this.grado);
  }
  cambiarSeccion(S){
    this.seccion = S;
    this._router.navigate(['/estudiantes/'+this.grado+'/'+this.seccion]);
  }

  is_active_grado(elemet){
    if(elemet == this.grado)
      return 'is-active';
    else
      return '';
  }

  is_active_seccion(elemet){
    if(elemet == this.seccion)
      return 'is-active';
    else
      return '';
  }
  
  print_relacion_estudiantes(){
    //console.log("imprimir relacion de estudiantes");
    const documentDefinition = {
      info:{
        title: this.grado.toUpperCase() + " - " +this.seccion,
        author: 'Serafin',
        subject: 'Relación de estudiantes de una seccion'
      },
      pageMargins:[40,100,40,40], 
      header:this._globalService.getHeaderReport(), 
      footer:this._globalService.getFooterReport(),
      content: [ 
        this.EncabezadoSeccion(),
        this.EstudiantesRelacion()
        
      ],
      
    };
    //creacion de documentos  
    pdfMake.createPdf(documentDefinition).open();
  }

  //relacion de estudiates con familia
  print_relacion_estudiantes_familia(){
    const documentDefinition = {
      pageOrientation:'landscape',
      pageMargins:[40,100,40,40], 
      header:this._globalService.getHeaderReport(), 
      footer:this._globalService.getFooterReport(),
      content: [ 
        this.EncabezadoFamiliaSeccion(),
        this.FamiliaEstudianteRelacion()
        
      ],
      
    };
    //creacion de documentos  
    pdfMake.createPdf(documentDefinition).open();
  }

  EncabezadoSeccion(){
    return [
      {
        text: 'RELACIÓN DE ESTUDIANTES' ,
        alignment:'center',
        fontSize: 11,
        bold: true,
      },
      {
        text:this.grado.toUpperCase() + '  ' + this.seccion,
        alignment:'center',
        fontSize: 16,
        bold: true,
      },
      {
        text : " "
      }
    ]
  }

  EstudiantesRelacion(){

    var est_rep= [['Nro.', 'Apellidos', ' Nombre', 'Codigo', 'DNI Nro.','Sexo']];
    var est_det;

    if(this.estudiantes){
     var i = 0;
     while(this.estudiantes[i]){
       est_det = [i+1, 
          this.estudiantes[i].apellidos.toUpperCase(), 
          this.estudiantes[i].nombre.toUpperCase(),
          this.estudiantes[i].familia.codigo,
          this.estudiantes[i].dni
        ];
        //revisar el operar trinario 
        if(this.estudiantes[i].sexo =='masculino'){
          est_det.push('M');
        }else{
          est_det.push('F');
        }

       est_rep.push(est_det);
       i++;
      }
    }
    

    return {
      columns:[
        {width:"*", text:''},
        {
          width:"auto",
          table:{
            columns:['auto','auto','auto','auto','auto'],
            headerRows: 1,
            body:est_rep
          },
          layout: {
            fillColor: (rowIndex, node, columnIndex) => {
                return (rowIndex % 2 === 0) ? '#EEEEEE' : null;
            }
          }
        },
        {width:"*", text:''}
      ]
      
    }
      
  }

  FamiliaEstudianteRelacion(){
    var est_rep= [['Nro.', 'Apellidos', ' Nombre','Codigo', 'Padres de familia','Celular','Direccion']];
    var est_det;

    //console.log(this.estudiantes);
    if(this.estudiantes){
     var i = 0;
    
     while(this.estudiantes[i]){
    
      var padresFamilia = [];
      var celularFamilia = [];
      //var direccion ;

       est_det = [i+1, 
          this.estudiantes[i].apellidos.toUpperCase(), 
          this.estudiantes[i].nombre.toUpperCase(),
          this.estudiantes[i].familia.codigo
        ];
        //var familia=null;
        var familia =  this.estudiantes[i].familia;
              
        if(familia.padre){
          padresFamilia.push({
            text:familia.padre.apellidos+', '+
            familia.padre.nombre
          });
          celularFamilia.push({text:familia.padre.celular });
        }
        
        if(familia.madre){
          padresFamilia.push({
            text:familia.madre.apellidos+', '+
            familia.madre.nombre
          });
          celularFamilia.push({text:familia.madre.celular });
        }
        if(familia.apoderado){
          padresFamilia.push({
            text:familia.apoderado.apellidos+', '+
            familia.apoderado.nombre
          });
          celularFamilia.push({text:familia.apoderado.celular });
        }
        
        est_det.push(padresFamilia);
        est_det.push(celularFamilia);
        est_det.push(familia.direccion);

       est_rep.push(est_det);
       i++;
      }
    }
    

    return {
      columns:[
        {width:"*", text:''},
        {
          width:"auto",
          table:{
            columns:['auto','auto','auto','auto','auto','auto'],
            headerRows: 1,
            body:est_rep
          },
          layout: {
            fillColor: (rowIndex, node, columnIndex) => {
                return (rowIndex % 2 === 0) ? '#EEEEEE' : null;
            }
          }
        },
        {width:"*",text:''}
      ]
      
    }
  }

  EncabezadoFamiliaSeccion(){
    return [
      {
        text: 'RELACIÓN DE ESTUDIANTES Y FAMILIA' ,
        alignment:'center',
        fontSize: 11,
        bold: true,
      },
      {
        text:this.grado.toUpperCase() + '  ' + this.seccion,
        alignment:'center',
        fontSize: 16,
        bold: true,
      },
      {
        text : " "
      }
    ]
  }
}
