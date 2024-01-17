import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  actions: Array<any> =
[
{ titre: "Accueil", route:"/accueil", iconClass: "bi-house"},
{ titre: "Liste des produits", route: "/produits", iconClass: "bi-list"},
{ titre: "Ajouter Produit", route:"/ajouterProduit", iconClass: "bi-folder-plus"}
]

actionCourante:any;

setActionCourante(a:any)
{
  this.actionCourante=a;
}
}
