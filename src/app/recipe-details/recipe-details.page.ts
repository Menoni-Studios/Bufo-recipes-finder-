import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonFooter ,IonIcon ,IonButton ,IonCard ,IonCardTitle, IonCardContent, IonCardHeader ,IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Spoonacular } from '../services/spoonacular';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FavouritesService } from '../services/favourites-service';
import { SettingService } from '../services/setting-service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [ IonFooter ,RouterLink ,IonCard ,IonCardTitle ,IonCardContent, IonCardHeader ,IonContent,
     IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonIcon,
    
    ]
})

export class RecipeDetailsPage implements OnInit {
// Holds recipe data fetched from API.
recipe: any;
// Tracks if the recipe is marked as favourite.
isFav = false;
// Controls temporary "Added to favourites" message display.
addedMessage = false;
// Tracks unit system preference (Metric or Imperial), default is Metric.
unitSystem: 'Metric' | 'Imperial' = 'Metric';

// Constructor injects required services:
  // - ActivatedRoute: to access route parameters.
  // - Spoonacular: service to fetch recipe details from API.
  // - FavouritesService: service to manage favourite recipes.
  // - SettingService: service to manage app settings.
  constructor(
    private route: ActivatedRoute,
    private spoonacularService: Spoonacular,
    private favService: FavouritesService,
    private setting: SettingService,
  ) { }

  ngOnInit() {
// Get recipe ID from route parameters.   
 const id = Number(this.route.snapshot.paramMap.get('id'));

// Fetch recipe details from Spoonacular API using the ID
this.spoonacularService.getRecipeDetails(id).subscribe((data: any) => {
  // Store recipe data    
  this.recipe = data;

      console.log('Recipe details:', this.recipe);
    });

// Subscribe to unit system changes from settings service.
    this.setting.unitSystem$.subscribe(value => {
      this.unitSystem = value;
    });

  }
// Method to toggle recipe as favourite or remove it.
toggleFavourite() {
    if (this.isFav) {
      //Remove from favourites.
      this.favService.removeFavourite(this.recipe.id);
      //Default value set to false.
      this.isFav = false;
      //Hidde Added message.
      this.addedMessage = false;
    } else {
      //Add to favourites.
      this.favService.addFavourite(this.recipe);
      this.isFav = true;
      //Show temporary "Added to favourites".
      this.addedMessage = true;

    }
  }
}