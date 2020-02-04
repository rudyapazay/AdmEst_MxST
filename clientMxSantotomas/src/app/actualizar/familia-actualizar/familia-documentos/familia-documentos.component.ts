import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FamiliaService } from 'src/app/services/familia.service';
import { FamiliaMdl } from 'src/app/models/famlia-mdl';
import { FamiliaDocumentosMdl } from 'src/app/models/familia-mdl/familia-documentos-mdl';

@Component({
  selector: 'app-familia-documentos',
  templateUrl: './familia-documentos.component.html',
  styleUrls: ['./familia-documentos.component.css']
})
export class FamiliaDocumentosComponent implements OnInit {
  public id:string;
  public familia:FamiliaMdl;
  public documentos: FamiliaDocumentosMdl;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _familiaService:FamiliaService
  ) { 
    this.documentos = new FamiliaDocumentosMdl(false,false,false,false,false);
  }

  ngOnInit() {
    this.getFamilia();
    this.familia = new FamiliaMdl();
  }

  getFamilia(){
    this._route.params.forEach((params:Params)=>{
      this.id = params['id'];
      this._familiaService.getFamilia(this.id).subscribe(
        result=>{
          this.familia = result.familia;
          

          if(result.familia.documentos){
            this.documentos = result.familia.documentos;
          }
        },
        err=>{
          this._router.navigate(['/error/servidor']);
          console.log("error en el servidor");
        }
      );
    });
  }

  closepopup(){
    this._router.navigate([{outlets:{popup:null}}]);
  }

  updateDocumentos(){
    this._familiaService.addDocumentos(this.id, this.documentos).subscribe(
      result=>{
        this._router.navigate([{outlets:{popup:null}}]);
      },
      err=>{
        this._router.navigate(['/error/servidor']);
        console.log("error con el servidor");
      }
    );
  }

}
