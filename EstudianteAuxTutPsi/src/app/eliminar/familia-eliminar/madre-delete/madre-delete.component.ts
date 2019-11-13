import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FamiliaService } from 'src/app/services/familia.service';

@Component({
  selector: 'app-madre-delete',
  templateUrl: './madre-delete.component.html',
  styleUrls: ['./madre-delete.component.css']
})
export class MadreDeleteComponent implements OnInit {
  public id:string;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _familiaService:FamiliaService
  ) { }

  ngOnInit() {
    this._route.params.forEach((params:Params)=>{
      this.id = params['id'];
    });
  }

  closepopup(){
    this._router.navigate([{outlets:{popup:null}}]);
  }

  deleteMadre(){
    this._familiaService.deleteMadre(this.id).subscribe(
      result=>{
        this._router.navigate([{outlets:{popup:null}}]);
      },
      err=>{
        console.log("Error en la peticion");
      });
  }

}
