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

// BehaviorSubject holds the current unit system ("Metric" or "Imperial"),
// and allows to push updates when the user changes settings.
private unitSystemSubject: BehaviorSubject <'Metric' | 'Imperial'>;

// Expose the subject as an Observable so components can subscribe,
// and reactively update when the value changes.
 unitSystem$: Observable<'Metric' | 'Imperial'>;

// Constructor runs when the service is first created.
// - Injects Ionic Storage.
  constructor(private storage: Storage){
// - Initializes BehaviorSubject with default "Metric".
  this.unitSystemSubject = new BehaviorSubject<'Metric' | 'Imperial'>('Metric');
// - Exposes unitSystem$ as observable, so components can subscribe.
  this.unitSystem$ = this.unitSystemSubject.asObservable();
// - Calls init() to load any saved value from storage.
  this.init();
}

// Initialize Ionic Storage and load saved value.
  async init() {
// Create the storage engine base on IndexedDB.
  await this.storage.create();

// Try to load saved unit system from storage.
  const saved = await this.storage.get(this.storageKey) as 'Metric' | 'Imperial' | null;

// If a saved value exists, update the BehaviorSubject.
    if (saved) {
      this.unitSystemSubject.next(saved);
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
}


 
  