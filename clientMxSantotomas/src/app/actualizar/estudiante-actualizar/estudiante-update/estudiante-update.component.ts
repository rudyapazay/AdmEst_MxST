import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { EstudianteMdl } from 'src/app/models/estudiante-mdl';


@Component({
  selector: 'app-estudiante-update',
  templateUrl: './estudiante-update.component.html',
  styleUrls: ['./estudiante-update.component.css']
})
export class EstudianteUpdateComponent implements OnInit {
  public estudiante = EstudianteMdl;
  public id:string;

  
  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _estudianteService:EstudianteService
  ) { }

  ngOnInit() {
    this.getEstudiante();
  }

  getEstudiante(){
    this._route.params.forEach((params:Params)=>{
      this.id = params.id;
  
      this._estudianteService.getEstudiante(this.id).subscribe(
        result=>{
          this.estudiante = result.estudiante;
          
          //console.log(this.estudiante);
          //console.log(this.estudiantebasico);
          
        },
        err=>{
          console.log("error en la peticion");
        }
        );
    });
  }

  closepopup(){
    this._router.navigate([{outlets:{popup:null}}]);
  }

  updateEstudiante(){
    this._estudianteService.updateEstudiante(this.id, this.estudiante).subscribe(
      result=>{
        //console.log(result);
        this._router.navigate([{outlets:{popup:null}}]);
      },
      err=>{
        console.log("error en la peticion");
      });
  }
  

}
