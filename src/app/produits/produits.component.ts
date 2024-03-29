import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Produit } from '../model/produit';
import { NgForm } from '@angular/forms';
import { ProduitsService } from '../services/produits.service';
import { CategoriesService } from '../services/categorie.service';
import { Categorie } from '../model/categorie';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css'],
})
export class ProduitsComponent implements OnInit {
  produits: Produit[] = [];
  categories: Categorie[] = [];
  produitCourant: Produit = new Produit();
  selectedCategory: Categorie | undefined;
  erreur: string | undefined;
  editMode: boolean = false;
  searchTerm: string = '';
  filteredProduits: Produit[] = [];
  prixMinFilter: number = 0;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private produitsService: ProduitsService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      lengthMenu: [
        [5, 10, 25, 50, -1],
        [5, 10, 25, 50, 'All'],
      ],
      pageLength: 5,
    };

    this.getData();
  }

  getData(): void {
    this.getProduits();
    this.getCategories();
  }

  getProduits(): void {
    this.produitsService.getProduits().subscribe(
      (produits) => {
        this.produits = produits;
        this.dtTrigger.next(null);
      },
      (error) => console.error('Error fetching produits', error)
    );
  }

  getCategories(): void {
    this.categoriesService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => console.error('Error fetching categories', error)
    );
  }

  validerFormulaire(form: any): void {
    if (this.editMode) {
      const reponse: boolean = confirm(
        'Produit existant. Confirmez-vous la mise à jour de :' +
          this.produitCourant.designation +
          ' ?'
      );
      if (reponse) {
        if (this.produitCourant && this.selectedCategory) {
          this.produitCourant.categorie = this.selectedCategory;

          this.produitsService.updateProduit(this.produitCourant).subscribe(
            (updatedProduit) => {
              console.log('Updated successfully...');
              const index = this.produits.findIndex(
                (p) => p.id === updatedProduit.id
              );
              if (index !== -1) {
                this.produits[index] = updatedProduit;
              }
              this.reset();
            },
            (error) => {
              console.error('Erreur Update', error);
              this.erreur = 'Erreur Update';
            }
          );
        } else {
          console.error('Error: selectedCategory is undefined');
        }
      }
    }
  }

  editerProduit(p: Produit) {
    console.log('editer works...');
    this.produitCourant = { ...p };
    this.editMode = true;
  }

  private reset(): void {
    this.editMode = false;
    this.produitCourant = new Produit();
    this.erreur = undefined;
    this.selectedCategory = undefined;
  }

  supprimerProduit(p: Produit) {
    let reponse: boolean = confirm(
      'Voulez-vous supprimer le produit :' + p.designation + ' ?'
    );
    if (reponse) {
      console.log('Suppression confirmée...');
      this.produitsService.deleteProduit(p).subscribe({
        next: () => {
          console.log('Succès DELETE');
          let index: number = this.produits.indexOf(p);
          console.log('indice du produit à supprimer: ' + index);
          if (index !== -1) {
            this.produits.splice(index, 1);
          }
        },
        error: (err) => {
          console.log('Erreur DELETE', err);
        },
      });
    } else {
      console.log('Suppression annulée...');
    }
  }

  // Filter and order products

  filterProduitsParPrix(): void {
    this.produitsService
      .findByPrixGreaterThanOrderByPrixAsc(this.prixMinFilter)
      .subscribe(
        (filteredProduits) => {
          console.log('Filtered produits:', filteredProduits);
          this.produits = filteredProduits;
          this.filteredProduits = filteredProduits;
          console.log('Filter produits successful...');
        },
        (error) => console.error('Erreur filte produits par prix', error)
      );
  }
}
