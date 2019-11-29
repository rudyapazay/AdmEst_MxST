import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ReciboService } from 'src/app/services/recibo.service';

@Component({
  selector: 'app-registrar-recibo',
  templateUrl: './registrar-recibo.component.html',
  styleUrls: ['./registrar-recibo.component.css']
})
export class RegistrarReciboComponent implements OnInit {
  public recibo={
    year: "",
    mes: "",
    dia: "",
    boleta: "", 
    monto:0.0
  }

  public familia = {
    id:"",
    carpeta:""
  }

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _reciboService:ReciboService
  ) { 
    this.recibo.year = new Date().getFullYear().toString();
    
  }

  ngOnInit() {
    this._route.params.forEach((params:Params)=>{
      this.familia.id = params['id'];
      this.familia.carpeta = params['carpeta'];
    });
  }

  closepopup(){
    this._router.navigate([{outlets:{popup:null}}]);
  }

  regRecibo(){
    console.log(this.recibo);
    this._reciboService.addRecibo(this.familia.id,this.recibo).subscribe(
      result=>{
        this._router.navigate([{outlets:{popup:null}}]);
      },
      err=>{
        this._router.navigate(['/error/servidor']);
        console.log("Error en el servidor");
      });
  }
}
