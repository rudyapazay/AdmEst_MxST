import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,Params } from '@angular/router';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { EstudianteMdl } from 'src/app/models/estudiante-mdl';

@Component({
  selector: 'app-estudiante-by-familia',
  templateUrl: './estudiante-by-familia.component.html',
  styleUrls: ['./estudiante-by-familia.component.css']
})
export class EstudianteByFamiliaComponent implements OnInit {

  public estudiantes:EstudianteMdl;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _estudianteServ:EstudianteService
  ) { }

  ngOnInit() {
    this.getEstudiantes();
  }
  
  getEstudiantes(){
    this._route.params.forEach((params:Params)=>{
      let id=params.id;
      this._estudianteServ.getEstudiantesByFamilia(id).subscribe(
        result=>{
          this.estudiantes =result.estudiantes;
          //console.log(this.estudiantes);
        },  
        err=>{
          console.log("error en la peticion");
        }
      )
    });
  }
}
