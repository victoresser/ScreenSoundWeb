/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class DataService {
	public listSubject = new Subject<any[]>();
	public listaFoiAlterada = false;
	protected selectedId?: number = 0;

	constructor(private toastr: ToastrService) {
		this.toastr.toastrConfig.preventDuplicates = true;
		this.toastr.toastrConfig.progressBar = true;
		this.toastr.toastrConfig.progressAnimation = 'decreasing';
	}

	notificarAtualizacaoLista() {
		this.listaFoiAlterada = true;
		return this.listSubject.asObservable();
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
}
