import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Banda } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class BandaService {
  private API = 'https://localhost:7049/api/Banda';

  constructor(private http: HttpClient) {}

  listarTopFive(): Observable<Banda[]> {
    return this.http.get<Banda[]>(`${this.API}/listarTopFive`);
  }

  listar(filtro: string): Observable<Banda[]> {
    let params = new HttpParams();

    if (filtro.trim().length > 2) {
      params = params.set('?nome=', filtro);
    }

    return this.http.get<Banda[]>(`${this.API}/listar`, { params });
  }
}
