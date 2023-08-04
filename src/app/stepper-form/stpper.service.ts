import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class StpperService {

  constructor(private _http: HttpClient) {

  }
  //API FOR 
  public getCountryAndState(): Observable<any> {
    return this._http.get('https://countriesnow.space/api/v0.1/countries/states')
  }

  public getCities() : Observable<any> {
    return this._http.get('https://countriesnow.space/api/v0.1/countries')
  }
}
