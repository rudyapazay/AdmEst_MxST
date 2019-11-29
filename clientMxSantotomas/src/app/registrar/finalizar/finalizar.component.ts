import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,Params } from '@angular/router';
import { FamiliaService } from 'src/app/services/familia.service';
import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-finalizar',
  templateUrl: './finalizar.component.html',
  styleUrls: ['./finalizar.component.css']
})
export class FinalizarComponent implements OnInit {
  public familia:any;
  public estudiantes:any;

  constructor(
    private _route :ActivatedRoute,
    private _router:Router,
    private _familia_service:FamiliaService,
    private _estudiante_service:EstudianteService
  ) { 

  }

  ngOnInit() {
    this.getFamilia();
    this.getEstudiantes();
  }

  getFamilia(){
    this._route.params.forEach((params:Params)=>{
      let id = params['id'];
        this._familia_service.getFamilia(id).subscribe(
          result=>{
            this.familia = result.familia;
            console.log(this.familia)
          },
          err=>{
            console.log(err);
          }
        );
    });
  }

  getEstudiantes(){
    this._route.params.forEach((params:Params)=>{
      let id=params['id'];
      this._estudiante_service.getEstudiantesByFamilia(id).subscribe(
        result=>{
          this.estudiantes=result.estudiantes;
          //console.log(result);
          //console.log(this.estudiantes);
        },
        err=>{
          this._router.navigate(['/error/servidor']);
          console.log(err)}
      )
    });
  }
}
