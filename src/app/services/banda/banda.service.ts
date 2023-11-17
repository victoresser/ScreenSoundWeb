import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Banda } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class BandaService {
  private API = 'https://localhost:7049/api/Banda/';

  constructor(private http: HttpClient) {}

  listarTopFive() {
    return this.http.get<Banda[]>(this.API + 'listarTopFive');
  }
}
