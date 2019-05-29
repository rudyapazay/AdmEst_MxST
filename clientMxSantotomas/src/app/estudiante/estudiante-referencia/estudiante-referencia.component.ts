import { Component, OnInit } from '@angular/core';
import { EstReferenciaMdl } from 'src/app/models/estudiante-mdl/est-referencia-mdl';

@Component({
  selector: 'estudiante-referencia',
  templateUrl: './estudiante-referencia.component.html',
  styleUrls: ['./estudiante-referencia.component.css']
})
export class EstudianteReferenciaComponent implements OnInit {

  public estref = EstReferenciaMdl;

  constructor() { }

  ngOnInit(){
  }


}
