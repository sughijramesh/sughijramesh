import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { StarterPage } from '../pages/starters/starters';
import { MainCoursePage } from '../pages/maincourse/maincourse';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  index_value:number;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Starters', component: StarterPage },
      { title: 'Main course', component: MainCoursePage },
      { title: 'Dessert', component: MainCoursePage  },
      { title: 'Drinks', component: MainCoursePage  },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
    });
  }

  openPage(page,index) {
    this.index_value=index;
    this.nav.push(page.component);
    
    
  }
  toggle(){
    ;
  }
}
