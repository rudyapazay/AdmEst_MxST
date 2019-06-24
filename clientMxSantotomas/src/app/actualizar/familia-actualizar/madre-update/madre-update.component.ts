import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FamiliaService } from 'src/app/services/familia.service';
import { FamiliaMdl } from 'src/app/models/famlia-mdl';
import { MadreMdl } from 'src/app/models/familia-mdl/madre-mdl';

@Component({
  selector: 'app-madre-update',
  templateUrl: './madre-update.component.html',
  styleUrls: ['./madre-update.component.css']
})
export class MadreUpdateComponent implements OnInit {
  public id:string;
  public familia:FamiliaMdl;
  public madre:MadreMdl;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _familiaService:FamiliaService
  ) { 
    this.madre = new MadreMdl('','','','','','');
  }

  ngOnInit() {
    this.getFamilia();
  }

  getFamilia(){
    this._route.params.forEach((params:Params)=>{
      this.id = params['id'];
      this._familiaService.getFamilia(this.id).subscribe(
        result=>{
          this.familia = result.familia;
          if(result.familia.madre){
            this.madre= result.familia.madre;
          }
        },
        err=>{
          console.log('error en la peticion');
        }
      );
    });
  }

  closepopup(){
    this._router.navigate([{outlets:{popup:null}}]);
  }

  updateMadre(){
    this._familiaService.addMadre(this.id, this.madre).subscribe(
      result=>{
        this._router.navigate([{outlets:{popup:null}}]);
      },
      err=>{
        console.log("error en la peticion");
      }
    );
  }


}
