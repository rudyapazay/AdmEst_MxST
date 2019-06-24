import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { EstudianteMdl } from 'src/app/models/estudiante-mdl';

@Component({
  selector: 'app-estudiante-seccion',
  templateUrl: './estudiante-seccion.component.html',
  styleUrls: ['./estudiante-seccion.component.css']
})
export class EstudianteSeccionComponent implements OnInit {
  public estudiantes:EstudianteMdl;
  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _estudianteService:EstudianteService
  ) { }

  ngOnInit() {
    this.getEstudianteGradoSeccion();
  }

  getEstudianteGradoSeccion(){
    this._route.params.forEach((params:Params)=>{
      let grado = params['grado'];
      let seccion = params['seccion'];
      this._estudianteService.getEstudianteGradoSeccion(grado,seccion).subscribe(
        result=>{
          this.estudiantes = result.estudiantes;
          console.log(this.estudiantes);
        },
        err=>{
          console.log(err);
        }
      );
    });
  }
}
