import { Component } from '@angular/core';
import {IonFooter ,IonCardContent, IonCardTitle, IonCardHeader, IonSearchbar, IonCard, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonInput } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import {RouterLink} from '@angular/router';
import { Spoonacular } from '../services/spoonacular';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonIcon, FormsModule, IonCardHeader,
    RouterLink, IonCard, IonSearchbar, CommonModule,
IonCardTitle, IonCardContent, IonFooter
  ],
})
export class HomePage {
//Propety bound to the serch bar input.
ingredients: string = '';
//Array to hold recipe results returned from the API.
recipes: any[] = [];

//Spoonacular service injection.
constructor(private recipeService: Spoonacular, private sanitizer: DomSanitizer){}

//Method to strip HTML tags from text
stripHtmlTags(html: string): string {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

//Method triggered when "Search" is clicked.
  searchRecipes() {
    //Convert the ingredients entered in a clean list:
    //-Split by commas, -trim spaces and -filter out empty values.
    const ingredientList = this.ingredients
      .split(',')
      .map(i => i.trim())
      .filter(i => i.length > 0);
//Call the Spoonacular service to serch recipes by ingredients. 
  this.recipeService.searchRecipes(this.ingredients).subscribe((data:any)=>{
    //Store the results in the recipes array.
    this.recipes = data.results;
    //Strip HTML tags from summary
    this.recipes.forEach(recipe => {
      if (recipe.summary) {
        recipe.summary = this.stripHtmlTags(recipe.summary);
      }
    });

 console.log('Recipes found:', this.recipes);
});
}
}

/*
The {{recipe?.title}} value comes from the Spoonacular API response. Here's the flow:

1️⃣User enters ingredients and clicks "SEARCH" button

2️⃣searchRecipes() method is triggered in home.page.ts

3️⃣API call is made via the Spoonacular service:

-->this.recipeService.searchRecipes(this.ingredients).subscribe((data:any)=>{
  this.recipes = data.results;  // Store API response
});

4️⃣API returns a response with a results array containing recipe objects

5️⃣Each recipe object has properties like:
->title - recipe name
->image - recipe image URL
->summary - recipe description
->id - recipe ID

6️⃣Template loops through the recipes array:
--><ion-card *ngFor="let recipe of recipes">
  <ion-card-header>
    <ion-card-title>{{ recipe?.title }}</ion-card-title>
  </ion-card-header>
</ion-card>

-->The ?. is the safe navigation operator — it means "if recipe exists, access the title property, otherwise do nothing."

👀So {{recipe?.title}} displays each recipe's title property from the API response.
*/