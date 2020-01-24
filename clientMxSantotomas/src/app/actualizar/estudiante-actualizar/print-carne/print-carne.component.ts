import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { EstudianteMdl } from 'src/app/models/estudiante-mdl';

@Component({
  selector: 'app-print-carne',
  templateUrl: './print-carne.component.html',
  styleUrls: ['./print-carne.component.css']
})
export class PrintCarneComponent implements OnInit {
  public id:string;
  public estudiante = EstudianteMdl;
  public bodyCarne:any; 
  public year = new Date().getFullYear();
  public imagenFondo = "http://localhost:3700/api/imagenes/sistema/carneEstudiante.png";

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _estudianteService:EstudianteService
  ) {
    this.bodyCarne = `<html><head>
      <style>
        *{margin:0px; padding:0px;}
        #idCard{ height:5cm; width:16cm; border: 1px solid black; position:absolute;}

        #fondo{ margin 0cm; height:5.1cm; width:16.1cm; float:left;  }

        #adelante{ margin: 0; height:5cm; width:8cm; float:left; }
        #atraz{ margin: 0; height:5cm; width:8cm; float:left; }
        #foto { margin: 1cm 0.5cm 1cm 1cm; height:3cm; width:2.5cm; border:1px solid black; float:left; background-color:#fff;}
        #bloque{ margin: 1cm 0cm 0cm 4cm;  height:4cm; width:4cm; position:absolute;  }
        #informacion { list-style-type: none; margin:0px; padding:0px; width:4cm; }
        .item{ font-size:8pt; font-weight:bold; }
        .data{font-size: 11pt; margin:0 0 2px 0;  font-family:Impact; font-weight:-100;}
        .data-small{font-size: 10pt; margin:0 0 3px 0;  font-family:Impact; font-weight:-100;}
        .docu{font-size: 9pt; margin:0px 0 2px 0;  font-family:Calibri; font-weight:700; }
        #QRCode{ margin:0.1cm 0.1cm 0.1cm 3cm; height:4.8cm; width:auto; }

      </style>`;
    
  }

  ngOnInit() {
    this.getEstudiante();
  }

  getEstudiante(){
    
    this._route.params.forEach((params:Params)=>{
      this.id =params['id'];
      this._estudianteService.getEstudianteQRCode(this.id).subscribe(
        result=>{
          //console.log(result.estudiante);
          this.estudiante = result.estudiante;
          
          this.bodyCarne += "<title>" + result.estudiante.apellidos+ " "+ result.estudiante.nombre +  "</title>";
       
          this.bodyCarne += "</head>";

          this.bodyCarne += '<img id="fondo" src ="';
            this.bodyCarne += this.imagenFondo;
            this.bodyCarne += '">';
            
            this.bodyCarne += '<div id="idCard">';
            this.bodyCarne += '<div id="adelante">';
              this.bodyCarne += '<div id="foto"> foto </div>';
              this.bodyCarne += '<div id="bloque">';
                this.bodyCarne +='<ul id="informacion">';
                  this.bodyCarne += '<li class="item"> Apellidos: </li>';
                  if(result.estudiante.apellidos.length > 19)
                    this.bodyCarne += '<li class="data-small">'+result.estudiante.apellidos.toUpperCase() +'</li>';
                  else
                    this.bodyCarne += '<li class="data">'+result.estudiante.apellidos.toUpperCase() +'</li>';
                  this.bodyCarne += '<li class="item"> Nombre(s):  </li>';
                  if(result.estudiante.nombre.length > 19)
                    this.bodyCarne += '<li class="data-small">'+result.estudiante.nombre.toUpperCase() +'</li>';  
                  else
                    this.bodyCarne += '<li class="data">'+result.estudiante.nombre.toUpperCase() +'</li>';  
                  this.bodyCarne += '<li class="docu"> DNI: '+result.estudiante.dni +'</li>';
                  this.bodyCarne += '<li class="docu"> Carpeta: '+result.estudiante.familia.codigo +'</li>';
                  //mostrando el grado y seccion
                  if(result.estudiante.referencia.primero){
                    if(result.estudiante.referencia.primero.year ==this.year)
                      this.bodyCarne += '<li class="data"> PRIMERO - '+result.estudiante.referencia.primero.seccion +'</li>';
                  }
                  if(result.estudiante.referencia.segundo){
                    if(result.estudiante.referencia.segundo.year == this.year)
                      this.bodyCarne += '<li class="data"> SEGUNDO - '+result.estudiante.referencia.segundo.seccion +'</li>';
                  }
                  if(result.estudiante.referencia.tercero){
                    if(result.estudiante.referencia.tercero.year == this.year)
                      this.bodyCarne += '<li class="data"> TERCERO - '+result.estudiante.referencia.tercero.seccion +'</li>';
                  }
                  if(result.estudiante.referencia.cuarto){
                    if(result.estudiante.referencia.cuarto.year == this.year)
                      this.bodyCarne += '<li class="data"> CUARTO - '+result.estudiante.referencia.cuarto.seccion +'</li>';
                  }
                  if(result.estudiante.referencia.quinto){
                    if(result.estudiante.referencia.quinto.year == this.year)
                      this.bodyCarne += '<li class="data"> QUINTO - '+result.estudiante.referencia.quinto.seccion +'</li>';
                  }
  
                  //fin de grado y seccion
                this.bodyCarne += '</ul>'
              this.bodyCarne += '</div>'
            this.bodyCarne += '</div>'
            
            this.bodyCarne += '<div id="atraz">';
              this.bodyCarne += '<img id="QRCode" src="'+result.estudiante.QRCode+'" >';
            this.bodyCarne += '</div>';
          this.bodyCarne += '</div>';

        },
        err=>{
          console.log("error con el servidor");
        }
      );
    });
  }
  
  closepopup(){
    this._router.navigate([{outlets:{popup:null}}]);
  }

  printCarne(){
    //console.log("prueba");
    this._router.navigate([{outlets:{popup:null}}]);
    
    var popupWin = window.open('', '_blank', 'width=900,height=900');
    
    popupWin.document.open();
    popupWin.document.write('<body onload="window.print(); setTimeout(\'window.close()\',000);">' + this.bodyCarne +  '</body></html>');
    popupWin.document.close();
    
  }
}
