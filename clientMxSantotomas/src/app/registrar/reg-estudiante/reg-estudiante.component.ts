import { Component, OnInit, ViewChild } from '@angular/core';
import { ResumenComponent } from '../resumen/resumen.component';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FamiliaService } from 'src/app/services/familia.service';
import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-reg-estudiante',
  templateUrl: './reg-estudiante.component.html',
  styleUrls: ['./reg-estudiante.component.css']
})
export class RegEstudianteComponent implements OnInit {

  public familia_id:string;
  public ruta_registro:string;
  public titulo:string;

  public estudiante:{
    dni:string,
    apellidos:string,
    nombre:string,
    grado:string,
    sexo:string,
    seccion:string,
    matricula:string,
    familia:string

  }
  constructor(
    private _route :ActivatedRoute,
    private _router:Router,
    private _familia_service:FamiliaService,
    private _estudiante_service:EstudianteService
  ) {
    this.estudiante = {dni:"",apellidos:"",nombre:"",sexo:"",grado:"",seccion:"",familia:"",matricula:""};
    this.titulo = "Registrando estudiantes";
  }

  
  ngOnInit() {
    this.getFamilia();
  }

  @ViewChild(ResumenComponent) resumen:ResumenComponent;
  
  getFamilia(){
    this._route.params.forEach((params:Params)=>{
      let id = params['id'];
      this._familia_service.getFamilia(id).subscribe(
        result =>{
          console.log(result.familia);
          // Enviando informacion al componente hijo
          this.familia_id= result.familia._id;
          this.resumen.familia = result.familia;
          this.estudiante.familia = result.familia._id;
          this.estudiante.apellidos = result.familia.carpeta;
          this.estudiante.sexo = "masculino"
          this.estudiante.grado = "primero";
          this.estudiante.seccion = "A";
          this.estudiante.matricula="ratificado";
          this.ruta_registro = "finalizar";

          //console.log(result.familia._id);
          
        },
        err=>{
          this._router.navigate(['/error/servidor']);
          console.log(err);
        }
      );
    });
  }

  regEstudiante(){
    //console.log(this.estudiante);
    this._estudiante_service.addEstudiante(this.estudiante).subscribe(
      result=>{
        //console.log(result);
        this._router.navigate(['/registrar/'+this.ruta_registro+'/'+this.familia_id]);
        this.estudiante.nombre="";
        this.estudiante.dni ="";
        this.estudiante.sexo = "masculino"
        this.estudiante.grado = "primero";
        this.estudiante.seccion = "A";
        this.estudiante.matricula="ratificado";
        this.ruta_registro = "finalizar";

      },
      err=>{
        console.log(err);
      }

    );
  }

}
