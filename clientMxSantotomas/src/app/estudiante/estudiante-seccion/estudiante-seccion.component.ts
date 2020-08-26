import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { EstudianteMdl } from 'src/app/models/estudiante-mdl';

import { faUser, faMale, faFemale, faUserEdit, 
        faIdCard, faUsers, faUserCog, faTrash, faPrint, 
        faCalendarCheck, faUserPlus, faDrumstickBite} from '@fortawesome/free-solid-svg-icons';
import { GlobalService } from 'src/app/services/global.service';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { FamiliaMdl } from 'src/app/models/famlia-mdl';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-estudiante-seccion',
  templateUrl: './estudiante-seccion.component.html',
  styleUrls: ['./estudiante-seccion.component.css']
})
export class EstudianteSeccionComponent implements OnInit {
  faUser = faUser; faMale = faMale; faFemale = faFemale;
  faUserEdit = faUserEdit; faIdCard = faIdCard; faUsers=faUsers; 
  faUserCog = faUserCog; faTrash=faTrash; faPrint=faPrint; 
  faCalendarCheck=faCalendarCheck; faUserPlus = faUserPlus; 
  faDrumstickBite= faDrumstickBite;

  public estudiantes:any;
  public grado:string;
  public seccion:string; 
  public _estudiantes:EstudianteMdl[];

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _estudianteService:EstudianteService,
    private _globalService:GlobalService
  ) { 
    this._estudiantes= [new EstudianteMdl];

  }

  ngOnInit() {
    this.getEstudianteGradoSeccion();
  }

  getEstudianteGradoSeccion(){
    this._route.params.forEach((params:Params)=>{
      this.grado = params['grado'];
      this.seccion = params['seccion'];
      this._estudianteService.getEstudianteGradoSeccion(this.grado,this.seccion).subscribe(
        result=>{
          this.estudiantes = result.estudiantes;
          //console.log(this.estudiantes);
        },
        err=>{
          console.log(err);
        }
      );
    });
  }

  cambiarGrado(g){
    this.grado = g;
    this._router.navigate(['/estudiantes/'+this.grado+'/'+this.seccion]);
    //console.log(this.grado);
  }
  cambiarSeccion(S){
    this.seccion = S;
    this._router.navigate(['/estudiantes/'+this.grado+'/'+this.seccion]);
  }

  is_active_grado(elemet){
    if(elemet == this.grado)
      return 'is-active';
    else
      return '';
  }

  is_active_seccion(elemet){
    if(elemet == this.seccion)
      return 'is-active';
    else
      return '';
  }
  
  print_relacion_estudiantes(){
    //console.log("imprimir relacion de estudiantes");
    const documentDefinition = {
      info:{
        title: this.grado.toUpperCase() + " - " +this.seccion,
        author: 'Serafin',
        subject: 'Relación de estudiantes de una seccion'
      },
      pageMargins:[40,100,40,40], 
      header:this._globalService.getHeaderReport(), 
      footer:this._globalService.getFooterReport(),
      content: [ 
        this.EncabezadoSeccion(),
        this.EstudiantesRelacion()
        
      ],
      
    };
    //creacion de documentos  
    pdfMake.createPdf(documentDefinition).open();
  }

  //relacion de estudiates con familia
  print_relacion_estudiantes_familia(){
    const documentDefinition = {
      pageOrientation:'landscape',
      pageMargins:[40,100,40,40], 
      header:this._globalService.getHeaderReport(), 
      footer:this._globalService.getFooterReport(),
      content: [ 
        this.EncabezadoFamiliaSeccion(),
        this.FamiliaEstudianteRelacion()
        
      ],
      
    };
    //creacion de documentos  
    pdfMake.createPdf(documentDefinition).open();
  }

  EncabezadoSeccion(){
    return [
      {
        text: 'RELACIÓN DE ESTUDIANTES' ,
        alignment:'center',
        fontSize: 11,
        bold: true,
      },
      {
        text:this.grado.toUpperCase() + '  ' + this.seccion,
        alignment:'center',
        fontSize: 16,
        bold: true,
      },
      {
        text : " "
      }
    ]
  }

  EstudiantesRelacion(){

    var est_rep= [['Nro.', 'Apellidos', ' Nombre', 'Codigo', 'DNI Nro.','Sexo']];
    var est_det;

    if(this.estudiantes){
     var i = 0;
     while(this.estudiantes[i]){
       est_det = [i+1, 
          this.estudiantes[i].apellidos.toUpperCase(), 
          this.estudiantes[i].nombre.toUpperCase(),
          this.estudiantes[i].familia.codigo,
          this.estudiantes[i].dni
        ];
        //revisar el operar trinario 
        if(this.estudiantes[i].sexo =='masculino'){
          est_det.push('M');
        }else{
          est_det.push('F');
        }

       est_rep.push(est_det);
       i++;
      }
    }
    

    return {
      columns:[
        {width:"*", text:''},
        {
          width:"auto",
          table:{
            columns:['auto','auto','auto','auto','auto'],
            headerRows: 1,
            body:est_rep
          },
          layout: {
            fillColor: (rowIndex, node, columnIndex) => {
                return (rowIndex % 2 === 0) ? '#EEEEEE' : null;
            }
          }
        },
        {width:"*", text:''}
      ]
      
    }
      
  }

  FamiliaEstudianteRelacion(){
    var est_rep= [['Nro.', 'Apellidos', ' Nombre','Codigo', 'Padres de familia','Celular','Direccion']];
    var est_det;

    //console.log(this.estudiantes);
    if(this.estudiantes){
     var i = 0;
    
     while(this.estudiantes[i]){
    
      var padresFamilia = [];
      var celularFamilia = [];
      //var direccion ;

       est_det = [i+1, 
          this.estudiantes[i].apellidos.toUpperCase(), 
          this.estudiantes[i].nombre.toUpperCase(),
          this.estudiantes[i].familia.codigo
        ];
        //var familia=null;
        var familia =  this.estudiantes[i].familia;
              
        if(familia.padre){
          padresFamilia.push({
            text:familia.padre.apellidos+', '+
            familia.padre.nombre
          });
          celularFamilia.push({text:familia.padre.celular });
        }
        
        if(familia.madre){
          padresFamilia.push({
            text:familia.madre.apellidos+', '+
            familia.madre.nombre
          });
          celularFamilia.push({text:familia.madre.celular });
        }
        if(familia.apoderado){
          padresFamilia.push({
            text:familia.apoderado.apellidos+', '+
            familia.apoderado.nombre
          });
          celularFamilia.push({text:familia.apoderado.celular });
        }
        
        est_det.push(padresFamilia);
        est_det.push(celularFamilia);
        est_det.push(familia.direccion);

       est_rep.push(est_det);
       i++;
      }
    }
    

    return {
      columns:[
        {width:"*", text:''},
        {
          width:"auto",
          table:{
            columns:['auto','auto','auto','auto','auto','auto'],
            headerRows: 1,
            body:est_rep
          },
          layout: {
            fillColor: (rowIndex, node, columnIndex) => {
                return (rowIndex % 2 === 0) ? '#EEEEEE' : null;
            }
          }
        },
        {width:"*",text:''}
      ]
      
    }
  }

  EncabezadoFamiliaSeccion(){
    return [
      {
        text: 'RELACIÓN DE ESTUDIANTES Y FAMILIA' ,
        alignment:'center',
        fontSize: 11,
        bold: true,
      },
      {
        text:this.grado.toUpperCase() + '  ' + this.seccion,
        alignment:'center',
        fontSize: 16,
        bold: true,
      },
      {
        text : " "
      }
    ]
  }

  //impresion de formato Qaliwarma
  print_formato_entrega_alimentos(){
    const documentDefinition = {
      pageOrientation:'landscape',
      pageMargins:[15,15,15,15], 
    
    
      content: this.qalEstRepCont(),
      defaultStyle: {
        fontSize: 8,
        normal:'Impact',
        alignment:'center'
      },
      styles:{
        smalltext:{
          fontSize:6
        }
      },
      layout: {
        defaultBorder:false,
        paddingLeft: function (i, node) { return 0; },
        paddingRight: function (i, node) { return 0; },
        paddingTop: function (i, node) { return 0; },
        paddingBottom: function (i, node) { return 0; },
      }
    };
    //creacion de documentos  
    pdfMake.createPdf(documentDefinition).open();
  }

  //Recuperacion de grado y seccion
  qalRecGradoSeccion(){
    switch (this.grado) {
      case 'primero':
        switch (this.seccion) {
          case 'A':
            return '1°-JOHN HICKS';
          case 'B':
            return '1°-KENNETH ARROW';
          case 'C':
            return '1°-GARY BECKER';
          case 'D':
            return '1°-ANGUS DEATON';
          case 'E':
            return '1°-WILLIAM NORDHAUS';
          case 'F':
            return '1°-ABHIJIT BANERJEE';
          case 'G':
            return '1°-ESTHER DUFLO';
          case 'H':
            return '1°-MICHAEL KREMER';
        }
      case 'segundo':
        switch (this.seccion) {
          case 'A':
            return '2°-GABRIELA MISTRAL';
          case 'B':
            return '2°-JUAN RAMÓN JIMÉNEZ';
          case 'C':
            return '2°-MIGUEL ÁNGEL ASTURIAS';
          case 'D':
            return '2°-PABLO NERUDA';
          case 'E':
            return '2°-GABRIEL GARCÍA MÁRQUEZ';
          case 'F':
            return '2°-CAMILO JOSÉ CELA';
          case 'G':
            return '2°-OCTAVIO PAZ';
          case 'H':
            return '2°-MARIO VARGAS LLOSA';
        }
      case 'tercero':
        switch (this.seccion) {
          case 'A':
            return '3°-ERNEST RUTHERFORD';
          case 'B':
            return '3°-MARIE CURIE';
          case 'C':
            return '3°-HANS FISCHER';
          case 'D':
            return '3°-LINUS CARL PAULING';
          case 'E':
            return '3°-WILHELM OSTWALD';
          case 'F':
            return '3°-OTTO WALLACH';
          case 'G':
            return '3°-MELVIN CALVIN';
          case 'H':
            return '3°-FREDERICK SANGER ';
        }
      case 'cuarto':
        switch (this.seccion) {
          case 'A':
            return '4°-ROBERT KOCH ';
          case 'B':
            return '4°-CAMILLO EMILIO GOLGI';
          case 'C':
            return '4°-ALBRECHT KOSSEL';
          case 'D':
            return '4°-KARL LANDSTEINE';
          case 'E':
            return '4°-ALEXANDER FLEMING ';
          case 'F':
            return '4°-ARTHUR KORNBERG';
          case 'G':
            return '4°-FRANCIS CRICK';
          case 'H':
            return '4°-HAR GOBIND KHORANA';
        }
      case 'quinto':
        switch (this.seccion) {
          case 'A':
            return '5°-PIERRE CURIE';
          case 'B':
            return '5°-JOSEPH JOHN  THOMSON';
          case 'C':
            return '5°-GUILLERMO MARCONI';
          case 'D':
            return '5°-WERNER KARL HEISENBERG';
          case 'E':
            return '5°-ALBERT EINSTEIN';
          case 'F':
            return '5°-NIELS BOHR';
          case 'G':
            return '5°-JAMES CHADWICK';
          case 'H':
            return '5°-ENRICO FERMI';
        }
    }
    return this.grado + '- '+this.seccion;
  }
  
  //Recuperacion de grado y seccion
  qalRecFecha(){
    switch (this.grado) {
      case 'primero':
        return '24/08/2020';
      case 'segundo':
        return '25/08/2020';
      case 'tercero':
        return '26/08/2020';
      case 'cuarto':
        return '27/08/2020';
      case 'quinto':
        return '28/08/2020';
    }
    return this.grado + '- '+this.seccion;
  }
  
  //componentes necesarios para la creacion del reporte de Qaliwarma
  //encabezado de la tabla
  QalTableHeader(){ 
    var tableEncabezado=[
      {table:{
          widths:[140,2,100,2,'*',2,100,2,70,1,100],
          body:[
            [{image:
              'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAC5B3YDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9/KKKKACiikBoAWkbpTWlCnmmT3sdvA7udqIhcn0A60AKTjH17dqZzvzxyeAO/rXnXin9qvwb4U+FmteLDqKTafocLz3CRtmXahIOF69R6V8ifD7/AILQJ8bvidB4at/D8mgaZ4ssLhvD+qTyAPLKg4JGcAE9KAPvrVdXtvD+ny3d5PHb2sA3PI5wEHvXmvx1/bJ+H37PHhbTtU8R65BbW2qjdZbDuM49QB1FfN/7OHx01P8Aa4/YD+JGi+LtZtrTxZp4vrCV2mEbBkDGMrznnaPzr4j+G3xjtt3wM8c/EzSr/X/A/hfTbnw7fr5TSi2uU3De4weW4p2A/WHWf22fh/o/7OF98VW1hP8AhErCPzJbjp06rius+A/xy8P/ALR3wu0jxl4VvFvNF1qETwSqex7H3r8r/wBrHxxr/wC2d+zf4Z+GPwn8AT6DovinXGkRJImSCe2UkFn44Br3v/gin4O+Iv7L1l46+D/jrSJLW28PudQ0q5iBNv5TceWhPpRYZ9H6j/wUg+Eml/Fa88HXXiS3t9WsZhbTB+FWQ9FJ6V6/N490Oz1CGyfVrC3urqMSxRPMoaRSOGGT0r8PfH/jrwlrXw0+N3h3UfDuoz/FzxN4laDw8qWz+arCUbJFbHTAPer/AIgf4gfHD9r59NX+09RXwXolno949tclJrabamSFyMkUhH7kW2J23qdytxkHIP0qbdtPt0r4q/ZT/aQ8Sa9+2PbfCbTZp77w54G8OpLrVzccyLcuuUVj619k6vr1noFi9zf3MFnbBgPMmcKo/E0DZfoqC11GG+t0lhkSaKQZWSNgyt9CKkSYOKBD6KQHNLQAU1+lOpr9KUtgPzJ/4ORv+TfdO/6+x/SvxXHSv2o/4ORv+TfdO/6+x/SvxXHSvz/ib/el6H+lP0YP+SVXqwooor5w/pMKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAdH95f99f51/SN+wp/yYBpH/YCP/os1/NzH95f99f51/SN+wp/yYBpH/YCP/os19dwr8Uz+MPpa/7nhfU/BT4kf8lJ17/sIz/+htWNWz8SP+Sk69/2EZ//AENqxq+6P4S6BRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXW/AL/ku3g//sKw/wDoVclXW/AL/ku3g/8A7CsP/oVAH9FnxkOf2b9T/wCwSP8A0AV+XcH3K/UT4y/8m4an/wBgkf8AoAr8u4PuVMdyZD6KKKokKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoP3G+hooP3G+hoF1P0R/4J6f8m62H++1c3+0+c/EVv+uYrpP+Cen/ACbrYf77Vzf7T/HxFb/rmKzNOh5tRRRWhAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFAGTRnmgAoooAyuaACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD7gooorM0AnFJnIoYZFQSSiJHdjhFUnjsB1NADNTvIdJs5Lm4lWG3hUvJIxwqqOua+Ov2g/wDgqP4P17SfE/gn4d6ta33jpLWb+zY3P7q8dPvIp7muB+Kf/BTTSvjn8Z/EPgWC5Wy8Ew79FuboNiee5bKfIOvBNfOf/BOz9jWbQ/8AgpAvg7xmoW2+Hvm6t4cuEjB/tZJfmYu/cj0qlF7gWPHnxf03xhpfwy+I+nstrc68z+FPGfh9XJRHfKk+X/vHOcV5z8Fv+CVfj7xF451LwnaeGtRt7nR/Ef2uw8UTzuq2mn7tyxxjOOhNfpzY/wDBKn4Y2Px6n8c/ZJnaa6N6LDP+jrOTnft6ZzX0vbwJawqsaCMLhcAY6cUroeh8ZeHf+CK3gWH4mT+I9S17X7qK9EUs+lxzmKBplXDOdp5ya+m/Af7P/gr4feEW0LS/Delx6VJMZmtpIFlR37sQwPNdwU6cUeWOeOtIRn2GgWGlLELfT7K1S3BWPyoFTyh/s4HA+lWUt4/MZxGu7G0sV+Zh6ZqxsH6YpNgAPvQBz7fDrw7JrC33/CP6L9vU/Lcmyj8xf+BYzmvBPiH/AMErvhp42+LUnjnT01Tw34nmuRcz3VjOy+e4OfmXOCOO9fTgUKMUbKegHwX8Fv2OPi7+xp+1frniTw29h4q8LfETUo21ie5b/TLOIdMD0FcX/wAFvPin4q+J3iTw58HvB9hq17BOw1HxA+n7hNFbL6Ed6/SZ12isYeANG/4SdtaOn2p1R08prkoN7J/dJ9KNNytD8u/2GP27tW/YX+A/ii5+JU2uTeF5NVjsvB1pqK/8TCcE4cYPJUetfo3+zj+0Z4Y/aX8DQ6/4avUnjlUefD/FA/cEetfmr/wU6/Zq8TeNP28bLU/GMVxF4B8pE8M3FlDug0269ZF6DJ71h63+3L/wyF8Q9P8AAfwsGn6lrsMX9oeJpkfEMwXkonbdgE4p26CP2IJ554NPryz9kT9pXTf2s/gHofjbSgqRakpSSInmGReHX616eXK4x83rUiJKa/ShT17470OflpPawH5k/wDByN/yb7p3/X2P6V+K46V+1P8Awcjf8m96b/19ivxWHSvgOJdcV8j/AEp+jB/ySq9WFFFFfOH9JhRRRSAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigVx0f3l/31/nX9I37Cn/ACYBpH/YCP8A6LNfzcx/eX/fX+df0jfsKf8AJgGkf9gI/wDos19dwr8Uz+Mfpa/7nhfU/BT4kf8AJStd/wCwjP8A+hmsatn4kf8AJSde/wCwjP8A+htWNX3R/CXQKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK634Bf8AJdvB/wD2FYf/AEKuSrrfgF/yXbwf/wBhWH/0KgD+iz4yf8m36n/2CR/6AK/LuD7lfqJ8Zf8Ak2/U/wDsEj/0AV+XcH3KmO5Mh9FFFUSFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUH7jfQ0UH7jfQ0C6n6I/8ABPT/AJN1sP8Afaub/af/AOSit/1zrpP+Cen/ACbrYf77Vzf7T/8AyUVv+uYrM06Hm1FFA+bjoeua0ICig/KhduB7dhUTX0AY4uIOmRmQYoAlooXEkfyHceoI6Ee1CMGxt+bjj/aoAKKCT0IAx6UuOfb0oASinbM98U1uOn507WAKKVxjGOnfFAIJ7/SkAlFBIT1NKuO+RQAlFBHcDI70iHcaAFooHfOcUY3Hg/nQAUUY4PSkHIoGLRS7S3PCihtpHXGKBXE3baKG+Uk/w9BnvSNIqDaJIZGHHyvnBoAWjdg4o3LsB5+T7x9abHMkwLxukg6cHjNADqKVkJGQPqPSlCheoNADaKG+/wAUoUkEYJ9PQUAIOaKguNXtNOlSOaeJJZjiOMuAXqdmAZTg5PJX0oAKKUpgdf0pAMnq35UAFFCjJ74+nWlXn+lNagJRSldvv7UFcJ1OfTFIBKKZcXSWdtLNJlYYVLSMeiAd65/4efFbQPipaXE+ganb6nFaymGZoW3CNh1BoA6OiiigVwooooGFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAH3BRRRWZoIx4r80v+Cq3/BTzxf8ADL4r6l8O/h9eW+g3nh6wOp6hqN0vyzqOfITP3i1fpY5wK+SP+Ckv/BMXw/8Atr+FIdRsY49N8Z6VKtxb3SjAugpzsk9Qfej7SA/OLRPhReftB/FXwr8S/hJaxTeNtZtgNf0aVcW9ncNwbkL0zzmv1r/Y9/ZYh/Z7+HNgmsXA1zxbIDPeapOoMyvJyyKTyFHTFc14O8C6J+xb+zlD4sufDtlb+IdMsEj1BrSIBrgjjtXb/AP9rLwt8fbS2Sxuvsurzx+Y9hMNsqDucelctbGwjUjCpKzexUVJrQ9UALe/b0pRFk9aVcHkZGOKcWC+1dV76kgBgUtJnijdQAuaKQjdSbvmoAdRnFJml60ANk5WmtF5iU5j2o+6tLVO4GP4l8Kad4w0qXT9TtYLy2nUrtlQNj3GehFfmv8A8FA/+CXfg7wp4j8KzaJpF1p3hCO4n1DxPqMEhFwIwCSu8c4I7V+lXinxLY+EdJm1HULhLSyt1zJI/AH49q8Ltv2tvCX7R3xAvfhrbWct9p+r2UkU1yUzHIjAqcGuWWMpKqqMpe9vYtcz1Wx8U/sgfFnVvAHg+68dabqsXgX4IeGIZLTwxprnMmsyt8vmtnkkmv0j/Zw8a3nxG+DOi65fMGutSh83I7g9K+Rfht/wReh0P4j2cXiTxPc618O/D9wZ9G0AnEcRJz8w7gV91aRo9toGnw2dlDFbWtsgjhhjXCoBwMV13vqQy3Gcr+GSKU/cpIk2R479zSn7lRe4H5l/8HI3/Jvem/8AX2K/FYdK/an/AIORv+Te9N/6+xX4rDpXwXEn+8/I/wBKfov/APJKL1YUUUV82f0olcKKKKA6hRRQeKAsFFFFAgooooCwUUUUAFFFFABRRSigBKKUHBo+8aADGKSlzmkoAdH95f8AfX+df0jfsKf8mAaR/wBgI/8Aos1/NzH95f8AfX+df0jfsKf8mAaR/wBgI/8Aos19dwr8Uz+MPpa/7nhfU/BT4kf8lK13/sIz/wDoZrGrZ+JH/JStd/7CM/8A6Gaxq+6P4S6BRRnmhuRQAUUAhRwfzo3bqACignAozjrQAUUUUAFFFFABRSgZpHO2gAooBzRQAUUUUAFFFFABRRRQAUuMUlBagAooBzSb8GgBaKKKACiiinZgFFFFIAoozRQAUUUUAFFFKBk0WASihvloByKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooo3c0AFFLt4pKACiiigAooooAK634Bf8AJdvB/wD2FYf/AEKuSrrfgF/yXbwf/wBhWH/0KgD+iz4yf8m36n/2CR/6AK/LuD7lfqJ8ZP8Ak2/U/wDsEj/0AV+XcH3KmO5Mh9HWilbg8VRIlGMCkYjb0Jpdm4Dg0AAG6jNL/q++KbkJ70ALRSCloAKKKKACiiigAooooAKKKKACiikGcdKAFopAc0tABRRRQAUUc+lFABRRRQAUUUUBcKKKKACiiigAooooAKKKKACiiinbS4BRRRSAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACg/cb6Gig/cb6GgXU/RH/gnp/ybrYf77Vzf7T//ACUVv+uddJ/wT0/5N1sP99q5v9p8/wDFxW/651madDzalGSO340lFaEHkf7c/i7UfAP7K3i7VdKuWtdRtbN2ikU/dOK+FP2OP2T/AIs/tXfs92/i+L4oala3V67ERFzgMCcDrX21/wAFF03fsb+NeP8Alxf+VfLX/BLX9uf4ffBb9kSw0rXNXhi1G1LuIScEcmgaVzW/4J//ALV/j/wN+1Bq3wO+KF2dR1HTlzZXWMFh2r7tv/FGm2OoyWcl5bxXKL5hj3gMijqa/On9jm31P9r/AP4Kba98XbTT57XwvYRrDa3EqYE+3g4rB/bZbx349/4KhxeBvB+pXdqdesRFKyuQsUX8bfXFK4H6U+FviFonjW7ki0u/t7x4fviKTcV+tQ+Kvit4e8FS+XqWq2dtMfuo8oBIr5f0j9ni1/4JpfBvxV43i1q+1GcWDArcOW3TY6jPvXkH7G37Gms/tu+C7j4mePtf1P8A4nszy6fZxyELChJpjsfof4b8XaX4vs/P068hu17+Wwaptb1+y8N2DXV9cQ20C9WkbAr82vDUniX/AIJxftz6D4QfW7vVfBXjFwsPnsSYWPYV2f7fXirW/jz+334A+C9rqlxo+h6pZm+vJYm2mXHO38qAsfaOn/HjwjqBbZren8HH+uFba+K9NOjDUFvIfsTdJ93yH8a/Lv8A4KWfsU2v7MsXg/UtE8R6rHbalfx2lzD57BnBOMgV9AftreHbj4E/8Es/s2j6jdF7S1ikjuDIfNZmIbr+NAWZ9aav8VfDuh3VvBNq1mkt3jy1aUZfPpVzXPG+keFLXz9Qv7e2jYZXzXC5Ffnf+xf+wR4k/aW+HGhePPHHiXU4rjMclhAshACqeM/WvoL9of8AYan+N/xKg1XX/Ft1p/h2ztEt4rRJfLBKgAk/lQLU+hPCfxS8P+NHaPTNUtLuTuscgJrV1TWrLQrfzbu4it42O0NI20E1+W/7Sfgdf2Bv2ivhvrHgfxXPfadrOoR2t5Z+fvGGOORX0J/wWf8AFup6N+ydpd/pFxNa3l3dwunluVKk4I/CkFmfVWu/Fjw94WuooL3VbKB5QCFklAODWnqXi/S9H0YahcXtuliwyshcbT+NfAngr/gm54h+PP7Oj+KfFfinUR4nu9M+0WqxzEJbgLlRXlP7A/gv4jftvWN/4K8Q+JLy08NeDbmS0mlRzvuChxjP4Ux2Z+o/hL4gaN44Vjpd9bXnlnDCGQNitDVtctNAtWmvZ4reJOpdsYr80/DfhjWf+CeH/BTzwZ4RtdZvL7wn42tS5hmcsIyeAT+NfZP7X/7MGp/tF/2XbReI59D0myffe+W23zR9aBWZ6Jo/xs8LeJL5rS01ixlnB27FmGSfSuoSIpH1BB5xX5jft3fsj6R+yz8HV8b+CfGVwNd0S5SZo/tRPmjIByK+9f2SfiJcfFn9nLwrrt7/AMfN9ZI0/qWxyaBHT/FPU5dI+GWuXcDbbi3sZXUn+EhTgivyI/Yo/b7+IHwy/afjn8Yaxdah4P8AEOpyWWZOVgfdhefQV+uHxmUH4T+I8f8AQPmAz/uGvy0/Zw/ZfH7Tf7DnxEW0iC6/oWqT3lk6j59yNnAoGj9OP2g9caz/AGffFmqWFxiVdJknt5ozwPkJDCvDv+CQnjrV/iT+ybBf67fTaheG7kHmynkgMcVw/wCxv+0+3x//AOCb3inRtXl2+KPB2lT2Oowsf3nyqQCfyrpP+CKMf/GGsKdjdTHPtuPAoHY+m/E/xX8OeEpvJ1HV7S1mH8LygEfWtHw54x07xZYCbT72C7j/AL0bhq+Q9R/4JqWOueIdV1Px744uZrnUbySaEfaSgijZiVXHsK8r/YY1/UP2fP8Ago3rHwut9em1zw1fwGe2ZpPMWLHOM0BZn6MarrNp4ftGuL6eK3hUZLu2BWNoHxY8O+LL4QafqtnPcKeFjmB3fhXw9+3Z4/8AEX7Sv7ami/BLw/qc+l2Eai51KeJiDt64ruY/+CWk/wANfEmha74P8VarFfaXco1wkshKXCZG4H9aAsdt+1d+zHqvxa/aP8FeI7Pxi+hwaM+ZrATbBcjPp3r6PeRLKwDSSbQijLnjoK+GP+Ch/iXU9H/bl+Dtpb3k8EE0oWWJHIEwz1Nbf/BXL9pHXvh/b+C/ht4SuHtNc8eTpbtOp+aCI4G79aBan1Ifjh4UTU/sZ1zT/tG7G3zhnNdTb3cd7CksUivCwyGU5BFfEFx/wR6jT4XHPivV/wDhKUtvO+1ea2DNjP5Zqb/gkN+0b4h8caL43+Hfi24a41zwTcSQxzOeZYxkZ/SgR9kP460hYZ3k1C2CWvEh8wfJ9ar+FPidoHjqZotL1K0uZEOCscgJFfl/8APhr45/ap/ar+JHhiLxDeWXhe21R3vSkp3bc8KvpWz+0l8HNW/4JrftHfD3XfDuvX1zoPiPUEsbqCSUsCxIoA/T+5vodMtZJbiZIY06u5wBXM2vxz8J3mr/AGKPW9PacnAUTDJNcd+1N8GNX/aV+GOk6bpetyaAkzLPdSRNtLxsBxmvkL9q39gbw18GvgfqniDw941uk8SaFH56E3ZJZl5PFBSVz9A/HhFx8O9eZWyv9nTEMDwfkNfGX/BEGUy/Dbx58xx/bsuQe53GvTP2DPjDqPxr/YL/ALU1WV5btNMmheR+shVSM15j/wAEPjn4bePSev8Ab03H/AjSFsfctFFFMQUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAH3BRRRWZoNk+5VaWZRLt3BTjKDPWrE33K+U/+Ch3iTxZ8PPFPgHWdC1L+ztOkumsbvJ+RpH/ANXk/nXDmOOhg6Eq9TZIqEJTlyRPoL4t+CIvib8O9U0aXpqMLIhPZwPl/WvzZ+L3xD8TfsN/HH4cz654bP25ppbSO5tBlbuMngMR3xX2/wDsi/tF3PxjtNU0zV/ITWtHk2OqMD5q/wB4V8e/8HKWtaj4O+A3gfW9IleG70vVfMjkH8J4r5PM8PQzHDQzSk3eGqPWyzD1KmJjhWtXofoJ8G/jBp3xl8EWms6dINs6/vIj96Ju4IrrC+4evP6V+Q3/AAS6/wCCia6Vc2E99cEW99tTVYXOPLc8bwOwr9bdB1q18Q6Tb39nMs1rdxiSJ1PBUjIr1OHc6jjaXvu01uiM3yutga/s6iLvmbl/lTJZxCuTgD1Jql4p8S2Pg/w9dajqNxHa2NnGZZZHOAijkk1+LX/BR3/gvtrlz8Q9X0D4azKNJ0+T7O1yDy3OCwr6GrVUD5rHY+lho81Q/Zu++IGj2F1HbS6naR3NwdscZkG5j6AUreOtJttT+wTajax3oG4wvIFfH0r+aX4DftxfEjxj+1X4S17Xtc1i90vTdYhmkjjdiroTyP1r1L/grX+2Z4wsf24tX1jwfq2s2FhbxQxgbmVFbCk4FY/WrK7R5n9uRdH20Vpc/odjulu1VoyGXsQc09Jy/IB+h7V+AX7FP/Bezx58MPHFjZ+MbltQ0BJ44rl5D82w9SPev3O+CPxt0H4+fD2z8S+Hb1LzTb6NXUqeUYjoa0p1oyV7no4DM6WKXubo7ASbufzqNZt3OccZ9qGcAZOePTvXz3+3n+1nbfATwNLp1lcxJrF9GwY7ubaMjlz6VyZnj6WEoutVeiPYw2HqYioqcFqzw7/gqt+3TbaDpkPgbRrObU47y/gt764h5Csx4j/GvUf2H/2e9b8P+KT4v1/TLbS4pbFIdNtY8bo0wOWHqa/IKb9o7UPjl+3D8P8Aw7ps8j6FFrMT3Bc5N1Lu++3t6V/QVqesQ+E/BM17dMEi06z81jnHCJnr+FfH5Rhlj639sYh25dF6Hv5vllbLmqE18SNRp1ibO4DIyQetPix2+7jIr8+fiF+1D48+NnibwnNpWoRaTp2s6vGsNtEd0skW/Bz7Yr9BbKMw2cUbHc0aKpPqQOtfU5Rm9DGqbpdHY+eqU5U/jRPGP5c0rjC0JQ/SvY06GZ+ZX/ByN/yb3pv/AF9ivxWHSv2p/wCDkb/k3vTf+vsV+K8ZAxmvz/iX/efkf6U/Rf8A+SVXqxACe1OZQF60jku+BQ0WFzXzfK2f0lzNLRXAjFDDaKGbcfwpchqajfQE+/URRmnIA7c01oyvelRSF3Gos72uaa9hdoOaZSl9qGlEBKg5q1rqZt30jqJ9aTNKV5xQExxU3bntoN8yWgpXaOtJQB5ny5pXjZPlqo3avYOZPbYb1pWG2jBFITtbJpbayYXVgYYp6xEikXn+lIGO7HOD6Um9pdCfhfccrL6dvSprfTp5Y9628zp3ZVyBXoX7Kv7NWuftRfFmw8PaPBI0bSA3VwB8saV+i/7YHhD4N/sJ/s8RaAbCy1DxPJa7AuAZA5GCx/GvZwmWyq03WqaRR+WcUeJuHy3M6OVYaLqVZvVLou77I/J8oR145xikYYHWpbqT7ReTSFdnmMWx25OaiMfyV5M0l1P03DVJVaSqW3Fj+8v++v8AOv6Rf2FD/wAYA6R/2Aj/AOizX83Uf3l/31/nX9Iv7Cn/ACYFo/8A2Aj/AOizX13CluaZ/HP0tf8AcsL6n4LfEbn4k69/2EJ//Q2rFra+Ixz8Ste/7CE//obVi1909z+EEGcMOP8A61IE8w/KSckDGKcrbWyelelfsb+E7Hxz+054O0fUIxJZX2pRRyIejgnkUhnndzplxAoMtvIkZ6MVxmoC245AwPSv3O/a9/YO+GXxA+EHirQvDmjW1l4l0exNxEI1G7gZ/pX4darpMui6zd2cy7JbWRomT0IOKAK4I3dMipotNuLmIvHbSuq/ebacCr3gvwtdeOfFWm6RZRGS4v7lIFAHUswFfuL8Lf2FvhX4K+D0Xg++0a0vfEWnaCL28l2jeCy5BP40gPwpjtZLm4SGFGkmkO1EA5LelWdc8OX/AIauFS/tJ7TeMp5qFS1eheHdY0r4T/tfW2oXtss+i6Lr5kmgI4eEMflr1n/gqL+0/wCCv2lvGehXXg/SoNNisbcRzrEoAYY4pgfK+flzR068envSbeOBSjM6MVVio7+lAARnjkGtC08JanfadJfQ6fczWUP3plQ7R+NZxUOnDE8da+1P2df2zfh58P8A9hfXfBGraHbz+I7xWEVyyDcpI45oA+Lc7ycfl6Ug+9jmlmI3yHopYkY9M0xfu78SbQeSRQA8/Kec8nAx3oyNoPPPt0q1oGmLq+u2Vp5h23koiyf4Sa+kf27P2DY/2Q/h94P1kX32r/hJbZZtn93IBougPmQDjt7c0h+UdD+Apsca7NyjIxnNALSj5N5b0AoAeQdmf0pAaUrh9jfK3WkYYHByfahALgipbGxm1S6S3t4HnuJG2pGgyWqvGTIcAMx9K9M/Y9+JGjfB79pHw5r/AIgtPtmlWFwr3ETjKsBQB5/rWiXnh2++z3trNaS/3JFwardVHHP8q+h/+Clf7QvhT9ov43prHhDTotP0+OLyykahQTnOeK+diSnvu6UALnB7/lQDQ6vHGGZGANA6cHNABSbhmlY4FBQKN3WndgIGyemBnGa7rwX+zp4r+IHw61DxVpenS3Oi6ZIY551GQhAzXClmlQsEZhnn0r9Pv+CaKRTf8EkPimSqH/Trg525OfLFID8wyhBYdx2NI3ygfrSj555v4tznbmkjBmBCqX29QtAAxHbJ/ClUbqasnJ/hxwQacygDOfyoAApZ8Dr3qx/Y14cbbWdt3IIU8irvgK0TUfG+kwSIGSa6jQqe6k4NfsT+0tN8Ev2LfhX4Nuda8IWt1Jq9nFtfYMklATRdgfjPNpVzbKWlgkVexZcZqFfnQsOg/Wv1O8DfHv8AZi/aV1WPQ7zQ7bRHuf3UUxAUbj0r5w/4KT/8E2p/2WZrbxJ4edr/AML6gfMgmTlUzzg1Kbe4Hx8Wx+PIz6U7HI6/lSCRZBk855bPY0IGuMlA+B6CqAQkjtSg59fypof95gDNOYmNGLH8B3oAWkpJUaNQxVkU9yKVnATinoAGjOemaEVphtQFj14pFf5yhyrDtSAXHFHWjG/p1FEWDJ91mP8AdFACBs9jSscCgjOepx2HUUh+eUABnOOg7U2AoOTjv6UUoVup60JG0xyiFsdcUgE59K1/Angm/wDiN4mttI0uBri+u2CxooyWNYwdQ+GLA+lfQn/BLyNX/ba8GB8FPtQyCM55oA8g+KHwr1r4PeLH0bXbZ7O+j6xsMHnpWt45/Z18VfDrwFp3iXVNNmt9I1UAwTMuA2a+h/8Agt4Fh/bjvVRV2+XETgYwa+hP+Cn6Rn/gmF8KsKiAwxnAXB+4KAPy77/SjdTGyg5OAOtSRqZ4tyoxUd6AEY7fWikiYMh+Y59KUUAFdb8Av+S7eD/+wrD/AOhVyVdb8Av+S7eD/wDsKw/+hUAf0WfGX/k3DU/+wSP/AEAV+XcH3K/UT4yf8m36n/2CR/6AK/LuD7lTHcmQ/OKcgUozH7oHHqTTQcUpG5hng4JHuaokdGu6PcUbb61EWAGRkDOMntX1T+yx8NPD3xf/AGdtdhks4212zVmVz94YGa+YNUsG0zUbmyfqkhDZ7YNAFcnjD/e7e9PETRsu6PBfgCuj+DXg7/hYPxS0vTQpdZ5lBHYjvXsf7a+keHfh58UfDek6ZaQQpZRpLqBH8Y9PrQJ3Pnu4sJ7JgZonjD/d3L1qLHNe4ftY/Erwd400DQovDdssFxbxBZto7e9eHuo25DUDBuD60LzTRwetPABPWnoA3nPSlIwaRj8poRg0fXJ70gFoFKD29s00HcOtNALRRuUDHegyKq9cUgAgg1LBZzXx2wo8hXk7RnAqP+Hdmvaf2Q/iJ4S8DLq3/CSW8czTRkRbx0OKAPFjwMdwec9qStDxfdwaj4pv7i1XZbyzMUUdhnis4OAeaAFpVPYdTTSxCcc1oeE7mCw8T6fcXi77WKdXlT+8oPNAFWaxuLEr5sToG5G4YyPWoiMV7f8Ate/Ejwl48stEj8L2qW80EY85lHUY6GvDmJKZoFqOIwM9ulKV+fGabG+7BHJ/QCu7/Z1+C7/Hnx+dDjm8oiJpS/rjmgZwyrlTzyO1IPu1sfEbwq/gPxxf6RI4JsJCgP8AexWQ7gD/AHufpQKyEGD3opC6Ljpk0uR602MXHFGOKDtAHzdaGX5utICaHTprlGaOJ3RBksBwBVc5Havev2a/ib4N8KfCzWrHXrWOXUJ43WFmHPPSvCbp1e8mMYxH5jFR6DPFADMYo49aTd60rEE9qACig8GiqvoAUUUVIBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUH7jfQ0UH7jfQ0C6n6I/8E9P+TdbD/faub/af/wCSit/1zFdJ/wAE9P8Ak3Ww/wB9q5v9p/8A5KK3/XOszToebUAZFFKOnv0xWhB4j/wUYT/jDfxrhufsL/yr5g/4JTfsPfDT4t/sp6NruvaEl5qTSOWlY/ewT1r7Z/aC+EqfHT4Qa34UeTyV1WAw+Z6ZFc9+x5+zcn7LHwZsvCEdx9oSzJYP/eyc0i76HffD74daL8MtJg03QtNttOsl+7HCoAz718NIR/w/U01n3bf7HmJHvtr786yL/Cc7uK8IP7GqD9t6D4v/AGn54LNrUwfUYosiSj/wVM8LXfi39ibxfbWavLcrD5u1Rnco61i/8Elfino/iv8AYt8LWltdxQ3WmQfZ7iIt80ZBOQRX0l4h0K18R6Dd6feRia2vImjkTGcqeCK+JfEP/BKHXvAnjC9vfhz4uutE07UpDJLagkKpJzwKYXZxv/BQ7VrX41f8FAfhX4b0F0u7nS7pLi6MR3eUAe/pXPf8FDBe/ED/AIKU+EtO0PUYvC+veGtHBh1OVtizMP4Sa+pf2P8A/gnfYfs++NbnxRrWoNrvim6Hz3c/Pl/7ua+Xfj54W0b9sL/gq5c+F9fuf+EetfDFjtW53+W11k9jTZSZ0ngz9mrxj+038WdC1H4ueOdH1DTNAlWe2s7eZcSuvTNe3/8ABXa2htP2Ftdt4Not4UiWPb0CgjFfPX7cP7Hnhr9m34G33irw745vLfWtNZXtYxdFvPOeBivffh78L9X/AG5P+CavhrS/Ecj22q63ZrLcyNwcqeP0FILnqf7DGW/ZK8EqoO/+zo8Z+nWvkD4ueOfFX7Y3/BRbW/hT/wAJHP4X8KeHIVeRY2xJdeuDX3f8Efh5/wAKl+FWh+HEl3DSbVYVf+9ivnX9qX/gnLL8UvjYPiH4N1iTw74gmUJcyoceaR60ibs+QP8Agoz+yz4d/Zx+KXwvXTfEt9rF5c6zCs0VxKXMahhzjtX03/wWOO39kTwyqDbm7tOSO3y1X1b/AIJJXHja70jV/EniS51TxBp15HeO8jFlAU5AFe8fte/sox/tSfCbT/DEt15C2EsMgf3THH6UILs6v4On/jHHRiM/8gVR9Pkr45/4IdE/b/i0B97/AISO4wOv8Zr7k8I+Eh4X+HdnoO8n7LZi1z6gDGa8j/Yo/Yxt/wBka78Uyw3bXJ8SajLekD+HcScUx3Pmj/gpYAP+Cn3wNzyzRxg4PX5hXVf8FRvjz4sk/aH8FfCrw5qv9hW/iWQfar0nb8vcCvaP2i/2JIPjx+0p4I8fvdeRJ4SAATsxBzTP24v2GbL9rWXT9Vt7w6b4h0Rt9rdqOUIoC58gf8FIP2GPD3wK/ZR1DWbnxtqGq6qPL8uGW4JSdj14r7X/AOCdw/4wy8Ebs/NYKDjqTivBtV/4JS698WvCtxZeO/FtzqriMLapuPlqR0OK+sf2ffhcPgr8IdH8LpL5i6VALcv6470hFz4zDb8IfEnGT/Z8wAHb5DXx5/wQ2ZZPhP4yVgGV9XmVw38QLV9seK9CXxP4Sv8ATWbZ9uge3Y+mQRXkX7Ff7IcX7I/hbV7GK5+1HVLt7rP93JzTBM+EP20/D1x/wTr/AGq/F+uaekkPgf4l6fKk0Sj5ElZSCPzNfRP/AASC8Rf8Iz/wT3vtajQyHTFuL2NR/EBk4r279tr9jvR/2zvhY/h3UsJKvzW9zjmJ6l/Y9/ZXtv2WPgKnggyfa7bDRy56SI3GKCrnxd+xr8P/ABB/wUnl8VeNPGnji80vT7PU3trawtnKbEBOM49qwf2V/hjpPwh/4LCto2j6vJrFvBZsBNJJvO7HPNe3S/8ABKfxD8O/Hur3HgLxZNpGia7cNcTWyt8qFiScD8a7T9nz/gmRYfAj9oOx8fLqkl9dxW7JcvJy0sh60CueG6vq8fwg/wCC3N9qWssLez161ijtJZOEyFwQK/QPxV8StB8JKk93qlvb/bJAkYMgxIT0wK8X/bV/YJ0n9rCO01JbhtL8R6Y260u4uGT6mvLvhX/wTB8UQ+NNJ1Dxt40vdYs9ElE0Vv5hw5HTNArs5n/gpAyt+3l8Ft4Yh5wQw9M8Vg/8FcQ/gD9t/wCB/jK7BOkQmO0mlYfIjbgea+ov2g/2NYvjn8bvBnjA3bQt4RbKRf31FdN+1V+ypoP7WHwy/sDXIwvkN51tOPvwSYwCDQO53N78SdEg8LvrR1G3/s9LUzs/mDbt218Cf8EjdPk8e/tN/Gzx3bxMNFvrmSCGQdHYE9K3Yf8AglR8QJLL+wrj4gX58NHAKCQ7mjH8NfWf7Nv7Oeh/syfDNPDWhwqkbKTPMBzM5GMmgR8m/wDBKxi/7VnxpbAwdSYnA681B/wXDOLv4PqOA3iWEnPrkV9D/svfsbR/s5/FDxh4kS6Mx8T3Rn2emTmj9tH9jSH9re58JvJdG3HhnUk1AZ/i29qBHi3/AAVO/aZ8T/BX4Y/Drwx4Xuv7OvfGVxBp816f+WKuAMg+1cN+1F/wT40X4b/sv6zr2sfEHUdR1ZdP80k3BMc0hGSMd+a+qP2vv2MNI/as+FWmaFdSmC+0TbJY3IHzROBgH9K8RtP+CW/ivxr4ebSfGXjS51LTreExQxBiFJ7E+tJlo1/+CUJB/wCCdE+fmVbK5CnH+y1YP/BD47/hn49fOf8AifSj/wAeNfRX7Mn7MUH7PXwAbwRBMZo2jliDDjaGBHP51mfsU/sjx/sjeG9csFuftX9s3z3hI6LuOcUEtntvaijB9KKYgooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAPuCiiiszQZN9z8a5L4rfCPRfjZ4XbRteg+02XmrOgHDRuvQg+orr3XctV9nkufpnPpWGJpxqU+SaunuOLaacdz8jvGGr3H7Dv/BRHWdL0nxHctO9ut5a2c8mVng3DKH3ro/8Aguz8XNL+PH7CvhPWdOk3Ry6gizRAZaGTuCPrXyn/AMFbvFc2vf8ABQnxHqNtM8d5pAWCKVW5Ugg/lXRfspeP7D9qnx/4O8C6+5e0vdRjGpWTtw7Do6/WvzOnXrYXMJ4SD/dy0S7H7ZS4RxGVYXC8RzXNHdnyD8IPGd54StbXVLBiZYMpcwjpMoPT61+wv/BJX/goXa+LdLtvB+tXgNvL/wAeEkjfNAf+eLH2r4n/AGpf+CbGs/DD4j+PL3wravJoWkagxSFFz5aYJ6V87eBPH2q/CDxVHqljJJA8Egd4wcYcHr9a4nGrlmO9vbRs/UeJOGsv4pyJY/L7e1iryS3P2e/4LyfGnUvhD+wXqv8AZxMZ16cWEsyn/VoRnOa/Gv8A4JOfsLRft2/tFppWpXy2+nxxm71F2HzSR9go9TX6N/ED4w2f/BVb/gnld+Cba8iPjPSNtyIJHGbkov8AOvye+DHxl8efsG/G24u7H7VpGtaZPJayxSAgSAfw+4r9BjjqVZKqnofwvxRga+Gx6jXXuR3R/RN8Hv8Aglx8Gfgbplrb6Z4Wtpmt2WRZrhRI28dzXQfF/wD4J+fCf43x3Ta34UsZZbpQJJY0CvkdOa/Jn4Ff8HHXjFfiBo2n+JrSKXT1uI4r1k+8VYgdPavR/wBur/g4A8Q/CX4v3Gl+FdOb+wyqpBcSrgSFlBzn8a6XmWESUZSR108RQnSbjD3D54/4Ld/8EvtE/Yg1vSNZ8N3DPoOuSnybYnMkMoPH4V9df8GyPxs1Pxb8LvFfhG9dp7fSCt1HJn/VsTt21+Xv7Xv7cvj79unXYDrtxc3LWOVt7SLJ2uT8pAr9cv8Aghl+zjc/sP8A7N+u+LvHJj0YeIIluQkzbX8sDd0NZxxFH219oo8fLE55i5YeNoH3L+0h8fdJ/Z2+GN74g1OZE8pMW8WfmmkPQCvwm/bU/a+1r9oDx7qatdt5l1KftTocqqdo1/CvQ/8Agp//AMFE7z9pz4jXGl6Hcn+yNPkaKDYcKF6bvrXz9+z/APs9eIfjpr66XoFpLP5eZJ5ypOO5JNfBZ9jpZjiVRpfCvxP7O8K+AqNLD/25mllTjrqZP7Ff+mftxeEZEXCLq1nCDjphuc1+tf8AwVI/bMtovA+teFtP1VtO0nTbVhql3E3zltpAjQ/WvlaP9j7Qv2Uf+Cf6/ES7Ig8X2/i5I/tzH/VoX7V8n/tHfGq7+N99exLLN/ZcKSADd/x9MQcs3rzUZlWrYehTwNHS+rOXMMoXGWdzrZfG1OF19x+yX/BLD9lDQrP9mnwJ421KSfVtau7IXdvNJJuSNGJ24HrX2VC25K+WP+CMviz/AISr/gnt4Cj3bv7Hs1sOvI2f/rr6oA2mv0LKcFSo4aPKrddOp+C5vRqUMXUw9TeLaJVORSP0pIzzSv0r1r3VzzD8yv8Ag5G/5N703/r7Ffisv3a/an/g5GP/ABj3pv8A19ivxXTGBmvz/iZ2xPyP9KPowK/CqX95j4yFXrzXRfCj4Ta78bPE66N4espb+9ZSWVBnaK5ydBxjp7V95/8ABvZp0N9+1vqXnxo4SyYqrDPavKwOGVeuqd9z9d8ROJa2Q5JXzCkrunFtLueHt/wS/wDi1EgP/CO3PHH3Dz+lcz4z/YT+JvgO2lnvPDd79ngBLssZPH5V+sf/AAUc/wCCrC/sd/GGLwzDo0VwssPmhgoGOa5H9lr/AILK+Bv2gPGMHhrxRpdvZjUnESNKg2lj2NfSTynA+1dFzakfzdgPFfjSrlyzl4NSo76N3t9x+OV3YXGk3TwXUTxTr1R1wVpigz/ukBZ2YKgHVia/VP8A4LW/8E8tG0LwB/wsjwpax26AB7hIVwpQ96/L/wABAS+ONFXAw10gP514eMy2WHrqm9mfunBPiPR4gyR5jR0cU7rs1uet+FP+CcnxT8a6Db6jaaBctBdKJE+U/drUb/gmD8Wyn/Iv3WB/sGv2Y+LXxytv2Tv2FtL8VxWMM8lnp8JKBBz8ozXw3/xEBsRvGhKVPTgV7lbKsFh0o15NNn4ZlHipxnndStPKsOnCEnHd9H6Hxr4v/wCCd/xP8CeHbnVL/QriO0s0LuxU8KOteIqcuc8Y4x7iv0Q+MX/Bcc/FT4caton9hxr/AGjbtbjKj5cjrX56W6efqiE87rjeV+rZxXiY2jh4SUKErp9z9t4HzriOthK1XO6ShKOq1vc9j+HX/BPz4mfEvw7batpmg3MlncL5kbbT8ynpWpqH/BNH4t6dAd3h26ZiecITmv2W+HfxHtvgB/wThs/GMVnBK2i6Et15W0fMQo4r4u0P/g4Kt7i8T7X4ej8lsE/KOK9qeT4WjGHtJ2cj8SwXi5xfm2KrwyrDqUaUnHft8j87fiZ8BPFnwjuzFrujXliP7zxnaPxrjygIOT7j3r9//hZrvwv/AOCpHwEvZxYWb3BjMUgCDzIXx1r8TP2xvgHJ+zT+0Fr/AIXk3G2tpibZj3UnivLzTK/YL2tN3ifqHhh4syz3FVMozKk6eIhujhvCHhG98f8Aii00nTIGmu7x1SJB3JrsPjV+zH4t/Z6SBvElhLZC64hdl4NdP/wTph8z9tTwICAynUIwVPIbmvv/AP4OM9KisfBPhDy4o0Pn/wAK47UsLliq4SeJb2NOJvEbE5fxdhchpxvCqnd9j4X/AGOf28L39jvw7qMOlaNFd6hfMSt0T8yZ7Z9q8t+MHxj1/wCP/wAQ7jWfEN5Je3t7LhQWysYJ4UVyAVUQjuefYVe8IJ/xV2kLwR9thGAPvfOK4frVepGNBv3T7fE8N5fgqlXOo017W17+nQ9H8bfsZePfAfw+j8UappU1vpTRiRZSOGU8ivKVfzI8jjccH2r9zv8AgpfocFp/wS9SRIo0kFhAAwX/AGRX4XwjMWc88AiuzN8BTwkoxWt0fMeEnHmI4noV6taCi6c3Fa9EySNsFf8AfX+df0ifsKf8mBaP/wBgI/8Aouv5uVGXT/fX+df0j/sKD/jAHR/+wEf/AEWa9bhT4pn4p9LXTB4X1PwU+Ip/4uTr3/YQn/8AQ2rGrZ+I4x8Sde/7CE//AKG1Y1fcn8IIVTzXrn7BXP7YfgDv/wATaH/0KvI1OGr139grj9sT4f8A/YWh/wDQqBn6x/Fz48p8JP8Agp9o2g3j40vxhp/2WYMeMnj+Vfmd/wAFUv2f5P2e/wBsTxFaJH5Wm6u5v7MheDG/IxX0F/wXF8Yz/Dz9trwnrlq7xXGmrFOrA9gwzXYf8FfvA0f7Sv7HHw9+MGkoJJ4LdIbt0GThhjn8alAeCf8ABFn4AJ8Wv2nY9f1KH/iTeFIGvZXYfKHUZFfbv7D3x+f9oz9pv4+auJN+n2VobKzAP3YkJAx+VeMfs7WCfsR/8Eqte8Xzf6Jr/jJTbW5bhirDAI/A1T/4IA3J1Kw+LdyxzJNYNIxP8WSTQwPia18O2vjL9t2DSr9d2n6j4iNvKo6lS5r3D/gs1+zV4S/Zq+LPh7T/AAjYnT7e701Z5QTkO2K8e8FH/jYDpjEdPFPAx28w19Pf8HC/Pxv8K5/6BSdO3AoVwOx/Zt/4Jo+Dv2k/+Cfug61Ei6brz6gs15qUjYC26/fGK6DwDa/sjaX4xtfhw1t9rv5CLeS/3fLJJ0OD9af4c8Waj4O/4IaXF1p1w9tcO3k+ahw21uvNflt4QvZrHxhpF4skn2j7XEzSbvmYlxzmqA+m/wDgql+w1bfsdfFOyl0Z/M8O+I0M1kc/dHXFemfsufsi+CPH3/BNHxd431OwM3iDTnYQz7uRgccV33/BcZjqX7L3wXvJ8PcG3IMhHJBRa0P2Jyf+HO/jvKgkM2Gx7GgD5b/4JefsTWX7X/xf1Ma1Mbfw34diNzet0JA6D9K+hNU+OP7Itt4ruPBr+HLlYbadrN7z/aB2ls/WvGf+CQ37YGjfsx/F3W9N8SsBoPiuFra4lb+A9BXrv7Rv/BJDSvi7PqPir4W63bakl2zXIto3BYFvmpAeRfs7W/wO8EftleIrbxIsmpeEhcAaG6N1YkYzX6Jft5a78DdM8A+C5PiTZy3emSQL/ZiRtgxx4r8Xf+EA1P4afGq00TWLZ7fULK/RJUcYOQ3UV+gH/BcRQP2f/hEwA3GxQZHpgUrAfI3xn8BeFPjn+1vBoHwjtZU0DVnSG1jbkhieTX2D4t+EP7PP/BOzw3p2m+PLZvEPiu5hVpo05EJPXNeH/wDBDLwZaeI/25NNmuFSRbG0lmRSM4YLkH86+l/20v2L/h78Y/2g9X1bxF45tLa+llINq8g/cD0pgcjrX7KPwW/4KBfBDXfEHwkjbSPEmhxGeWzY/eUDsPwr5K/4J+fBbS/iL+2zoXg/xRbGWxe4aG4i6FmHGK/QD9h34UfCv9irxdrGq2/jmxuYL+0aCSDzQQx57Zr5W/Yv1DT9b/4K/wBrd6aUksJtTkeFl+6ck80AfTPjn9iT4G/sY/EPX/E3xB8s6fqN1t0rTNwykXrXyjrfg34X/GL/AIKP+DND8HwbvBWuX0Ec8GeSG+8BVj/guP491LxL+23qmlXNxK9lpcQSCLd8gHHavJP+CcihP25/hmF6nWoc57c0dAO7/wCCtvwE8Ofs/wD7Ur6H4TsjZWLQgiHOcHtXuH7JX/BOvwJ8IP2eY/it8abnZY3qq1rZ52swPTFYf/BXbRo/EX/BSnQbGf5oriWFWHtvFd3/AMF7/ENx4a+G/wALvCVqzQ6ZHaCV44+Fb5BjP0pXYGp8OfF37I/7Tuvf8IjaaPJo1zcN5EFw3GX6Cvjv/go1+xLe/sU/GCPT0f7RomqIbixnxwVP8OfavCvDGqzeG/FOlXlpJJFcQ3cRjdDgqd4PNfp//wAFsII/GP7EXwq8R3KBtSKIAx+82UGeaLgflljhAevv3r6I/wCCcH7E1z+2l8ZDpsjeRomkKJ9Rl/urn1r525wGzuGcDj7tfqT/AMETrFPCX7GnxX8T2y41FklXzB97aqkgVQGh8QV/ZF+D/iQ/D+7sTPdp+4muV/gboTmvW/B37N+ifs4f8E8viXZ+GdSi1PQNbabUrGRGzsjdOh+lfjD441e48UeNNVvrqaRrm6vJJTIzfMvPTNfpz/wTm8WX3ib/AIJFfEdb64muPsNxPbw72yY0CfdpAfn7+yf+zRq37V/xysPCelqVFxcYuZQOIos8tX3T8SG/ZZ/YW1hfBesaY/iHX7MBL2ZPmCt3rO/4N3/CNtqHj74iarKE8/TIRHE56oHBzipPi1+wF8LvHvxN1vVdT+IVk1/f3Uks3mSAspLH5etMDH/ac/Yc+G/7RX7Md98VvgxlU0keZe2RPKoPvcV+dhJw67drodtfsZ+zDofwu/Y+/Z/8faIPGVjqVvrNlKVtzKD/AAngDNfj9rjI+v6i0IxAbqRo/ddxxQBp/DUL/wALF0Pnn7dFz/wKv0h/4L0uG+CnwpA4xZxY/wC+RX5u/DIg/EHQ8c/6dFn/AL6r9I/+C9AVvgr8LExz9jh/D5BQB+YVtM9pIjwM0VxbOJEYHGPpX68/st+K5f2zf+CTXiOw14i+vtAgdYpG5ZSo4/lX5C4wWDfMduQR6V+sX/BJm0fwN/wTL+I2sXn7uCaGUoG4BGwj+tSwPg79iT9ji/8A2svjp/wjkDGKwsZme+uP4Yow2Ofyr6/8d+Nv2Uf2UfEH/CHXWjSa/fWB8q8uk5Bboa6P/gg34Psrv4Y/FrW2lSKa6mltvtB/5ZJljkH8a4TxX/wTu+FHibxPqGo3nxCsXurud5HLSjO4noeaaAwf23f2DPBPi79niH4xfCFydC63dnnJgPWuW/4JffsMeG/jZ4J8RfErx3I3/CH+GEZ5Y16yFOor6p8Jf8K0/Zk/YV8b+CYfF9nq636STQRGQMysVIwK+f8A/gk9+114Q8JfDnxX8JvGcotdD8TmVY5ido+eldgbV18d/wBkn4sxX2hRaBPpWxHitbw8AMAcE18W+Cfh7oXi79pOy8PSXyWnh671HyvtTNwsOev5V9XftHf8EdLmx0m78RfDnUYNd0tA0vlwtuPl9RwK+LNF8Aa1qnj6Lw/a2s39uy3AtkhCnehzimB+iGo+Nv2Q/wBmuRNHlsZPEV3D8ktwg3Kx6GnftW/sN/Cz9oT9kG9+LPwdzatpKGSe3PcD7+a8t8O/8EgrrRNDgu/G/iC00W4vF3iKeQb/AF719i/sz/ADS/gF/wAE6/iZo2m63DrlpcW9xLvVtyxkjlaTYH59f8Envgd4c/aB/aUj0bxJZNd2MlszGLP8WDivsLUP2TPgL+wxreoXXxK8q7vdcuW+wWQYE20PbIr5z/4IaIf+G2lH8IjcY9snpXnX/BV7x7qnjn9t/wAaxahcyTW+l3rW9tGW4jQY4FNMD1D9mr4M/DL4/f8ABS+fQ9Lt/tHgq7tzNBGD0bmvoTxB+x/8Bf2IfFuvap8RfLmOu3rNpen7gWt7ftkV8sf8EQ41k/bs0sfdUWzYOf0rG/4LC+O9S8a/tyeJ4by4eWHS5Ps9uhPyqgxximBYv/2ZtB/a/wD22P8AhG/hZE0Xhu7Kyu/UQJ/FX098SNE/ZX/YUvI/CfiGzfxBr9mBFeSR/MFfHNYH/Bvr4atrc/ETxEEze2VmwiY8mP5CTXwN8e/El149+OPirVL2V5bifUJiWkOeA5Gf0oA/RL4l/sDfCT9tL4C6l4x+DLfY9V0uIyS2ZOScDOMV8i/8EyrCXSf26/ClrOCs1tqBhkB7MrYP8q+hf+DeXxneW3x58RaCZJHsLyxaQxs2VJA64rhPgh4ag8H/APBY650+2UCCHX2Kheg3Nk/zqWBn/wDBcBMftz6j/wBc4j/KvoT/AIKhfL/wTA+FX/XCL/0AV89/8FwPm/bnv+f+WUVfQH/BUWT/AI1d/CwjtbRn/wAcFSB8y/8ABMz/AIJ/N+2H4pu9Y1mY6f4Q0EFr6ZuA+PQ19J6x8Wv2PPhp4lk8KPoU96IpPs8l0vIyOCc10H7M0h+DX/BE3xHrGl4ivtUjkMki/eO/jrX5RgvdxvK7M0zHcXY5LE85qwP0B/4KHf8ABN3wxo3wRtviz8Krj7X4bnw9zEvPlKen/wBevz+8zI/r61+rn/BLvW5/id/wSm+JGl6tm4ttNFzDCJedmEOPyr8pp4ltrqaIdI5GQfQUANByK634Bf8AJdvB/wD2FYf/AEKuSHHFdb8Av+S7eD/+wrD/AOhUwP6LPjJ/ybfqf/YJH/oAr8u4PuV+onxl/wCTb9T/AOwSP/QBX5dwfcqY7kyH0fe49P0opQ2DVEnv/wDwT2+JA8NfFttKmOLfVU8pgTxzxXGfte/Ds/Dv466tBtxb3EhmiOOMNXF/DrxO/g7x3puoxkqYJ1ZyD0XNfTP/AAUO0CPxV4B8LeNbVN63EXlTEdwRxQPocx/wTp8CjUPH1/4guVAt9HgZwSOMgZ4rzL4y+Lx8VvjxfXdxloZr3y0Gf4c4r3z4Zp/woj9ifUdVb5L7XAViY9dpGK+VvDMzT+KrB3yxN0pPqxLZoEez/tk/AvRfg/4f8N3OmIyNqUCyS5PqOlH7Ln7KsPxI0G58SeI5fsWhWhLBiceZjmu1/wCCjibvCHgtTyrW8YwffFbfxvlPw8/YO0CysmdBdxKrupwXJ6k/nQNIy4fC3wQ8Y3Z0eyle3u2/drOzfLmvn/xv8Hm0j4y3HhfTJftmZgkDoc5zXFw7rZxh3Vgch1PIxXuX7Aum/wDCX/tCW016Wme1Uy5fktjpQHU7lvgZ8OP2d9Dtv+EzuDfarNGJHgQ/6vPY1F4i/Zw8FfHDwFe634BlMd3YoXe2J5x9K6D9oT9myy+JnxRv9Qv/ABBbxeY3yxF8bMdq1/2ZPhVo3wE16/um1+Ca2u4GRo/MGCcelTcD5g/Zz+Hlr41+N9hoGqg+S8rRzL3yK9/8R/skeDPhF4rvtW8TXaQ6QX221qH+Zx615z8DpLZ/230a1CtC947Iw6YzSf8ABQnxPfap8eruxklY2lmoVI88cimI9L8XfsjeDfjV8PH1XwA+2e34aMtkkisvwt8Bvhv8IbW1svGV2t1q1wg3xK3+rJ9al/4Jm6zPb6F4zTzJNlpbiSNWPCtzzXzR8TvEF5r/AIz1a7u55ZZRcOd5PPDHGKCrHs37Yf7L1h8MNFsfEnh1/O0S++8c5EfGapfsVfA7QvjRdauNWRpFtYGePbxzjNen+Nrk6/8A8E3bGe5LOcRFCeSPmPFYf/BM44uvEfHIt2yR2+U0wseFeCvCFtrPxyttEmXNpJqBtyB2TdjmvpHxx+xd4R+HvjG41fWbwWfh6EARxsfmlPevA/hyqr+1HZDDY/tY59/nr0//AIKWeKb67+J1tpxnkFnBECsQPBOOtIk7Of8AZp+HPx18EX0ngyYw3tohO0nkkCvk5PDDWPxAi0a6zlLtbeT88GvcP+CbOpz2/wAZ7m1R3FvPbtuRjxnHWvPvjJEtl+1JcqgwBqa5A9d1MbOw/bX+COi/BgaB/Y0bx/b4FeXcc5JAroPhf+zr4T8AfCe18XeOZWe31AZgiU4zWj/wUukK/wDCI4BOLZCM9uBW94M1jw3+1T+z3p/hi+vorLVNJULGN23LUhHnnxP0L4V+MfAt3e+GZn0+/tl3CJ+j16T/AME/tJ8GQ3dpPYTMfEYgcSoT1B6mvAvjB+yz4i+ECm5KPc6fkgunIrs/+CbKgftBnJyRZygY+lMZ3P7Q/hr4WS634hnuLk/26AXCZ6P6V43+zN+zg3xz8S3c08pttD03Mk8rd1+tYH7Tq+X8d/Eh5J+0k9frX1X+zD4HjX9ju9SK5Syk1cMHuCcFAfU0rjscO1j8DNP1M6HIssk+/wAv7Rngdq84/as/ZpX4OraavpMwuvD2qrmOYc7G64rqz+xfo8i728SW7MPvHzBkn1zXdftKvo+gfsbDQ/7Rh1DUtK2CI7gepxmmPQ4X9mf9lvS/jT8D7+9MZGreaI4pC3AHrXQeKfhJ8KfAfgu80a5u1k8SWluS0ofIEgHStf8AY81yfw5+yJ4tvLfIntYndD/tY7V8falqs2u6ncXlxK8k07l2cnqT2oJPf/2ZfgHoXxJ+EnirWL+NpbqwhkkgYHG0jkV4x8PPh5f/ABM8a2+iWCFpLiXYX/uc19M/sOA/8M5+Nsk5+yy8jt8prE/4Jt6DDefEnW9RkAZ7KFymezc80hHQal8EPhV8ALK3svFVydQ1J0BcIfuMeoqt4n/ZY8GfGLwFdat4Duds9rGXa3Y5Y4r5++PPii58XfFrWbm7d3K3TRqueFANer/8E4fEtxp/xem0zez2t7CyujHpSvYZ8/X+nyaRfzW1wuyaByjqexFQHjj8a9D/AGrtEh8PfHfXreAfuxOTj6156TuHT2qhCUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABQfuN9DRQfuN9DQLqfoj/AME9P+TdbD/faub/AGnz/wAXFb/rmK6T/gnp/wAm62H++1c3+0+MfEVv+uYrM06Hm1HfPpRR1rQzQEBx175oMeTwvUZXmkA2MPenKw3EqTwfyz1oGGMqGGDuPGO1IMqrZ7np3rwvwd+2fp3iv9szxF8IxAUutBhSUy567hmvc43yFbHIJUg0AOWLHOcUryED196bvO49QPWkHCA9jzVIBZH3IAeBXz1+09/wTs8K/tH+M4vFEd1caD4oiG1ry2baZl98V9C8HrnHtXEfHX9oTw3+zp4Wj1TxPfRWEE0nlKzdZT6CiQHz3oH/AASY0W+1q3uPFviXVPENlasrraSSkoSOmRX1hoGgWnhTQLTTbCEQWtlGEiRB8qKBgCs34c+P9M+J/hG11zRbhZ7C/AaNwc8elef/ALZn7TkP7Knw1g8QSwtJHNdpbbB2JIqQPXNxZF55TnaRSuuMjsecV5346/aR0b4c/A638d625t9PuraOQn+7u6V0Xwk+KGmfGLwBp3iPSCZdN1GPfE/c0AdFG4KEc9aBnHI460MwEuP5ChDlSS3tjvTYCbzI+71/lT1X5fl4PemE5bpSh9vfp2pAKmTCQSMHkikMxJ6ex96FG7jnNBGwfpQAH71AbK4oPDY70KmEzQTcRhuWn5Aj469vaoLy9h061M88qQwr1Z2wBS20qXqK8UivG43BgeCKBjxIYocY75pd7qoB/D2oU7vXGMignf1z0zQOwrSlIxjjvkUigBRn1zQGHY5pGfD4xQAvXOBz/EaTeqju2Ohrzj9ob9qLw3+zHZabP4il8oatOtvFxwSTgV3ui6tDrmkWl5bHdb3cayxcdVPP9aa1At42kB89OAO1BBEn/PQMcNjsK8w/ar/aVsP2Y/hrPrV0VmuZXEdvB1aZjwABXR/A3x1e/Ev4Y6Xrd/avYz6nEJGgYYKA8jNPlA60MU+UEnHGR6UbPLGeNo5IpScEDjpge+KahDIGI+VulSApYtg9hQBuOe3UUA4H44xVXU9Ti0TT57u5bZBApdzn7oFNAWUXIbPyn1zSOmFBOMH3rwS5/wCCkfwstL2aD+2o2eByjEcgEdRXVfBz9sHwV8dPEh0zQL0XF2i79voKQHqRyJMjuME+tAcKOe9DOcvuxkcnFIygnr2zigBd1FJn5QfWgNkH2oAWigDJpCcf19qAHDO/pzSdD7eteb/tXfHyL9mz4N6j4tmi81LNlXZ7EgV0HwU+JMfxf+F2jeIYk8pdUtxOE9M0AdRRSA5APr0pTwwHc9KACigc/njmg8UAFFGMmgjFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAH3BRRRWZoNf7tV72UQWczk9I2P6VYkzt49azfE1x9l0W9f+FIHJ/I1nLYulHmqJH86X7c+vf8JJ+2L8QLknPmak0an0xXLfs7fF6x/Z7/aT8E+MdQ3m30jUEa4VP4lzSfHnUf7a/aC8c3m7eJ9Wlx7YYjivNviBbnydKP8Adv4wSe4Jr8jxWI5cx9p5n+juVZFh8bwbSwVeOnL+Z+5v7DP7W3gr9tr46/EGDSYxJYXcKvJBKvU9CcV8Pf8ABXv9hCT9nX4ox6/ocBfRvEMuyOBBxFMfb3rxP9g/9sdf2IP2jU1/yN+n6lC0Nyi/xYOcivor9tX9uq5/aU0HRvEYVW0+9laDTYMZWJx1Y+9e/isVQzGjDC/8vZOy+Z/KefV8x8PsTWx1B3w6jr28jw/4QeOD+zBFb2GmW0s+o8XF9eQt88RPOwVD+0HceBP2iEbV9Ylkt9R3ieWZY8PuHXPrVXTtNbT1dmPmTT/PJIe7H1ql4ujgl8P3gPko5iIUEjn1r90w/gfhsPlUatetaVrv1P8APjNPGnHZ1nc6cafNGcv1OX8GeGPh54cL33hnRl1q8TL/AGi5Hyhx3xX118Pv2QZ/25/B9lL/AGFp16tno0dxIoQK4csVOD9BXxf8NNLP269nt2MVpBalfKH/AC0b1Ffqb/wS7+LOmfA74La14l1eVIrLS/DsczszY3sHJCj3r8f4j4PwlF4ecJP3r31P1XhfOHUxFfC4he7BI+VtO/4J96P+zL8R/wC29QsTbXcYUxwXP3FC98V9Hw+Fvif+1F4aaWyP9raRZR7fJVtsRjA+4B9K/Ov9vr9v/wAY/tafHS7vkvbzS9K84R2kMJ2gw++K9x/4Jrf8FMNc/ZH8cWeh6/eSah4W1WVIZPNbJts45r57+wqfN7GVZ+R0YLjzL6WO+qxirX0PH/it+zXfeG/jtb6XYWkqReJr77PFGRzbS5wUP9K/YT9mP9kbQv2J/wBk7VdQuIo/7Tj0yWe5uCvzFjGTjP1rzr/goF8BtH/4R3T/AIu+GXg+xzyxXjBccSHlXT3r56/a7/4LAXWn/s5ax8Op4vP1+e2S3kuIzxtYD9cGscknTy7Fzw+K1l9k/p2hnuacQ4GhlWDuqatzW7Hln7fX/BQ3wT8a/wBhTSvhhpQuG1h9ctrueTGEcq5Lc18leSESRUH7scY9PauW8ZW0Qg0cA/K90sh29jnNdYG/eP27H0JrmzXMfrVf2ltj+t/DjgrD5Jg6lKk7uSu2fsz/AMG+Ot/2n+xRd2hcsbPXLgKM/dXjAr70bkV+bX/BuFrn2z9n7xfY9PsusyOPocV+kpORX6XlcubCQ9D+EOPaHsc+xUP77FVcUP0pV6Uj9K9D7J8gfmT/AMHI3/Jvunf9fY/pX4rZwtftT/wcjf8AJvunf9fY/pX4rjpXwHE/+9L0R/pT9GC/+qit3Yu7eoFffP8AwbyEn9rjVP8Arwb+VfAwOK+/f+Dd1PM/a61Q9hYNn64riyRf7bD1PsvHOov9UcVf+RlD/g4BfP7XFkdvIs8H6Zr4i8HzTWfi7SZLUus63SFCp+bOeK/W/wD4K0/8E0fG37Unx+h1/wAPqDZpbeWSfXNcJ+xf/wAERLzwn8RrHX/HVzH9i06UTiJjgMy8jNezjsur1Mb7ml3ufjvCPiTkmX8EQwVeadTkty+dj6y/bBuJLz/gllJJrH+vOiR539d2xcV+EHgCTzPH2kHaBi+jzj/er9Vv+C3f7b+jad8LIPhj4bu4pppcJOImBWKMcY4+lflR4AQL470Uf9PsXI6HLVnnlVPEU6cHdxPS8EslxOF4cxmOxEOWNZykl2TP28/4KWBpP+CWUYRWZv7PhBAGcDYK/C+K3mWBQYZOn92v6R/Eum+ENT/Y40iHxo0K6KdPh84yfdxsFfKEnw2/ZXUYW40vGcD5h/jXp5pl/wBakpSklZI/NfCTxEqZDTxWHjh5VOapJ3Sv1PxnkBgIyhUn+8KdYc39tnIbz1zj6193/wDBUDwp8GNG+FdpJ4Clsm1QXAUiPB+XvXwjY5/tO095V/nXx1fDOliFCbuj+uMl4llneSzxTpOno1aSsz93fi0v/GnLUe3/ABTH/sor8GbKTNrj5SO4xX9GPwe8AaN8UP8Agnjp2h69OtvpepaGkFxIxx5alRk5r59+F/8AwSU+BWs+Io4bXVLW+dCGCCZTvHp1r67M8uniFTa7Kx/IXht4j4ThmpmMcVTcr1JO6TZ5n/wbi+CNc0fTfF+rXcVxb6NcFRDvyFkIHJFfKH/BaHxVZ+Jv21NTWyZJFs49kgX+9mv0q/b5+Otp/wAEzP2fk03whoZWC5TyYpIk+WNj3Jr8O/Hvje++I3jC+1zVJnuL3UJmlkkY5Jyc4+lcWcVFQwccI/i6n33g1gq+fcS4jixJRpvSK/zPV/8AgnGxH7avgL/sJR/zr9Bf+DkhseA/B3/XxX5+f8E5W3ftq+AjxzqUf86/Qb/g5DOPAvhDp/r6MB/yKanqPj7/AJOfl3oz8icgj8BWj4QOPGOjf9f0P/oYrPHy1f8ACXHjDRmHX7dDx/wMV8zR/ix9T+o+IGllda/8r/I/cf8A4Kbyn/h10ntYwf8AoIr8J7c/uucda/dn/gpzx/wS5TsfsUHHp8or8JID+57V7/Ez/eQ9D+e/o0NfU8Z/19l+Y4vtlX/fH86/pH/YSOf+Cf8Ao/8A2Az/AOizX83PWVP98V/SR+wp/wAo/tH/AOwEf/RZrr4U+Op6Hyf0t/8AdMN/i/Q/BP4j/wDJTNe/7CE//obVjVtfEf8A5KXr3/YQn/8AQ2rFr7Y/hHqKOa9c/YIXb+2B8Pye+rQ4Hr81eRE8VvfC74gXPwq8faV4ishm90idbiHPTcKAPtv/AIOCU839pjSt2Qv2PCn8ea9n/wCCN3inT/2sf2QfEvwk8RSiVtJlEkG85PlE8Y+lfnn+1b+1nrf7XHjaHXNbUCW3i8vA6Un7J37WPiP9kHx3Nr3h58m7i8qaMn5cfSkB9c/8FxPixZ+Fbvwx8J9Ek/4lnhm1TzUQ8b8Dk10X/Bvyu7QPiq3Qf2dwV79a/P742fGPVvj78RdQ8S6vMZb++fc2T90eldt+yt+2j4h/ZLh8QRaCgaPXbfyJj6CmBL4JVj/wUA0/JwB4o4/7+V9O/wDBwxGV+NfhQgddITk/QV8N6X8SbzTviZD4qHF9Fe/b1P8AefOcV237Wv7W2uftdeKNP1XXQBJZW4towPQDFAH3lPz/AMEHJM5x5y4Ga/MDwvuj1/SB0Buodw/4EK9i/wCG5fEh/Zc/4VU23+xTKGLd+K8Yt7r7LdQzDh4nV19yp4/lQB+mX/Bbhf8AjEn4Mcf8sDjn/YWr/wCxJ8//AAR38eYyTubGT/smviH9pL9tnxH+038P/C/h7WwqWvhaMpDjqQfWn/Df9uHxH8Nf2e9V+HVmobS9WYs7dxQBk/BH9kHxd+0P4M1/WvDEAvhokuJYF5ckk5Ir6S/4JieA/jX4G/aa0O1+z6vbaCswF8J93lLGOvWvm79ln9sTxX+ydr1zeeHZgIL05ngPKy/hXvPif/gtZ481jRJbSx06z0uadSpnhjCuc+9TbUBf+CxGsaD/AMPAoZ9IMA8nyPtzRYwsoI3dK+kP+CrPwS179oL9lv4W6r4Ts31aG3so45RCN23gelfln4z8Y6j4/wDE93rGrTyTahdyGV5XbJYmvpn9nr/grl47+AfgWHw2saanYW67YlnG7YKoB/8AwTi8T3n7Ff7eHh9fF8D6Y1xCbeaN/l2LIMAn869S/wCCsn7EvjWb463fjTwol3rGha4gmSS1YsFz9K+Ov2gP2g9Z/aG+L9x4w1H9zfzABPL+UR46V7h8Ev8Agrp8Qfg/4Wh0e5EetWVuNsa3A34H40Aee+CP2KPix41ikuI9K1SG2t0LvJMWUYA5612f/BKPS5NL/wCCh/he1mO57a6eN+eQw61sfFX/AILB+PPiH4fuNOsba10eK5jMbiFAvBGDXz/8D/jlqnwL+MNj4z07DapaOZuf4yepqbage8/8FqFx+3t4mJ4GFxjqeledf8E4wT+3J8Mz3/tqDgd+a439o74/an+0p8V9Q8XasAl9qJ+dcdKyvhF8SLz4OfEzRvE+m4a+0W6W7hB7laoD7I/4LSeID4T/AOCgWm6mDzYeXP8AXawJH6V9Bf8ABRf4Kz/8FAv2M/AnjnwS66jqmh24+0QRnLMpUAjHtivzZ/ag/aT1f9rD4ly+JtZXF5IMYHGK6v8AZZ/4KAeOf2WreW10u7kuNOc5NpKdyr9BQBofs7/8E9fiF8XPitpumS6Jd2FpHcRyXlxMhVFVWB649q+kf+C7Xx00prPwL8LNFniuB4ct1e7MRyEbYFx+ledeM/8AgtZ481/QZLPTtOs9JkmUq00MYUnPvXyL4y8X6j498R3Wq6rcSXV9eSGSSR2yTmo5QMsgquc4Xtn1r9Lf+CC3xM0zX/BfxA+Geo3CWs+rwtJaq5x5u4YIFfmmGxLuxu/2T0roPhZ8U9Z+Dfi+11vRL2W0vrZgwdGxkehq2tAPbfjX/wAE2fiZ4U+OGq6NZaDd3cE947QTKhKMjNwc47Cv0T+D37Mo/ZM/4Jj+NvDc1/Dfavc28l7fpEc/Z5GT7pr41uP+C4HxDvPDf2M2Nqb1Y/LFwUG9eOua8l8P/wDBRbx1ong/xbpN3eSX8fi4sbkuSxXOeBSa0A9u/wCCEvx30v4X/tC634b1S5W3tvFcRhSRzgNJ0ArjP27v2B/iN8Lf2gvEU2l2uo6ho2o3L3drcQMzLtYk9vrXypoWv3XhnXYdRsLh7e7tj50UqHBRutfXHw6/4LN+PfCXh2307U7a21sW6BQ86bjx7mhAeSWP7FXxQvPBWo6/fafqNnpWmwGeeSZmXco6jmvFYjhvn+VuSPQrX078fv8Agqh46+OfhC80N0t9M0q9GyWGFNu5fSvmBT949dw4HpTA3vhm5T4jaCeAPtsZIA/2hX6qf8Fhv2fPFPx1+DHw0TwzpsuoPbWURk2LnHyivyV0zUZdI1C3uI2PnQSCVcdiK+utC/4LR/EjR9CstP2xyx2MSwpuXOAowKlgYXwY/wCCTPxQ+J/ii2gvtObSbFZQJp5RgBc819Y/8FC/jn4X/Y5/Y7s/gr4TvIrnU7yEJfywMPlHRice9fKvxA/4K9fFHxtpslrb3q6esq7W8kbTXzR4q8Wan431aW+1W+nvruYku8rFic9qaA+//wDgg38YdLhn8cfDvVbtLVfEtsVtC7Y3SHPP614D+1T+wp8TPhH8Y9ctoLDVb6wmuXkt5otzKVY5GMV4F4J8aan8PPE1tq+k3Elpe2jbo5EbBWvrnwf/AMFsPHuh6DDaajp1nq7QrtE0yBmP44pgeI6p+x18S9D+Gl/4n1Wyv7LTbNcyGdmG4fjR4C/Yp8cfEj4RReN9As2vrBZChSDmRSO/FdN+0p/wUm8cftG+HJdEu3jstKm/1kMSgBvbis79ln/goH4v/ZT0x9P0cpc6VI25raRcqCfY0AfXf/BGTRPi14W+L9xD4jTUIfCUUBF59tzsA9OawP2c73wdf/8ABa3WJyLQ6aLiYWeceWZO2O3WvKfit/wWO8d+PPDFzpdhb22jJdIUkktk2EgjnkV8t6B471Twx40t/EdpeyxarDOLhZw3zFs560Afbn/BXj4efFfxH+17qaWkOrXWiTFf7O+zbvLAPbivpT9iT4EeI/gV/wAEz/iND4plZtR1W1uLv7O7ZeFSvGa+Q9M/4LTeOYfDAtL/AEqy1G7giCJcyoGdffNcRH/wVG+IVxpXiixvLn7TD4rtzblM8QoewHapaA77/ghohT9ttd33/Lc4B6DJryD/AIKYt5X7dnxD25y2qSbs9uBXG/syftJav+zF8Rx4n0Yh75QUKn0NYfxj+Kl78aviXrXifUAPtusTmZx70wPpT/gh/Hn9u/Sh97/RHyfeuN/4KuAx/t4+O8Zx9rOM/hXmX7N/7Qmqfsy/FO18VaMM3ttGYwv161R+Ovxhv/jz8U9Z8U6mQbzU5fMZR0zTA+zP+CDHx00rwF8X9d8JaxMltF4rg8tGY4DNtxivLP26P+Cefjr4WftEeIl0zRrvUdHvbtp7K5gUsro5yF4Hqa+Z/DXie/8ABuuWup6bcSWl5aOHhlRsFSK+u/An/Bafx74Y8N22n6jZW2tNbKFWadAzD3yaAPon/gkt+z9dfsV/DvxX8VfH6R6R/orJBFN8rnA6AGvlP9hjxzL8Tv8Agplp3iCVvm1bWpJwfVS52/piuQ/af/4KF+O/2nLUWN/dNaaTnJtYTtVvqBXmXwV+Ll98D/iLpvibS1ze6XKJUU96TA+mP+C3y7/26b9tnSOL8a+gP+CoqeZ/wS8+FWchfIjGP+Aivz9/aV/aN1T9pr4l3HinWMC8u1VRt/hxXV/Gr9t/xL8cPgt4e8C6kFTTtAjCwt/ewMUkrAfdf/BLTxDpv7Uf/BPPxb8JJ7mCLXkSRLeFjyykfKwr4L8WfsE/Ezwj44m8PHw5fyz28xhR0jOJRnAbOK4v4I/HLxJ+z/4xj17w5fzWd2g2sqtgSD0NfV1v/wAFwfHKaeiz6RYTXyptFy0YL5+uKoD6Hjsof+Cbn/BKrU9D1qaKPxT4xWQC23fPmRSCce1fkyG+UE8seWPqa9K/aJ/an8V/tO+Jft/iK/kuFhz5MGTsiz6CvNwMdqAEBya674Bf8l28H/8AYVh/9Crkycmus+AX/JdvB/8A2FYf/QqAP6LPjJ/ybfqf/YJH/oAr8u4PuV+onxl/5Nw1P/sEj/0AV+XcH3KmO5Mh9FFFUSJIpMWRxtbNfavwEtV/aW/ZHfw3LiS80qQKhJ5AHSvitTgt3OOF9a9J/Z3/AGkNT/Z71G9a0TzYbpQCh5AoA9Z/b78Sr4S8MeGfBUDbPsFujSqvc4Gc183+FWU+KNOHJP2hM/nWp8YfilffGLxvNrN5kPINoXP3RXP2F8+n3cVwvJhcOPwoA+qP+Cjsf/FJ+DCpPFsjfkK6kaOP2lf2GdPs9NIfUtOiCvGD8yuM8flXzZ8cf2h73422Wl2t1CIo9MhEanHXFV/gd+0PrnwRv5PsEhktpDl4j90++KCkynoHwD8U63r66bDpVyJy+0synCV6V+zpEf2cv2qYdM1a4T93+6mfPC7h/wDXrR1v/goPqV1YSCy0u2t7uQYaVUAIPrXgmveLL3xL4km1m6neS+nk8xnz82aBHvn7anwo8T6P8T7jWNN+1XOl34EkbQ5IGa8o8O/D7xp4nidraLUtiKWdmJAAFeg+AP26Nc8P6HDYanbx6jHbjanmru4qTxZ+3VqWq6RNZ6bpttp4mUqzIgGQaVgOe/Y0tng/aa0ZJctLHKyyE9c1e/b2X/jJDVuSOFP6V558NfiTdfDj4g23iCIeZcQSGQ+5NP8AjJ8ULr4veOLvXLpfLluSPlp6iPoT/gmi3mab47HLZtBx+Br5k8bMq+K9XByD9olAH4mu0+A/7Qt78ChrC2kYkGrxCFiR0x6VwWo3banqc88vD3EjOc9s0rWA+t/EgJ/4Jo2I+7hYv/QjWT/wTUybvxHt+YfZm/8AQTXkOo/tJalffAaPwG8IFtCV+fuQDmqnwH/aDvfgdJfNZQiT7dGUOR0yMUAWvhqpX9qOzB6/2t0/4HXf/wDBSU7PjVD1VjCDn8K8R0PxxcaB4/TX1GbmK5+0Afjmt345fGe7+Ofi3+07pAkgjCgdqYHpP/BOLL/HnOT/AMe7fyrivjRx+1Rcjn/kJr+PzVjfBL4w3XwS8aLrFtH5r7ChX61keJvHc3in4gvrsq7biS4+0bf7uDmgD6Q/4KUIZ28Ip03WyL+YFeEaj8KfFnw9Wzv4bW7jWcB4ZIQcEVf+O/7Ql98b7nTGuovJ/suJUUD+LFdj8Pf239T8NaDDp2pWFvqUFqmxDIoJAFID2b4EavrPiD9mjxI3jNT5UELfZmmHJ4968l/4J5XkVn+02Y8qvnW03l89Riue+MH7YOtfE7Rf7Mt4l06wIyY4hgMPevNvAHje9+Hfie11rT3KXVq+QR1I7j6Uxno/7Ufwm19PjhrsyadcNbSSGYy7eMc17V+ylqcfxX/ZY17wpDceXq1urFUzhvbH41514x/b2v8Axb4RubOfToftVyhjeXZyK8g+GnxZ1j4U+JzqulzMkknLqD8rD3qUhF7XfBXjPwzq8lhdQ6kJI2IJXdhqg8X+A/E3h/wtFf6yl5FZTttxKT83pXsqf8FA57iyBu9EtLm5AyZGjGSa81+N37SGrfGy3itrqOOCzgbckSLgVQHvH7LWP+GLfGY54t5MY78V8fqNif3SWIr0v4fftIal8PfhXqvhe3i3wakhRm/ug9a81Ybpju6gZz6mgD66/Ycwf2dPG/X/AI9ZOf8AgJrj/wDgnp46tfDPxhvtPupAkeqo0SknuSa8++Ev7Reo/CrwRreiwQhodUgMZb0zXBaTrNxoWqpfWsrRXKNvV14OaBnq/wC1X8Adb8F/FXUJoLKe4tL2Yyo8a5GGr0r9gr4U3vgS+1TxhrkJsbOzt28sy8FjiuW8Kft76nb6Ilrq9hBqBiXaJJFyfaub+LX7YOu/EnSjpkSpp1iRgxwjbuHvUtXEcV8cfGA8e/FHWNRQ5Sac7T6jNcsw+alU7FI9TzSMcmqirIAooooAKKKKACig9aO1ABRRRQAUUUUAFFFFABRRRQAUUUEgUAFFBIFIDkUALRRRQMKKKKBBQfuN9DRQfuN9DQLqfoj/AME9P+TdbD/faub/AGn/APkorf8AXOuk/wCCen/Juth/vtXN/tP/APJRW/65iszToebUv8PA+bP6UgGTS4I6fp2rQgpa5rdn4c0W41C9mW3sYVLyyOcbAK+WdT/4LA/Dux8YGwitry7tIZTA93EhMQxxuJqT/gsd8Srz4efscX0FhK8E+ryraFwcEBiAf51sfsUfsb+CdF/ZQ0XT7/Q7S9uNX09Zp5pI9zyFxyc0DSufN37K3jfTPiT/AMFofH2s6ROl7ZX9jA8Eyn5WGzn8q+2/2k/2sfCX7MelfaNfu/8ASpziK3Q5lmPsOtfCX7Dfwl0/4F/8FivH3hnTnL2Gm2qPEp/h3Lux9KwfjN8bNM8Vf8FWdRm8X2VxrOg+EYWWGwUFlZz0JFBVj62+GH/BVLwP4/8AF1tol3Be6LPekCBrpSqOe3Jr6dtLlL+GOaN1Mcyh1I6Ee1fmD/wUH+Ofgv44/BrZ4T8I3GmeJtMmjltJLeAowwRxnFfe/wCx3qmo63+zP4QuNVV11B7FBKr/AHgQO9BB6WE6jOc9K/OH/gpfolz+2t+2x4b+DGnXMv2LRrCS/vXibhZNpxmv0Q8Ta9D4W8N32qXLeXDp9u87sTgDANfm/wD8E1vjp4S8QftK/FT4l+K9Xtra9vb57G0ErDIjDHpmncaPTv8Agit8Tpz4A8VfDrVJWGoeDdRktoUkb5mQHANbP/BbnMf7Lemr2GrQ59/mWvBPhn8XvD/wY/4KzStoeowXGh+N1O7y2+QSmveP+C3nyfsu6Xzn/ibwkD1+ZTmkNnpXxKufCNn+wfpd144h+0+HotOgM8fdTiuu+E/jTwn4A/Zb0/xBoEf2TwjZ2X2iAdwvcCvDv289r/8ABKGTjl9Mt935VofD5w//AASK08/KNvh1gAf92gdkbPiz/gqt8O/D/g6z1W1M2otdDC28A3SJ6k4ra+Fn/BSP4cfE74c6j4ih1GO0GlArcQzHEob0x1rwf/gjX+yh4X1H4Cv4o1izj1W91CeRE+0jeI1yeleNeFv2VtD1b/gr1r/hGMvB4cYLeyWKNiOQ4ycigLI+t/hn/wAFZvh749+JVr4akF1pk99IIraa4Uqk7E4GCa+mPEXiXT/CWh3Gpalcxw2dsplklY4VB1r4C/4LX/Afw38NvgP4X8UeH9Mg0rUNB1WJVlt12MF3ADkVrf8ABVH426h4f/4J6eClt7iWKXxNbWkdzKpwzhlG78aAseh+Iv8Agrz4F0bWZ4ILHUr+zt2KteQxkxqenWvoH4JfHDw98fvB8OueH7xbuxlXDlT80T9wa+J/gR+0t8KfAvwH0zw5L4Ke782zVLqaS1LNI23k5xTP+COGp3+nfHr4ladDZ3tl4RnkNzYRTKQqFgTxmgk+ktd/4KLeAPC+v+JtKvbzyrrwodk0Z+/K3oo9a5v4K/8ABVLwD8YviDB4b2XGk31237j7UNnnY9M18x/sr/s7aR8ff+Cq3xgOvq01l4fcXS2pPySsWxyK6T/gs78HNB+E8Xw48VeHbGDSdUh1eKMG3XZlN2MHFA7Hff8ABZb9raH4SfAjU/C9i15beIdTt0ube6hyERd4HWrn/BOz9vzSPiR4C8JeDbqK/n1t7UCW5dTtdgOeab/wVe8L6d4j/wCCbmo69dWVvNq6adahbll+dM7ScGvRv+CcXws8O2v7K/grWIdItI9QeyVvtAj+ckj1oG0WP2g/+Civg39n/wAWXehXCXWp6rZEGaG3UuYcjjpS/s0f8FFvBP7SniltC09ptN1gqT9muhtZgPQGsL4weP8A4JfAL4qX+oa7Z2epeKNUYG5h2ea+e2RXxr8TvjF4V8Yf8FLvhlq3gfT30SK6nW3u1RPLWTOM8UEn6ffFz4v6D8EfBtxrWvXUVnZ267sscFzjoK+cND/4K/8Aw91nxDHayWmp2tjcyBBdvGRHnOM5rzL/AIK96xcePv2nfhZ8NXmeLS9cuBLchGx5ihsV9ZX37HfgDVfhxB4ek8P2Ato4VjWRYwHztHOaCrHE/tseJ/hhfeBPCWoeO4f7R0++vI20916bmIKn+Ve0jxHpPgr4dw6lNPHZ6NZ2iuJHbAWPbx+lfFn/AAWK8NW/hD4O/C/SrUH7LYa3bQRBj1VSBij/AILB/EvUfC37HPgLwxpcz2kni65t7OaVGwVTC8Z/GlewWRT/AGi/27/hH8XvHemSajp+p6rZeH7jdG0KFoGKn7x7V9d/s4ftEeFP2jvBsd94WuoXtrcCOSFcBoABwMVzX7O/7H/gXwD8CdE0d9Bsbk3dhGbiaWMM7Oy8nNfI/wCxzpUn7L//AAVv8W+BNOdx4c1yDzorbdlIznPA7UuYLH1t45/bq8DfDj4j6n4Z1a8+y32nwfaXMhxjjIArzzwf/wAFcPh74r+IFvod1Fd6aL2byYJ7hSqSHOAQTXz58TvgZYfHj/gsPcaXqzSGwjs1mki3cSADIBr0X/gs1+zp4T8Jfsav4g0bTLbTtS8M3EX2SaBdr43AdaV2Kx90WdxFeW8c0RE0VwoZXHQr2Ncj+0Axj+CHinBx/oEp3enymsf9jfxBceJv2XPBN7cOZJW0yMOSeW+XvWx+0CoHwN8V56f2fKfp8pqyT4C/4I8fs0+C/jZ8L/FN/wCJbSK8u49UlUPLyQNxr7q+FH7MXgv4Pa1LqXh7TLe1vWXY0iDtX5df8E6fg98VPHnhDxHdeCNZNhp41GVXUE4zuNfor+xP8NviB8O9K1FfHWp/2lLMcRHP3RigprQrftF/8FDfBv7PnitdBnWbVNZI3Nb2ylmRffFdL+zF+1xoH7T8V0dJjmt7ixP72KZSrKK+H/FerH9kT/goX4n8XePdCl1nw1rq/wCj3MkZkW3XPavtb4G+Ovhv4v8AC+seLPAUdjG5tDJMkOAfuk8inckzf2kP+CgHgr9mjWo9J1CZ7/WG5a0t/mdQe+BS/s0/t7+Ef2lddk0rTfPs9SVSyW9ypViB1PNfK3/BMb4caf8AtL/tK/FDx94shXWLqy1FrWyjuPmSJQ3YV9r2n7NHg/wz8RD4u0/TLfTtQtLeQ7oU2qwwT0pFWOc/aZ/bj8Gfsu3cNrq9wbnV5k3JZQfNIfwFcP8AB/8A4Kr+Afih4yt9GuBdaHeXb+VH9qXZ5pPQDNfPH/BOrwPZ/tg/tqfFPx14uT+049AvXs7G3n+aOMKxHAr0T/gsP+zL4dsf2aX8a6Hp9vo+s+G50mimtl2EnOe1BJ6F/wAFets/7EOuujBkk8spg/eG4V2n7H/i6z8E/sT+FdW1SRbays9MV5Hb+EAV86ftJfEOf4pf8Ec9J1y7Ym5vLOEs7dSylRXvf7Mei6T4o/YR8N2evOqaRLpqm5Z2wAAOeaCrHB6//wAFh/Auiak0cWn6nc2sTENdRwsY8ZxnNfQ3wG+O/h79o3wdDrXhy6W6tpjhjnmNvQ18xeJv2mfgB4X8Haj4c0rQLbUYY4ZLdporfcN2CM5rhf8Agg74k/tG6+I1natINJj1iR7aFj/qlLdB6UCsz6G8a/8ABSX4e+BvEfifSr+6xf8AhphHNDnmR+2BXYfss/tYaN+1b4TvdT0a3ntorWfypFmXDEj0r4K/Z1/Zq039of8A4K0/FP8At3Mmm6I/2prYn5ZmGcZFfpT4G+GOh/Da1eLQ7C306OTmRY12gmgR0Gd3K9KOO1BHHp9KKBIKKKKBhRRRQAUUUUAFFFFABRRRQAUUUUAfcFB6UUVmaCdFrG8bSZ8Hao2OBaSk/wDfJrZPSsD4gSm28GawcfL9il/9ANS9mb4bWrFeaP5k/HOr+Z4s8UXx+82o3bD2xI9czaaZ/wALHsvDkEtx9la/v4R5n/PMZ61o+I7z7b/wkkxXI/tC93L6/vXpnwm8QWHhfWvBWo6inmabYanbzTpj7yZ5Ffh2btxlUnHdXP8ARxYqrDhylGjvyI9K/aQ+Afg34f8Ah20udK8Vf2trljMEmth7jnim/A/WP7atLrwfKW+z3kZvNMZ/+XadecD/AHq779tj9nlNP8Xz/EjwvAmo+FfEIWf9x8wtGx3HavEPDWvHRvE2jX8T7fJu42JPcE9K8Dh3NHzQrRleUGn5n5Xm3D+Gz3hXF08XLmnyvR9D0EanqPifxBYaLbyfZGugUaU/89F4P9a7JP2abTWtJlt5taae5wYi4k+65rzH9ozx9D8H/HcN4TtMd0t0ip1DOPT8awrX4qXOk6Jd6sl1emV2M6vz5bydcV+58W53xBn0YPCYrkp8q0va72P4G4Iyrhrh9VI4/Dc9TnavY7u88Fp8LPGNzpFvN9p8qy+dyc7WxXU/tKfEzWvA/wCzLoGn2nnwaJqemw/bpkOBuDnAP1rz34VeJF8eeHr7XLqfzNRvR+8RjhhgdMV9zfs6/s9+DP2hf2U9Q03xxfxadpNnosNx9okYDy2EhOK7M2wdbDZbgcPiqilUs9fuPmcPVhmeb49YODhF6I/MmPW01iaC5shE9uXEZd8ZU+lU/idqNnFCoN0wuFUmKND99+3619TfF39jn4R/AvXtElt/Fv8Aaeh61FNcgwvk27L0Jr2b9g3/AIJg/BL9q+w0nUh4sFxrUB8y5tWkHzKHOABn0r5WnZ4p0pNafieLh/C/HKssTN6JnR/Gj9q670f9hTwBpV3IfL8PaHDNOhP+vvJF/cqfUDmvz5ttAt/iZ470+38QalJZjUrn7TdXRP8AqwecfTtX0x/wUptoPCWt2HhWwY/2db6ncwEA/eW2bbGP1r5z8MeD9R+JXiiHRdGs3u9TuGCoUXPlg8cmvzjOcb/tNavUla2iZ/pH4PcPYTCcNTxVaVptWTOj/af/AGf/AA14G0jQNb8K+KBrGnz3yxOvo69RXAWWrvqPia8tdmxYOQ3Y179+2R4Q8P8AwD+AvgL4c27w3niaK+N/qEyHd5LMc7Sa+d9G58calzhSoyP7tcuQV51sN7STvqfsfh/jsRPDyVZ9Xr3P1l/4Ns9QLeG/iNZ9ormOT/vo1+o+0givyr/4Nt5j/wAXOGOPMgx78mv1U6iv3nJnzYOm+6P4f8Tl/wAZLi/8Y5M7jQ/SkU5Iof71epLY+D3PzK/4ORv+TfdO/wCvsf0r8Vx0r9qP+Dkb/k33Tv8Ar7H9K/FcNtAr8/4n/wB6Xoj/AEp+jB/ySq9WKP17V9+/8G70nl/tfamx72DZ/KvgIDcK++/+DeHH/DXGq+v9ntz2HFcmS/73Tfdn2Xjl/wAkji1b7DPo7/gq/wD8FPvGH7KHx5g8OaHHG9vJB5jFh3zXxF8Vv+Cv/wAVviPprWkeotYRTKQfLOMCvQ/+DgMH/hrWzwMj7J9715r4RK5iye1dua5jXhiJwT0ufC+EPhrkmL4ew2OxVFSm0nc0PEXibUfF2sTX+pXM15d3HLySMSSO9T+A4w/j3R8ZC/bYsZ9A1ZKH5a1vh427x7ouei3sYwPdq8Cg3KpzSdz94zXA0cPlNSjh1aKi9Pkft9/wUmumtP8AglvE6s8f/EtgIKnBPyrX4YRanebh/plzwCw/eGv32/bZ+E+r/Gf/AIJt2ui6Jbm5v5dOhCIozn5RX5Dx/wDBL34uID/xI5cjttNfWZ1hq9SUPZdUj+UPAzPclwWDxccxlFT9rK17bXPAJbye84mmeVV5AZieaLGPzdStc9pVxj617l4l/wCCcHxU8MaPc30+iTRw2sZlYhT0HWvD7TdHqsKf6vZMAQeu4HBFfMSo1aVRKruf05QzzL8fl1ZZbOLUV06XP3k+Jmqz6L/wR31Ka3lNtNH4X4kU8qdo5Ffil8Mf2p/HHwt8S2Gr2Gt3vn2ciybTKcSAckflX7SfFwlP+CN+oHaP+RXBx/wEV+DFuuLcd8gY+tfTZ9iKtP2Lpvoj+a/Azh/BZo8zp4uClepJH79fDzWtE/4Kif8ABPyV7xIZry7s2jZiAWhmUdR+NfhL8RPA138M/H+taBeRtFdabdPAQw6KCQPzAr9Gf+Dd39ov+y/GmufDe+n/AHN5EbuzUng4++K8t/4Lq/s1t8IP2mR4ktYdth4iXczKOA9Rmy+tYOGLitdma+GeInwvxriuG6mlOo+aC7Hgv/BOuWKy/bR8BO8nH9pR4B+tfot/wcdaBc6j8LvCd9Gp8lJ+WxwK/KL4Q+N5Pht8VvD/AIgjOG0m9juAf7uDX7xfEjwj4e/4KefsS21vbXEM1zPaiRSGBaOUL/jRlDjWwM6EX7xfjHzZTxjl/EFWN6MXZvsfz9jmJSOuea1fAOny6l4/0GGIEyzX8SgD13g17t8Uv+CXnxU+G3iyfTl0a4vYw5EUsaHDL2r6Q/4Jq/8ABIfxRL8WtL8W+NrRrHT9HlFylvIP9Yw6ZrzMNllaWIUGran6pxT4p5FDJalWNZNuOivq9D66/wCCp040v/gmOkVydj/Y4Bg/QV+FFsv7sEciv1R/4L8/teadc+GtL+GuhXMczo4N6sbZWNVHA4r8sYk2ZHYDIrXiKpGWIVNPY8D6OWUYjDZJUxleNvazckvJsFGZU/3xX9I37Ch/41/6P/2Aj/6LNfzcRNiZP98V/SN+wt/yYDpH/YDP/ouvS4V+Op6H599Lb/c8M/M/BX4j/wDJS9e/7CE//obVjVtfEf8A5KTr3/YRn/8AQ2rFr7bofwj5gG2uOPl7mh13H5TRQoCn60AOIUrv5HYL6mmkYHI+7y2KTcFbBPzL94elKj7uw3dPYmgAGQP4d2cjA7UMc4BJIHXbQzdyu1u69qktIw95GrHCswB+hpgRqN54+/1UnpihXJ56Z4Oe1fcf7an7Cvhf4L/sKeC/HGmsf7U1oxmT0ORmvhs/Ou/26DsaQC+X2ZTgcgUoDHOCCDwfY00ERKHdtw6EdhRHlvl6E/xGgBUQFwGJDLw2e9Iykkk54OFx0xRnORk/L+tIJM/K5wRyNtAD3IUblAK528dQauXfhm/srFbmW0uEtZek5QgH6GqsTZmgY8Av0H86/ST9uT4b6Fov/BKn4capa6fBBqE6gtMqAPKeOp9KHoB+bGcR9yq9Ce9DZZsZG7rxSEgqeuAdzKKUfOoccqTznqKYAclcDhe+KQqAgAA2nuaR/wB10IDA96U7Rxg4Y456IaQAVA/2j60Ecgj72eg64oLcZHzMByO4ru/2ZtP0HWPjz4Wi8SFF0KW+jS8Lfwxnrmn0A4blS2coT0DDkUwRsoJP3s4UjsDX1V/wVT8J/DPwr8VdKh+Gs0E9k1qDceUeCfWvldfmHb5Mg47mkBc0Xw/feIrlodPtJ72RRlhGhY/Xiq95aTWNy0E8bxyRnDA8EH0Nffn7HkXgj9jj9kDVviJrh07VfFOvwtFp9nJhzECOuK+EvGfiWTxh4r1HV5MK19MZgicKu4+lOwGaF44O7/ZPakQY5pGZTJntt60GUEAA44yc96QDl3MTgc004KbR8w6n1BpQ+4ddoHRe9FVe+gAcMv8AEf500MWX7yqB3Ar1X9j79mDVv2s/jHaeGNLU/N+8mfHCL3Jr73179kr9mj9m28Twz4o1dJ9aRQlxhgdkncGk+wH5arzzjDddo70mMDA5z97Havrv/gof+yB4D+D/AIN0zxb4A1yLUtO1KXYYQ4JQ18i78nAOCe4pABBY4wOOnvSBdoz3oMoRuqA/xbu9OKqxwrdec+tADVO1eeNxzxQzbsZBx0FKCR04LetIJ+wZeOD6igAH+sGQBRt2v0Kj1I61Ppyo+oW0ch/d+au9j3XPNfan7evgP4NaH+y94SuPBE9vJ4glhiN4QRuDlQW/WmB8Sg7mIyTxwBQmAMY/A0gyuVyCzHqKSPhuvIHQnrSAcT5Y7Iw5I9auzeG9R/sgag1pcC0J4mKHaPx6VRmTcnPAxwa/Sv4m/DnQ7X/giLaaymm20eqNewqbnYN4B96APzULY64JP8PrSr0Ix9F9KRAGRODyuAD396WgAEYH8TqTwWPQe1BORlR83RceneiigBCN53H6DHU0v3+Dx/db3oooAA2SWxjjacd6APKA3fLjv3NFB5pgKg67lPsaQjKcZyOuelFFIAKBUHHPqKHO5QcncDgEelFFACjljgY29Ae9IOT3kz0B/hoooARyTxjf79hS4AHXP0ozRTvoAZ4xn5jQOlFFIArrfgF/yXbwf/2FYf8A0KuSrrfgF/yXbwf/ANhWH/0KgD+iz4ycfs36n/2CR/6AK/LuD7lfqJ8ZDn9m/U/+wSP/AEAV+XcH3KmO5Mh9FFFUSIeDnoPWlIwdp3YHO6gLu9frQHyuF2nnn3oAfFayTxFlik2D+MCmH3Xnpivp79j3wHpXib4C+L7u9tYpri3iZo2ZclOK+Z70D+1JlHAWRgCOnWgCLlFw3POQPSkHHTP4UrPh+CpPTNIR8hAPPegBBxnJK+/rTsgY4x7+tNUiTvUqQ7riMZ++4Tj3NO4iNpSxwc59jS4A6ZPsa+ubH9ifwjo3gjStU1nUxai+hWX5jjkjNUr79iPw54z06Y+GNaiurtEJ2BuWFCdij5T3E9Bn2FB4bcPm7HPatXxr4Mvvh74lutLv0MVxAxX5h1HaslzsJZ8KvdR1zVcyEDKOASSp447Gjbklew+8e9KGGDgknqQ3pTQ4HPr0qAFPUZyO4Y0u4hvlGR7elMB3dt3uelPVCv8AhTARVC9OQO/oaM59SQetDELg5ZcdRnrSSLld2cj9RQgHgBmy2f3fUigyfuzu5P8AOuo0b4K67r/w7l8Swwh9MtWKyN345rlF+bGfTdtNIB6dMnOccE9qY+eMYHqBRwcZbh+wpc7T1G319aAFxjgHaDzj1pCdz5A2+o9aFfk5Ix2OKUuojyWy1UgEI57j2NKfkHGc+lI/zR5PQjOR7V75+zX8L/B/jD4U63fa5dLHqUaMYEZgM4HBqQPAydw6MPU5oGcdD9T2p93FHBfXCoS0SuwUnvg1Gz4cKM8+lADs7TuLHB6kfxUoYogGAO4phw685G3pjvSSHYOTheme9MB+fmBwVA5PvQTvPY+wpEb5sHGD90etKrLt4BGOKQAeTwG+lLuJ9z6ntSfe5z7+9CPuXIPynue1ACZyeuT6+tA5NOOI2zn2BHemED+9/wDXp3AUfMaAu+kkfYB79CO1KdqYzu6fnSAM80ZxSsu0kn0r0j9nH9nW/wDjzrUqofJsLUBp5DwAO9AHmobIozzX1w/7OPwstJv7MfW1+2IPLJLDAevCv2hvgvH8HPFCQQXcd5a3KebE6tng0Aee0UowSDzimiRRxzn1HSgBaQnilyFzyOnOO9DMvykfdxxQAh4QGlNIMI2eW/2fSug+F+k2WvePNLtNQdYrKadRK3TAzzQBgUYzXr37X3gXw14H8XWkPhuZJ4JY8yEHIXFeRp0+8P8AGgBAuRQrDy29e1NEu4dMe9WNKVZtas0bDB5lBBHXmgCOSxmtgC6sA3TIxmmlCpr6Z/bq8DaV4T+Gvgu4srVLZ7i3Hmsg+8cV8yRLkZBJPvTBi44opWYbl6Z9B1oc4/zzQgEopD8/8W3HX1NKGBX296QB1oP3G+hp7Ltk44JFM/gP0oF1P0R/4J6f8m62H++1c3+0/wD8lFb/AK510n/BPT/k3Ww/32rm/wBp85+Irf8AXMVmadDzbG6kClMjnc3TFLSj24Ycg+laEHzD/wAFbvgxf/GX9kLV4dLhaW+02RbpFAyTtwT/ACrhf2QP+Cm/gjRf2XdOtfEFzPYa74ftBbyWjL88hTjAHvX2leWsGpW00M0YliuBteEjIavGLr/gn/8ADG58bjXG8P2pufML7AvyMfp0oGfFP/BPz4k6h8af+Cr3jPxjfaVNpK63aKYoZEIIjAwp/Ec1e+NGnWv7Hn/BUe58WeKtKGoeDPGEBRrho9ywP71+gfhz4EeGfCfj2XxFY6Zb2+ptEIfOjQDKgYAqx8UPgv4c+NGgfYfEOlW99AD96RQShPoaTHc8E1r9rb9n7SLCGaGHTr15NqJGkILFj0r6P8Fahbat4WsbmxhFvb3ESvBGBgIuM4xXkfhb/gnb8MPC2p/bbfRI5JkcMqvyFIr2y2s4rO3SCBBDHGoWNR0UDtQSfNn/AAVl+N0/wk/ZI1WCzDm+19lsotgyfn4ryb9kz/gkz4Q1D4AaHqGuC5j1jUoFubkKxHzNzn9a+x/ij8GfD/xk020t9es1u4bKUSxhhkBwciuktLKLSrKG1hQQpCgCKvZRwKY0fmF/wUs/YE0v9lPwj4d+JHgtbp7zQNQjefksSu6vSf8AgpX8Qx8Yv+CeHgfxBah5RqdxayMcZbPygj8819v/ABE+H+k/FXwpPoutWy3VhcY3xsM5xWDffs5eFNV+GmneFZtOibR9MYGCIjhCDkUDufO/7d1u83/BK0hVO5dLt8qBz09Kv+BFZv8AgkTp42nzF0BiFxz92vo/xZ8LNH8a+AT4c1G0D6UFEbwkcFR0qW0+GWkWPgFPDS2saaOkPkCDHy7KBXZ86/8ABHNZIv2QrBXXYGuXGCMY+Y1434Et5Jf+C3HiB9hVTZrsfbwcD1r7v+Hvw30v4V+HV0rR7dbW03FkVBgEmqEHwR8O2XxLfxhFp0Sa5KgjebHzEUBdnyz/AMF4UluP2OoNkZZjq0G4KM5G+sT/AIKC/AvUvjJ/wTf8FT6TbPdXfh+ztLvyVGSQqqTxX2T8UvhXovxj0EaVr1ol/aFxIEcZG4HIrWs/DVrZ6JFpQt4/sEMQtzDjKhAMYx9KT2Hdnxx+zH+2D8FPEXwa0dfEFpY6XrVjbLb3dvNCA4kQYz+le7/su/GbwJ8YLjVG8F2UMC2qmOedYtoc4rL8Vf8ABOj4YeKtcOoS6HFHLJIXYKMBj+FelfC/4N+Hvg5pD6f4f02KwimGWZB9+hCbPi//AIJ1QPa/8FQPj3JJDIqtbr8zD7539quf8F1reaX4WeA1RS3/ABOYycDJA319geD/AILaB4F8c6t4h020WDVdZULdzgcvjmpvij8HtB+MVlaQa7ZRXkVnKJoUcZ2MO9MD51/4KNeFr3xd/wAEwdQsrKF7i4bS7WUqo5wqqTx+FVf+CaX7YPg7xD+z/wCD/B6XTLr8Fv5BtSMFXUf419Vah4XstT8Pto88Cz2LReS0LDI2YxXnHw5/Yq8AfC3xkde0bSIbXVF3MjKMYz1NA7nwb+zBr3hbw9+3v8VD8ZQRercObBrsHy0Tcdu3PHSsb49/EDwr8S/+CkfwwfwZpYg0ayvo42uIoiqStkZOa/Q34w/sb+Avjlr41fW9HifUGA3TqNrSEeuKt6L+yR4E8P3OmSW2hWyT6Mwe3lVBkN9aQcx8k/8ABZHwTqng/wCM3w6+K1lYzXVt4XuQl2I1yVjLZNexX3/BV/4a23w0s9WguWutTmhQQ2KKS+/GMEfWvonxl4O07x1ok2m6raxX9tcLteKRQRzXkvhn/gnj8L/DHiNdSj0CEyxNvUMMqrdelAXPnf8A4K4eJJfiL8CvhRq32OSJ9R1a3uPL28xbiDyK1f8Agrh8EtX+Jv7FXg/XNDt2udR8GyQX7xIMtKoVf8K+ufiB8HPD/wAU9LsLTV9Pjmh0+RZIAyjbCy9MVvSaHbS6KumzQJPZeX5TRMMgjpimFz5d+AP/AAVI+HOp/AfSLvWLxrHVNMskgubWUYYyKuCMfWvH/wDgnpoep/tP/wDBQbxp8aJ7SWy8PWkf2bSzKhHnHPbNfTHiD/gnN8Lte8QPfSaDDFI7eYY0GFY/SvXfBXgHR/hvoEOl6PZQ6fZRYKiNQMkUCufD3hlJW/4LNamxicZ04MSRx09a9H/4LXQPL+wX4mSNfMYzxMoUZIG8V9EW3wX0CD4kyeLEsk/tl4/LeYjkrV34j/DPSPiz4Wn0fXLaO80+4wHjYZDEcigdzhf2GkaD9lHwTkbf+JbHkHtxXT/tAIZfgn4pXnzDp0uFx1+U10nhrw7aeDtBtNOsYVjs7GMRRov8IFTalp8WsWFxaToJop1KOD3U0En5if8ABJP9sXwd+zl8NfE2leJ7iWzu5dUlkVSp5G419x/Bj9tnwL8dvE0mj+Hr57q88oylSOw5qld/8E+PhfdXckjeH7YtIxdm29WPWug+FX7I3gj4M+IW1PQ9LisbyRdplUfdHpTWpVzzbxt+1p8Gvinqer+HfGC2sFxpbNC6Xkf3wP7tfNf/AATa8OnWv2wviTH4QS7X4dXFu8Vt5mfLLFSDtr7I+KP7C/w7+LWuPqOp6PEt9McvIoxvPviu5+GPwZ8O/BnQvsHh7T4tPicAN5S4LkdyaQj87v2I/jVafsBftXfEbwb45Sew0vXb17rT7x1OwktnGa+vfAH7fPhb4zfGNfB3heObUI54HFzdBf3aZBGAa7X40/sqeCfj8qTeIdGguLiEbRNtG78+tTfBv9mDwd8BI93h3Sre1nI2+bt+dvxpD5j4H/ZO+Iy/8E5v24PiL4X8bwzWmgeK7h7uzuyp2ZZiev411v8AwUy/bI0f9o74Y2vww+H5k1vUvEV1GkzRISkKZ619n/GL9m3wh8eYYx4i0i3vZIBjztv7xT6ZrF+FH7Fnw/8AgtrKX2kaNALscpKy5ZfzpiZ88ftp/Cp/g9/wSltfC+0vNplpDHtUdG+Un9apfHS28Q/8ObbQeHRONSFhDvWLIfZ/F79K+zfiH8PtK+KPhqfSdZtkuLGc7mQjPIqTTfAOl6f4LTQEtI20sReT9nYfLt+lA7nwd+yp8XPgX4F/Yy0yW7tra58RJYtHdWkse6eSfbyfXrUf/BCaUX3ir4l3aWUllFe6q8kUTLt8td3FfUek/wDBPz4Y6H4wOsQ6FD5oYuI8fIT9OlehfD74NeHfhReXkui2EVhJqEnmyGJcA0BzHxf/AME/4JU/4KjfG3ejKmz5XZfvmvvhhkMz/MzHoOxrlPC3wV8P+CvHep+I9PsVh1bWRi5mAwXHrXWFQWHOR1xQIKKKKCUFFFFAwooooAKKKKACiiigAooooAKKKKAPuCiiiszQRjhaxfGsJu/BWrIOWNpLgf8AADW05+Ws/XYvN0C9TqWhcHHfg0nroyoycWpLc/l6+KHgHxL4G+IWtLqWkXdvYXkt7Pbt5ZKSL5j81yVlOifDvS8AOVkVtp9zX7gfDT4WaB8S9Wj0fWtLtLpf7Pv4Q0sYJU5cjHvXwj+3D/wS+/4Vr+yfpnj/AMFpNN5GptBqNqBnaCxxivi804cTvKC3P6g4E8YoKnDL8etNFc8s/Zv/AGtbn4HXjaRrEQ1vwtfgC5sZvm8pT1Kiu5+NX7KXhnxBJovjr4datb3Hh/VL2IXOnM/z2pJ5AHtXy5r2i6h4Y+JlnaanZT2k/wBjVxDMu0YPfnrXqnwE1GfwxaeK9c+0yLpmjWe1Ydx8tp5OFYDpkGvxXOcilhK/taEuVvofomfYCjWw31zK5+7N2a73Nv4uRfDHxb8W77Uby61C68hUtTGADGrINpx75FJP4r+GMfhz+y3+1i2EnmhNozuryjRNJm8Qa3ZWMCk3Oq3HLgZ2ljlmP619WeGf+Ce/hK4tbS4n1r7ReKAXikI2Ox9a83Nc1eCpU4V6rt5M/LeJOBuHcsX76N6kle3meDatL8N5taiurTUtVskx86RLhXNeh+OP2h/BnjL4dW3hvTtY1ixsI7RLW6SNtvnBTnmuu8U/ADRPAEbadcaXCiRyGWKRlBz68+lcf4v/AGWtA1/wsraX/od0uZ4WA++p/gP061lHjl4lQ9pUl7uiPz3KMmyGGIcpU+Vt7nCvp/w+ewZJdS1iWNVCqGOQintV74a+I/CXwd1a1vfDPiTX9JuIZA2YHwGGc4Neea54bv8A4f63/ZutJ5dwRm2Yr8sy+tW/C+i6XrlvfxX16LPUC6pZoQArEnrX0scTJw9vGq3c/eHwHkNTLFjY636HuvxP062/aw0Pwe3h+/eW+h1ee21O6ujjy3uGyCfyrpPH/wAT/BP7CHhOTwz4OaDWfGJQpeascMIGPBwa8W+CFne+GfGnjHwK1xsn1XSzd2k0Z6XKD92yn1PNeP8Ai65ZfClzNcNK90ZRFM0hy8jhsE/mK8nC5RPHYtU6s7w3sZ8L5XTnOVDntRhrY0fGHie71nxZY3eoyvfXmpTNK0krZY4/pWLcR3l7q2tf2ZBPd3KqoHlIW5JwM4r2X9nH9jbxb+078fPh34dWwvLCw1kSytdOhAMCAbyPwr9K/g9+wl4K/Zq8F/FiKy0+HUJrSS3iWe5QMytvUcGv13IuGrU0pRtFbIvjHxRwOUUXgcttzLqZX/Buj8N/EPw807x7D4jsZbC7uoradEkGCVJODX6hr8or5s/YltxL8S/Gc4RVWKC2tMAYA2jp+tfSYP7uv0PD0I0aapx6H8l51mk8xxs8ZU3k7iJy1DjmiJcGlfpW0tjyVe2p+ZP/AAcjf8m+6d/19j+lfiuv3fwr9qP+Dkb/AJN907/r7H9K/FdR8lfn/E3+9L0P9K/owa8Kr1Yq8jFe5fsGftk3P7FPxZuPEdnaLe+fbmFo3968NU0nSQ45rwKFedKanHofu+fZHg83wM8BjFeE1ZntP7cX7Xt1+2R8VYvEdzaLZGKIxmNfzrxfPGO1JjB6YoqsRXlVlzy3ZWQZNQyrBxwGGVoRVl6B06VZ0rVDomp211H9+2mWUe5BzValxzzWMebeJ6dehGtTdKez0P0b+G3/AAX+1rwT4BsNGm8PQXAs4Fh3NzuwMVpt/wAHB90Of+ETtN2Mfcr80jtbjGKay49DXuRz3Eq1pbH4nX8A+GZVZVnD4nfTuz9FPiZ/wXivPH3gnUNKHhazgN9A0IcJyuRivzymvzLqUtyF5knM2P7pLZ4qHbnqKRhxxxXFjMyq4iSlU3R9rwn4fZXw/SqUsBFqM/iPtbxV/wAFgNS8R/sjz/DBtJQJNp32ATjrjAH9K+K7T5c5GPlxg00RYbO38aXdls1niMdXrtKr00O3hbg3L8jlUngYcvtJOUvVne/szfHvUP2Z/jNpXjDSy32nTn5UH76Hqpr3P/goH/wU0uP24PDFhp91o0VnLZyBxKBzXyeOV6ZPvSCP8Kqjj61Oi8Mtmc+O4FyzF5xDO60P3tPZkgTzlOepI3fh0r3j9kH/AIKD+Nv2R9SjXS7yS503OHtXYlcewrwMsUb+tK6DHfPUVjhsROhLnpuzPXz/AIcwGdYT6rjKXNHzP1K0X/g4TsrjREfVPCdvJd5CnKZrgfjv/wAF7fE3jPw7cad4Z0yPRjKColQYKivzyVA7gYXPXJpRDlv616s+IMZONpH5bg/ALhijiVXVO6Wyb0Nbxp411H4h+J7rV9XupLu9vGLySO2SSayt+08UpiVTnPNNPSvEnVlOV5bn7Pgcvp4KgqFFJJbJBGvzr/10Ff0j/sK8/wDBP7Rv+wET/wCQzX83Cf6xP9+v6SP2Fv8AkwDRv+wEf/RdfXcKv36nofx59LZ/7HhfU/BT4jDPxI17/sIT/wDobVi1tfEf/kpOvf8AYRn/APQ2rFr7hbH8IrYCcD6dav8AhfwreeNvENjpWnQPc31/KIoYkGS7GqB5P/oX0r7D/wCCHnwosvib+2xZ3V/EssGiWz3MaMM4cD5TTGeh+Df+CTXgb4S+DLXU/i14xg0rUNTRXSy3gMnHp7Vzv7Sv/BKLS7L4S3Xjr4U+IIfFWm2YLXcMTbmhA68CvUP+Cgv7BHxL/aX/AGj9c1ZdYgTSImxYwvPgRj0xmvUP+CWX7J3iz9mCDxppPi/VrOfw7rGnlYoXnDKz4OeCalMD8fJAVcowOYxyD1DDqKksW3XVtxy0i5z6Zrrf2g9DtfDXxy8UWFlt+ywajKV29PvHgVyNsxGp2mP+ei/zqgP1O/4KaJ5n/BKD4bjpzDj24FfJX/BPb9hCH9svQvGExuZYbjQLQSWsadZHr64/4Ka/8oovhufeH+Vc5/wb36q2laV8S7tAM2mnGVc9CVyRSbA5n4R/8EhfB/hDR0ufip4ystDv71iILKSQBsHpkZrzD/goR/wS2uf2UdAtPFWgXp1vwze4cTK24Ip6civFv2s/2hvE/wAbPjfr2pavqU7PaXrxoiyEJEqtwAK/QbwB4muvjJ/wRR1U61I91JpAaNHkO5sAEjmkmB+bv7PvwB139pT4qWXhbw7avPdXjhWcDiFO7GvvNv8Agkx8HPhVbwaP4y+IlpbeIpkCSoZRmBj261L/AMEC/CNt4a+GvxL8fTIj3lhaMltIRlolVSTj8q+Avjj8UdX+Kvxe13XNQvbqSa4vZSpaQ/KoYgd6fUD1v9vX9hD/AIZCvtHv9M1qHX/DutN/odyjhjkdQcV9b/t+At/wSO+GxB6Iuc9jxX5x+I/i54g8ZeGdL0PVNSubzTtJfzLZZWJ2Z61+jX7fhZ/+CRnw190B/lSkB80fsNf8E/NO/ak/Z28eeMrq/ktp/DETtDGvSRlGea+VL6P+z7m6Tr5TMn5V+nf/AARqUr+wF8Y+cfu5uf8AgJr8xtfcrfX/AP12k/maaA+r/EH/AATy07SP+Cb9h8af7QlOoXaoTD25Yj+lcf8AsG/sEan+2jrl473Y0vw9pAEt7ek4Cjqea+x/HbEf8G/ehd/kix7fOa5f/gjB8SPD3iD4CeOPhpfalFpWp+IIWS2mLBGcsPWi4Gdqv/BN/wCBfim1vNH0T4kWseu2SlUdpRtmYfj618Y+EPgwur/tRaX4Da74vdWTTPtSHqCcbhXqv7R3/BOf4nfs1a9qGpwRXl7p8TtJHeWzs+QTnqDXnX7H11Nc/tk/DeS7Z3uf+EhgMhk+9nJzmmB3n/BS39j+H9jb4x6doEOoz6lHdWYm3yNkrW/+w5/wTB1f9qTw7N4o8Q3o8N+EbFsteSnZvA6nNet/8F9LA61+2b4Rte1xZQwkezOBXqX/AAVL8Z3H7MP7AXw88EeHHbTodcgj+0NCdpkAUE5I9c0mwMGf/gmj8IPixZjwzoPxTiu9TtxstoTccMfQDOK+HP2vf2Q/Ef7HfxNbQtciLQEE2tzj5Z1+tcH8PvHmq/Dvxrpus2N/cx3NpcpIWEhyfmFfpr/wWGsIvi7/AME7vh58RpkR9TtTCjyEfM/mDHJ/ClfQD5x/Z2/4JeXH7R37IbeNtFnln1w3ot47cfdAPU/QV7N8Of8Agj78L9OtLfRPFPxBsk8W3SgtbLMN0TnsOa9B/YO+KN98G/8AgkR4o8QaU227sy4hfH3WI61+YNx8YfEetfE2LxHd6peyaqbzzfN808ndn1ouB6d+3r+wtrH7EfxETTruX7dpl+N9ndDnevbmvBGGSK/Uf/grzd/8LD/YI+F/iS8XdqTwxgyN95htGea/LgdKoD78/wCDfjxTpOiftI67Z3sscF/qFkRaFyBvwMHH414r/wAFLP2dvHXwu/af8VahrFpf3On6nePcW17hmQoTwM14d8MPiZq/wf8AG1jr+iXL2uoWLeZHKpx0P3fxr9PfgB/wVb8AftO+G7Twp8W9MtftUiiI3UiDnPHXFAH5Z3fjDUr/AERdNuL24ltLZtyQuxI3V6f+x9+xl4l/bF8e/wBkaKpgsYsPd3RHyQr35r6b/wCCoH/BMzSvhP4Gi+IvgCQXPhi7O+VIju8kHoR7V6z+wYF/Zw/4JReKvHthEI9X1hXCzqPmC4I4NAHLx/8ABK/4FeEpU0HWviTZLrcg8twZR8jn8fWvnn9u/wD4Jjaz+yPYWuu6bdf234WuuY7qM7go7EkV82a/4x1PxZr1zq91f3Ul5cSmR3MhyvPBH0r9Uv2N/F91+1X/AMEnPGGma+x1G58OxNHDLNydoXIOfwoA/OH9lz9mPxB+1b8TrPwzoFu8ju265nx8tunqTX3Jc/8ABKP4LfD7GheJviNZ2/iCQBJY/NGY39Otbn/BFXwrB8K/2Vfi14+RQdTt0uIo5CPmQRBiMV+bHxI+IurfEPx9qet319dS3l5dPKrmQ5X5iR+lID179uf9iB/2QPHWj2trq8OraLr+HsbyJg2V7/pXaftofsEW37OH7OHgzxjDq1zeS6/CkhglbKqWAPT2r538QfFnX/iMmg2Os6jcX8GkSD7L5rE+WD1Ffop/wVvYp+wV8JgcEi0iz7AqKYHy9+wz/wAE+YP2pvDF74l1vxHaeHvDWnTeVNLLIFZ37j6V9JaL/wAEqPgd8T5G0Hw38RbWbXcbYgkozI3oOa+F/gjovxF+JelyeF/CjanJp8svmTQQbhHuPGTivoj9m3/gnF8Yvh78avDWugPamzv4p5i0+CyA8jrQB88/tcfsw63+yT8Wr7wlrSlmQF7eb/nonZhX358VCD/wQds8Dd/p8HJ71xX/AAcP6YE+LPgy7MX+mzaYqO/qO+a7X4qnd/wQfsz2+3QKB9KhMD8uIXxGO4AG0HtS02D/AFK/SnVYBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFdb8Av+S7eD/+wrD/AOhVyVdb8Av+S7eD/wDsKw/+hUAf0WfGX/k3DU/+wSP/AEAV+XcH3K/UT4yf8m36n/2CR/6AK/LuD7lTHcmQ+lVdzY9s0lDuVAPtVEmv4F8C6j8R/EcGladEzyzsASB0FfRyf8E89M0jSYotS8TQ2mqSrxFvHDelL/wTf8OQwXGva/LEHfT4G8skfdOCa8P+MPxZ1rxn8TtSvnv7hfKuWMYVjgAHigdj6v8AgV8HNT+Cfwh8bWN9+8je2YwyDpIMda+J7PSbnxB4g+y2qGa5upyqqo5BJr7P/Ze+KWq/Ef8AZn8URapI0s1lbMEkY/w4ryT/AIJ7eCbbxZ8fb68uYw8WmxtIoI43EnFAWLvhz9hbT9F0aG48XeI4tJuLld6wFgCB71z3xq/Y1vPh94ZOv6FfrrOlLyzxHdt+tdd+0T8AviB8VPiXfX3L2m8rbjzMBUHTjNejfslfC3xH4P8AAPijRPFRWTTprUtCsj52sc9KBHw6rbmywINTWA/4mdtjP+uTj8RVnxTYDTPFWpWyEMkNy6rj0zxVbS/+Qhbk/wDPZP5ikB9e/t1XbWf7Pfg7ZI6M0KfdOOMCvEP2SvHmq6B8bdGjtriZo7mUI65JDLX1f8aPgxb/ABk+Cnha0uL+KwMVuhDyHHYVxfwu+DPgv9ma/bxBqurW+oXUCkxIrA4IqbjPP/8AgpPo1vZ/GKylhVUkuYEMuOuT3qvffsDX327w+bW8MsOr26zzyt92IEZrzn9o74wP8ZfitcaqWP2dZAkQ/wBnNfU/7W/xXvPhr+zr4ej0/KXV/ZxRrKvVQUFVcdj5/wD2lf2W7H4J+GrTUdO1lNSeaTZIqsDj1qT4N/scXPxA8Oprut366NpMgyjyHbkV574AmvvH/wAQdB0m8vLm5gvb1FxI5IBJ5r64/bE+EfirxZY6P4f8NhYNKsoQpVG2hiOuaSYcp5f4j/YV03V9ClufCHiKHVZoVLNAr53Yr5+TwpqFx4pXRjAy6iZvJEZHOelfSv7LnwG8d/Cv4tWeoS8aczmO4QyZUKe+M1U+NaaV8M/227C+cRfYjMkrFcEAnrVBYh039hXR9D0W1k8UeJYNKv7tAyQs/K59q4H4l/szw+AvHWj6fHrUFzpmtSCJLkNnaT3Nev8A7afwF174k+K4vFmg3L3+mSQAqkb52HHYA18weIrvWtPnW01R7tZ7Q5RZM/uvcUEn3j4B/Z+stB/Zj1DwumrQzW1yxZ7xWG1c+9fJnx+/ZysPgho9rc2muRaqbl9m2NgSPSvb/g9q93N+wTrc8k0jTBmAfcc18g3mrXOoIv2i5lm2nKbmJCmkB794B/YZjvvDsGp+JtdttIS5jEsS7xkqec4q/wCM/wBgOEeFbnVPCutx6v8AZUMjRq27IFeW6dpvj34yQQeT9vnt4UCIxJCYHAA9q+iv2C/hv4t+H/jLUrfWllXTbmBhsZsgHHSgZ8c/YZze/Ztrfad+zywOd2cYr6D+G/7CpvvC8OseLNWj0aK4AMaSMFYis74X+BLfxJ+2lc6c6K0EF88mzHA+Ymrv/BQD4kX2rfFn+xIriaGx02MRrHG2ACKYir8Xv2MF8IeGptc8P6zFq9nAMyKrA7RWJ8Af2cp/i58NfEGtxanNYppKsfKVsb8DkVwOlfFbXdD0G702G+mNpdp5bozZr6Y/YUBj/Zy8eDsFlIPr8ppAfKOlaJdeINbSxsonnuJX2IoHU5xX0X4Z/YHs7DRYLvxX4gi0q5uFDLAWAIzVL/gnd4HtvEnxb1C/u0EiaajyKCP4uorhP2p/i1qfxD+MerSNeTJbWs5ghjVsBAKLgdp8VP2Fbrwx4Xl1zw5qMesWcI3OEO7ivE/BnhY+KPGVjpTs0LX1wLdmP8BJxX0b/wAE6/iZe3vi+98NX00l3YXcJGyQ5A4rzrxJ4YTwL+2jJpsQCwwaumxPQEg0xnV6j/wT81G18fSab9t8rSrdBI13IcAfjWh4z/4J+2//AAic+oeG9aj1SW2UmRVbPQV1H/BRv4w6romsWXh2wuXtILtN00kfDEY6VyP/AATo8f6j/wALXm0e4uJZrS+hbKO2emanmG0fOV/Yy6Zdy288ZSa3YowPevbPhB+xbdeNPDMWveIdRXRNJkXdEXO3cKzPH3geLWP2xf7FRQIZ9UVWHYru5r6A/bR+E/ivxrcaVo/h0eXo1hEF8tG2gnGOaVyTzDxT+wtZaroVxeeEPEEOsTWqb3iVgSfoK8CsfCWo6j4qj0dYpBqLS+T5ZHKnOK+mf2T/AID+OvhD8W9PubvP9myEpcIZMqQfxrL+JB0z4Yft2RXL+ULOWVZCB0Vj3qwE039hbRNB06FfFPimDS7+5XcImfBHevKfjz8C0+CurW0dtqMepWN5zFKjZzXt37aHwC8Q+P8AxgfFGiSvqFjNECFjfPl8dsV8y+IrjV4rlbPU/tLfZPlRJs/u/pQBls22B/rj3PtX2P8AsDR/2r8BPE1jYuq6tLGwGD83TivjrqcFcOnA9D712nwK+OOrfA7xQL2zc+W5/eR54YUAYfjfS9a8L+K7yLUlu7e589mLPkd6p6r4hvfEfk/bLl7gQrsjLnOAO1fbGlePfhx+1rpy2upwQWerzrgcBWDV82/tPfs13nwL8UxIjeZpt4wMEg6H2qb6gVvgL+zFq3x3uHuI91rpcX3524UDvzXrUP7BPhnUojZWXi+3kv8AkLHvHJrqfi1rB/Z8/Y10Oy0zNrdaugMsicNkjJ/nXyFp/jTV9D1RdQhvbhLmJt4beeaoDoPjT8FNX+B/iI6fqURKn/VTAfK6/Wpvgb8AtU+OfiFrawjIs4f9bcH7q+vNfSX7U8kPxT/ZA0PxPOA93bwqTJj5nIwKX4ZyH4LfsK3ut2YEGo6lHjeo+YbuKCraHL3H7A3htojYw+L7dtWHAi8wfe9K8U174JX/AIP+MNr4VvZPLnlmWNZkPYnqK5ePxhq0epC+F7debneHDndursvAXjjUPHvxx8OXmpzNPcC4jTc3Xgigks/tP/BOX4FeLbfT5r6S+M0IlDsckCum+D37Gz+PfCtvrmtatBpmnXS74tzYZh61v/8ABTLcPixpfr9kGT68V5R4bbxt8SNMt9K01r2ezs02KEyEX2oA9m1b/gn/AKdrujTz+GPEcWpXcKFjErg5Ar51k0W68OeM0068Urc2dyqurDGCGr6V/Yx+FXjT4f8Axdtpb1ZorGaMrMCxIzXmn7XNimm/tUatHCAim8RmHqeKQz1H/goOv/FrPAQblfsw3D/gIrwb4J/AjVPjnrzWtirRW8HMtwfuoPc171/wUNQD4UeBc9fswH/jorqf2e/AV/4f/Y1a68Pog1fXI2Jk6FecdaCrHCR/sOeFJZBYr4ytTqhG0ReYPveleI/Gn4I6p8CvExstRQmKX/Uzjo4rtk/ZI+Ia6mt6ruLtX80v5vOc/WvY/wBtXw1Nefsx+H7vVvKOtWAVZWyCxximLlPHvgh+x/P8RvDh13Wr9dI0gHCyucb60/ih+x9oujeErnV9B8S2+qLaLukQPyAOteq2eh/8NA/sd6bpHh68WHULEDzI1baWIr5b8XeC/FvwnM1pei9ghlG1zzsb2oE1Y5EEbQ2cjOBTm4VvoaUjarDjn5j7Uh+430NBPU/RH/gnp/ybrYf77Vzf7T/HxFb/AK5iuk/4J6f8m62H++1c3+0//wAlFb/rnWZp0PNqP4SO3eig84+orQgVQvQemQR1oV/Lj2jBGdwFV9Qv4tIspp7iRIYLUF5JGOAB1r40+Lv/AAVUa68dXPh/4daHceIbqwkMU08aFkz060Afam3yxt9OQPSmZDtkgEdMHoxr4T8Kf8FYNa8CeK7ew+I3hW70WxupRGLkxkDnjrX254W8VWXjXw1Z6rpkyXNteRiWFlORtNAGiVAB/ujj6GlZQqHnlRlTXmn7WX7Q9n+y/wDBfUvFd3iQWo/dxd5H9q8+/wCCeX7eNl+2/wCENTu1g+x3+lz+XNbMMMF7HFAH0Uik59xk+hNBHQ8qz8ZPYVznxl8er8LPhbrniAp5g0m1e52DvtHSvPv2Ef2qI/2vfgy/ipbY24iu2tip9s0AeyhsSc/dxgk9xQoXIDdOSAe/1rJ8eeKf+EJ8Farq+3zP7NtnuNvsozXkX7Bf7Yo/bK8A6xrX2UQ/2XevZ4x1xn/CgD3MuX2Oe/yle2PeiR9oHRjjofSob2c21jNKgLSJC0gX1IGa+fP2IP254/2q/GPjHQJ7UWeqeF7l7cxsMEoGIzTe4H0Sv8WG+VeV9vagDzRtK4yM5968s/bH/aRs/wBk34C6t4xuUEn2FljjhP8Ay0Y9Ko/sOftT2/7X/wAB7PxdCgjklcpNEOqGkB7DsGwg/wAXfuDSDhxjndw3v714L+3n+2bH+x14d8MSRwC91HxJqK2cMPVjk+leyR+KFtfAketX4FuPsQvJAeNnybiKANiP92V+Ut1wPSkXkKBwEywI/WvjT9k3/gq9pv7R/wC0/eeAZbQ2ImaSOymbgTbCeR9cV9llCAQBnaCSPpQAMGAOAT2BoJ8sbuPn+U18P+MP+Crepf8AC+fEXgjw34an1a88OuTMI1J2r0ya2vg9/wAFX9P1v4l23hTxlotx4dvdQfy7d5k2ozfU0DsfY23ezlfYA+1BXGRjgjAbuK8+/aZ+Olv+zx8C9U8bSjz4tNhEoQdGz0rxn9gb/gpVpf7Zut6hpX2Y6dfWqCZVfjzR7UBY+p8b+w4akCMpK4wuf1pTHmQKOuePevkX9vX/AIKm6V+xx40h0NLQ6hdNEHuSvIg9M+lAj67I/dgMO+A1BHmfezjoR2rmfg98QF+Knwt0LxHEvlx6zZx3QQ9twBryT/goP+3NZ/sS/Dix1doftl/qk3lwWgGWOO+KAPfwm9OvyseAexHrSl95zj73UHtXl37HH7S1l+1n8ENP8V2gEUlwStxD3icdjXqTYwPXv9aAEB2fd/M0AAPnqB0B7UUUAAJGff8AlSYHTHy9fxpaKADPz9ABznFDHADd8YNFA60AIQMZCjrkU5VCqe+/7wNJ3pO9NALFlVyDnHY96cPvZBI9qaetI2RSAPv8Yxk5p2Mtknnt7U0ghaRhuFAD5BvIPcdx3NI/z9evr6UgGBS0ACtt3AAYP50Aclu/SiigAX5mx/CO1A4T+lBooAGYv369fpSYzn8h9KWigAooooEgooooGFFFFABRRRQAUUUUAFFFFABRRRQB9wUHmiiszQbIMrUF5B9ospV7lGH44qyajVcn25oA+H/gpH/Zf7QEUUp2wR6pPYsT2LAn+tdJpOhDxD+x58TtFniSZtM1a8VYyMjCsNuKxPiRpM/g39obUEsYWkay1iLVWVR95Wwpr2f4b/B290+8+JGnyrjS/EzC8tS3Z5Fyw/A4qWruwc0k7pnyZ+2t/wAE/vCP7VmqfC6/ijj0q81TSo7MXcChcyqgwDj3r87vjP8ABLWv2avhN4/8L61G0epWniK3tScY8+FH+V/oa/Y7S/hh4jufgf4Wt47dk1bwTrRIDf8ALWIt1/Kvkj/gtx8CrvWvGGq3ENsU/t7TrW5hYdPNt8s4+pr8746y1TpRrQXwtXP1PgLi3F08bSwdad6V76n52/A/xNF4S8W65ql4ltNpul27OEJ/elipxt/HFd18Kv2mpmu7Y3Mc9tvs45mSc/JKWY55+leP6X4kXSrpxdQbbDUGEN+oX5o/4f510914Qk0bw2Vs0Wa7aQWttIWzuiT5t49iDX43muBw2IV6kb3/AAPrPEjDYmOafWI3cJWse6fGv48Wms/D2RZJBEwXzLdmPEWO2fQ1wPw//a10bVLHTY7hJrNjM7ySTDCNldo/CuF+IenTav4Wk0a4ZbSwvGQrg5fzMc8+hNeeQvJprR2V7BGyxnytijJTHTNcWXcM4N4V0+tzy+EcoweYVpUsdPkfQ+xfil4Q8OfHnwfptst1az6r5LW8E0TDKyNymO/QV8xf8Ko8Rz+K49EnsJJkikG6+T7vkq2C2fwNUfDeqXeg6zDe6PfTWWp2j7ogWJCEcDjp0rUfxz4p1LT2srnVZDCqkMIxguCSTz9TXo5dk9bBxlSU7xffofs2W8G5zRg6GDqc1J/kdV4Q1mBv2uPDX9l3P2qyivYdNEh7jBDAmvpX4If8EpovGnh4eNvFEzLY6l4kaDTLP+GVfNyWr5y/ZT8FHxB8a7K7SPfaeHE+3TlRwZR9xQe5Oa/bb4ZfBPV5/C/wr0qaHGl2AOpXeR913+YD9a/QOC8BTninJ7xSPyzxLzDEZHUWEwVTVpKVvxLehfD7S/B/7YPgXStGsbW3g8K+H7hJvLQDyxIgC5+uK4vXrmK98A+OhuPna54ihtU99rhsfkK9b+FfgrVNU+OXxG8aXsJiN3FHpOnxH+5CCN//AAImvIPHfgrVfBHgnQLO+hc3b6jdatdOo+UEI2zJ/Kv2WyTsfgtatOrPnqPU9L/YJh+3W/j/AFArtDeJJ7SM/wB5Ywv+NfQpGa8e/Yb0X+zv2ctHu3XFxrJfUJ/UyOeSfyFewDpTMwAxSP0p1NfpSlsB+ZP/AAcjf8m+6d/19j+lfiuPu1+1H/ByN/yb7p3/AF9j+lfiuOlfn/E3+9L0P9Kfowf8kqvVhRniiivnD+kvIUnNJRRQMKKKKAFzxSUUUrJAKx30g4ooosh3YuaM4pKKYvMM07ecYptFA7sUsT+FDNu60lFDV9wuxQcLikoop3ZIpOaM0lFIB0f3l/3xX9I37Chz+wBo/wD2Aj/6LNfzcx/eX/fX+df0jfsKf8mAaR/2Aj/6LNfXcK/FM/jH6Wv+54X1PwU+I/HxK17/ALCE/wD6G1Y1bPxI/wCSla7/ANhGf/0M1jV90fwl0A/KrepG0V9lf8ELPidZeAP227e2vplgj1uxkto2Y4Dvj5R+dfGuDuBH41qeDPFl98PfFVlrOlzvb3+mzLNbyIeUYc0AfZH/AAVA8Z/Fj4FftWeIhFqOrW2iX04lsXUt5QXv0rwHS/2jPi74uWSKz1HXr2OAZfy9+Nvc19d+CP8AgsJ4T+JfgW1sPij4UttbvLOMIlw0YZn9SayviN/wVL+HPhnwhf6f4E8DWFlNewtEZmhG4bhj07VKA+AtXup77UriW6LvO0pMpbltxPOaZZxf8TG3AbOJV59OaW/unvtRubl8eZcytM2OnJzim2zfZbuFiQQjeY2O+O1UB+qX/BTE5/4JQfDk8HBh/wDQRXJ/8EBRv8K/FUHO/wDshzjHA4NeIftU/wDBRGw+Pn7HvhX4cwWLQXGi7N8p74FZH/BOn9vCz/Y20jxdBd2zXL+JLJrUYH3c5qWgPnX4mNn4l+JQMbBqM5JP+9X6Xfsx/L/wRO8XFefnfk9uOtfmP4p1Ua/4o1K82gJf3TzgDtuOea+p/hZ/wUJs/An7Bet/CqWzLXWpSHbKBwikU7AfQf8AwQD8SWvi34V/EzwKZVS9u7djAjHBlDKQSPpX5/8Ax3+Cev8Awn+L/iDQdQ069ilivpdjGI/vAXJGKt/svftHa/8AsufFax8T6BctFJA22ZQcCWM9VNfe19/wV/8AhV8RbKLVvFHgWzvNfRfmYxAhmHfOKOoH58eLPgN4r+H3g3SPEetaXc6dpusTeVatMm1nI9vSv0R/b7JH/BJP4a5U8ouR+Ar5E/bx/b0vv2wdX020Szh0vQNFP+h2sS4Vfeuo/aM/4KBaf8Yf2L/Cfw2hsTFNoICtJn71KWuwH0V/wQ+K+MP2Rfi94ZtSJNSkhdhEv3iHUgGvzv1z4P8AiSX4jX/hy30i/m1J717dYvJOSSxANeifsKfto63+xX8UDq2nnzrC9UR30HaVB0FfYXj3/gsP8OFtpde0TwRZJ4qkQkTmAfLIRwelKzA739qP4S6n8Ef+CHWl+GtYBh1GzSAzqf4CWJwfzr8uvCOheMPDOnJ4r0az1G3tIzsjvoVOwEe4r6i+Nn/BUy8+Pn7GOq+BddjeXXdTvvtDXHVQgOQtY/7C3/BQjSv2fvh9ceDfFHh+01zQZpfMAkQMynvilZgfQP8AwSW/bY8Z/HX4mR/D3xfZy67od5AY5JLiIt5XbOTXgvxK+H2mfDD/AILAaFo+j7FsIfFEDRovQcnIr2bVP+Ctvw6+EOhXj/DbwdbaZq95GUFx5YDR59OK+JPCnx4vYv2mNI+Imr5u72y1hNUnycl8EnArQD7D/wCC9mpnR/20/CN0OPs1rDI59FDgmvVv+Cs/gC6/aL/YV+HnjXw3G2pQ6Pap9oWH5vLQqAScdxXxZ/wUs/bItf21PjBp/iG1tfssNnZLble7HOa7j9hn/gqfqv7OHhCTwf4itk1/wtNx5E67ginqKlgfLnw9+HOr/Erxhpmj6ZYXU819cJGMRn5fmGTX6Tf8Fidfh+D/AOwP8N/hk7p/aknlSXEWfmiEYyCRWHN/wVV+D/w036r4S8A2cOtcskhhHyMe449a+Hf2o/2m/EX7VnxLuPEfiK6aR2OIIs/LCo6AUuUD79/Zo+T/AIIleMACcb26V+X9kN17b8gASgdec5r6v+FX/BQWy8B/sH678K/she71QkiXHAzXybA621yjgZMb7jnvzmnYD9Pf+Cnef+HZHwr/AOuSfyFfmAOlfWH7Vv8AwUDsvj9+yj4P8AwWZhn8PoqySH+LGK+TxwKoDr/AfwI8V/FDw5f6p4f0e71a10w/6V5CbjF71gHwxq8N/wDZU068F/u8tYxE28N+Ve4/sI/t3an+xnr94Utor/R9Swt1ayLkOK+t0/4Ks/BUTnVj8P7D+2sbwRAu3d+VAHpU0+ofDH/givq9r46LLf32mmGziuT+8ywG3Ga5j9he1/4aO/4JCeIPB2nss2raNG5W3Q5Z8AkcV8fft3f8FIPEH7Ytxb6bsXT/AA3YcRWcZ2qa5f8AYl/bh8RfsY+N2vNLk8zTbw4u7YnKuPpQB5Bq/g7VvDOtTaXeWN2l9DMUaIxHdnPTpX6lfsmaBP8Asgf8EmvFeq+I0/s++8Sh2toJ/lchlwBj8a5C7/4Kl/BLxLeHXdS+H9nJrn39/kjDP78V8zft0f8ABRXXf2u3i01F/szw5aYEFlFwgA6UAfXn/BFbxDD8Xv2Qvip4DRl/ta5E7CEn5nWUNtxX5qfEj4S698MfH+peH7/TNQS7sLp4tvkn5vmOMV2H7In7V3iD9kL4rw+I9AmMayYS7hz8ssfcV9y6t/wV6+E3jeJdY1jwJZz66ozvaEfOw7k49amwH59eL/gR4o+FOn+HdU17S5tNg1uZWskmXazLnJav0H/4K4sf+GBPhRtCg/ZYyc+yivjz9t/9uPUv2xvH+l3UtvDYaPoYCWVrGuFjUf8A1q7X9s39v+w/aQ/Z18G+DILIwyeHIUjkc/x7QBRqB9Y/sdaPbfs2/wDBJbUfiD4csIr/AMU6gjSvMIw7xH0H0r5D/Z9/as+Mnxv/AGhfD1nb3+rXX2nUI2uI4w22NM85rd/YF/4KdS/sw+Bb3wT4ksl1vwpeMdtvINwQEYNegeLf+CoHw/8AhVZSTfDDwda6Vq1zIGkuTGNyjPOKWoGr/wAHDqvF8QfBCvkyrpqqwPc45rsPisNv/BB+yGcKL6AfSvlL/gpN+3BbftueIPDeoQ2zW0mlWawSk/xPjk/nmtvxb/wUEsfEv/BPa3+EIs2W6iuI5fNI4O2qSA+SoObONlGecH1paX7oHrt7dKSmAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXW/AL/ku3g//ALCsP/oVclXW/AL/AJLt4P8A+wrD/wChUAf0WfGX/k2/U/8AsEj/ANAFfl3B9yv1E+Mn/Jt+p/8AYJH/AKAK/LuD7lTHcmQ+jJJHfA5opBlAx68VRJ9Z/wDBN3VI9V0HxPpBk2z3FuzKvd+CK+bfiP4XvPCnj7U7K5gmR452KptPzZPFX/gl8Xb/AOC/jiDVbIk7cK6jowr6P1b9rD4beKnXV9S0NJdXVQWYp8rtQM0f2SPAGp+FP2XfFFzqELW4v7d2jV+CwxXBf8E3vEUOmfG/V7KRlRtQhZEU+oJrQsv29otV0LxDY31p5dpeW7Q2UUY4i7CvnTwp4zvPA3jWLWdNkaK5gmMgIPUZzigD1/8AaH+Lnjf4b/FbV7I3d1FbCcvCTnAXPauIX9oPxzq0csa397IoB8xlzgrXuh/a38B/FjSYF8Y6Kkt8ifNKi8sfesHxh+0p4B0Dwve6f4a0CMS3UTR+Y6cjIxmgR82SSvPdySuQXlYsxz1JqSzbGo23p5yfzFQBAzsT3JOBT7WQW9zFJj/VyK34A0AfZH7busXWjfs/eEGtp5IWaFMlGxngV8hX/iW+1Nds91NKP9pic17V+0h+0xpvxb+Fug6LZQtFNp6Krs3TgV4V94YA6VNhiIMXcff5h/Ovrj9vw+V8C/BZUb1+zw/nsFfI6SeTKOOhBPuK9z/aZ/aS0z4wfD7w9pVpC0b6VFGj57kKAaYHlfwg1VNC+Lnh66kchIL+Nyx6cGvqz9vjxv4m8HappWraJPMmmXsQy0ZOMnvXxmjNbyBlJ3IcocdD2r6U+E37aGnz+BofDvjawXUbaBNqOwyRQB5ZF+0r42mn+TUbx2Axhc81zGvanrvjrxM01yLi41DZkqwO4D2r6Pb48fCTwgGudK8Ph7tvmG9cgGvGtJ+OSaf8c/8AhKxYxNAXw1vt+Xb9KYF/4SftT+KPhRex2hkmubVHCNBLk59sV7B+3N4a0zxF8H9A8XR2iWF/fKDIoXBamL8f/hHrV0ur3Xh1UvfvlQvy7q8r/ab/AGl5PjhJa2VrELbSbE4ii6DFAj2D4GI9/wDsB62kQLyq7fKB1OK+VfBWgHxB4t0yynBihvLkQOzDAGTXtP7JX7VFp8ItCvvD2s2v2rSrtywXH3QRis/9or4t+EPENrZR+ENMFlPazeeZcY+YHNAHsf7W3xEn/Zq8I6Ho3hy1jt/NgUPMqfe4HeqX7AXxX8T/ABJ+JN4dSM02nwwNlyDtD49aytO/a68H/FbwJY6f42003F3ZRhBJjk4qXwh+2p4X+Gvie1ttE0kWeiIp83avzSHHGahplJnK/CPxHD4Z/brvHmZVjmvmQN65JrO/4KCeB73Qfjhc3/kObTUlEscgHAJ7V5b408cnU/inf6/p+Ynmumnh/wBn5sivozwv+2p4X+IHg+2sfG+li7ubVAm/bknFWiT5h0fwXqmu2c9za2c7wW67pZNnyoO/NfU37B6f8Y4+PFONoSYZz1+U1yfxh/ay0BfA1z4e8H6VHZW94uyV9nzHNYn7NP7Rum/B74TeJtFvoXlm1ZXERXplgRSA6n/gmv4ght/iTrOnMyrJdxNtDeuK8b/aL8G3vgb4u61aXMDKklyZFYg4YE1ieBfHl/8ADzxdBq+nuY7iCUOCp+8voa+mZf2r/h/8WrCCbxbogk1GFArOq8ufWgDm/wDgm/4Ou7j4l32tyQvFZ2URG9hhelch4m8UR+N/22ZdTtsPDcawgRvXaQP6V2nxL/bL0vR/BM/h/wADaeNNiuF2yygYY14J8PvEg8OfELTNXuNx+zXKzyj1wcmmM95/4KYIF+Lti/VTbrn/AGeKwv8AgnkN37Q1sc5Hkt17cGsT9rr462Xx58cQajYRNFDFF5bBvYYrM/ZZ+Llr8F/inb6xexl7dUKMF96Q76nU+NtdTw/+3HDeyELDDqyBz6Lu5Neq/t9eN/FHgjxNpmo6Lczrpl7FkOmdqnsTXzJ8aPHcXxC+KGpa5Zq0Md1MZEHcV7Z8Mf20tM1TwLb+HfG+nLqVvboI0kIy2O1S9yTymP8AaW8a30+E1G73Y4WPJLGuZ13Uda8beJnnu1u7nUSN7DGZBivo6T9oL4T+DA0+leHRJdfeXeuRXjXhX45R6H8d5PFpso2hZ+Lbb8gQ+1WBp/CX9q3xV8Lr+CzaSa+tQ4DwyAnjpivVf28PCWmav8OfD/i23tU0+71RAZEA2nn2qUfH34Rahdpq83h8C9T942F4L/SvJv2nv2lZfjrqltAkYt9LshiGJeAB24oA8mdlMYy57Ka1G8E6umjf2n9guW09vlWYLlRWYR8hUcKGz0+9Xu/7O/7Vdj8PvCA0DX9OivtO8wtgru60AeO+C01KHxXYf2bHOLwSKBsBz1r64/byvRafs/8AhVNQwdTHluQfvL05rNj/AGnfhX4Qnk1DTNAQ333kJXoa8E/aE/aA1P47eKvtt18ttCNlvDnhVPtU21GfRv7UuiP8V/2QPDup6bm5WwhSRjFyThQDXxrb2s97dQ28UMsk0pCRqFOZD6fWvcf2aP2u3+FHh4+HdZh/tHQjkiNhnaD2rv4P2h/hN4avG1aw0ANffejUpwreoqhGh+0dH/wqv9ijQvD164S/uYgSn8S5+bp7Vd8O6c/xW/4J+NZWI33VhEGZV5JK5NfNf7QHx81T48eK/td4dttbfLbw/wAKr/jXQ/swftQXXwH1C4s5gbnR77G+I87fWgq55RDYXD3Qijt5TN91o9p3E+mK7T4YeFb/AMJ/Gnw7BqNtJaTSXEbhJBg7SRivoK9/ae+FlndnVbfw/G2o4JUFABu9a8K8U/HdvHHx0s/FV7CIorSZSsSf3ARgCl1C56Z/wUitzdfGDRYc8PCi7vTNeg/GXW1/ZT/Zw8NDw9Zxm61QhJZ9mTGCuSxP414J+1z8dLP46eObHUdPjaGOCIIQexFeh/Dv9sLw/wCJvhhbeF/HOnm/S0UJHIBk4HemCH/sbfGvxX8RvjVa21xJNNpygmZscL6c1wf7Zef+GrtS4Pz3UZwe3SvQtE/a58H/AAq1q2h8K6OLex8wfaZCvzuK8X+P/wATrX4n/G688R2yutrcTJIinqAMVNtSj3H/AIKHAN8LfAYPOLZScd/lFdb8L/EF9rn7B0A0KRhqWloysI/vIQSf5V4j+1P+0Tp3xm8FeG9NsImil0yAJIzeoGKyP2a/2mb34E3ssDr9q0e7AEsB55qnsTcyX/aY8b20kkct7cI6tjYxIKEVl+Ofip4o8ZaKItXnupbMsCu/OGNfQd78c/g/4juW1G60D/Sm5kULwTXlH7Rnx00f4lQWlnoekw6faWbAjauC2DQK7OT8HePvE/wc1CGeze5tFc7gOdrD1r6u+E3jyL9qv4Ha+viCwjS706BmW5KY3kDrXn3gb9pXwJ4n8IWuneKtCjeSziEXmovLAUnxK/a90HQPh/c+HvBGmrYw3y7HkIwwHvQFz5r1W1Fnq9xEDlI5GQH1ANR/wN9KbITNK0jcu7ZJpznIf6GgR+iP/BPT/k3Ww/32rm/2n/8Akorf9cxXSf8ABPT/AJN1sP8Afaub/af/AOSit/1zrMvoebqvHJpG+ZcDrkYpGXNDJhOOpI59K0M+p83f8FXvjNc/Br9jzxDd2bNFeXWLaJlPOW4/rWV/wSy/Zn0j4X/sxaLq91axXGs+IIxd3M8iBnLNzyTXP/8ABcbw5Pq37GM95EHP9m3STS46YBHJr2r9grxRb+Nf2SfBl9akSr/Z6RybDnBAoLZm/t4/s2aH8av2dPE0E9jbi8trRpoJAgDoyjIIP4V5B/wRK+KV946/Zeu9I1GZ5brw3qMljGzHO5FOBzX0x+0V4lg8JfATxTqFxIqww6fLudjwflPFfI3/AAQa0t7H4CeL9Xm/dWt9rVxPEX4G3JOc0CJP+CqPiaX4q/HD4d/CPTyZzq16lxfRLyFiB5zXCfs86PD+wh/wVau/CA/0Xw/44sl8jPyoWUDGO2c15na/tr2UP/BS/wAVeOtQ0PU9d0/QC2n2TW0RkWNlJBNZH/BR39t7T/j38RPh7420TwvrOjal4T1BJLm6mgKKYgRgZpMqx+n37Z8f2f8AZb8b7ujaTOSO44r54/4IRlT+xhPx/wAxWX+tev8Axm+I8PxZ/wCCf+veI4GWRdV8PtKzg5wdnIryH/ghAv8AxhdPkddVlx+tEdtQsfUX7QWD8CfFvvpkwP8A3zXyB/wQL/5N+8YDoBr8v9a+vv2gmC/Ajxb2xp0wP/fNfIH/AAQPXb+z/wCMQf8AoPSnH50tbhY+745DgkDKhtpB7A1+cPwftv8Ahlv/AILSeJNB5g0jxzD5lu3RXzkk/nX6Pqcup6bTg/7Vfn1/wVz0ST4X/tGfCj4o26lGsr5LGdlHGxnHU/jQ2Slc2/8Ags5dN8Rbn4dfC+BmeXxXqqLKin+DPU1hf8EVryT4PfET4mfCK/YpPoN6zQo/ZMnGPrVl9WT9p/8A4Kx+GbpcT6X4S0ZbjAOUV2QYP1zWb8Q70fswf8FhbXWP+PfT/GtoTOeiOyg4pXY+Uf8Attwt+0V/wVC+GHgZf39p4aYahcKOVjdcHmvoD/gqZ8ZB8GP2TtZ+xv5d7qu2wtY1PzEvheK8U/YA0xvjZ/wUN+LHxInBktrSX7DaO3SM5wcfhXBf8Fk/2gIpP2mPAvhNrS41S00Odb+8trZd5fDZGR9Kdwsee/Gv9nuf9jDwt8BvixawtBd200ceryIMZWQg5b86/WXwn4mi8aeEtO1q3cG31G0W4RlOdwZc1+Z/7b//AAUD8OftI/so6t4Fh8EeIbeUQRtaSvakCF06Y49q+lv+CO/x1Pxh/ZB0qyupC2o+HlaznRj8yADjNLmY7Hz1/wAE4dR0fSf+CqPx8bWJLWKGSyAiacgAnzecZ707/gsDe+GfHnxC+HGkeB2sr7xZHqUbubEAtFHu5LFa82/Z1/Zfi/ar/wCCk/xs0ebVLzSBpkP2gTW7FSSZMYOK6D4T/CiP/gnv/wAFCtN0zxUp1nSfEpMdjqF0d7RSduT0o1Yz6y/4KY2ktl/wTT1qO5ObhNMg87P94BQTXwx8FLVv2QvHXwV+IdsrRaJ4tjXT74qPlLNxlq++/wDgrQRcfsA+MHi+aPyFK49CRXzz4r+A0nxt/wCCOOhT2yD+1vDVsNQtWQfMNnJIqxM/QbxB4sttA8Gz680ka2MFq1wGz1G3cDX4zftNaDL8fvgB8ZfjBfK0lu2rQ2VjIw6oJMfLX0P44/boPjP/AIJQ+Gxa3B/4SrXWXQWjDfvFfhDkdemasftv/BBPgN/wRQfRdoilkezuLjA5aRmJOfzoEj7J/YhO/wDZL8AFsAJo8DYHUDYtfIv7QOix/txf8FN9L8Gy/wCkeH/BdlI90uMqsjDAz2r6b/Z08awfDn9gHwzrt0QkOneHUm35+8REMCvz5/YK/bxsvgp8UPiD421jwzrGtaj4qv38m6hgLqsQY4ANKW2gdT3D/gkz4ln+Cv7SnxO+D2oMYFsL172wjbgOjEkAV+hGzeCwwMmvx58Zftj2V/8A8FI/C/xE0rQ9U8P2+qlLK9a5iMay5OBX7AWN4uqWsNxB80NxGsqkdDkA0LYGS0UZxRTJCiiigAooooAKKKKADNBOaKKACiiigAooooAKKKKACjvRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAH3BRRRWZoFNzjNOphY5oA8E8YW8Hhj9tDSnuI0Nv4hsfKJcfKXXkfjXuzfKcY+6MAAdTXi/7bWgyReCdK8UWyZufC98ly7L97yyQDXpdn8Q9Nl8J6TqktykdvqaRiGRjwWYcDNAdLmwI0XO0BlPUAcE+przD9qz9mzTv2lfhvJp05SPUIP3tjOpzsk9Poe9VfiV8VNQ+Gfx40Wy1CX/AIpXxHCbaNwMLBMfVq+R/wBtL9uK1/Yzg8U+CfEWvyNqNy51jw3dRS/Mc8iFvauLMaFKrRdKpszvy7DYitWUMMnfyPhz9sP9h26+Hfjme01CSDw9rF2xVRcYS01A56q3qa8J8Q/C3x/4d0+ysLvStRlstIZmguLFfMTB/wBrPIra/ac/b48V/tzeL9NuPFoa1Ojx+VaRIOHP9/PrXMab4+8UeHJVbTNe1CNQMCKWUun5HivwvNssVLEuNB3ij+wuG+Ds3xuV06+KXM49GUbzxdqtrqFtDeERPDcpcCOdPmLKMAGsfXru71HW59Qe6jiu7y4M7KI85PQACvQU/aI1aa1MPijRtL1y1J/eOkCxybO/zDnNJo3x58D6bK7eBtFS6vNg82e9HmfZm/uqD1+tedSlVp3Sp3NZ5HRhWVGph7Texxfh74Y+J9WbdbaHqt+TL5waKHqfrXf6F+zn4h1edG1i4sfD1m5Cr50uLgsewXufas7WfjZ4w8RTkTaq9qqDIW0XyQM/SuZ8T+J7xPKv7nULy6ktZFljaVyx3g54B61dKOJrOMJuybPtFkee0MDKlQfIrH6u/wDBMv8A4JrjS5LTWNZsWsdEspEukWb/AFmpyDkMw/u+1fpRHEsWwbVXy8ABTwo7V+Lf7HH/AAW6vNR8W6VD8TbiSx0jw3ZmHS44OP7Qmxhd49q/Qjw78Y9c8G/s5v4pl1GO+8TeN7pW023Rt4gR2GAB7Ka/a+HMBhsNR5aOre7P4m4ywGYwxsqmYp3ufU0SiLjCoSSeB973ry79sLVbfQPgXq85RHvblFtLY4+Yl2A+X3wTXYaHrw0HQNGt9avI01K6iVcNw0r45wK8m/aFuP8AhY3x48FeD4iZILGb+07tV52gcANX0cWfHfkesfBvw1/wh/ws0HTcbfslmi49sZ/rXUDpUIj8oAAYVAFA9anpgFNfpTqa/SlLYD8yf+Dkb/k33Tv+vsf0r8Vx0r9qP+Dkb/k33Tv+vsf0r8Vx0r8/4m/3peh/pT9GD/klV6sKKKK+cP6TCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAHR/eX/fX+df0jfsKf8mAaR/2Aj/6LNfzcx/eX/fX+df0jfsKf8mAaR/2Aj/6LNfXcK/FM/jD6Wv+54X1PwU+JH/JStd/7CM//oZrGrZ+JH/JSde/7CM//obVjV90fwl0AZ3UAHPtSg4NGaAGGPI4NLHGMds0vSigAY7RSZyM0tL+FPQCM/N836UrKJCCevanYwKMfNmkABFA5pPLVj7Uv8VB5NADVITIpFBK4xj8KkPJpOhpsARQgwRTfL+fOOKcw3GjPFIBrBnbFCp8tPBwaO9ADR8y4oA2Uu0ZooAQR5POKAcnjtSgYFAGKAAgMOaQrvX0paO1ADQmV65pduFxS4AoIzQAgXAp2FC4pKXj0oARkHFFFFACOwIxijA3UuM0beaAGomw0oUMMU6kC4oAY0fbj8qdjAxS0YGaAEXaykUgiycD69KdgA0dDQAgG9MbcUnk5k5pwyD1ooARgGb1pF+V89fb0pxHHHFC/LQAiJiM0hXd07U6jGKAEA2iloopsAooopAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXW/AL/ku3g//sKw/wDoVclXW/AL/ku3g/8A7CsP/oVAH9Fnxk/5Nv1P/sEj/wBAFfl3B9yv1E+Mv/JuGp/9gkf+gCvy7g+5Ux3JkPoooqiRU4bJ6YxTSmF6cZpc8UKSPegAHApUOGpKM8UAGwiTIxRGnOcfjShsD1pNx9ePSgAxijGaKBT0AVgDihiUPHSkxzSluKQCbt68ikY5elzR2oAV2LD5e3FMVd5+YZ+tOB2ikGQOtABgK2OtOVyxxtAHekAAOcc+tGeaAGsuxMKOO9L9xM+lOVyBSdQfQ0ABIUjGdxo2kOcfjQOKOo5psAChOT19aFi3LzRnIpc/LikAABOnLdqB8x6YP0pOlKGOaBAnBPHWmrHuzz3p27HSkHBoGAXbx/KkL7W+Uc+tODYNIDge/rQAJ+7GfWnFg64/WkLE0jncKAEVfL75zSZL8Y49KcOKUvmgBN+xelNb5gMjHvTjzQTuUA9qBITbsmB+9TmYg9MA0mcDignIoGAXnAPHpQVBbp0o4DZAxQTmgAPWk6UtDDcKelgGKBJEBsPBp7Hpx7UbqF4z70gBo9y0inA74+lKpI70A4Y+/agBVYI+fWh36nFBbIpKegDHTBHPDdfanmPccDkDoaVThCOuetIpKnrx6UgALsU0FVEgYelGfm/pQOKAEMW5c/WlUZ60ZNHanoAuAnWgcMe/tSdevNA4+tIAQbD6e1JHJyQVwKU/MaCcimgYmzj5e9BHlR56nNKDilznrzSAQvuPQ0H7rfQ0Fsmg/db6Ggnqfoj/AME9P+TdbD/faub/AGnz/wAXFb/rnXSf8E9P+TdbD/faub/af/5KK3/XMVma9DzajHH6D60UdfzzWhn1OK/aE+EVn8efhHrHhfUIw8Gp27RAH+9jivzz+DPxA+N3/BMm41HwhceEr3xd4TErS2LwAsIIwcgE1+oOeR7Uy6tor5Cs8UcykYIdcgig0uj8qv2xP2rfjr+178KL6w0TwBqmheHY0Et9ujIeZO4Ud+K9Y/ZZ/ap8H6N/wT41Twp4JEkfjjTtPkgGklcXc07AglV6nBr75Gl2a2xgFtEsGOU2/LjpjFeIn/gnn4D0n9oPT/iJpNkNL1jT2Z5BDwkpb1FAXR5j/wAEoP2SIvhx+zeb/wAZ6Gn/AAkniO6e6uRcxAypk9wa9X/bA/ZV8O/Fr9mrxZoNlotpHezWDtaNFCFcyqCVxgete2bcNuHBPp2oI6f40Cuz4R/Yl0Hx5df8E0fFfgnxHoV/bazpVpPaWiToVM+emPWvC/2F/wBp34v/ALF3wiuvBy/CPXdQ/wBNkuPP8lvmBJ6D0r9Yjgv0AHdQODQoVQvyR5Xvt6iiwXPlr4OftJ+Nv2o/gj47t9e8DX/he4XTpFhjmQg3LFeAM965X/gid8LfEfwp+Bniq28RaTd6RPda3JLFHcJtZkOeRX2ftUHhFA9AKTaOOMfTvVWFcWvnH/gqh8Db747fsj6vp+kWzXes2bLd2ixjMgdSDgflX0dR68DBGMUcoteh+ff/AARP+CXjDQp/E3i/xzpd7purXO2xiS8TY7IhxkVqf8Fs/gH4o8c+FvC3izwRpl3f69oFyQUtU3TbD6194EKf4VAHQD19aQAZwRlSMEHvU8qHds+WP+CTXwT1j4QfswyX/iCxuLPxHr0jX17HMuJAfQivLf2KfgFr/wAXP24/iD8RfHnh+4gsUma006K+i+WSNcgMuexr75b5wcn8qVvmJ4A4xgDpT0C7Oavfgr4U1GzuLYaBpnlToVRjCuRnr2r4o/4J3/CjxZ+zH+2p8R/Dc+jX6+DdUke6s7woRAWYE4Br78z82fw+lBAMpfAzjHSi0Qu7HwL/AME6fg74p8Af8FKvjbr+r6Le2OkanYiOzuZY8Jdnzc/Ke/Fdn/wWR/Zu1b4r/BzSfE3hWymvfE3hW7SeCO3XM0gzk8V9kBtn3QoOc5xzTVUKTxn60W7C9T5G/aig8UfHP/gldLE2iXw8R32lwo9hsPnrIuAcr+Feh/sFfDq80j9iPw/4b8RWLwXElk0FxFMu1lDDG0ivdwNuMAeh460FRnIGD+n5Uho/Iz9n/wD4J6+NtN/4KKXfh3VdLvh4B8P6odUtJWU/ZHLEsAp6E19n/wDBYv4cav8AEf8AYJ13RPDemz6nfi6tvJtbddzsqt2HpX1KWyxOByc0gIDZwDjoCOBQNnw9+1BpvjfRv+CXvhTwpoGiahPr2o2NvZXMEEZZ7YEKGyPbmvcP2Of2VvD/AMKv2cfDOiX+iWUupR2iPcmaIFvMIy2ffmvcRwc4XrkZHSkI3KQehbNFiep8gf8ABVr9kiH4m/s5/avCmjAeI9BuUubb7HAPMfac7QBXtX7E/iLXfEX7NPhaXxBZXOn6tFaLDcQ3C7ZAVGOR+FesCTGeBgjGDTc7VwoCgdAKBg3JooBI70UCCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD7gooorM0CmPwKfTSAO9AGd4o0G28U+Hr3TbxBJbX0LQyKRngjFfBfxv/al8K/su/DLxD8KPileahpt9Z77zwxcxKT9qiXmMK3qvevv9zvPHb9a+c/+Civ/AAT/APDv7dvwvXT72NbbX9KzJpeohcvA/ofb2rKpdK8Tuy+NKWIjGtpG6uflj8dP+C3HiL9oD4IDwD/Yx0/WrVsWurM2GKLwrD0YgCvj3xV4z1/41axJP45ubjVtSt4lghupCX2p2x6Gvafjv+wL8UP2evE8tprHhe6vktmIjvrWIyK6f3uOn0ry2+0rVNNZlutI1ODZyGa3K7hX55muKzFza5T+1eAMj4TwtKNenVi5Pe5l6PoMOjRqmTKYl2iRuSv41cWMlDjJx3NXdO8Pav4hnSGy0XVLp2+4sdu3zGvp79lL/gj/APEv9pPVrSfW7Gbwv4dkYNPLLxLIvoF7V4dDJ8TXlzSW5+p5z4l5Fk2FvCorpbHx34ztNa1fw3JLo1q8tn5otrm6PCW5PbPfIrk/hz4I1Gx1918P28lwzXLRy2+PmkIGSRX6u/8ABZz9jXRP2V/2NvBukeD5LbS7e0v1W5XYDNfy44dj3r88f2C9C1PxD+014Ytn1KK1R9bXezL15Gc+x9K+hlkyw8Y0b6s/GqPiLDNKFTNlpyXt8inDN5oeNgySo22SMjmJx1U0ska3EWyRQwHIz/D/APXr9Zv2/v8AgiPbfFJpPF3w3ki0zXniEl3ZqNsN42M5HYGvzO+J/wCzj8Qvgzq0lp4h8L6jamFinmrAXWTHcGvHzLIK2Hlzw1P0XgrxjyfNsLyYqSjNaWZ5ffeFLNJ3v5EeXywWSPH3D7V7H+y1/wAFAPHn7PvxA0TxJrU0+r6DoSGO00qZy6qB39jXnjQXRmwNN1HeP4TAck/StjQ/hH4t8dPHb6X4W1S8kmbp9mOK0y+rj6MlyJkcY4HhbM8P/tFSK+4/RL9mf/gtb4S+Ofx3ufFnxRju/DVloVrt8PWEaFxLI4wzN6k9q+7f2PtCufG91qfxL1WKSO58TtusklXDRW/8PHbIxX58/wDBN7/girqnijxhp3jX4p2y2+laeyzWmlMOZWHIL+mPSv1z0ywh02yit4Ikhht0EccafdVRwAB9K/Rsuq1pU711qfw5xphstw2PlRyuXNBFkjrk/SpB0qNX5xipK9E+PCmv0p1NfpSlsB+ZP/ByN/yb7p3/AF9j+lfiuOlftR/wcjf8m+6d/wBfY/pX4rjpX5/xN/vS9D/Sn6MH/JKr1YUUUV84f0mFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAOj+8v++v86/pG/YU/5MA0j/sBH/0Wa/m5j+8v++v86/pG/YU/5MA0j/sBH/0Wa+u4V+KZ/GH0tf8Ac8L6n4KfEj/kpWu/9hGf/wBDNY1bPxI/5KVrv/YRn/8AQzWNX3R/CXQKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK634Bf8l28H/9hWH/ANCrkq634Bf8l28H/wDYVh/9CoA/os+Mn/Jt+p/9gkf+gCvy7g+5X6ifGT/k2/U/+wSP/QBX5dwfcqY7kyH0UUVRIUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABQfuN9DRQfuN9DQLqfoj/AME9P+TdbD/faub/AGn/APkorf8AXOuk/wCCen/Juth/vtXN/tP/APJRW/651madDzaiiitCAooooAMZXnkenqaAP3fzE+Z1Y9vYUZxRQAhB2UDgUuaKACiiigAooop3YBRRRRdgFFFFIAooooAKKKKACiiincAooopAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB9wUUUVmaBTSvzU6igCJojg4//AFUhjKp7+tTU1+lG4dLFDUtAs9ZgMd3aW9zGRhllQNurj9f/AGZ/AviQf6X4Y0iTPBzbrXe0kn3PxqJQUnZnVSxNalrSm16M4nw9+zl4I8LOj2HhrSIJI/ustuuRXYw26WsY8tFjVeAFGBipo+ops3+r/Gi0Y7IipiKtZ3qyb9TwP9uT/gn94c/bq0fR7HxJd3kEGkS+bEIHK5Y9zXz/AOAf+Dfz4Y/DzxnYazYX2qx3VjeLeIfOOCwOf6V9/HrSfxis3Qpy96Suztw2c4uhSdClO0X0K9nposLOCBSSIUCAk9cCs3xN8O9E8Zw7dV0uxvvQTRBsVuP96kq2orSx5sa04S5ouzPOo/2T/h6t55//AAimjeaO/wBmWui0L4UeHfDrg2Oh6basvRo4QpFdGOtKnWpdKC2R1Tx2In8c2/myIWwD8AYA+72NKq+X1+93p3/Lc/SmN1H0rZR0ONa3JgwGPWnVF/GKlo2DYKa/SnU1+lKWwH5k/wDByN/yb7p3/X2P6V+K46V+1H/ByN/yb7p3/X2P6V+K46V+f8Tf70vQ/wBKfowf8kqvVhRRRXzh/SYUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQA6P7y/76/zr+kb9hT/AJMA0j/sBH/0Wa/m5j+8v++v86/pG/YU/wCTANI/7AR/9FmvruFfimfxh9LX/c8L6n4KfEj/AJKVrv8A2EZ//QzWNWz8SP8AkpWu/wDYRn/9DNY1fdH8JdAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArrfgF/wAl28H/APYVh/8AQq5Kut+AX/JdvB//AGFYf/QqAP6LPjL/AMm36n/2CR/6AK/LuD7lfqJ8Zf8Ak3DU/wDsEj/0AV+XcH3KmO5Mh9FFFUSFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUH7jfQ0UH7jfQ0C6n6I/8ABPT/AJN1sP8Afaub/af/AOSit/1zrpP+Cen/ACbrYf77Vzf7T/8AyUVv+udR1NOh5tRRRVkBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUgCiiimAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf/Z'
              ,width: 800,
              height: 20,
              colSpan:11
            },'','','','','','','','','',''],
            [ {text:'Institucion Educativa: SANTO TOMAS', alignment:'left', borderColor:['#fff','#000','#fff','#000']},
              {text:'',borderColor:['#fff','#000','#fff','#000']},
              {text:'Nivel: SECUNDARIA', alignment:'left',borderColor:['#fff','#000','#fff','#000']},
              {text:'Grado/Seccion: '+this.qalRecGradoSeccion(), alignment:'left', colSpan:2,borderColor:['#fff','#000','#fff','#000']},
              {text:'',borderColor:['#fff','#000','#fff','#000']},
              {text:'',borderColor:['#fff','#000','#fff','#000']},
              {text:'Codigo Modular: 0236661', alignment:'left',borderColor:['#fff','#000','#fff','#000']},
              {text:'',borderColor:['#fff','#000','#fff','#000']},
              {text:'Fecha: '+this.qalRecFecha() , alignment:'left',borderColor:['#fff','#000','#fff','#000']},
              {text:'',borderColor:['#fff','#000','#fff','#000']},
              {text:'Hora Reparto: 10:00 a 12:00', alignment:'left',borderColor:['#fff','#000','#fff','#000']}
            ],
            [ {text:'Departamento: CUSCO', alignment:'left',borderColor:['#fff','#000','#fff','#000']},
              {text:'',borderColor:['#fff','#000','#fff','#000']},
              {text:'Provincia: CHUMBIVILCAS', alignment:'left',borderColor:['#fff','#000','#fff','#000']},
              {text:'',borderColor:['#fff','#000','#fff','#000']},
              {text:'Distrito: SANTO TOMAS', alignment:'left', colSpan:2,borderColor:['#fff','#000','#fff','#000']},
              {text:'',borderColor:['#fff','#000','#fff','#000']},
              {text:'Centro Poblado: SANTO TOMAS', alignment:'left', colSpan:4,borderColor:['#fff','#000','#fff','#000']},
              {text:'',borderColor:['#fff','#000','#fff','#000']},
              {text:'',borderColor:['#fff','#000','#fff','#000']},
              {text:'',borderColor:['#fff','#000','#fff','#000']},
              {text:'1087', alignment:'right', style:'smalltext',borderColor:['#fff','#000','#fff','#000']}
            ]
          ]
        },
        margin:[-5,-2,-5,-2]
      }
    ];

    return tableEncabezado;
  } 
  // firmas de la tabla
  QalTableFooter(){
    var tableFooter= [{
      table:{
        widths:[10,'*',10,'*',10,'*',10,'*'],
        heights:[12,6,16,6],
        body:[
          [ {text:'',borderColor:['#fff','#fff','#fff','#fff']},
            {text:'',borderColor:['#fff','#fff','#fff','#000']},
            {text:'',borderColor:['#fff','#fff','#fff','#fff']},
            {text:'',borderColor:['#fff','#fff','#fff','#000']},
            {text:'',borderColor:['#fff','#fff','#fff','#fff']},
            {text:'',borderColor:['#fff','#fff','#fff','#000']},
            {text:'',borderColor:['#fff','#fff','#fff','#fff']},
            {text:'',borderColor:['#fff','#fff','#fff','#000']}],
          
          [ {text:'',borderColor:['#fff','#fff','#fff','#fff']},
            {text:'NOMBRES,APELLIDOS Y DNI DE INTEGRANTE CAE',style:'smalltext',borderColor:['#fff','#fff','#fff','#fff']},
            {text:'',borderColor:['#fff','#fff','#fff','#fff']},
            {text:'NOMBRES,APELLIDOS Y DNI DE INTEGRANTE CAE',style:'smalltext',borderColor:['#fff','#fff','#fff','#fff']},
            {text:'',borderColor:['#fff','#fff','#fff','#fff']},
            {text:'NOMBRES,APELLIDOS Y DNI DE INTEGRANTE CAE',style:'smalltext',borderColor:['#fff','#fff','#fff','#fff']},
            {text:'',borderColor:['#fff','#fff','#fff','#fff']},
            {text:'NOMBRES,APELLIDOS Y DNI DEL ACTOR SOCIAL O AUTORIDAD LOCAL',style:'smalltext',borderColor:['#fff','#fff','#fff','#fff']}],
          
          [ {text:'',borderColor:['#fff','#fff','#fff','#fff']},
            {text:'',borderColor:['#fff','#fff','#fff','#000']},
            {text:'',borderColor:['#fff','#fff','#fff','#fff']},
            {text:'',borderColor:['#fff','#fff','#fff','#000']},
            {text:'',borderColor:['#fff','#fff','#fff','#fff']},
            {text:'',borderColor:['#fff','#fff','#fff','#000']},
            {text:'',borderColor:['#fff','#fff','#fff','#fff']},
            {text:'',borderColor:['#fff','#fff','#fff','#000']}],
          
          [ {text:'',borderColor:['#fff','#fff','#fff','#fff']},
            {text:'FIRMA Y HUELLA DIGITAL DE INTEGRANTE CAE',style:'smalltext',borderColor:['#fff','#fff','#fff','#fff']},
            {text:'',borderColor:['#fff','#fff','#fff','#fff']},
            {text:'FIRMA Y HUELLA DIGITAL DE INTEGRANTE CAE',style:'smalltext',borderColor:['#fff','#fff','#fff','#fff']},
            {text:'',borderColor:['#fff','#fff','#fff','#fff']},
            {text:'FIRMA Y HUELLA DIGITAL DE INTEGRANTE CAE',style:'smalltext',borderColor:['#fff','#fff','#fff','#fff']},
            {text:'',borderColor:['#fff','#fff','#fff','#fff']},
            {text:'FIRMA Y HUELLA DIGITAL DEL ACTOR SOCIAL O AUTORIDAD LOCAL',style:'smalltext',borderColor:['#fff','#fff','#fff','#fff']}],
          
        ]
      }
    }];
    return tableFooter;
  }
  //encabezados de la tabla del registro de los estudiantes
  qalEstHeaderI(){
    return [
      {text:'N°', rowSpan:3, margin:[0,40,0, 40]},
      {text:'NOMBRE Y APELLIDOS DE LA USUARIA O USUARIO', margin:[0,40,0,40], rowSpan:3},
      {text:'NOMBRES Y APELLIDOS', colSpan:2},'*',
      {text:'FIRMA', rowSpan:3, margin:[0,40,0,40]},
      {text:'HUELLA DIGITAL', rowSpan:3, margin:[0,40,0,40]},
      {text:'CANTIDAD DE ALIMENTOS ENTREGADOS POR CADA GRUPO', colSpan:13},
      '*','*','*','*','*','*','*','*','*','*','*','*',
      {image: this.writeRotatedText('Observaciones'), fit:[30,80], alignment: 'center', rowSpan:3}
    ] 
  }
  qalEstHeaderII(){
    return ['*','*',
    {text:'MADRE/PADRE/APODERADO', rowSpan:2, margin:[0,40,0,40]},
    {text:'DNI', rowSpan:2, margin:[0,40,0,40]}, '*','*',
    {text:'PROTEINA DE ORIGEN ANIMAL', colSpan:3, style:'smalltext'},'*','*',
    {text:'CERALES Y TUBERCULOS',colSpan:4},'*','*','*',
    {text:'MENESTRAS', style:'smalltext'},
    {text:'HARINAS Y HOJUELAS', colSpan:2, style:'smalltext'},'*',
    {text:'ACEITES Y GRASAS',colSpan:2, style:'smalltext'},'*',
    {text:'AZUCAR', style:'smalltext'},'*']
  }
  qalEstHeaderIII(){
    return ['*','*','*','*','*','*',
    [ {image: this.writeRotatedText('LECHE EVAPORADA '), fit:[25,75],alignment:'left',
        margin:[0,-14,0,0]},
      {image: this.writeRotatedText('ENTERA (0.400 Kg.)'), fit:[25,75], alignment: 'right', 
        margin:[0,-76,0,0]},
    ],
    [ {image: this.writeRotatedText('PESCADO EN ACEITE '), fit:[25,75],alignment:'left',
        margin:[0,-12,0,0]},
      {image: this.writeRotatedText('VEGETAL(0.170Kg)'), fit:[25,75], alignment: 'right', 
        margin:[0,-82,0,0]},
    ],
    [ {image: this.writeRotatedText('CARNE DE POLLO/ '), fit:[25,75],alignment:'left',
        margin:[0,-18,0,0]},
      {image: this.writeRotatedText('GALLINA (0.170Kg.)'), fit:[25,75], alignment: 'right', 
        margin:[0,-74,0,0]},
    ], '',
    [ {image: this.writeRotatedText('ARROZ FORT.'), fit:[25,75],alignment:'left',
        margin:[0,-28,0,0]},
      {image: this.writeRotatedText('(1.000Kg.)'), fit:[25,75], alignment: 'right', 
        margin:[0,-80,0,0]},
    ],
    [ {image: this.writeRotatedText('FIDEOS'), fit:[25,75],alignment:'left',
        margin:[0,-38,0,0]},
      {image: this.writeRotatedText('(0.500Kg.)'), fit:[25,75], alignment: 'right', 
        margin:[0,-74,0,0]},
    ],
    [ {image: this.writeRotatedText('QUINUA'), fit:[25,75],alignment:'left',
        margin:[0,-38,0,0]},
      {image: this.writeRotatedText('(0.500Kg.)'), fit:[25,75], alignment: 'right', 
        margin:[0,-74,0,0]},
    ],
    [ {image: this.writeRotatedText('LENTEJAS'), fit:[25,75],alignment:'left',
        margin:[0,-38,0,0]},
      {image: this.writeRotatedText('(1.000Kg.)'), fit:[25,75], alignment: 'right', 
        margin:[0,-74,0,0]},
    ],
    [ {image: this.writeRotatedText('HOJUELA DE AVENA'), fit:[25,75],alignment:'left',
        margin:[0,-15,0,0]},
      {image: this.writeRotatedText('(0.250Kg.)'), fit:[25,75], alignment: 'right', 
        margin:[0,-90,0,0]},
    ],
    [ {image: this.writeRotatedText('MEZCLA DE HARINA'), fit:[25,75],alignment:'left',
        margin:[0,-15,0,0]},
      {image: this.writeRotatedText('(0.250Kg.)'), fit:[25,75], alignment: 'right', 
        margin:[0,-90,0,0]},
    ],'',
    [ {image: this.writeRotatedText('ACEITE VEGETAL'), fit:[25,75],alignment:'left',
        margin:[0,-22,0,0]},
      {image: this.writeRotatedText('(1.000L)'), fit:[25,75], alignment: 'right', 
        margin:[0,-88,0,0]},
    ],
    [ {image: this.writeRotatedText('AZUCAR'), fit:[25,75],alignment:'left',
        margin:[0,-38,0,0]},
      {image: this.writeRotatedText('(0.500Kg.)'), fit:[25,75], alignment: 'right', 
        margin:[0,-74,0,0]},
    ],'*']
  }
  //Generacion de contenido para reporte
  // funcion principal
  qalEstRepCont(){
    var contenido = [];
    var totalEst = this.estudiantes.length;
    var cantHoja = (totalEst -(totalEst%10))/10;
    var i = 0 ;
    while(i<= cantHoja){
      i++;
      //cambio de hoja
      contenido.push(this.QalTablePrincipal(0+((i-1)*10), 9 ));
      if(i<=cantHoja){
        contenido.push({text:'', style:'smalltext', pageBreak:'before'}); //salto de pagina.
      }
    }
    return contenido;
  }
  // Contenido de cada pagina 
  // creacion de cada tabla de registros
  QalTablePrincipal(inicio,final){
    return {
      table:{
        widths:['100%'],
        heights:[54,410,80],
        body:[
          //encabezado
          this.QalTableHeader(),
          //estudiantes
          [{
            table:{
              widths:[10,95,160,36,'*','*',13,13,13,8,13,13,13,15,13,13,8,13,15,8],
              heights:['*','*','*',24,24,24,24,24,24,24,24,24,24 ],
              body:this.qalEstTableRel(inicio,final),
            },
            margin:[-5,-2.5,-5,-2.5]
          }],
          //firmas
          this.QalTableFooter()
        ], 
      }
    }
  }
  
  //relacion del grupo de los estudiantes
  qalEstTableRel(inicio, final){
    var table = [];
    var con = 0;
    table.push(this.qalEstHeaderI());
    table.push(this.qalEstHeaderII());
    table.push(this.qalEstHeaderIII());
    for(var i=0; i<10; i++){
      if(this.estudiantes[inicio]){
        table.push(this.qalEstDetalles(inicio));
        con++;
      }
      else{
        table.push(this.qalEstVoid());
      }
      inicio++;
    }

    var total = [{text:'TOTAL',colSpan:6,fillColor:'#0f0'},'','','','','',
      {text:con*5,fillColor:'#0f0'},
      {text:con*8,fillColor:'#0f0'},
      {text:con*8,fillColor:'#0f0'},
      {text:'',fillColor:'#0f0'},
      {text:con*4,fillColor:'#0f0'},
      {text:con*4,fillColor:'#0f0'},
      {text:con*2,fillColor:'#0f0'},
      {text:con*2,fillColor:'#0f0'},
      {text:con*2,fillColor:'#0f0'},
      {text:con*2,fillColor:'#0f0'},
      {text:'',fillColor:'#0f0'},
      {text:con*1,fillColor:'#0f0'},
      {text:con*1,fillColor:'#0f0'},
      {text:'',fillColor:'#0f0'}]
    table.push(total);
    return table;
  }
  // Detalles de los padres de familia
  qalEstDetalles(est){
    //console.log(this.estudiantes[est]);
    var estud = [this.estudiantes[est].apellidos.toUpperCase(),
    this.estudiantes[est].nombre.toUpperCase()];
    //var vacio= '\n';
    var padre, madre, apoder;
    var dnipadre, dnimadre, dniapoder;
    if(this.estudiantes[est].familia.padre){
      padre = this.estudiantes[est].familia.padre.apellidos.toUpperCase();
      padre += ', ';
      padre += this.estudiantes[est].familia.padre.nombre.toUpperCase();
      dnipadre = this.estudiantes[est].familia.padre.dni;
    }
    if(this.estudiantes[est].familia.madre){
      madre = this.estudiantes[est].familia.madre.apellidos.toUpperCase();
      madre +=', ';
      madre += this.estudiantes[est].familia.madre.nombre.toUpperCase();
      dnimadre = this.estudiantes[est].familia.madre.dni;
    }
    if(this.estudiantes[est].familia.apoderado){
      apoder = this.estudiantes[est].familia.apoderado.apellidos.toUpperCase();
      apoder +=', ';
      apoder += this.estudiantes[est].familia.apoderado.nombre.toUpperCase();
      dniapoder = this.estudiantes[est].familia.apoderado.dni;
    }
    return [est+1,estud,[padre,madre,apoder],[dnipadre, dnimadre,dniapoder],'','','5','8','8','','4','4','2','2','2','2','','1','1',''];
  }
  // 
  qalEstVoid(){
    return ['','','','','','','','','','','','','','','','','','','',''];
  }
  // FUINCION PARA ROTACION DEL TEXTO
  writeRotatedText = function(text) {
    var ctx, canvas = document.createElement('canvas');
    // I am using predefined dimensions so either make this part of the arguments or change at will 
    canvas.width = 50;
    canvas.height = 600;
    ctx = canvas.getContext('2d');
    ctx.font = '36pt Arial';
    ctx.save();
    ctx.translate(35,600);
    ctx.rotate(-0.5*Math.PI);
    ctx.fillStyle = '#000';
    ctx.fillText(text , 0, 0);
    ctx.restore();
    return canvas.toDataURL();
  };

}
