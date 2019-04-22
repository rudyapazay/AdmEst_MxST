import { Component, OnInit } from '@angular/core';
import { FamiliaMdl } from 'src/app/models/famlia-mdl';
import { FamiliaService } from 'src/app/services/familia.service';

@Component({
  selector: 'app-familia-list',
  templateUrl: './familia-list.component.html',
  styleUrls: ['./familia-list.component.css'],
  providers:[FamiliaService]
})
export class FamiliaListComponent implements OnInit {

  public titulo:String;
  public title:String;
  //clase inicial de la familia
  public familias:FamiliaMdl;
  
  constructor(
    private _familiaService:FamiliaService
  ) {
    this.titulo = "Registro de familias";
  }

  ngOnInit() {
    this.verFamilias();
  }

/** */
  verFamilias(){
    this._familiaService.getFamilias().subscribe(
      result=>{
        // cuando trae de la base de datos trae con su indice
        this.familias = result.familias;
        
      },
      error=>{
        console.log("error en la peticion");
      }
    );
  }
  /**/
}
