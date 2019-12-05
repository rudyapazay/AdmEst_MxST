import { Component, OnInit } from '@angular/core';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { AsistenciaService } from 'src/app/services/asistencia.service';

@Component({
  selector: 'app-asistencia-reporte-seccion',
  templateUrl: './asistencia-reporte-seccion.component.html',
  styleUrls: ['./asistencia-reporte-seccion.component.css']
})
export class AsistenciaReporteSeccionComponent implements OnInit {
  public grado;
  public seccion;
  public mes;
  public grados:Array<Object>=[ {'name':'primero'},{'name':'segundo'},{'name':'tercero'},{'name':'cuarto'}, {'name':'quinto'}];
  public secciones:Array<Object>=[{'name':'A'},{'name':'B'},{'name':'C'},{'name':'D'},{'name':'E'},{'name':'F'},{'name':'G'},{'name':'H'}];
  public meses:Array<Object> =[
      {'name':'diciembre','value':'12'},
      {'name':'noviembre','value':'11'},
      {'name':'octubre','value':'10'},
      {'name':'setiembre','value':'9'},
      {'name':'agosto','value':'8'},
      {'name':'julio','value':'7'},
      {'name':'junio','value':'6'},
      {'name':'mayo','value':'5'},
      {'name':'abril','value':'4'},
      {'name':'marzo','value':'3'}
  ];

  public estudiantes:any;
  public fechas:any;
  constructor(
    private _estudianteService:EstudianteService,
    private _asistenciaSevice:AsistenciaService
  ) { }

  ngOnInit() {
  }

  buscar(){
    console.log(this.grado + this.seccion + this.mes);
    if(this.grado && this.seccion && this.mes){
      this.getFechas();
      this.getEstudiantes();
    }

  }

  //recuperar fechas de acuerdo al mes
  getFechas(){
    this._asistenciaSevice.asistenciaDiasLaborados(this.mes).subscribe(
      result=>{
        console.log(result);
        this.fechas = result;
      },
      err=>{
        console.log(err)
      }
    );
  }

  //recuperar estudiantes de una clase
  getEstudiantes(){
    this._estudianteService.getEstudianteGradoSeccion(this.grado, this.seccion).subscribe(
      result=>{
        console.log(result);
        this.estudiantes = result.estudiantes;
      },
      err=>{
        console.log(err);
      }
    );
  }

  putElemento(estudiante, dia){
    this._asistenciaSevice.asistenciasEstudianteDia(estudiante,dia).subscribe(
      result=>{
        console.log(result);
        return("a");
      },
      err=>{
        console.log(err);
        return ("e");
      }
    )
  }

}
