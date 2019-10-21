import { Component, OnInit } from '@angular/core';
import { AsistenciaService } from 'src/app/services/asistencia.service';


@Component({
  selector: 'app-asistencia-reporte-entrada',
  templateUrl: './asistencia-reporte-entrada.component.html',
  styleUrls: ['./asistencia-reporte-entrada.component.css']
})
export class AsistenciaReporteEntradaComponent implements OnInit {

  public reporte:{};
  constructor(
    private AsistenciaService:AsistenciaService
  ) { }

  ngOnInit() {
    this.reporteDia();
  }

  reporteDia(){
    this.AsistenciaService.entradaSeccionGeneral().subscribe(
      result =>{
        this.reporte = result;
        console.log(this.reporte);
        
      },
      err=>{

      }
    )
  }

}
