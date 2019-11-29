import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-estudiante-documentos-delete',
  templateUrl: './estudiante-documentos-delete.component.html',
  styleUrls: ['./estudiante-documentos-delete.component.css']
})
export class EstudianteDocumentosDeleteComponent implements OnInit {
  public id:string;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _estudianteService:EstudianteService
  ) { }

  ngOnInit() {
    this._route.params.forEach((params:Params)=>{
      this.id = params['id'];
    });
  }

  closepopup(){
    this._router.navigate([{outlets:{popup:null}}]);
  }
  
  deleteDocumentos(){
    this._estudianteService.deleteDocumentos(this.id).subscribe(
      result=>{
        this._router.navigate([{outlets:{popup:null}}]);
      },
      err=>{
        this._router.navigate(['/error/servidor']);
        console.log("Error en el servidor");
      }
    );
  }

}
