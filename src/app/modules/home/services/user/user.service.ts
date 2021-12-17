import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { delay } from 'rxjs/internal/operators/delay';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';

import { data, update } from 'src/app/modules/home/services/user/user.service.mock';

@Injectable({providedIn: 'root'})
export class UserService {
	private data: BehaviorSubject<string>;

	public data$: Observable<string>;

	public constructor() {
		this.data = new BehaviorSubject('');
		this.data$ = this.data.asObservable().pipe(distinctUntilChanged());
	}

	public getAll(): void {
		of(data)
			.pipe(delay(1000))
			.subscribe(value => this.data.next(value));
	}

	public update(newValue: string): void {
		of(newValue)
			.pipe(delay(1000))
			.subscribe(value => {
				update(value);
				this.data.next(data);
			});
	}
}
