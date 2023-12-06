import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Banda } from 'src/app/components/filtro/banda/banda.model';

@Injectable({
	providedIn: 'root',
})
export class BandaService {
	private API = 'https://localhost:7049/api/Banda';

	constructor(private http: HttpClient) {}

	listarTopFive(): Observable<Banda[]> {
		return this.http.get<Banda[]>(`${this.API}/listarTopFive`);
	}

	getMusicas(filtro?: string): Observable<Banda[]> {
		return this.http.get<Banda[]>(`${this.API}/listar`);
	}
}
