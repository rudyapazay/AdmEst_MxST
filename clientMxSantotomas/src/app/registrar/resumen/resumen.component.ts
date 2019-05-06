import { Component, OnInit } from '@angular/core';
import { RegMadreComponent } from '../reg-madre/reg-madre.component';
import { ActivatedRoute, Params } from '@angular/router';
import { FamiliaMdl } from 'src/app/models/famlia-mdl';


@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  public titulo:String;
  public familia_id:String;
  public familia:FamiliaMdl;

  constructor(
    private _route:ActivatedRoute

  ) { 
    //inicializacion del modelo
    this.familia = new FamiliaMdl("","","",
      {dni:"", nombre:"", apellidos:"", celular:"",direccion:"",nota:""},
      {dni:"", nombre:"", apellidos:"", celular:"",direccion:"",nota:""},
      {dni:"", nombre:"", apellidos:"", celular:"",direccion:"",relacion:"",nota:""},
      "","","");
  }

  ngOnInit() {
    this._route.params.forEach((params:Params)=>{
      this.familia_id = params['id'];

      //Programar para sacar la informacion de la familia
    });
  }

  

}
