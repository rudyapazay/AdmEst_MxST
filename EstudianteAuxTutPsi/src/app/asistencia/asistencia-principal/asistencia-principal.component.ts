import { Component, OnInit } from '@angular/core';
import { AsistenciaService } from 'src/app/services/asistencia.service';

@Component({
  selector: 'app-asistencia-principal',
  templateUrl: './asistencia-principal.component.html',
  styleUrls: ['./asistencia-principal.component.css']
})
export class AsistenciaPrincipalComponent implements OnInit {

  public astGeneral = {
    "presente":Number,
    "tarde":Number,
    "falta":Number,
    "evasion":Number
  };
  public fecha={
    "dia": new Date().getDate(),
    "mes": new Date().getMonth()+ 1,
    "year":new Date().getFullYear()
  }

  constructor(
    private _asistenciaService:AsistenciaService
  ) { }

  ngOnInit() {
    this._asistenciaService.entradaDiaGeneral().subscribe(
      result=>{
          result.forEach(element => {
            switch (element._id) {
              case "F":
                this.astGeneral.falta = element.total;          
                break;
              case "P":
                this.astGeneral.presente = element.total;
                break;
              case "T":
                this.astGeneral.tarde = element.total;
                break;
              case "E":
                this.astGeneral.evasion = element.total;
              default:
                break;
            }
          });
        //console.log(this.astGeneral);
      },
      err =>{
        console.log(err);
      }
    )  
  
   
  }

  toFloat(e){
    return parseFloat(e.toFixed(2));
  }

}
