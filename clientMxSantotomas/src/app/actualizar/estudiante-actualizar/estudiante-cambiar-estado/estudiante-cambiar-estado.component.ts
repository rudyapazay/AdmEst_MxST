import { Component, OnInit } from '@angular/core';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-estudiante-cambiar-estado',
  templateUrl: './estudiante-cambiar-estado.component.html',
  styleUrls: ['./estudiante-cambiar-estado.component.css']
})
export class EstudianteCambiarEstadoComponent implements OnInit {

  public id:string;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _estudianteService:EstudianteService
  ) { }

  ngOnInit() {
    this._route.params.forEach((params:Params)=>{
      this.id = params['id'];
    })
  }

  closepopup(){
    this._router.navigate([{outlets:{popup:null}}]);
  }

  ratificarEstudiante(){
    //console.log("eliminando padre");
    this._estudianteService.estudianteCambiarEstado(this.id, 'activo').subscribe(
      result=>{
        this._router.navigate([{outlets:{popup:null}}]);
      },
      err=>{
        this._router.navigate(['/error/servidor']);
        console.log("error en la peticion");
      }
    );
  }

}
