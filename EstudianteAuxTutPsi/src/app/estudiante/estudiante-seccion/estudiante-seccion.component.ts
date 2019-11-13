import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { EstudianteMdl } from 'src/app/models/estudiante-mdl';
import { TouchSequence } from 'selenium-webdriver';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-estudiante-seccion',
  templateUrl: './estudiante-seccion.component.html',
  styleUrls: ['./estudiante-seccion.component.css']
})
export class EstudianteSeccionComponent implements OnInit {
  public estudiantes:EstudianteMdl;
  public grado:string;
  public seccion:string; 

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
  

}
