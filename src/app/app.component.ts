import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready();
    await this.configureStatusBar();
    
    if (this.platform.is('android')) {
      this.updateAndroidSafeArea();
      this.updateAndroidStatusBarArea();
    }
  }

  async configureStatusBar() {
    await StatusBar.setStyle({ style: Style.Dark });
    
    if (this.platform.is('android')) {
      // Set status bar to overlay webview and make it transparent
      await StatusBar.setOverlaysWebView({ overlay: true });
      // Update CSS variables for Android status bar height
      this.updateAndroidStatusBarArea();
    } else {
      await StatusBar.setBackgroundColor({ color: '#ffffff' });
    }
  }

  private updateAndroidSafeArea() {
    // For Android, estimate navigation bar height and update CSS variables
    const navigationBarHeight = this.getNavigationBarHeight();
    document.documentElement.style.setProperty('--ion-safe-area-bottom', `${navigationBarHeight}px`);
    
    // Add device-specific CSS classes for styling adjustments
    this.addDeviceSpecificClasses();
  }

  private addDeviceSpecificClasses() {
    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;
    const userAgent = navigator.userAgent;
    const body = document.body;
    
    // Remove any existing device classes
    const existingClasses = ['android-studio-emulator', 'small-phone', 'average-phone', 'large-phone', 'tablet'];
    existingClasses.forEach(className => {
      if (body.classList.contains(className)) {
        body.classList.remove(className);
      }
    });
    
    // Detect device and add appropriate class
    const deviceInfo = this.detectDeviceType(screenHeight, screenWidth, userAgent);
    body.classList.add(deviceInfo.type);
    
    console.log(`[SafeArea] Added CSS class: ${deviceInfo.type}`);
  }

  private updateAndroidStatusBarArea() {
    // For Android, estimate status bar height and update CSS variables
    const statusBarHeight = this.getStatusBarHeight();
    document.documentElement.style.setProperty('--ion-safe-area-top', `${statusBarHeight}px`);
  }

  private getNavigationBarHeight(): number {
    if (!this.platform.is('android')) return 0;
    
    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;
    const userAgent = navigator.userAgent;
    
    // Enhanced device detection with debug logging
    const deviceInfo = this.detectDeviceType(screenHeight, screenWidth, userAgent);
    const navigationHeight = this.getOptimalHeightForDevice(deviceInfo);
    
    // Debug logging for verification
    console.log(`[SafeArea] Device detected: ${deviceInfo.type} (${screenWidth}x${screenHeight}px)`);
    console.log(`[SafeArea] Navigation bar height: ${navigationHeight}px`);
    
    return navigationHeight;
  }

  private detectDeviceType(screenHeight: number, screenWidth: number, userAgent: string): { type: string; category: string } {
    // Check for Android Studio emulator
    if (userAgent.includes('SDK') || userAgent.includes('Emulator') || 
        userAgent.includes('Android') && (screenWidth === 1080 || screenWidth === 1440 || screenWidth === 720)) {
      return { type: 'android-studio-emulator', category: 'emulator' };
    }
    
    // Device categorization by screen height
    if (screenHeight <= 600) return { type: 'small-phone', category: 'small' };
    if (screenHeight <= 800) return { type: 'average-phone', category: 'medium' };
    if (screenHeight <= 1000) return { type: 'large-phone', category: 'large' };
    
    return { type: 'tablet', category: 'extra-large' };
  }

  private getOptimalHeightForDevice(deviceInfo: { type: string; category: string }): number {
    // Conditional height logic based on device type
    const heightMap: { [key: string]: number } = {
      'android-studio-emulator': 20,    // Your test value for Android Studio
      'small-phone': 26,                 // Compact phones
      'average-phone': 36,               // Average phones (your target)
      'large-phone': 36,                 // Large phones/small tablets
      'tablet': 36                       // Tablets
    };
    
    return heightMap[deviceInfo.type] || 20; // Fallback to 20px
  }

  private getStatusBarHeight(): number {
    // Estimate status bar height for Android (typically 24-28dp)
    return this.platform.is('android') ? 28 : 0;
  }

  // Utility method for testing - can be called from browser console
  setNavigationBarHeightForTesting(height: number) {
    if (this.platform.is('android')) {
      document.documentElement.style.setProperty('--ion-safe-area-bottom', `${height}px`);
      console.log(`[SafeArea] Test mode: Navigation height set to ${height}px`);
    }
  }

  // Utility method to get current device info for debugging
  getDeviceInfoForDebugging() {
    return {
      userAgent: navigator.userAgent,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      platform: this.platform.platforms(),
      isAndroid: this.platform.is('android'),
      isIOS: this.platform.is('ios'),
      isDesktop: this.platform.is('desktop')
    };
  }
}
