import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../model/produit';
import { Categorie } from '../model/categorie';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  urlHote="http://localhost:3333/produits/";

  constructor(private http: HttpClient) {}

  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.urlHote);
  }

  getProduit(id: number): Observable<Produit> {
    return this.http.get<Produit>(this.urlHote+ id);
  }

  addProduit(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.urlHote , produit);
  }

  updateProduit(produit: Produit): Observable<Produit> {
    return this.http.put<Produit>(this.urlHote , produit);
  }

  deleteProduit(produit: Produit): Observable<any> {
    return this.http.delete(this.urlHote , { body: produit });
  }

  findByPrixGreaterThanOrderByPrixAsc(prixMin: number): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.urlHote}findByPrixGreaterThanOrderByPrixAsc?prixMin=${prixMin}`);
  }
  
}

