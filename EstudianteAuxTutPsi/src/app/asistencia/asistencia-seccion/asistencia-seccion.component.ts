import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-asistencia-seccion',
  templateUrl: './asistencia-seccion.component.html',
  styleUrls: ['./asistencia-seccion.component.css']
})
export class AsistenciaSeccionComponent implements OnInit {
  public puntual =[];
  public tarde = [];
  public falta = [];
  public estudiantes = [];
  public grado:String;
  public seccion:String;
  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _asistenciasService:AsistenciaService
  ) { }

  ngOnInit() {
    this.getEstudiantes();
    
  }
  cambiarGrado(g){
    this.grado = g;
    this._router.navigate(['/asistencia/seccion/'+this.grado+'/'+this.seccion]);
    //console.log(this.grado);
  }
  cambiarSeccion(S){
    this.seccion = S;
    this._router.navigate(['/asistencia/seccion/'+this.grado+'/'+this.seccion]);
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
  getEstudiantes(){
    this._route.params.forEach((params:Params)=>{
      this.grado = params['grado'];
      this.seccion = params['seccion'];
      this._asistenciasService.entradaGradoSeccion(this.grado, this.seccion).subscribe(
        result=>{
          //console.log(result);
          this.puntual = [];
          this.tarde = [];
          this.falta =[];
          result.forEach(estudiante => {
            switch (estudiante.resumen.reporte) {
              case "P":
                this.puntual.push(estudiante);
                break;
              case "T":
                this.tarde.push(estudiante);
                break;
              case "F":
                this.falta.push(estudiante);
                break;
              default:
                break;
            }
          });
          this.estudiantes = result;
          //console.log(this.tarde);
        },
        err=>{
          console.log("error en Peticion");
        }
      );

    });
  }

 
}
