import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrarReciboComponent } from './registrar-recibo/registrar-recibo.component';
import { ReciboFamiliaFaltasComponent } from './recibo-familia-faltas/recibo-familia-faltas.component';
import { ReciboFamiliaEstudianteComponent } from './recibo-familia-estudiante/recibo-familia-estudiante.component';
import { ReciboReporteComponent } from './recibo-reporte/recibo-reporte.component';

const routes: Routes = [
  {path:"recibo/registrar/:id/:carpeta", component:RegistrarReciboComponent, outlet:"popup"},
  {path:"recibo/familia/faltas", component:ReciboFamiliaFaltasComponent},
  {path:"recibo/familia/estudiante", component:ReciboFamiliaEstudianteComponent},
  {path:"recibos/reporte", component:ReciboReporteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReciboRoutingModule { }
