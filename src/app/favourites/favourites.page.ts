import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonFooter ,IonIcon ,IonCard ,IonCardTitle ,IonCardHeader ,IonCardContent ,IonList ,IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FavouritesService } from '../services/favourites-service';
import { Spoonacular } from '../services/spoonacular';
import { SettingService } from '../services/setting-service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonButton, RouterLink, IonList, IonCardContent, IonCardHeader, IonCardTitle,
    IonCard, IonIcon, IonFooter
  ]
})
export class FavouritesPage implements OnInit {
  //Stores list of favourite recipes.
  favourites: any[] = [];
  //Store details of a single recipe.
  recipe: any;
//Default unit systeme set to Metric.
  unitSystem: 'Metric' | 'Imperial' = 'Metric';

  constructor(private favService: FavouritesService,//Inject favourites service.
    private route: ActivatedRoute,//Access route parameters.
    private spoonacularService: Spoonacular,//Fetch recipe details.
    private setting: SettingService,//Manage app settings.
  ) { }

  ngOnInit() { 
    //Get recipe ID from rout URL.
    const id = Number(this.route.snapshot.paramMap.get('id'));
    //Fetch recipe details from Spoonacular API.
    this.spoonacularService.getRecipeDetails(id).subscribe((data: any) => {
      this.recipe = data;//Get recipe details.
      console.log('Recipe details:', this.recipe);
    });
  }
  
 ionViewWillEnter() {
  //Load favourites list when page is about to be show.
    this.favourites = this.favService.getFavourites();
    // Subscribe to unit system changes.
    this.setting.unitSystem$.subscribe(value => {
      this.unitSystem = value;
    });
  }
remove(recipeId: number) {
  //Remove revipe form favourites.
  this.favService.removeFavourite(recipeId);
  //Refresh list.
  this.favourites = this.favService.getFavourites();
}

}
