import { Component, OnInit } from '@angular/core';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { AdministracionService } from 'src/app/services/administracion.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {

  constructor(
    private _AdministracionService: AdministracionService
  ) { }

  ngOnInit() {
  }

  mantenimiento_base_datos(){
    this._AdministracionService.serverMantenimientoBBDD().subscribe(
      result=>{
        console.log('Base de datos actulizadad');
      },
      err=>{
        console.log('Error en la actualizacion de BBDD');
      }
    );
  }
}
