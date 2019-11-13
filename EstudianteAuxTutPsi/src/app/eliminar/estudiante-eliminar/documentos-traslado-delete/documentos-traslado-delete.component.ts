import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-documentos-traslado-delete',
  templateUrl: './documentos-traslado-delete.component.html',
  styleUrls: ['./documentos-traslado-delete.component.css']
})
export class DocumentosTrasladoDeleteComponent implements OnInit {
  public id:string;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _estudianteService:EstudianteService
  ){ }

  ngOnInit() {
    this._route.params.forEach((params:Params)=>{
      this.id=params['id'];
    });
  }

  closepopup(){
    this._router.navigate([{outlets:{popup:null}}]);
  }

  deleteDocumentosTraslado(){
    this._estudianteService.deleteDocumentosTraslado(this.id).subscribe(
      result=>{
        this._router.navigate([{outlets:{popup:null}}]);
      },
      err=>{
        console.log("Error en la peticion");
      }
    );
  }

}
