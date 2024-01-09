import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateAlbumDto } from 'src/app/components/filtro/album/interfaces/album.interface';
import { Album } from 'src/app/components/filtro/album/model/album.model';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  private API = "https://localhost:7049/api/Album";
  constructor(private http: HttpClient) {}

  getTopFive(): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.API}/listarTopFive`);
  }

	AddAlbum(album: CreateAlbumDto): Observable<Album> {
		return this.http.post<Album>(`${this.API}/adicionarAlbum`, album);
	}
}
