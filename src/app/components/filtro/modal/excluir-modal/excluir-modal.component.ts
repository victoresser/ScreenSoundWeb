/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogRetorno } from '../../common/model/dialog-retorno.interface';
import { TipoAcaoBotao } from '../../common/model/tipo-acao-botao.enum';

@Component({
	selector: 'app-excluir-modal',
	templateUrl: './excluir-modal.component.html',
	styleUrl: './excluir-modal.component.scss',
})

export class ExcluirModalComponent {
	titulo?: string;
	mensagem?: string;

	constructor(@Inject(MAT_DIALOG_DATA) public data: DialogRetorno,
	private matDialog: MatDialogRef<any>) {}

	onClickConfirm() {
		return this.matDialog.close(TipoAcaoBotao.Confirmar);
	}

	onClickCancel() {
		return this.matDialog.close(TipoAcaoBotao.Cancelar);
	}
}
