import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { EstudianteMdl } from 'src/app/models/estudiante-mdl';

@Component({
  selector: 'app-estudiante-documentos-traslado',
  templateUrl: './estudiante-documentos-traslado.component.html',
  styleUrls: ['./estudiante-documentos-traslado.component.css']
})
export class EstudianteDocumentosTrasladoComponent implements OnInit {
  public id:string;
  public estudiante=EstudianteMdl;
  public traslado:{
    certificado:string,
    resolucion:string,
    boleta_notas:string
  }

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _estudianteService:EstudianteService
  ) { 
    this.traslado = {certificado:"",resolucion:"",boleta_notas:""};
  }


  ngOnInit() {
    this._route.params.forEach((params:Params)=>{
      this.id = params.id;
    });
    this.getEstudiante();
  }

  closepopup(){
    this._router.navigate([{outlets:{popup:null}}]);
  }

  getEstudiante(){
    this._estudianteService.getEstudiante(this.id).subscribe(
      result=>{
        this.estudiante = result.estudiante;
        if(result.estudiante.documentos && result.estudiante.documentos.traslado)
          this.traslado = result.estudiante.documentos.traslado;
        //console.log(this.estudiante);
      },
      err=>{
        this._router.navigate(['/error/servidor']);
        console.log("error en la peticion");
      }
    );
  }

  guardarDocumentos(){
    //console.log("guardando documentos");
    //console.log(this.traslado);
    this._estudianteService.addDocumentosTraslado(this.id, this.traslado).subscribe(
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
