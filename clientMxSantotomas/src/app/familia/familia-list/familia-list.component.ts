import { Component, OnInit } from '@angular/core';
import { FamiliaMdl } from 'src/app/models/famlia-mdl';
import { FamiliaService } from 'src/app/services/familia.service';
import { BuscarService } from 'src/app/services/buscar.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-familia-list',
  templateUrl: './familia-list.component.html',
  styleUrls: ['./familia-list.component.css'],
  providers:[FamiliaService,BuscarService]
})
export class FamiliaListComponent implements OnInit {

  public titulo:String;
  public familia_buscar:string;
  public familias:FamiliaMdl;

  constructor(
    private _router:Router,
    private _familiaService:FamiliaService,
    private _buscarService: BuscarService
  ) {
    this.titulo = "Registro de familias";
    this.familia_buscar = "";
    this._router.events.subscribe((e:any)=>{
      this.verFamilias();
    });
  }

  ngOnInit() {
    this.verFamilias();
  }

  // mostrado todas las familias del colegio
  verFamilias(){
    this._familiaService.getFamilias().subscribe(
      result=>{
        // cuando trae de la base de datos trae con su indice
        this.familias = result.familias;

        //console.log(result.familias);
        
      },
      error=>{
        this._router.navigate(['/error/servidor']);
        console.log("error en la peticion");
      }
    );
  }

  //busqueda sensitiva
  buscarFamilia(key){
    //console.log(key.key);
    if(this.familia_buscar.length > 2 ){
      this._buscarService.buscarfamilia(this.familia_buscar).subscribe(
        result =>{
          this.familias = result.familias;
        }
      );
    }
    if(key.key == 'Backspace' && this.familia_buscar.length <=2 && this.familia_buscar.length == 0){
      this._familiaService.getFamilias().subscribe(
        result=>{
          this.familias = result.familias;
        },
        error=>{
          this._router.navigate(['/error/servidor']);
          console.log("error en la peticion");
        }
      );
    }
    
  }
}
