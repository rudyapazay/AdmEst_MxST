import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FamiliaService } from 'src/app/services/familia.service';
import { FamiliaMdl } from 'src/app/models/famlia-mdl';

@Component({
  selector: 'app-familia-update',
  templateUrl: './familia-update.component.html',
  styleUrls: ['./familia-update.component.css']
})
export class FamiliaUpdateComponent implements OnInit {
  public familia:FamiliaMdl;
  public id :string = "";

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _familiaService:FamiliaService
  ) { }

  ngOnInit() {
    this.getFamilia();
    this.familia = new FamiliaMdl();
  }

  getFamilia(){
    this._route.params.forEach((params:Params)=>{
      this.id= params['id'];
      this._familiaService.getFamilia(this.id).subscribe(
        result=>{
          this.familia = result.familia;
        },
        err=>{
          this._router.navigate(['/error/servidor']);
          console.log("error con el servidor");
        }
      );
    });
  }

  closepopup(){
    this._router.navigate([{outlets:{popup:null}}]);
  }

  updateFamilia(){
    this._familiaService.updateFamilia(this.id,this.familia).subscribe(
      result=>{
        //console.log(result);
        this._router.navigate([{outlets:{popup:null}}]);
      },
      err=>{
        this._router.navigate(['/error/servidor']);
        console.log("error en el servidor");
      }
    );
  }

}
