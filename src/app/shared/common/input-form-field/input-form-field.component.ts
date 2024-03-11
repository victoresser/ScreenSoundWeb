/* eslint-disable @typescript-eslint/no-explicit-any */
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
	AfterViewInit,
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Optional,
	Output,
	Self,
} from '@angular/core';
import { FormBuilder, FormGroup, NgControl } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
	selector: 'app-input-form-field',
	templateUrl: './input-form-field.component.html',
	styleUrl: './input-form-field.component.css',
})
export class InputFormFieldComponent implements OnChanges {
	label!: string;
	internalForm!: FormGroup;
	hide = true;
	hideValue = false;
	private _required: boolean = false;

	@Input() labelDefault!: string;
	@Input() labelChanged!: string;
	@Input() appearence: MatFormFieldAppearance = 'outline';
	@Input() disabled = null;
	@Input() mask: string = '';
	@Input() type: string = 'text';
	@Input() errorMessage = false;
	@Input() iconInput: string | null = null;
	@Input() iconErrorInput: string | null = null;
	@Input() iconSucessInput?: string | null = null;
	@Input() showInputSuccess = false;
	@Input() inputSuccess = false;
	@Input() maxlength: string = '';
	@Input() errorIconPrefix = false;
	@Input() hintInput = false;
	@Input() descritivoHint = '';

	@Output() actionBlur: EventEmitter<any> = new EventEmitter();
	@Output() actionKeyUp: EventEmitter<any> = new EventEmitter();
	@Output() actionFocus: EventEmitter<any> = new EventEmitter();
	@Output() actionKeypress: EventEmitter<any> = new EventEmitter();
	@Output() actionKeyDown: EventEmitter<any> = new EventEmitter();

	set required(value: BooleanInput) {
		this._required = coerceBooleanProperty(value);
	}

	get showLabel(): boolean {
		return this.labelDefault !== undefined && this.labelDefault.length > 0;
	}

	get required(): boolean {
		return this._required;
	}

	get value(): any {
		return this.typeableField !== null ? this.typeableField.value : undefined;
	}

	private get typeableField() {
		return this.internalForm.get('typeableInput');
	}

	private _onChange: (value: any) => void = () => {};
	private _onTouched: () => void = () => {};

	constructor(
		private formBuilder: FormBuilder,
		@Optional() @Self() public ngControl: NgControl
	) {
		if (this.ngControl != null) {
			this.ngControl.valueAccessor = this;
		}
	}

	ngOnChanges(changes: any) {
		if (
			changes?.labelDefault?.previousValue !==
			changes?.labelDefault?.currentValue
		) {
			this.label = this.labelDefault;
			this.labelChanged = this.labelChanged
				? this.labelChanged
				: this.labelDefault;
		}
	}

	writeValue(obj: any): void {
		this.typeableField?.setValue(obj);
	}

	registerOnChange(fn: any): void {
		this._onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this._onTouched = fn;
	}

	onKeyDown(event: KeyboardEvent) {
		const regex = /^\d+$/;
		const key = event.key;
		const allowedKeys = [
			'Backspace',
			'ArrowLeft',
			'ArrowRight',
			'Delete',
			'Tab',
			'Enter',
		];
		if (!(allowedKeys.includes(key) || regex.test(key))) {
			event.preventDefault();
			return;
		}

		if (!allowedKeys.includes(key) && this.value?.length >= +this.maxlength) {
			event.preventDefault();
			return;
		}

		this.actionKeyDown.emit(event);
	}

	onKeypress(event: KeyboardEvent) {
		this.actionKeypress.emit(event);
	}

	onKeyUp(event: any) {
		const value = typeof event === 'string' ? event : event?.target?.value;
		if (value?.length > 0) {
			this.label = this.labelChanged;
		} else {
			this.label = this.labelDefault;
		}

		this.actionKeyUp.emit(value);
	}

	onBlur(event: any) {
		this.actionBlur.emit(event.target.value);
	}

	onFocus(event: any) {
		this.actionFocus.emit(event.target.value);
	}
}
