import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-cambiar-grado-seccion',
  templateUrl: './cambiar-grado-seccion.component.html',
  styleUrls: ['./cambiar-grado-seccion.component.css']
})
export class CambiarGradoSeccionComponent implements OnInit {
  public id;
  public nombre;
  public grado;
  public seccion;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _estudianteService:EstudianteService
  ){}
  //enviar id, grado y seccion a enviar

  ngOnInit() {
    this._route.params.forEach((params:Params)=>{
      this.id = params['id'];
      this.nombre = params['nombre'];
    });
  }

  closepopup(){
    this._router.navigate([{outlets:{popup:null}}]);  
  }
  
  cambiar(){
    this._estudianteService.cambiarGradoSeccion(this.id,this.grado,this.seccion).subscribe(
      result=>{
        this._router.navigate([{outlets:{popup:null}}]);          
      },
      err=>{
        console.log("error en el servidor");
      }
    );

  }

}
