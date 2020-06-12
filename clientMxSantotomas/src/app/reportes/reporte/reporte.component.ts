import { Component, OnInit } from '@angular/core';
import { ReporteService } from 'src/app/services/reporte.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  constructor(
    private _reporteService:ReporteService
  ) { }

  ngOnInit() {
  }

  generarPadronFamilia(){
    this._reporteService.createPadronFramilias().subscribe(
      result=>{
        console.log(result);
      },
      err=>{
        console.log('Error en la peticion');
      }
    )
  }

  
}
