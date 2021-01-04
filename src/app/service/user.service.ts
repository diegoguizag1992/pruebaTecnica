import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlAllUser = '/api_vp/auth'
  typoDocument = '/api_vp/tipoDocumentos';
  Department = '/api_vp/departamento';
  city = '/api_vp/ciudad';

  private grupos: User[];


  constructor(private http: HttpClient) {
    this.grupos = [
      {
        id: 1,
        nombre: 'Administrador'
      },
      {
        id: 2,
        nombre: 'Usuario'
      },
      {
        id: 3,
        nombre: 'Instructor'
      },
    ];
   }


   getTypeUser() {
    return this.grupos;
  }


  allUser(){
    return this.http.get<any>( `${environment.url}${this.urlAllUser}`);
  }

  updateUser(data){
    return this.http.post<any>( `${environment.url}${this.urlAllUser}`, data);
  }

  allTypeDocuments(){
    return this.http.get<any>( `${environment.url}${this.typoDocument}`);
  }

  allDepartment(){
    return this.http.get<any>( `${environment.url}${this.Department}`);
  }

  allCiudad(data){
    console.log(data);

    return this.http.post<any>( `${environment.url}${this.city}`, data);
  }

  private numeroSubject: Subject<any> = new Subject<any>();


}

