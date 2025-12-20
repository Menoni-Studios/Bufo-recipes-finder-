import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonCard ,IonCardTitle, IonCardContent, IonCardHeader ,IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Spoonacular } from '../services/spoonacular';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [ RouterLink ,IonCard ,IonCardTitle ,IonCardContent, IonCardHeader ,IonContent,
     IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})


export class RecipeDetailsPage implements OnInit {
 recipe: any;

  constructor(
    private route: ActivatedRoute,
    private spoonacularService: Spoonacular
  ) { }

  ngOnInit() {
 const id = Number(this.route.snapshot.paramMap.get('id'));
    this.spoonacularService.getRecipeDetails(id).subscribe((data: any) => {
      this.recipe = data;
      console.log('Recipe details:', this.recipe);
    });
  }
}
