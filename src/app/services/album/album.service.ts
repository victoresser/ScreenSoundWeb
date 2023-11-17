import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Album } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  private API = "https://localhost:7049/api/Album/";
  constructor(private http: HttpClient) {}

  listarTopFive() {
    return this.http.get<Album[]>(this.API + "listarTopFive")
  }
}
