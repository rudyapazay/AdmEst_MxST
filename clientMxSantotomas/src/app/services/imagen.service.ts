import { Injectable } from '@angular/core';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  public url:string;

  constructor() { 
    this.url = GLOBAL.url;
  }

  getImagenFondoCarnet(){
    return this.url+ 'imagenes/sistema/carneEstudiante.png';
  }
  
}
