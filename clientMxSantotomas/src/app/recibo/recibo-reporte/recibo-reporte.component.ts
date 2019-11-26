import { Component, OnInit } from '@angular/core';
import { ReciboService } from 'src/app/services/recibo.service';

@Component({
  selector: 'app-recibo-reporte',
  templateUrl: './recibo-reporte.component.html',
  styleUrls: ['./recibo-reporte.component.css']
})
export class ReciboReporteComponent implements OnInit {
  public recibos:any;

  constructor(
    private reciboService:ReciboService
  ){ }

  ngOnInit() {
    this.getRecibos();
  }

  getRecibos(){
    this.reciboService.getRecibosReporte().subscribe(
      result=>{
        console.log(result);
        this.recibos = result;
      },
      err=>{
        console.log("Error Con el servidor");
      }
    )
  }

}
