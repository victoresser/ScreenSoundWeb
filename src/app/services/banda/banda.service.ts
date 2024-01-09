import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Banda } from 'src/app/components/filtro/banda/models/banda.model';

@Injectable({
	providedIn: 'root',
})
export class BandaService {
	private API = 'https://localhost:7049/api/Banda';

	constructor(private http: HttpClient) {}

	listarTopFive(): Observable<Banda[]> {
		return this.http.get<Banda[]>(`${this.API}/listarTopFive`);
	}

	getForName(name?: string): Observable<Banda> {
		const params = new HttpParams()

		if (name) {
			params.set('nomeBanda', name);
		}

		return this.http.get<Banda>(`${this.API}/listar?${params}`)
	}
}
