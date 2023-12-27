import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class HandleService {
	constructor() {}

	handleKeyDownPress(event: KeyboardEvent, method: () => void) {
		const key = event.key;
		if (key === 'Enter') {
			method();
		}
	}
}
