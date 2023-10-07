import { Component } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from '../modal/modal.component';
import { AccountService } from '@app/_services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-right-navbar',
  templateUrl: './right-navbar.component.html',
  styleUrls: ['./right-navbar.component.css']
})
export class RightNavbarComponent {

  modalRef: MdbModalRef<ModalComponent> | null = null;
  constructor(private modalService: MdbModalService, private accountService: AccountService, private router: Router) { }

  openModal() {
    this.modalRef = this.modalService.open(ModalComponent, {
      data: { title: 'Credit History' },
    });
  }

  resetPassword(){
    this.router.navigate(['/resetpassword'], {queryParams: { loginSuccess: true }});
  }

  logout() {
    this.accountService.logout();
  }
  
}
