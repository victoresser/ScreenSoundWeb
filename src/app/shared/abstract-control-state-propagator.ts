/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractControl } from "@angular/forms";

const methods: (keyof AbstractControl<any, any>)[] = [
  'markAsDirty',
  'markAsPristine',
  'markAsTouched',
  'markAsUntouched',
  'reset',
  'setValidators',
  'addValidators',
  'removeValidators',
  'clearValidators',
  'setAsyncValidators',
  'addAsyncValidators',
  'removeAsyncValidators',
  'clearAsyncValidators'
];

/**
 * Decorador para propagar o estado entre FormControls.
 *
 * Faz com que alguns métodos em `source`, quando chamados, sejam também chamados em `target`.
 *
 * Útil, por exemplo, em componentes genéricos que estão em um FormGroup e que também possuem
 * um FormGroup dentro deles e precisa propagar estados como dirty e touched.
 *
 * Os métodos propagados estão listados aqui na constante `methods`.
 */
export class AbstractControlStatePropagator {
  static setPropagation(source: AbstractControl<any, any>, target: AbstractControl<any, any>): void {
    methods.forEach(method => {
      this.decorateFunction(source, target, method);
    });
  }

  private static decorateFunction(source: any, target: any, name: string) {
    const orig = source[name];
    source[name] = (...args: any[]) => {
      orig.apply(source, args);
      target[name](...args);
    };
  }
}
