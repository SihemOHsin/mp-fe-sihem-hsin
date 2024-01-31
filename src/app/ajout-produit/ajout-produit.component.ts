import { Component } from '@angular/core';
import { Produit } from '../model/produit';
import { ProduitsService } from '../services/produits.service';
import { Categorie } from '../model/categorie';
import { CategoriesService } from '../services/categorie.service';

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css'],
})
export class AjoutProduitComponent {
  produits: Produit[] = [];
  categories: Categorie[] = [];
  nouveauProduit: Produit = new Produit();
  selectedCategoryId: number | undefined; 
  erreur: string | null = null;

  constructor(private produitsService: ProduitsService, private categoriesService: CategoriesService) {}

  ngOnInit(): void {
      this.fetchProduits();
      this.fetchCategories();
  }

  fetchProduits(){
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

  fetchCategories(){
    console.log('récupérer la liste des categories');
    this.categoriesService.getCategories().subscribe({
      next: (data) => {
        console.log('Succès GET categories');
        this.categories = data;
      },
      error: (err) => {
        console.log('Erreur GET categories', err);
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
      this.nouveauProduit.categorie = { id: this.selectedCategoryId, code: '', libelle: '' }; 
      this.ajouterProduit();
    }
  }

  ajouterProduit() {
    this.produitsService.addProduit(this.nouveauProduit).subscribe({
      next: () => {
        console.log('Succès ajout de produit');
        this.nouveauProduit = new Produit();
        this.selectedCategoryId = undefined; 
      },
      error: (err) => {
        console.log('Erreur ajout de produit', err);
      },
    });
  }

  effacerFormulaire() {
    this.nouveauProduit = new Produit();
    this.selectedCategoryId = undefined;
  }
}
