import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FamiliaService } from 'src/app/services/familia.service';

@Component({
  selector: 'app-apoderado-delete',
  templateUrl: './apoderado-delete.component.html',
  styleUrls: ['./apoderado-delete.component.css']
})
export class ApoderadoDeleteComponent implements OnInit {
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

  deleteApoderado(){
    this._familiaService.deleteApoderado(this.id).subscribe(
      result=>{
        this._router.navigate([{outlets:{popup:null}}]);
      },
      err=>{
        console.log("error en la peticion del servidor");
      }
    );
  }


}
