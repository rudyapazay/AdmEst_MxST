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
    private _estudianteService:EstudianteService
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
        header:this.HeaderPdf(), footer:this.footerPdf(),
        content: [ 
          this.familiaInformacion(),
          this.padresFamilia(),
          this.estudiantesFamilia()
        ],
        
      };
    pdfMake.createPdf(documentDefinition).print();
  
  }
  
  HeaderPdf(){
    return [
      
      {columns:[
        {
          margin:[0,20,0,0],
          width:"82%",
          text : [
            {
              text: 'DIRECCIÓN REGIONAL DE EDUCACIÓN CUSCO \n',
              alignment:'center'
            },
            {
              text:'UNIDAD DE GESTIÓN EDUCATIVA LOCAL DE CHUMBIVILCAS \n',
              alignment:'center'
            },
            {
              text:'EMBLEMÁTICA INSTITUCIÓN EDUCATIVA "SANTO TOMÁS" \n',
              bold:true, 
              fontSize: 15,
              alignment:'center'
            },
            {
              text: "CM N°: " +  '0236661',
              alignment:'center',
              fontSize:10,
            }
          ],
        },
        [ 
          {
            margin:[0,10,0,0],
            image:
            'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAKAAD/4QMZaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjFDQ0E3MkNFNDY0MDExRUFBMDBERkMyNzExQTEwMkVGIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjFDQ0E3MkNENDY0MDExRUFBMDBERkMyNzExQTEwMkVGIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgV2luZG93cyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSI4RUJFQzAwQTFEODE4RUQzRDhBQzU0REE0NEE2OENFNiIgc3RSZWY6ZG9jdW1lbnRJRD0iOEVCRUMwMEExRDgxOEVEM0Q4QUM1NERBNDRBNjhDRTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAUEBAZEhknFxcnMiYfJjIuJiYmJi4+NTU1NTU+REFBQUFBQUREREREREREREREREREREREREREREREREREREREARUZGSAcICYYGCY2JiAmNkQ2Kys2REREQjVCRERERERERERERERERERERERERERERERERERERERERERERERERET/wAARCAHyAZADASIAAhEBAxEB/8QApwABAAIDAQEAAAAAAAAAAAAAAAMGAQQFAgcBAQADAQEBAAAAAAAAAAAAAAACAwQFAQYQAAIBAgIECggGAgICAwAAAAABAgMEEQUhMbESQVFxkTJSchMzFWGBwdEikjQG8KHhQoIUYlMjFvGi4kMkEQACAQICBgYJBAMAAwAAAAAAAQIRAzEEIVFhEjITQXGR0SIFgbFCUnIzFDQV8KHB4YIjU/FiQ//aAAwDAQACEQMRAD8AuYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABhvA8AMSko6yKVbgXORPTrOdfz0YeG34pft/ZNRrie51HL0IQqOPIeAcn6m7v8ze8X66Ce6sDajJS1GTUTwJYVesdaxnoz8N3wy19BBxpgTgwnjpRk6JAAA9AAAAAAAAAAAAAAAAAAAAAAAAAAABgyadGrJxUsccUmTKsuFGO3nLU3Rvde0k4tEwPKaeo9GutSIAB6AAAAAAAAAAAAAAAADAxAAbwI5VUtWkilNy1mK7nLdvQnvS1LvJKLZLKqlq0kMpOWswDj3s1cu6G6R1IsUUgADISAAAAAAMxk46iaNVPXoIAa7OauWtCdY+6yLimbYNaM3HUSxqp69B2LWct3NDe7LU+8rcWiUGMTJtIgAAAAAAAAAAAAAAAAAAGDDaWs8wBkEUqy4NJHKblrMdzOWrehPelqXeSUWyGh4ceythIR0PDj2VsJD56XE+suGOGo9qrJa9J4BOF65b4JNHjSZOqy4dB7U09TNUG6HmFxccVL9iO4jbBqptameu8lxmqPmNt8UZIjuM2TBrqrLhPXfPiLlnbD9qnoZ5usnBB3z4h3z4j362x737MbrJzBr97Iw6knwlUvMLSwqz3cZsOSjpbwPLqxRrgzT8xk/lwS6z3cJHWlyHhyb1mAYLmYuXOOWjUTSSAAKD0AAAAHuNNy9CLLduVx7sFVnjdDwDZjBR1GJU1LlOi/LpblVLx6ughvmuD1KDjrPJzZwlB7s1Rk8QACB6AAAE2tRIqz4SMF9vMXLfBLRq6DxpM2FViz3iag1G+HmM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'
            ,width: 55,
            
        }]
      ]},

      {
        text:'_________________________________________________________________________________________________',
        alignment:'center'
      }

    ]
  }

  footerPdf(){
    return [
      {
        text:"_______________________________________________________________________________________________________",
        alignment:"center"
      },
      {
        columns:[
          {
            text: 'Av. Emancipacion 310 - Santo Tomás - Chumbivilcas - Cusco ',
            alignment:'center',
            fontSize:8
          },
          { 
            text: 'Reporte en SERAFIN - Dev. por Rudy Apaza - Cel: 929905152',
            fontSize:8,
            alignment:'center'
          }

        ]
      }
    ]
  }

  familiaInformacion(){
    return [
      {
        text: 'FICHA FAMILIAR',
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
