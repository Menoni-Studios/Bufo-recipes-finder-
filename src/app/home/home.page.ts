import { Component } from '@angular/core';
import {IonCardContent, IonCardTitle, IonCardHeader, IonSearchbar, IonCard, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonInput } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import {RouterLink} from '@angular/router';
import { Spoonacular } from '../services/spoonacular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonIcon, FormsModule, IonCardHeader,
    RouterLink, IonCard, IonSearchbar, CommonModule,
IonCardTitle, IonCardContent,
  ],
})
export class HomePage {

ingredients: string = '';
recipes: any[] = [];

constructor(private recipeService: Spoonacular){}

  searchRecipes() {
    // Split by commas, trim spaces
    const ingredientList = this.ingredients
      .split(',')
      .map(i => i.trim())
      .filter(i => i.length > 0);

  this.recipeService.searchRecipes(this.ingredients).subscribe((data:any)=>{
  this.recipes = data.results; 

 console.log('Recipes found:', this.recipes);
});
}
}

