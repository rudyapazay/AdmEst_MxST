import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FamiliaService } from 'src/app/services/familia.service';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { FamiliaMdl } from 'src/app/models/famlia-mdl';

@Component({
  selector: 'app-familia-detail',
  templateUrl: './familia-detail.component.html',
  styleUrls: ['./familia-detail.component.css']
})
export class FamiliaDetailComponent implements OnInit {
  public familia:any;
  constructor(
    private _route :ActivatedRoute,
    private _router:Router,
    private _familiaService:FamiliaService,
    private _estudianteService:EstudianteService
  ){ 
    this._router.events.subscribe((e:any)=>{
        this.getFamilia();
   }); 
  }

  ngOnInit() {
    this.getFamilia();
  }


  //Sacando informacion de la familia
  getFamilia(){
    this._route.params.forEach((params:Params)=>{
      let id = params['id'];
      this._familiaService.getFamilia(id).subscribe(
        result=>{
          this.familia =result.familia;
        },
        err=>{  
          console.log('error en la peticion');
          //this._router.navigate(['/familias/']);
        }
      );
    });
  }

}
