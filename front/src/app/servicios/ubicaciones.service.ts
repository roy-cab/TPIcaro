import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UbicacionesService {

  constructor(private http: HttpClient) { }

  url_ciudades= '/api/ubicaciones/ciudades';
  url_paises= '/api/ubicaciones/paises';

  getCiudades() {
    return this.http.get(this.url_ciudades);
  }
  getPaises() {
    return this.http.get(this.url_paises);
  }

}
