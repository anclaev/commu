import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private _loading$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  loading$: Observable<boolean> = this._loading$$.asObservable();

  get status() {
    return this._loading$$.value;
  }

  start() {
    this._loading$$.next(true);
  }

  stop() {
    this._loading$$.next(false);
  }
}
