import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from 'src/app/components/filtro/album/model/album.model';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  private API = "https://localhost:7049/api/Album";
  constructor(private http: HttpClient) {}

  listarTopFive(): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.API}/listarTopFive`);
  }
}
