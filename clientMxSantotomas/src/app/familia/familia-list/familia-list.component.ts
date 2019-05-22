import { Component, OnInit } from '@angular/core';
import { FamiliaMdl } from 'src/app/models/famlia-mdl';
import { FamiliaService } from 'src/app/services/familia.service';
import { familiasDemo } from 'src/app/models/familia_demo';

@Component({
  selector: 'app-familia-list',
  templateUrl: './familia-list.component.html',
  styleUrls: ['./familia-list.component.css'],
  providers:[FamiliaService]
})
export class FamiliaListComponent implements OnInit {

  public titulo:String;
  public familia_buscar:string;
  public familias:FamiliaMdl;

  constructor(
    private _familiaService:FamiliaService
  ) {
    this.titulo = "Registro de familias";
    this.familia_buscar = "";
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

  buscarFamilia(){
    if(this.familia_buscar.length < 2 ){
      console.log("falta informacion");
    }
    else{
      console.log("realizar consulta al servidor");
    }
    
  }
}
