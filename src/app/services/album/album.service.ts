import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album, Banda } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  private API = "https://localhost:7049/api/Album";
  constructor(private http: HttpClient) {}

  listarTopFive(): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.API}/listarTopFive`);
  }

  listar(filtro: string): Observable<Album[]> {
    let params = new HttpParams();

    if (filtro.trim().length > 2) {
      params = params.set('?nome=', filtro);
    }

    return this.http.get<Album[]>(`${this.API}/listar`, { params });
  }
}
