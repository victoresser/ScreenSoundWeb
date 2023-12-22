import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RouteChangeService } from './services/routes/route-change.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
	title = 'ScreenSound';
	routeChangeSubscription: Subscription = new Subscription();
	currentRoute: string | undefined;

	constructor(private routeChangeService: RouteChangeService) {}

	ngOnInit() {
		this.routeChangeSubscription = this.routeChangeService
			.getRouteChangeObservable()
			.subscribe((route: string) => {
				this.currentRoute = route;
				console.log('Route changed to: ', this.currentRoute);
			});
	}

	ngOnDestroy() {
		this.routeChangeSubscription.unsubscribe();
	}
}
