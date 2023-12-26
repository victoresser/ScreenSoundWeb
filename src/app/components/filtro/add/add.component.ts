import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrl: './add.component.css',
})
export class AddComponent {
	@Input() add = false;
	@Input() listar = true;
	@Input() rotaAtual = '';
	@Output() addChange: EventEmitter<boolean> = new EventEmitter<boolean>();

	onAddChange() {
		this.add = !this.add;
    this.addChange.emit(this.add);
  }
}
