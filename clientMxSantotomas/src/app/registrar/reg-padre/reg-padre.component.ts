import { Component, OnInit, ViewChild } from '@angular/core';
import { ResumenComponent } from '../resumen/resumen.component';

@Component({
  selector: 'app-reg-padre',
  templateUrl: './reg-padre.component.html',
  styleUrls: ['./reg-padre.component.css']
})
export class RegPadreComponent implements OnInit {

  @ViewChild(ResumenComponent) resumen:ResumenComponent;


  public titulo:string;
  constructor() { 
    this.titulo="probando";
  }
  
  ngOnInit() {
    this.resumen.titulo = "cambiaza";
  }

}
