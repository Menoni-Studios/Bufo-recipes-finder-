import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonRadio ,IonLabel ,IonRadioGroup ,IonListHeader ,IonList ,IonItem ,IonCard, IonCardContent, IonCardHeader ,IonIcon ,IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { SettingService } from '../services/setting-service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    RouterLink, IonIcon, IonCard, IonCardContent, IonCardHeader, IonItem, IonList,
    IonListHeader, IonRadioGroup, IonLabel, IonRadio 
  ]
})
export class SettingsPage implements OnInit {

unitSystem: 'Metric' | 'Imperial' = 'Metric';

  constructor(private settings: SettingService) {}

  ngOnInit() {
    this.unitSystem = this.settings.getUnitSystem();
  }

  changeUnitSystem(value: 'Metric' | 'Imperial') {
    this.settings.setUnitSystem(value);
    this.unitSystem = value;
  }
}

