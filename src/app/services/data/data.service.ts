/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class DataService {
	protected selectedId?: number = 0;
	public filtro: string = '';
	private listaFiltrada = new Subject<void>();

	constructor(private toastr: ToastrService) {
		this.toastr.toastrConfig.preventDuplicates = true;
		this.toastr.toastrConfig.progressBar = true;
		this.toastr.toastrConfig.progressAnimation = 'decreasing';
	}

	// Métodos utilitários.
	armazenaIdSelecionado(id?: number) {
		this.selectedId = id;
	}

	obterIdSelecionado() {
		return this.selectedId;
	}

	validaRota(rota: string): boolean {
		if (
			rota === '/filtro/musicas' &&
			(!this.selectedId || this.selectedId === 0)
		) {
			this.toastr.error(
				'Não encontramos a música que deseja editar, por favor, selecione uma música e tente novamente',
				'Erro!'
			);
			return false;
		}

		if (
			rota === '/filtro/albuns' &&
			(!this.selectedId || this.selectedId === 0)
		) {
			this.toastr.error(
				'Não encontramos o álbum que deseja editar, por favor, selecione um álbum e tente novamente',
				'Erro!'
			);
			return false;
		}

		if (
			rota === '/filtro/bandas' &&
			(!this.selectedId || this.selectedId === 0)
		) {
			this.toastr.error(
				'Não encontramos a banda que deseja editar, por favor, selecione uma banda e tente novamente',
				'Erro!'
			);
			return false;
		}

		return true;
	}

	armazenaFiltro(filtro: string) {
		this.filtro = filtro;
		this.listaFiltrada.next();
	}

	obterFiltro() {
		return this.filtro;
	}
}
