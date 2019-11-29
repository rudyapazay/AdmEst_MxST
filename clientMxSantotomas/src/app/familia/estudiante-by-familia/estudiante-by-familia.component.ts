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
  public familia_id:string;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _estudianteServ:EstudianteService
  ) { 
    this._router.events.subscribe((e:any)=>{
      //console.log(e.id);
   
        this.getEstudiantes();

    });
  }

  ngOnInit() {
    this.getEstudiantes();
  }
  
  getEstudiantes(){
    this._route.params.forEach((params:Params)=>{
      let id=params.id;
      this.familia_id = id;
      this._estudianteServ.getEstudiantesByFamilia(id).subscribe(
        result=>{
          this.estudiantes =result.estudiantes;
          //console.log(this.estudiantes);
        },  
        err=>{
          this._router.navigate(['/error/servidor']);
          console.log("error en la peticion");
        }
      )
    });
  }
}
