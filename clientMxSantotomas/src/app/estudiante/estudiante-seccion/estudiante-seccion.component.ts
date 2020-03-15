import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { EstudianteMdl } from 'src/app/models/estudiante-mdl';

import { faUser, faMale, faFemale, faUserEdit, faIdCard, faUsers, faUserCog, faTrash, faPrint, faCalendarCheck} from '@fortawesome/free-solid-svg-icons';
import { GlobalService } from 'src/app/services/global.service';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
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
  faCalendarCheck=faCalendarCheck;

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
      pageMargins:[40,100,40,40], 
      header:this._globalService.getHeaderReport(), 
      footer:this._globalService.getFooterReport(),
      title: 'primero',
      content: [ 
        this.EncabezadoSeccion(),
        this.EstudiantesRelacion()
        
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

    var est_rep= [['Nro.', 'Apellidos', ' Nombre', 'Carpeta', 'DNI','Sexo']];
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
      table:{
        columns:['auto','auto','auto','auto','auto'],
        headerRows: 1,
        body:est_rep
      }
    }
      
  }

}
