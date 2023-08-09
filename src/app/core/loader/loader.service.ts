import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

@Injectable()
export class LoaderService {
  // subject for loader for emit flag
  public isLoader: Subject<boolean>;
  //observable that subscribe flag value
  public isLoader$: Observable<boolean>;
  constructor() {
    this.isLoader = new Subject<boolean>();
    this.isLoader$ = this.isLoader.asObservable()
  }
}
