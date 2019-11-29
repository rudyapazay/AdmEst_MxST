import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { EstudianteService } from 'src/app/services/estudiante.service';

import { EstudianteMdl } from 'src/app/models/estudiante-mdl';
import { EstudianteDocumentosMdl } from 'src/app/models/estudiante-mdl/estudiante-documentos-mdl';

@Component({
  selector: 'app-estudiante-documentos',
  templateUrl: './estudiante-documentos.component.html',
  styleUrls: ['./estudiante-documentos.component.css']
})
export class EstudianteDocumentosComponent implements OnInit {
  public estudiante = EstudianteMdl;
  public documentos:EstudianteDocumentosMdl;
  public id:string;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _estudianteService:EstudianteService
  ) { 
    this.documentos = new EstudianteDocumentosMdl(false,false,false,false,false,false);
  }

  ngOnInit() {
    this.getEstudiante()
  }

  getEstudiante(){
    this._route.params.forEach((params:Params)=>{
      this.id = params['id'];
      this._estudianteService.getEstudiante(this.id).subscribe(
        result=>{
          //console.log(this.documentos);
          this.estudiante =result.estudiante;
          if(result.estudiante.documentos){
            this.documentos = result.estudiante.documentos;
          }
        },
        err=>{
          this._router.navigate(['/error/servidor']);
          console.log('Error en la peticion');
        }
      );
    });
  }

  closepopup(){
    this._router.navigate([{outlets:{popup:null}}]);
  }

  updateEstudiante(){
    //console.log(this.documentos);
    this._estudianteService.addDocumentos(this.id, this.documentos).subscribe(
      result=>{
        //console.log(result);
        this._router.navigate([{outlets:{popup:null}}]);
      },
      err=>{
        this._router.navigate(['/error/servidor']);
        console.log("error en la peticion");
      });
  }
}
