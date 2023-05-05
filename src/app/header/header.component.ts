import { Component, EventEmitter, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isAuthenticated = false;
  private userSub : Subscription
  collapsed = true;

  constructor(private dataStorageService: DataStorageService, private authService : AuthService){}
  
  ngOnInit(){
    this.userSub = this.authService.user.subscribe(
      user => {
        this.isAuthenticated = !!user
      }
    )
  }

  onLogout(){
    this.authService.logout()
  }

  onSaveData(){
    this.dataStorageService.storeRecipes()
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe()
  }

  ngOnDestroy(){
    this.userSub.unsubscribe() ;
  }
}
