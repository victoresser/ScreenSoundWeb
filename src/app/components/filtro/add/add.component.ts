import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HandleService } from 'src/app/services/common/handle.service';

@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrl: './add.component.css',
})
export class AddComponent {
	handler = this.handle;

	@Input() add = false;
	@Input() listar = true;
	@Input() rotaAtual = '';
	@Output() addChange: EventEmitter<boolean> = new EventEmitter<boolean>();

	constructor(private handle: HandleService) {}

	onAddChange() {
		this.add = !this.add;
		this.addChange.emit(this.add);
	}
}
