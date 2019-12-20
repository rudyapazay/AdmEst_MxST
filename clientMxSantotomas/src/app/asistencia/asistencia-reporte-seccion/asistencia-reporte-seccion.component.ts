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
  public dias=[
    {'name':'domingo', 'sigla':'Dom'},
    {'name':'lunes', 'sigla':'Lun'},
    {'name':'martes', 'sigla':'Mar'},
    {'name':'miercoles', 'sigla':'Mie'},
    {'name':'jueves', 'sigla':'Jue'},
    {'name':'viernes', 'sigla':'Vie'},
    {'name':'sabado', 'sigla':'Sab'}
  ]
  
  public asistencias: any;
  public estudiantes:any;
  public resumen = [];
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
  //recuperar asistencia
  getAsistencia(){
    
    if(this.mes && this.grado && this.seccion){
      this.getFechas();  //recuperacion de fechas laboradas

      this._asistenciaSevice.asistenciaMensualGradoSeccion(this.mes, this.grado, this.seccion).subscribe(
        result=>{
          this.asistencias = result;
          var i ;
          this.resumen = [];
          for(i=0; i<this.asistencias.length; i++){
            var res = [0,0,0,0,0];  //presente, tarde, falta, evasion, licencia
            this.resumen.push(res);
          }
          //console.log(this.resumen);
          this.asistencias.forEach((estud, index) => {
            estud.asistencias.forEach(dia => {
               switch (dia.resumen.reporte) {
                case 'P':
                  this.resumen[index][0] += 1;  
                  break;
                case 'T':
                  this.resumen[index][1] += 1;
                  break;
                case 'F':
                  this.resumen[index][2]+=1;
                  break;
                case 'E':
                  this.resumen[index][3]+=1;
                  break;
                case 'L':
                  this.resumen[index][4]+=1;
                  break;
                default:
                  break;
               }
            });
          });
          console.log(this.resumen);
        },
        err=>{
          console.log(err);
        }
      );
    }
  }

  //
  returnDia(d:any) {
    var dia = new Date(d).getDay();
    return this.dias[dia].sigla;
 }


 //cambiar color
 is_color_reporte(e:any){
   switch (e) {
    case 'P':
      return " has-text-info has-text-centered";
    case 'F':
      return "has-text-danger has-text-weight-bold has-text-centered";
    case 'T':
        return "has-text-tarde has-text-weight-bold has-text-centered";
     default:
       break;
   }
 }

}
