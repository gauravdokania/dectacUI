import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { AccountService } from '../_services';
import { TermandconditionsComponent } from '../termandconditions/termandconditions.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-new-user-registration',
  templateUrl: './new-user-registration.component.html',
  styleUrls: ['./new-user-registration.component.css']
})
export class NewUserRegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  formFields?: any[];
  selectedFile!: File;
  success?: string;
  error?: string;
  successHide?: boolean = true;
  profileImage: any;
  minDate: any = moment('1950-1-1', 'YYYY-MM-DD').local();
  maxDate: any = moment().local();
  dob: any;
  isYesRadioSelected: boolean = false;
  modalRefTermandconditions: MdbModalRef<TermandconditionsComponent> | null = null;

  constructor(
    private modalService: MdbModalService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private accountService: AccountService
  ) {
    this.registrationForm = this.formBuilder.group({
      profilePicture: [''],
      firstName: [''],
      lastName: [''],
      racerName: [''],
      birthdate: [''],
      promocode: ['']
    });
  }

  ngOnInit() {
    this.accountService.getUserRegistrationPage().subscribe(data => {
      if (data && data.pagelebelcollection) {
        this.formFields = data.pagelebelcollection[0];
        this.initializeForm();
      } else {
        console.error('Invalid API response structure.');
      }
    });
  }

  initializeForm() {
    const formGroupConfig: any = {};
    this.formFields?.forEach(cardBody => {
      cardBody.cardBodyListCollection.forEach((field: { inputType: string; buttonList: any[]; validators: any[]; controlName: string | number; }) => {
        const validatorsArray: any = [];
        if (field.validators) {
          field.validators.forEach((validator: any) => {
            if (validator === 'required' || validator === 'birthdate') {
              validatorsArray.push(Validators.required);
            } else {
              // Handle other validators as needed
            }
          });
        }
        if (field.inputType === 'radio') {

          // Find the default checked button for radio
          const defaultCheckedButton = field.buttonList.find(button => button.checked);
          // Set the default value for radio button
          formGroupConfig[field.controlName] = [defaultCheckedButton ? defaultCheckedButton.value : '', validatorsArray];
          // } else if(field.inputType==='text'){

          // } else if(field.inputType==='number'){

          // } else if(field.inputType==='date'){

          // } else if(field.inputType==='dropdown'){

          // } else if(field.inputType==='rulesandregulation'){

        } else {
          // For other input types
          formGroupConfig[field.controlName] = ['', validatorsArray];
        }

        // formGroupConfig[field.controlName] = ['', validatorsArray];
      });
    });

    this.registrationForm = this.formBuilder.group(formGroupConfig);

  }

  get f() {
    return this.registrationForm.controls;
  }

  applyPromoCode() {
    console.log('its working--------->');
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Form submitted:', this.registrationForm.value);
    } else {
      this.markFormGroupTouched(this.registrationForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  endDateChanged(event: any) {
    this.dob = moment(event.value).local();
  }

  radioChecked(id: any, i: any) {

    if (this.registrationForm.value.milatoryJobChoice === 'yes') {
      let buttonitems = this.formFields?.find((item) => item.cardBodyType === 'milatoryJobDetails');
      let buttonitem = buttonitems.cardBodyListCollection.filter((e: { controlName: string; inputType: string }) => e.controlName === 'currentlyServingsInMilitary' || e.controlName === 'servingYearsInMilitary' || e.controlName === 'jobRankInMilitary' || e.inputType === 'textheader')
      buttonitem.forEach((field: { controlName: String; hide: Boolean }) => {
        field.hide = false;
      });
      this.isYesRadioSelected = true;
    } else {
      let buttonitems = this.formFields?.find((item) => item.cardBodyType === 'milatoryJobDetails');
      let buttonitem = buttonitems.cardBodyListCollection.filter((e: { controlName: string; inputType: string }) => e.controlName === 'currentlyServingsInMilitary' || e.controlName === 'servingYearsInMilitary' || e.controlName === 'jobRankInMilitary' || e.inputType === 'textheader')
      buttonitem.forEach((field: { controlName: String; hide: Boolean }) => {
        field.hide = true;
      });
      this.isYesRadioSelected = false;
    }
    if (this.registrationForm.value.lawEnforcementJobChoice === 'yes') {
      let buttonitems = this.formFields?.find((item) => item.cardBodyType === 'lawEnforcementJobDetails');
      let buttonitem = buttonitems.cardBodyListCollection.filter((e: { controlName: string; inputType: string }) => e.controlName === 'currentlyServingsLawEnforcement' || e.controlName === 'servingYearsInLawEnforcement' || e.controlName === 'jobRankInLawEnforcement' || e.inputType === 'textheader')
      buttonitem.forEach((field: { controlName: String; hide: Boolean }) => {
        field.hide = false;
      });
      this.isYesRadioSelected = true;
    } else {
      let buttonitems = this.formFields?.find((item) => item.cardBodyType === 'lawEnforcementJobDetails');
      let buttonitem = buttonitems.cardBodyListCollection.filter((e: { controlName: string; inputType: string }) => e.controlName === 'currentlyServingsLawEnforcement' || e.controlName === 'servingYearsInLawEnforcement' || e.controlName === 'jobRankInLawEnforcement' || e.inputType === 'textheader')
      buttonitem.forEach((field: { controlName: String; hide: Boolean }) => {
        field.hide = true;
      });
      this.isYesRadioSelected = false;
    }
  }

  onOptionsSelected(value: string) {
    if (this.registrationForm.value.eventGroupIds === 'eventCode') {
      let buttonitems = this.formFields?.find((item) => item.cardBodyType === 'howDidYouHearAboutUsDetails');
      let buttonitem = buttonitems.cardBodyListCollection.filter((e: { controlName: string; inputType: string }) => e.controlName === 'eventCode')
      buttonitem.forEach((field: { controlName: String; hide: Boolean }) => {
        field.hide = false;
      });
    } else {
      let buttonitems = this.formFields?.find((item) => item.cardBodyType === 'howDidYouHearAboutUsDetails');
      let buttonitem = buttonitems.cardBodyListCollection.filter((e: { controlName: string; inputType: string }) => e.controlName === 'eventCode')
      buttonitem.forEach((field: { controlName: String; hide: Boolean }) => {
        field.hide = true;
      });
    }

  }
  rulesAndRegulationCheck(value: Event) {
    if ((value.target as HTMLInputElement).checked) {
      this.modalRefTermandconditions = this.modalService.open(TermandconditionsComponent, {
        modalClass: 'modal-dialog-scrollable',
      });
    }
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

}
