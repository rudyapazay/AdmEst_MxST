import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { EstudianteService } from 'src/app/services/estudiante.service';
import { EstudianteMdl } from 'src/app/models/estudiante-mdl';
import { EstudianteReferenciaComponent } from '../estudiante-referencia/estudiante-referencia.component';


import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { faUserCheck, faUsersCog, faCalendarCheck, faUsers } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-estudiante-detail',
  templateUrl: './estudiante-detail.component.html',
  styleUrls: ['./estudiante-detail.component.css']
})
export class EstudianteDetailComponent implements OnInit {
  //componente  hijo
  faUserCheck = faUserCheck; faUsersCog = faUsersCog; 
  faCalendarCheck = faCalendarCheck; faUsers = faUsers;

  @ViewChild(EstudianteReferenciaComponent, { static: true }) referencia:EstudianteReferenciaComponent;

  public estudiante : EstudianteMdl;
 
  public carne :any;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _estudianteService:EstudianteService
  ){ 
    this._router.events.subscribe((e:any)=>{
      this.getEstudiante();
    });
    
    this.estudiante =  new EstudianteMdl();
    
  }

  ngOnInit() {
    this.getEstudiante();
    this._router.navigate([{outlets:{popup:null}}]);
  }

 
  getEstudiante(){
    this._route.params.forEach((params:Params)=>{
      let estudiante_id = params['id'];

      this._estudianteService.getEstudiante(estudiante_id).subscribe(
        result=>{
          this.estudiante = result.estudiante;
          //enviando referencia al componente
          this.referencia.estref = result.estudiante.referencia;
        
          //console.log(result.estudiante);
        },
        err=>{
          console.log("error en la base de datos");
        }
      );
    });
  }

  reportePdf(){
    const documentDefinition = { content: [this.personalInformacion(), this.familiaInformacion()]};
    pdfMake.createPdf(documentDefinition).open();
  }

  personalInformacion(){
    return [
      
      {
        text: "FICHA DE ESTUDIANTE",
        bold: true,
        fontSize: 20,
        alignment: 'center',
        margin:[0,0,0,15]
      },
      {
        text: "I. Estudiante ",
        bold:true
      }, 

      {
        columns:
        [
          {
            width:'80%',
            
            table:{
              width:['auto', 'auto'],
              body:[
                ['Apellidos',
                  {
                    text: ': '+this.estudiante.apellidos,
                    bold: true,
                    fontSize: 16,
            
                  }
                ],
                ['Nombre(s)', 
                  {
                    text: ': '+this.estudiante.nombre,
                    bold: true,
                    fontSize: 16,
                  }
                ],
                [
                  'DNI Nro.',
                  { text: ': '+this.estudiante.dni }
                ],
                [
                  'Sexo',': '+this.estudiante.sexo.toUpperCase()
                  
                ]

              ]
            },
            layout: 'noBorders'
          },
          //QR code
          [
            { qr:this.estudiante._id,
              fit:100
            },
            {
              text:'\n QR de estudiante',
              fontSize: 9,
              alignment: 'center'
            }
          ]
        ]
      }
      //fin de estudiantes     
    ]
  }

  familiaInformacion(){
    return [
      {
        text:"II. Informacion familiar",
        margin:[0,20,0,10],
        bold:true
      },
      {
        columns:[
          {
            width: '80%',
            table:{
              body:[
                [
                  'Familia', 
                  {
                    text: ': '+this.estudiante.familia.carpeta,
                    fontSize: 14,
                    bold:true
                  }
                ],
                [
                  'Carpeta', 
                  {
                    text: ': '+this.estudiante.familia.codigo,
                    fontSize:14,
                    bold:true
                  }
                ],
                [
                  'Direccion', ': '+this.estudiante.familia.direccion
                ]
              ]
            },
            layout: 'noBorders'
          },
          //QR code:
          [
            {
              qr:this.estudiante.familia._id,
              fit:100
            },
            {
              text:'\n QR de familia',
              fontSize: 9,
              alignment: 'center'
            }
          ]
        ]
      }
    ]
  }
  
  
}
