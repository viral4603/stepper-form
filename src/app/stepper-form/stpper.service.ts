import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { SelectOption } from './model/index.model';

@Injectable()
export class StpperService {

  constructor(private _http: HttpClient) {

  }
  /**
   * @description api for country and state
   * @returns collection of countries with there state
   */
  public getCountryAndState(): Observable<any> {
    return this._http.get('https://countriesnow.space/api/v0.1/countries/states')
  }
  /**
  * @description api for country and cites
  * @returns collection of countries with there city
  */
  public getCountyAndciy(): Observable<any> {
    return this._http.get('https://countriesnow.space/api/v0.1/countries')
  }
  /**
   * @description Api for project list
   */
  public getProjects():Observable<any> {
    return this._http.get('http://localhost:3000/projects')
  }
  /**
   * @description Api for project list
   */
  public getPositions():Observable<any> {
    return this._http.get('http://localhost:3000/positions')
  }
  /**
   * @description Api for project list
   */
  public getFrameworks():Observable<any> {
    return this._http.get('http://localhost:3000/frameworks')
  }
  /**
   * @description Api for project list
   */
  public getProgrammingLangues():Observable<any> {
    return this._http.get('http://localhost:3000/programminglanguages')
  }
  /**
   * @description Api for send user data 
   * @param data 
   * @returns 
   */
  public saveUserData(data:any):Observable<any> {
    return this._http.post('http://localhost:3000/employeeData',data)
  }
}
