import { Component, OnInit } from '@angular/core';
import { ReciboService } from 'src/app/services/recibo.service';

@Component({
  selector: 'app-recibo-familia-estudiante',
  templateUrl: './recibo-familia-estudiante.component.html',
  styleUrls: ['./recibo-familia-estudiante.component.css']
})
export class ReciboFamiliaEstudianteComponent implements OnInit {
  public familias:[];
  constructor(
    private _reciboService:ReciboService
  ) {}

  ngOnInit() {
    this.getFamiliaRecibo();
  }

  getFamiliaRecibo(){
    this._reciboService.getFamiliaEstudianteRecibo().subscribe(
      result=>{
        this.familias = result.familias;
        console.log(result);

      },
      err=>{}
    )
  }
}
