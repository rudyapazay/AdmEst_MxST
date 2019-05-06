import { Component, OnInit } from '@angular/core';

import { EstudianteService } from 'src/app/services/estudiante.service';
import { EstudianteRegMdl } from 'src/app/models/estudiante-reg-mdl';

@Component({
  selector: 'app-estudiante-list',
  templateUrl: './estudiante-list.component.html',
  styleUrls: ['./estudiante-list.component.css'],
  providers:[EstudianteService]
})
export class EstudianteListComponent implements OnInit {

  Estudiantes = EstudianteRegMdl;
  public estudiantes:any;
  constructor(
    private _estudianteService:EstudianteService
  ) { }

  ngOnInit() {
  
    this._estudianteService.getEstudiantes().subscribe(
      result=>{
        //console.log(resul
        this.estudiantes = result.estudiantes;
        console.log(this.estudiantes[6].referencia['tercero'].seccion);
      },
      err=>{
        console.log(err);
      }
    );
  }


}
