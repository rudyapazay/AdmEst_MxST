import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FamiliaService } from 'src/app/services/familia.service';

@Component({
  selector: 'app-padre-delete',
  templateUrl: './padre-delete.component.html',
  styleUrls: ['./padre-delete.component.css']
})
export class PadreDeleteComponent implements OnInit {
  public id:string;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _familiaService:FamiliaService
  ) { }

  ngOnInit() {
    this._route.params.forEach((params:Params)=>{
      this.id = params['id'];
    })
  }

  closepopup(){
    this._router.navigate([{outlets:{popup:null}}]);
  }

  deletePadre(){
    console.log("eliminando padre");
    this._familiaService.deletePadre(this.id).subscribe(
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
