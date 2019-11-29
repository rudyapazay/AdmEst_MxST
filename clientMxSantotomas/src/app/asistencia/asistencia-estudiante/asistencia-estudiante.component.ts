import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AsistenciaService } from 'src/app/services/asistencia.service';



@Component({
  selector: 'app-asistencia-estudiante',
  templateUrl: './asistencia-estudiante.component.html',
  styleUrls: ['./asistencia-estudiante.component.css']
})
export class AsistenciaEstudianteComponent implements OnInit {
  public asistencias = [];
  public estudiante={
    id:" ",
    apellidos:" ",
    nombre:" "
  }
  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _asistenciaService:AsistenciaService
  ) { }

  ngOnInit() {
    this.getAsistencia();
  }

  getAsistencia(){
    this._route.params.forEach((params:Params)=>{
      let id = params['id'];
      this._asistenciaService.asistenciaEstudiante(id).subscribe(
        result=>{
          this.asistencias = result;
          this.estudiante.id = result[0].estudiante._id;
          this.estudiante.apellidos = result[0].estudiante.apellidos;
          this.estudiante.nombre = result[0].estudiante.nombre;
          console.log(result);
        },
        err=>{
          this._router.navigate(['/error/servidor']);
          console.log("error en el servidor");
        }
      )
    });
  }
  closepopup(){
    this._router.navigate([{outlets:{popup:null}}]);
  }

  verEstudiante(){
    //this._router.navigate([{outlets:{popup:null}}]);
    this._router.navigate(['estudiante/'+this.estudiante.id,{outlets:{popup:null}} ])
  }
}
