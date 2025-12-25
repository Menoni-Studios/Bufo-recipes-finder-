import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonIcon ,IonCard ,IonCardTitle ,IonCardHeader ,IonCardContent ,IonList ,IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
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
    IonCard, IonIcon
  ]
})
export class FavouritesPage implements OnInit {
  favourites: any[] = [];
  recipe: any;
  unitSystem: 'Metric' | 'Imperial' = 'Metric';

  constructor(private favService: FavouritesService,
    private route: ActivatedRoute,
    private spoonacularService: Spoonacular,
    private setting: SettingService,
  ) { }

  ngOnInit() { 
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.spoonacularService.getRecipeDetails(id).subscribe((data: any) => {
      this.recipe = data;
      console.log('Recipe details:', this.recipe);
    });
  }
  
 ionViewWillEnter() {
    this.favourites = this.favService.getFavourites();
    // Subscribe to changes
    this.setting.unitSystem$.subscribe(value => {
      this.unitSystem = value;
    });
  }
remove(recipeId: number) {
  this.favService.removeFavourite(recipeId);
  this.favourites = this.favService.getFavourites(); // refresh list
}

}
