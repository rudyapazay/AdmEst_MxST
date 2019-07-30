import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { EstudianteService } from 'src/app/services/estudiante.service';
import { EstudianteMdl } from 'src/app/models/estudiante-mdl';
import { EstudianteReferenciaComponent } from '../estudiante-referencia/estudiante-referencia.component';

@Component({
  selector: 'app-estudiante-detail',
  templateUrl: './estudiante-detail.component.html',
  styleUrls: ['./estudiante-detail.component.css']
})
export class EstudianteDetailComponent implements OnInit {

  //componente  hijo
  @ViewChild(EstudianteReferenciaComponent) referencia:EstudianteReferenciaComponent;

  public estudiante = EstudianteMdl;
  public carne :any;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _estudianteService:EstudianteService
  ) { 
    this._router.events.subscribe((e:any)=>{
      //console.log(e.id);
   
        this.getEstudiante();

    });
  }

  ngOnInit() {
    this.getEstudiante();
  }

 
  getEstudiante(){
    this._route.params.forEach((params:Params)=>{
      let estudiante_id = params['id'];

      this._estudianteService.getEstudiante(estudiante_id).subscribe(
        result=>{
          this.estudiante = result.estudiante;
          //enviando referencia al componente
          this.referencia.estref = result.estudiante.referencia;
         
          //console.log(result.estudiante);
        },
        err=>{
          console.log("error en la base de datos");
        }
      );
    });
  }

  
}
