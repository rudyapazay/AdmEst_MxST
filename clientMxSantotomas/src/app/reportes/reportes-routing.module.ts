import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReporteComponent } from './reporte/reporte.component';
import { ReportePadronFamiliaComponent } from './reporte-padron-familia/reporte-padron-familia.component';


const routes: Routes = [
  {path:'reportes',component:ReporteComponent},
  {path:'reportes/padron/familias', component:ReportePadronFamiliaComponent, outlet:"popup"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }
