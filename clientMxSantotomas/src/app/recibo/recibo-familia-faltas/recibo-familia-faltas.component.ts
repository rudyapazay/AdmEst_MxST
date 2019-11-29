import { Component, OnInit } from '@angular/core';
import { ReciboService } from 'src/app/services/recibo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recibo-familia-faltas',
  templateUrl: './recibo-familia-faltas.component.html',
  styleUrls: ['./recibo-familia-faltas.component.css']
})
export class ReciboFamiliaFaltasComponent implements OnInit {
  public familias = [];
  constructor(
    private _router:Router,
    private _reciboService:ReciboService
  ) { }

  ngOnInit() {
    this._reciboService.getFamiliaFaltas().subscribe(
      result =>{
        console.log(result);
        this.familias = result;
      },
      err=>{
        this._router.navigate(['/error/servidor']);
        this._router.navigate(['/error/servidor']);
        

      }
    );
  }

}
