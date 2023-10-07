import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from './_services';
import "bootstrap" ;
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isLoggedIn!: boolean; 
  // reference to the isLoggedIn$ subscription, see ngOnDestroy
  private _sub!: Subscription;

  title = 'D-Tac';
  user:any;
  constructor(public accountService: AccountService) { }
  
ngOnInit(): void {
  this._sub = this.accountService.isLoggedIn$.subscribe(loginState => this.isLoggedIn = loginState)
  this.user = this.accountService.userValue;
}
// Unsubscribe from login state on destroy to prevent memory leak
ngOnDestroy(): void {
  this._sub.unsubscribe();
  this.accountService.logout();
}

logout() {
  this.accountService.logout();
}

myFunction(): void {
  let x:any = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

}
