import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonIcon ,IonButton ,IonCard ,IonCardTitle, IonCardContent, IonCardHeader ,IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Spoonacular } from '../services/spoonacular';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FavouritesService } from '../services/favourites-service';
@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [ RouterLink ,IonCard ,IonCardTitle ,IonCardContent, IonCardHeader ,IonContent,
     IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonIcon,
    
    ]
})


export class RecipeDetailsPage implements OnInit {
recipe: any;
isFav = false;
addedMessage = false;

  constructor(
    private route: ActivatedRoute,
    private spoonacularService: Spoonacular,
    private favService: FavouritesService
  ) { }

  ngOnInit() {
 const id = Number(this.route.snapshot.paramMap.get('id'));
    this.spoonacularService.getRecipeDetails(id).subscribe((data: any) => {
      this.recipe = data;
      console.log('Recipe details:', this.recipe);
    });
  }
toggleFavourite() {
    if (this.isFav) {
      //Remoce from favourites.
      this.favService.removeFavourite(this.recipe.id);
      this.isFav = false;
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