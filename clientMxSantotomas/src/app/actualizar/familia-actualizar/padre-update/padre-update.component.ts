import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FamiliaService } from 'src/app/services/familia.service';
import { FamiliaMdl } from 'src/app/models/famlia-mdl';
import { PadreMdl } from 'src/app/models/familia-mdl/padre-mdl';

@Component({
  selector: 'app-padre-update',
  templateUrl: './padre-update.component.html',
  styleUrls: ['./padre-update.component.css']
})
export class PadreUpdateComponent implements OnInit {
  public id:string;
  public familia=FamiliaMdl;
  public padre:PadreMdl;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _familiaService:FamiliaService
  ) { 
    this.padre = new PadreMdl('','','','','','');
  }

  ngOnInit() {
    this.getFamilia();
  }

  getFamilia(){
    this._route.params.forEach((params:Params)=>{
      this.id = params['id'];
      this._familiaService.getFamilia(this.id).subscribe(
        result=>{
          this.familia =result.familia;
          if(result.familia.padre){
            this.padre =result.familia.padre;
          }
          console.log(this.padre);
        },
        err =>{
          console.log('error con el servidor');
        }
      );
      
    });
  }

  closepopup(){
    this._router.navigate([{outlets:{popup:null}}]);
  }

  updatePadre(){
    this._familiaService.addPadre(this.id, this.padre).subscribe(
      result=>{
        this._router.navigate([{outlets:{popup:null}}]);
      },
      err=>{
        console.log('Error con el servidor');
      }
    );
  }

}
