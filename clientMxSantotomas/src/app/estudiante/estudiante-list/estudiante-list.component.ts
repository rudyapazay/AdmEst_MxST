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

  //Estudiantes = EstudianteRegMdl;
  public estudiantes:any;
  public grado:string;

  constructor(
    private _estudianteService:EstudianteService
  ) { }

  ngOnInit() {
  
    this._estudianteService.getEstudiantes().subscribe(
      result=>{
        //console.log(resul
        this.estudiantes = result.estudiantes;
      },
      err=>{
        console.log(err);
      }
    );
  }


}
