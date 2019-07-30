import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FamiliaService } from 'src/app/services/familia.service';

@Component({
  selector: 'app-familia-delete',
  templateUrl: './familia-delete.component.html',
  styleUrls: ['./familia-delete.component.css']
})
export class FamiliaDeleteComponent implements OnInit {
  public id:string;
  public carpeta:string;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _familiaService:FamiliaService
  ) { }

  ngOnInit() {
    this._route.params.forEach((params:Params)=>{
      this.id = params['id'];
      this.carpeta = params['carpeta'];
    });
  }

  closepopup(){
    this._router.navigate([{outlets:{popup:null}}]);
  }

  eliminarFamilia(){
   
      //console.log(this.id + this.carpeta);    
      this._familiaService.delFamilia(this.id).subscribe(
        result=>{
          this._router.navigate([{outlets:{ popup:null}}]);
        }
      );
    
  }
}
