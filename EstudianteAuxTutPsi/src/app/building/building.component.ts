import { Component } from "@angular/core";
import { AsistenciaService } from '../services/asistencia.service';


@Component({
    selector:'building-component',
    templateUrl:'./building.component.html'
})

export class BuildingComponent {
    public titulo="Administracion de estudiantes y familias";
    public subtitulo="Modernizando nuestra I.E. Emblematica Santo Tomas";
    public message =" BIENVENIDO"

    constructor(
        private _asistenciaSevice:AsistenciaService
    ){

    }

    iniciarDia(){
        this._asistenciaSevice.asistenciaIniciarDia().subscribe(
            result=>{
                this.message = result.message;
                console.log(result);
            },
            err=>{
                console.log("error en conexion con el servidor");
            }
        );
    }

}