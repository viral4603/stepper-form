import { Injectable } from '@angular/core';

@Injectable()

export class FormPresenterService {
  public activeTab:number;
  constructor() {
    this.activeTab = 1;
   }
   /**
    * @description This method store steps data to local storage and move next page
    */
   submitFormData(data:any) {
    this.activeTab = data.activeForm
   } 
}
