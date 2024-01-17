import { Component } from '@angular/core';
import { Produit } from '../model/produit';
import { ProduitsService } from '../services/produits.service';

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css'],
})
export class AjoutProduitComponent {
  produits: Produit[] = [];
  nouveauProduit: Produit = new Produit();
  erreur: string | null = null;
  //nouveauProduit: Produit = { id: 0, code: '', designation: '', prix: 0 };

  constructor(private produitsService: ProduitsService) {}

  ngOnInit(): void {
    console.log('récupérer la liste des produits');
    this.produitsService.getProduits().subscribe({
      next: (data) => {
        console.log('Succès GET');
        this.produits = data;
      },
      error: (err) => {
        console.log('Erreur GET', err);
      },
    });
  }

  validerFormulaire() {
    const existingProduct = this.produits.find(
      (p) => p.id === this.nouveauProduit.id
    );

    if (existingProduct) {
      alert('Identificateur de produit déjà existant.');
    } else {
      this.ajouterProduit();
    }
  }

  ajouterProduit() {
    this.produitsService.addProduit(this.nouveauProduit).subscribe({
      next: () => {
        console.log('Succès ajout de produit');
        this.nouveauProduit = new Produit(); // Clear the form for a new entry
      },
      error: (err) => {
        console.log('Erreur ajout de produit', err);
      },
    });
  }
}
