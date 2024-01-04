import { Component, ElementRef, ViewChild } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-signaturepadcustom',
  templateUrl: './signature-pad-custom.component.html',
  styleUrls: ['./signature-pad-custom.component.css']
  // template: '<signature-pad #signature [options]="signaturePadOptions" (drawStart)="drawStart($event)" (drawEnd)="drawComplete($event)"></signature-pad>'
})
export class SignaturePadCustomComponent {
  signatureNeeded!: boolean;
  signaturePad!: SignaturePad;
  @ViewChild('canvas') canvasEl!: ElementRef;
  signatureImg!: string;
  constructor(public modalRefSignaturePadCustom: MdbModalRef<SignaturePadCustomComponent>) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
  }
  startDrawing(event: Event) {
    // works in device not in browser
  }
  moved(event: Event) {
    // works in device not in browser
  }
  savePad() {
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
    this.signatureNeeded = this.signaturePad.isEmpty();
    if (!this.signatureNeeded) {
      this.signatureNeeded = false;
    }
  }
  clearPad() {
    this.signaturePad.clear();
  }
}
