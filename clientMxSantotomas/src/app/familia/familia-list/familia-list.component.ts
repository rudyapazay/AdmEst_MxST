import { Component, OnInit } from '@angular/core';
import { FamliaMdl } from 'src/app/models/famlia-mdl';
import { FamiliaService } from 'src/app/services/familia.service';

@Component({
  selector: 'app-familia-list',
  templateUrl: './familia-list.component.html',
  styleUrls: ['./familia-list.component.css'],
  providers:[FamiliaService]
})
export class FamiliaListComponent implements OnInit {

  public titulo:String;
  public title:"prueba";
  //clase inicial de la familia
  public familias:FamliaMdl;
  
  constructor(
    private _familiaService:FamiliaService
  ) {
    this.titulo = "Pruebas de Componente";
  }

  ngOnInit() {
    this.verFamilias();
  }

/** */
  verFamilias(){
    this._familiaService.getFamilias();
  }
  /**/
}
