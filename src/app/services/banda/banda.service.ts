import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';
import {
	CreateBandaDto,
	EditBandaDto,
} from 'src/app/components/filtro/banda/interface/banda.interface';
import { Banda } from 'src/app/components/filtro/banda/models/banda.model';

@Injectable({
	providedIn: 'root',
})
export class BandaService {
	private API = 'https://localhost:7049/api/Banda';
	private listaSubject = new Subject<void>();
	private pageSize = 20;

	constructor(private http: HttpClient, private toastr: ToastrService) {}

	async getBandas(page: number, filtro?: string): Promise<Observable<Banda[]>> {
		const skip = (page - 1) * this.pageSize;
		let params = new HttpParams()
			.set('skip', skip)
			.set('take', this.pageSize);

		if (filtro) {
			params = params.set('nomeBanda', filtro);
		}
		const url = `${this.API}/listar?${params}`;
		return this.http.get<Banda[]>(url);
	}

	listarTopFive(): Observable<Banda[]> {
		return this.http.get<Banda[]>(`${this.API}/listarTopFive`);
	}

	onAdd(banda: CreateBandaDto): Observable<Banda> {
		return this.http.post<Banda>(`${this.API}/adicionarBanda`, banda).pipe(
			tap(() => {
				this.toastr.success('Banda adicionada com sucesso!', 'Sucesso');
				this.notificarAtualizacao();
			})
		);
	}

	onEdit(banda: EditBandaDto): Observable<Banda> {
		return this.http.put<Banda>(`${this.API}/editar/${banda.id}`, banda).pipe(
			tap(() => {
				this.toastr.success('Banda editada com sucesso', 'Sucesso');
				this.notificarAtualizacao();
			}),
			catchError((error) => {
				console.log(error);
				return throwError(
					() =>
						new Error(
							'Algo deu errado e foi impossível realizar a requisição PUT'
						)
				);
			})
		);
	}

	async onDelete(id: number) {
		return this.http.delete<Banda>(`${this.API}/excluir/${id}`).pipe(
			tap(() => {
				this.toastr.success('Banda deletada com sucesso', 'Sucesso');
				this.notificarAtualizacao();
			}),
			catchError((error: string) => {
				this.toastr.error(error, 'Erro');
				return throwError(
					() =>
						new Error(
							'Algo deu errado e foi impossível realizar a requisição DELETE'
						)
				);
			})
		);
	}

	public validaBanda(banda: CreateBandaDto) {
		if (!banda.nome.trim()) {
			this.toastr.warning('O nome da banda não pode estar vazío', 'Atenção');
			return false;
		}

		if (!banda.descricao.trim()) {
			this.toastr.warning(
				'Descrição inválida, por favor, adicione uma descrição para esta banda',
				'Atenção'
			);
			return false;
		}

		return true;
	}

	private notificarAtualizacao() {
		this.listaSubject.next();
	}

	public obterAtualizacao() {
		return this.listaSubject.asObservable();
	}
}
