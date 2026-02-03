//Import Angular Injectable so this class can be injected as a service. 
import { Injectable } from '@angular/core';
// Import RxJS BehaviorSubject and Observable.
// - BehaviorSubject: holds a current value and emits updates to subscribers.
// - Observable: allows components to subscribe and react to changes.
import { BehaviorSubject, Observable } from 'rxjs';
// Import Ionic Storage service, that provides async functionality.
import { Storage } from '@ionic/storage-angular';


//Make the service available in the whole app.
@Injectable({
  providedIn: 'root',
})

export class SettingService {
//Key use to store/retrieve data in ionic storage.
private storageKey = 'unitSystem';
private darkModeKey = 'darkMode';

// BehaviorSubject holds the current unit system ("Metric" or "Imperial"),
// and allows to push updates when the user changes settings.
private unitSystemSubject: BehaviorSubject <'Metric' | 'Imperial'>;

// BehaviorSubject for dark mode state
private darkModeSubject: BehaviorSubject<boolean>;

// Expose the subject as an Observable so components can subscribe,
// and reactively update when the value changes.
 unitSystem$: Observable<'Metric' | 'Imperial'>;
 darkMode$: Observable<boolean>;

 

// Constructor runs when the service is first created.
// - Injects Ionic Storage.
  constructor(private storage: Storage){
// - Initializes BehaviorSubject with default "Metric".
  this.unitSystemSubject = new BehaviorSubject<'Metric' | 'Imperial'>('Metric');
// - Initializes dark mode BehaviorSubject with default false.
  this.darkModeSubject = new BehaviorSubject<boolean>(false);
// - Exposes unitSystem$ as observable, so components can subscribe.
  this.unitSystem$ = this.unitSystemSubject.asObservable();
  this.darkMode$ = this.darkModeSubject.asObservable();
  
 // - Calls init() to load any saved value from storage.
   this.init();
}

// Initialize Ionic Storage and load saved values.
  async init() {
// Create the storage engine base on IndexedDB.
  await this.storage.create();

// Try to load saved unit system from storage.
  const savedUnitSystem = await this.storage.get(this.storageKey) as 'Metric' | 'Imperial' | null;

// If a saved value exists, update the BehaviorSubject.
    if (savedUnitSystem) {
      this.unitSystemSubject.next(savedUnitSystem);
    }

// Try to load saved dark mode from storage.
  const savedDarkMode = await this.storage.get(this.darkModeKey) as boolean | null;

// If a saved value exists, update the BehaviorSubject and apply it to body.
    if (savedDarkMode !== null) {
      this.darkModeSubject.next(savedDarkMode);
      document.body.classList.toggle('dark', savedDarkMode);
    }

  }

// Get the current unit system value synchronously.
  getUnitSystem(): 'Metric' | 'Imperial' {
    return this.unitSystemSubject.value;
  }

// Set a new unit system value.
// - Save it to Ionic Storage (persist across app restarts).
// - Push update to BehaviorSubject (notify subscribers immediately).
  async setUnitSystem(value: 'Metric' | 'Imperial') {
    await this.storage.set(this.storageKey, value);
    this.unitSystemSubject.next(value);
  }

// Get the current dark mode value synchronously.
  getDarkMode(): boolean {
    return this.darkModeSubject.value;
  }

// Set dark mode value.
// - Save it to Ionic Storage (persist across app restarts).
// - Push update to BehaviorSubject (notify subscribers immediately).
// - Apply to document body.
  async setDarkMode(value: boolean) {
    await this.storage.set(this.darkModeKey, value);
    this.darkModeSubject.next(value);
    document.body.classList.toggle('dark', value);
  }

}


 
  