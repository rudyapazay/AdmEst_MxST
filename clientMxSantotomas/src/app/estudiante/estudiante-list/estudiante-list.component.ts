import { Component, OnInit } from '@angular/core';

import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-estudiante-list',
  templateUrl: './estudiante-list.component.html',
  styleUrls: ['./estudiante-list.component.css'],
  providers:[EstudianteService]
})
export class EstudianteListComponent implements OnInit {

  public estudiantes:any;
  constructor(
    private _estudianteService:EstudianteService
  ) { }

  ngOnInit() {
  
    this._estudianteService.getEstudiantes().subscribe(
      result=>{
        console.log(result);
      },
      err=>{
        console.log(err);
      }
    );
  }


}
