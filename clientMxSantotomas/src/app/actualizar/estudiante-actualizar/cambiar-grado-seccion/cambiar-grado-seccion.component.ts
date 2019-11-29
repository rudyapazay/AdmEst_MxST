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
  public grados :Array<Object>=[ {'name':'primero'},{'name':'segundo'},{'name':'tercero'},{'name':'cuarto'}, {'name':'quinto'}];
  public secciones:Array<Object>=[{'name':'A'},{'name':'B'},{'name':'C'},{'name':'D'},{'name':'E'},{'name':'F'},{'name':'G'},{'name':'H'}];

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _estudianteService:EstudianteService
  ){
   
  }
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
  
  cambiarGradoSeccion(){
    //console.log(this.grado + this.seccion);
    //console.log(this.grados);
    this._estudianteService.cambiarGradoSeccion(this.id,this.grado,this.seccion).subscribe(
      result=>{
        this._router.navigate([{outlets:{popup:null}}]);          
      },
      err=>{
        this._router.navigate(['/error/servidor']);
        console.log("error en el servidor");
      }
    );

  }

}
