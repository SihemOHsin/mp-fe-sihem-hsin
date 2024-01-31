import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from '../model/categorie'; 

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  urlHote="http://localhost:3333/categories"; 

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Array<Categorie>> { 
    return this.http.get<Array<Categorie>>(this.urlHote+ "/");
  }

}