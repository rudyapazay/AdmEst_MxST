import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FamiliaService } from 'src/app/services/familia.service';
import { FamiliaMdl } from 'src/app/models/famlia-mdl';
import { ApoderadoMdl } from 'src/app/models/familia-mdl/apoderado-mdl';

@Component({
  selector: 'app-apoderado-update',
  templateUrl: './apoderado-update.component.html',
  styleUrls: ['./apoderado-update.component.css']
})
export class ApoderadoUpdateComponent implements OnInit {
  public id:string;
  public familia= FamiliaMdl;
  public apoderado:ApoderadoMdl;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _familiaService:FamiliaService
  ){
    this.apoderado = new ApoderadoMdl('','','','','','','');
  }

  ngOnInit() {
    this.getFamilia();
  }

  getFamilia(){
    this._route.params.forEach((params:Params)=>{
      this.id=params['id'];
      this._familiaService.getFamilia(this.id).subscribe(
        result=>{
          this.familia = result.familia;
          //console.log(result.familia);
          if(result.familia.apoderado){
            this.apoderado =result.familia.apoderado;
          }
        },
        err=>{
          console.log("erro en el servidor");
        }
      )
    });
  }

  closepopup(){
    this._router.navigate([{outlets:{popup:null}}]);
  }

  updateApoderado(){
    this._familiaService.addApoderado(this.id, this.apoderado).subscribe(
      result=>{
        this._router.navigate([{outlets:{popup:null}}]);
      },
      err=>{
        console.log("error en el servidor");
      }
    );
  }
}
