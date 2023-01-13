import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Data } from '../Interfaces/data';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  listeLicense(nombre?: number): Observable<Data[]> {
    let url: string = environment.apiUrl + 'license/liste';
    if (nombre) {
      url += '/' + nombre;
    }
    return this.http.get<Data[]>(url);
  }

  listeLanguage(nombre?: number): Observable<Data[]> {
    let url: string = environment.apiUrl + 'language/liste';
    if (nombre) {
      url += '/' + nombre;
    }
    return this.http.get<Data[]>(url);
  }
}
