import { Component, OnInit, ViewChild } from '@angular/core';
import { ResumenComponent } from '../resumen/resumen.component';

@Component({
  selector: 'app-reg-madre',
  templateUrl: './reg-madre.component.html',
  styleUrls: ['./reg-madre.component.css']
})
export class RegMadreComponent implements OnInit {

  @ViewChild(ResumenComponent) resumen:ResumenComponent;
  constructor() { }

  ngOnInit() {
    this.resumen.titulo="madre"
  }

}
