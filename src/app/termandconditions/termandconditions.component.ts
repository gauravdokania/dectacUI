import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MdbModalRef, MdbModalService  } from 'mdb-angular-ui-kit/modal';
import { SignaturePadCustomComponent } from '../signature-pad-custom/signature-pad-custom.component';

@Component({
  selector: 'app-termandconditions',
  templateUrl: './termandconditions.component.html',
  styleUrls: ['./termandconditions.component.css']
})
export class TermandconditionsComponent implements OnInit{
  // modalRefSignaturePad: MdbModalRef<SignaturePadCustomComponent> | null = null;
  @Output() formTermsAndConditionSubmitted: EventEmitter<any> = new EventEmitter();
  config = {
    animation: true,
    backdrop: true,
    containerClass: 'right',
    data: {
      title: 'Signature Pad'
    },
    ignoreBackdropClick: true,
    keyboard: true,
    modalClass: 'modal-dialog-scrollable',
    nonInvasive: false,
  };

  constructor(public modalRefTermandconditions: MdbModalRef<TermandconditionsComponent>, 
    private modalServiceSignaturePad: MdbModalService,) {}
  ngOnInit(): void {    
    
  }
  startSigningButton() {
    const modalRefSignaturePad = this.modalServiceSignaturePad.open(SignaturePadCustomComponent , this.config);
    modalRefSignaturePad.component.formSignDataSubmitted.subscribe((emmitedValue) => {
      this.formTermsAndConditionSubmitted.next(emmitedValue);
      this.modalRefTermandconditions.close();
  });
  }
}
