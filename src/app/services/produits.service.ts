import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../model/produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  urlHote="http://localhost:3333/produits/";

  constructor(private http :HttpClient) { }

  getProduits() :Observable<Array<Produit>>
{
return this.http.get<Array<Produit>> (this.urlHote);
}
deleteProduit(idP: number|undefined)
{
return this.http.delete (this.urlHote+idP);
}
addProduit(nouveau: Produit)
 {
return this.http.post<Array<Produit>> (this.urlHote,nouveau);
}
updateProduit(idP: number | undefined, nouveau: Produit)
 {
return this.http.put(this.urlHote+idP,nouveau);
}
}
