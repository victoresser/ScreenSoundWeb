import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TipoAcaoBotao } from 'src/app/components/filtro/common/model/tipo-acao-botao.enum';

@Injectable({
	providedIn: 'root',
})
export class ModalService {
	private subject = new Subject<TipoAcaoBotao>();

	constructor() {}

	/**
	 * Este método serve para obter a resposta da modal
	 */
	public enviarRespotaConfirmar() {
		this.subject.next(TipoAcaoBotao.Confirmar);
	}

	public enviarRespostaCancelar() {
		this.subject.next(TipoAcaoBotao.Cancelar);
	}

	public obterRespostaModal() {
		this.subject.asObservable();
	}
}
