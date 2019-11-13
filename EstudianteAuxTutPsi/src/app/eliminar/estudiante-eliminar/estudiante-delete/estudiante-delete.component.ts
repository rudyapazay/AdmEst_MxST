import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-estudiante-delete',
  templateUrl: './estudiante-delete.component.html',
  styleUrls: ['./estudiante-delete.component.css']
})
export class EstudianteDeleteComponent implements OnInit {
  public id:string;
  public nombre:string;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _estudianteService:EstudianteService
  ) { }

  ngOnInit() {
    this._route.params.forEach((params:Params)=>{
      this.id = params['id'];
      this.nombre = params['nombre'];
    })
  }

  closepopup(){
    this._router.navigate([{outlets:{popup:null}}]);
  }

  eliminarEstudiante(){
    console.log("eliminar estudiante");
    this._estudianteService.deleteEstudiante(this.id).subscribe(
      result=>{
        this._router.navigate([{outlets:{popup:null}}]);
      },
      err=>{
        console.log("Error en la eliminacion");
      }
    );
  }

}
