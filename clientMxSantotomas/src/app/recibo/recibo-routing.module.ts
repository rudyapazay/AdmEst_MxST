import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrarReciboComponent } from './registrar-recibo/registrar-recibo.component';
import { ReciboFamiliaFaltasComponent } from './recibo-familia-faltas/recibo-familia-faltas.component';

const routes: Routes = [
  {path:"recibo/registrar/:id/:carpeta", component:RegistrarReciboComponent, outlet:"popup"},
  {path:"recibo/familia/faltas", component:ReciboFamiliaFaltasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReciboRoutingModule { }
