import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { LoaderService } from '../loader/loader.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private _loaderService: LoaderService) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(tap((event: any) => {
      this._loaderService.isLoader.next(true)
      
      if (event.type === HttpEventType.Response) {
        this._loaderService.isLoader.next(false);
      }

    }))
  }
}
