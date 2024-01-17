import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProduitsService } from '../services/produits.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css'],
})
export class ProduitsComponent implements OnInit {
  produits: Produit[] = [];
  produitCourant = new Produit();
  erreur: string | null = null;
  editMode = false;
  loading = true;

  constructor(private produitsService: ProduitsService) {}

  ngOnInit(): void {
    console.log('Initialisation du composant: Récupérer la liste des produits');
    this.consulterProduits();
  }

  consulterProduits() {
    console.log('Récupérer la liste des produits---');
    // Appeler la méthode 'getProduits' du service pour récupérer les données du JSON
    this.produitsService.getProduits().subscribe({
      // En cas de succès
      next: (data) => {
        console.log('Succès GET');
        this.produits = data;
        this.loading = false;
      },
      // En cas d'erreur
      error: (err) => {
        console.log('Erreur GET', err);
        this.loading = false;
      },
    });
  }

  supprimerProduit(p: Produit) {
    let reponse: boolean = confirm(
      'Voulez-vous supprimer le produit :' + p.designation + ' ?'
    );
    if (reponse == true) {
      console.log('Suppression confirmée...');
      this.produitsService.deleteProduit(p.id).subscribe({
        next: () => {
          console.log('Succès DELETE');
          let index: number = this.produits.indexOf(p);
          console.log('indice du produit à supprimer: ' + index);
          if (index !== -1) {
            this.produits.splice(index, 1);
          }
        },
        error: (err) => {
          console.log('Erreur DELETE');
        },
      });
    } else {
      console.log('Suppression annulée...');
    }
  }

  validerFormulaire(form: NgForm) {
    if (form.form.valid) {
      console.log('Formulaire valide');
      if (this.editMode) {
        this.modifierProduit();
        this.editMode = false;
      } else {
        console.log(
          'Mode édition désactivé. Le formulaire est destiné uniquement à la mise à jour.'
        );
      }
    } else {
      console.log('Formulaire invalide');
      this.erreur = 'Veuillez remplir tous les champs.';
    }
  }

  modifierProduit() {
    this.produitsService
      .updateProduit(this.produitCourant.id, this.produitCourant)
      .subscribe({
        next: () => {
          console.log('Succès modification de produit');

          const index = this.produits.findIndex(
            (p) => p.id === this.produitCourant.id
          );
          if (index !== -1) {
            this.produits[index] = { ...this.produitCourant };
          }
          this.produitCourant = new Produit();
          this.editMode = false;
        },
        error: (err) => {
          console.log('Erreur modification de produit', err);
          this.erreur = 'Erreur lors de la modification du produit.';
        },
      });
  }

  annulerEdition() {
    this.produitCourant = new Produit();
    this.editMode = false;
  }

  editerProduit(p: Produit) {
    console.log('editer works...');
    this.erreur = null;
    this.produitCourant = { ...p };
    this.editMode = true;
  }
}
