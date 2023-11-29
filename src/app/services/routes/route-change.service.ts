import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class RouteChangeService {
	private routeChangeSubject = new Subject<string>();

	constructor(private router: Router) {
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				const currentRoute = this.router.url;
				this.routeChangeSubject.next(currentRoute);
			}
		});
	}

	getRouteChangeObservable() {
		return this.routeChangeSubject.asObservable();
	}
}
