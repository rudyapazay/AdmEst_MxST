import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//pdfview 
import { PdfViewerModule} from 'ng2-pdf-viewer';

import { ReportesRoutingModule } from './reportes-routing.module';
import { ReporteComponent } from './reporte/reporte.component';
import { ReportePadronFamiliaComponent } from './reporte-padron-familia/reporte-padron-familia.component';



@NgModule({
  declarations: [ReporteComponent, ReportePadronFamiliaComponent],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    PdfViewerModule
  ]
})
export class ReportesModule { }
