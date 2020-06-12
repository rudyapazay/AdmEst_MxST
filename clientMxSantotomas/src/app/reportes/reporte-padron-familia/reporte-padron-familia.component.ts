import { Component, OnInit } from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reporte-padron-familia',
  templateUrl: './reporte-padron-familia.component.html',
  styleUrls: ['./reporte-padron-familia.component.css']
})
export class ReportePadronFamiliaComponent implements OnInit {

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    
  ) { }

  ngOnInit() {
  }

  closepopup(){
    this._router.navigate([{outlets:{popup:null}}]);
  }
}
