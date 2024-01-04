import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService  } from 'mdb-angular-ui-kit/modal';
import { SignaturePadCustomComponent } from '../signature-pad-custom/signature-pad-custom.component';

@Component({
  selector: 'app-termandconditions',
  templateUrl: './termandconditions.component.html',
  styleUrls: ['./termandconditions.component.css']
})
export class TermandconditionsComponent implements OnInit{
  modalRefSignaturePad: MdbModalRef<SignaturePadCustomComponent> | null = null;

  constructor(public modalRefTermandconditions: MdbModalRef<TermandconditionsComponent>, 
    private modalServiceSignaturePad: MdbModalService,) {}
  ngOnInit(): void {    
    
  }
  startSigningButton() {
    this.modalRefSignaturePad = this.modalServiceSignaturePad.open(SignaturePadCustomComponent , {
      modalClass: 'modal-dialog-scrollable',
    });
  }
}
