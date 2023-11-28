import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Musica } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private musicaAPI = 'https://localhost:7049/api/Musica';
  private albumAPI = 'https://localhost:7049/api/Album';
  private bandaAPI = 'https://localhost:7049/api/Banda';
  private pageSize = 10;

  constructor(private http: HttpClient) {}

  getMusicas(page: number): Observable<Musica[]> {
    const skip = (page - 1) * this.pageSize;
    const url = `${this.musicaAPI}/listar?skip=${skip}&take=${this.pageSize}`;
    return this.http.get<Musica[]>(url);
  }
}
