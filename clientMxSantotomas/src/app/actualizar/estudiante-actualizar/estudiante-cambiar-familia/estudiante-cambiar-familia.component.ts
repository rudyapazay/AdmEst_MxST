import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { FamiliaService } from 'src/app/services/familia.service';
import { BuscarService } from 'src/app/services/buscar.service';
import { FamiliaMdl } from 'src/app/models/famlia-mdl';

@Component({
  selector: 'app-estudiante-cambiar-familia',
  templateUrl: './estudiante-cambiar-familia.component.html',
  styleUrls: ['./estudiante-cambiar-familia.component.css']
})
export class EstudianteCambiarFamiliaComponent implements OnInit {

  public familia_buscar:String;
  public familias:any;
  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _estudianteService:EstudianteService,
    private _familiaService:FamiliaService,
    private _buscarService:BuscarService 
  ) { }

  ngOnInit() {
    this._familiaService.getFamilias().subscribe(
      result=>{
        this.familias =  result.familias;
      },
      err=>{
        console.log("error con el servidor");
      }
    );
  }

  closepopup(){
    this._router.navigate([{outlets:{popup:null}}]);
  }

  cambiarFamilia(familia_id:any){
    this.closepopup();
    this._route.params.forEach((params:Params)=>{
      var id =  params['id'];
      this._estudianteService.estudianteCambiarFamilia(id,familia_id).subscribe(
        result=>{
          console.log({result});
        },
        err=>{
          console.log("error en el servidor");
        }
      )
    })
  }
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
