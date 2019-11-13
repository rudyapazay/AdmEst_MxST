import { Component, OnInit } from '@angular/core';

import { EstudianteService } from 'src/app/services/estudiante.service';
import { BuscarService } from 'src/app/services/buscar.service';
import { EstudianteMdl } from 'src/app/models/estudiante-mdl';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estudiante-list',
  templateUrl: './estudiante-list.component.html',
  styleUrls: ['./estudiante-list.component.css'],
  providers:[EstudianteService, BuscarService]
})
export class EstudianteListComponent implements OnInit {

  //Estudiantes = EstudianteRegMdl;
  public estudiantes :EstudianteMdl;
  public grado:string;
  public est_buscar:string;

  constructor(
    private _estudianteService:EstudianteService,
    private _buscarService:BuscarService,
    private _router:Router
  ) { 
    this.est_buscar="";
    this._router.events.subscribe((e:any)=>{
      //console.log(e.url);
      if(e.url == '/estudiantes'){
        this.getEstudiantes();
      }
    });
  }

  ngOnInit() {
    this.getEstudiantes();
  }

  getEstudiantes(){
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

  buscarEstudiante(key){
    //console.log(key.key);
    if(this.est_buscar.length > 2 ){
      this._buscarService.buscarEstudiante(this.est_buscar).subscribe(
        result =>{
          this.estudiantes = result.estudiantes;
        }
      );
    }
    if(key.key == 'Backspace' && this.est_buscar.length <=2 && this.est_buscar.length == 0 ){
      this._estudianteService.getEstudiantes().subscribe(
        result=>{
          this.estudiantes= result.estudiantes;
        },
        error=>{
          console.log("error en la peticion");
        }
      );
    }
    
  }

}
