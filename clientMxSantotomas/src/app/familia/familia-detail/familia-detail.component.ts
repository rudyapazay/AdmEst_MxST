import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FamiliaService } from 'src/app/services/familia.service';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { FamiliaMdl } from 'src/app/models/famlia-mdl';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { faUsers, faPrint } from '@fortawesome/free-solid-svg-icons';
import { EstudianteMdl } from 'src/app/models/estudiante-mdl';
import { GlobalService } from 'src/app/services/global.service';


@Component({
  selector: 'app-familia-detail',
  templateUrl: './familia-detail.component.html',
  styleUrls: ['./familia-detail.component.css']
})

export class FamiliaDetailComponent implements OnInit {

  faUsers = faUsers;  faPrint=faPrint;

  public familia : FamiliaMdl;
  public estudiantes: EstudianteMdl;

  constructor(
    private _route :ActivatedRoute,
    private _router:Router,
    private _familiaService:FamiliaService,
    private _estudianteService:EstudianteService,
    private _globalService:GlobalService
  ){ 
    this._router.events.subscribe((e:any)=>{
        this.getFamilia();
        
    });
    
    this.familia = new FamiliaMdl();
    this.estudiantes =new EstudianteMdl();
  }

  ngOnInit() {
    this.getFamilia();
    this.getEstudiantes();
  }

  //sacando informacion de estudiantes
  getEstudiantes(){
    this._route.params.forEach((params:Params)=>{
      let id=params['id'];
      //this.familia_id = id;
      this._estudianteService.getEstudiantesByFamilia(id).subscribe(
        result=>{
          this.estudiantes =result.estudiantes;
          console.log(this.estudiantes);
        },  
        err=>{
          this._router.navigate(['/error/servidor']);
          console.log("error en la peticion");
        }
      )
    });
  }
  //Sacando informacion de la familia
  getFamilia(){
    this._route.params.forEach((params:Params)=>{
      let id = params['id'];
      this._familiaService.getFamilia(id).subscribe(
        result=>{
          this.familia =result.familia;
        },
        err=>{  
          this._router.navigate(['/error/servidor']);
          console.log('error en la peticion');
          //this._router.navigate(['/familias/']);
        }
      );
    });
  }

  reportePdf(){

    const documentDefinition = {
        pageMargins:[40,100,40,40], 
        header:this._globalService.getHeaderReport(), 
        footer:this._globalService.getFooterReport(),
        content: [ 
          this.familiaInformacion(),
          this.padresFamilia(),
          this.estudiantesFamilia()
        ],
        
      };

    pdfMake.createPdf(documentDefinition).open();
  
  }
  

  
  familiaInformacion(){
    return [
      {
        text: 'FICHA FAMILIAR  -  2020' ,
        alignment:'center',
        fontSize: 16,
        bold: true,
      },
      {
        text:'I. Informacion familiar',
        bold: true
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
                    text: ': '+this.familia.carpeta,
                    fontSize: 14,
                    bold:true
                  }
                ],
                [
                  'Carpeta', 
                  {
                    text: ': '+this.familia.codigo,
                    fontSize:14,
                    bold:true
                  }
                ],
                [
                  'Direccion', ': '+this.familia.direccion
                ],
                [
                  'Estado', ': '+this.familia.estado
                ],
                [
                  'Observaciones', ': '+this.familia.observaciones
                ]
              ]
            },
            layout: 'noBorders'
          },
          //QR code:
          [
            {
              qr:this.familia._id,
              fit:100
            },
            {
              text:'\n QR de familia',
              fontSize: 8,
              alignment: 'center'
            }
          ]
        ]
      }
    ]    
  }

  padresFamilia(){
    if(this.familia.padre && this.familia.madre && this.familia.apoderado){
      return {
        columns:[ 
          this.padreInformacion(),
          this.madreInformacion(),
          this.apoderadoInformacion()
        ]
      }
    }
    if(this.familia.padre && this.familia.madre && !this.familia.apoderado){
      return {
        columns:[ 
          this.padreInformacion(),
          this.madreInformacion(),
        ]
      }
    }
    if(this.familia.padre && !this.familia.madre && this.familia.apoderado){
      return {
        columns:[ 
          this.padreInformacion(),
          this.apoderadoInformacion()
        ]
      }
    }
    if(!this.familia.padre && this.familia.madre && this.familia.apoderado){
      return {
        columns:[ 
          this.madreInformacion(),
          this.apoderadoInformacion()
        ]
      }
    }
    if(this.familia.padre && !this.familia.madre && !this.familia.apoderado){
      return {
        columns:[ 
          this.padreInformacion(),
        ]
      }
    }
    if(!this.familia.padre && !this.familia.madre && this.familia.apoderado){
      return {
        columns:[ 
          this.apoderadoInformacion()
        ]
      }
    }
    if(!this.familia.padre && this.familia.madre && !this.familia.apoderado){
      return {
        columns:[ 
          this.madreInformacion()
        ]
      }
    }

  }

  padreInformacion(){
    if(this.familia.padre){
      return [
        {
            text: '\t PADRE DE FAMILIA',
            //alignment: 'center',
            bold : true
        },{
          table:{
            body:[
              [
                'Apellidos',
                ': '+this.familia.padre.apellidos
              ],
              [
                'Nombre(s)',
                ': '+this.familia.padre.nombre
              ],
              [
                'DNI Nro',
                ': '+this.familia.padre.dni
              ],
              [
                'Celular',
                ': '+ this.familia.padre.celular
              ]              
            ]
          },
          layout: 'noBorders'
        }
      ]
    }
  }
  madreInformacion(){
    if(this.familia.madre){
      return [
        {
            text: '\t MADRE DE FAMILIA',
            //alignment: 'center',
            bold : true
        },{
          table:{
            body:[
              [
                'Apellidos',
                ': '+this.familia.madre.apellidos
              ],
              [
                'Nombre(s)',
                ': '+this.familia.madre.nombre
              ],
              [
                'DNI Nro',
                ': '+this.familia.madre.dni
              ],
              [
                'Celular',
                ': '+ this.familia.madre.celular
              ]              
            ]
          },
          layout: 'noBorders'
        }
      ]
    }
  }
  apoderadoInformacion(){
    if(this.familia.apoderado){
      return [
        {
            text: '\t APODERADO',
            //alignment: 'center',
            bold : true
        },{
          table:{
            body:[
              [
                'Apellidos',
                ': '+this.familia.apoderado.apellidos
              ],
              [
                'Nombre(s)',
                ': '+this.familia.apoderado.nombre
              ],
              [
                'DNI Nro',
                ': '+this.familia.apoderado.dni
              ],
              [
                'Celular',
                ': '+ this.familia.apoderado.celular
              ],
              [
                'Parentesco',
                ': '+this.familia.apoderado.relacion
              ]            
            ]
          },
          layout: 'noBorders'
        }
      ]
    }
  }

  estudiantesFamilia(){
    var i=0;
    var encabezado = [
      {
        text: ' \n II. Estudiantes ',
        fontSize: 14,
        bold:true
      }
    ]
    var estudiantePdf=[];
    estudiantePdf.push(encabezado);
    while(this.estudiantes[i]){
      if(this.estudiantes[i].estado=='activo'){
        estudiantePdf.push( this.estudianteInformacion(this.estudiantes[i]));
      }
      i++;
    } 
    return estudiantePdf ;
  
  }
  estudianteInformacion(estudiante:EstudianteMdl){
    var grado = "";
    var yearActual = new Date().getFullYear().toString();
    if(estudiante.referencia.primero && estudiante.referencia.primero.year == yearActual){
      grado = 'PRIMERO';
    }  
    else if(estudiante.referencia.segundo && estudiante.referencia.segundo.year == yearActual){
      grado = "SEGUNDO ";
    }
    else if(estudiante.referencia.tercero && estudiante.referencia.tercero.year == yearActual){
      grado ="TERCERO";
    }
    else if(estudiante.referencia.cuarto && estudiante.referencia.cuarto.year == yearActual){
      grado = "CUARTO";
    }
    else if(estudiante.referencia.quinto && estudiante.referencia.quinto.year ==  yearActual){
      grado = "QUINTO";
    }

    return [{
        columns:
        [
          {
            width:'80%',
            
            table:{
              width:['auto', 'auto'],
              body:[
                ['Apellidos',
                  {
                    text: ': '+estudiante.apellidos,
                    bold: true,
                    fontSize: 13,
            
                  }
                ],
                ['Nombre(s)', 
                  {
                    text: ': '+estudiante.nombre,
                    bold: true,
                    fontSize: 13,
                  }
                ],
                ['Grado', 
                  {
                    text: ': '+grado,
                    bold: true,
                    fontSize: 13,
                  }
                ],
                [
                  'DNI Nro.',
                  { text: ': '+estudiante.dni }
                ],
                [
                  'Sexo',': '+estudiante.sexo.toUpperCase()+' \n '
                ]
              ]
            },
            layout: 'noBorders'
          },
          //QR code
          [
            { qr:estudiante._id,
              fit:99
            },
          ]
        ]
      }
    ]
  }
}
