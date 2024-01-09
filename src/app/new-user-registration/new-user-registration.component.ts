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
  registrationFormData!: {};
  formFields?: any[];
  previewImage: string | ArrayBuffer | null = null;
  success?: string;
  error?: string;
  successHide?: boolean = true;
  minDate: any = moment('1950-1-1', 'YYYY-MM-DD').local();
  maxDate: any = moment().local();
  dob: any;
  isYesRadioSelected: boolean = false;
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

  constructor(
    private modalService: MdbModalService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private accountService: AccountService
  ) {
    this.registrationForm = this.formBuilder.group({
      address1: [''],
      address2: [''],
      birthDate: [''],
      city: [''],
      consentToEmail: [''],
      country: [''],
      currentlyServingsInMilitary: [''],
      currentlyServingsLawEnforcement: [''],
      email: [''],
      eventCode: [''],
      eventGroupIds: [''],
      firstName: [''],
      howDidYouHearAboutUs: [''],
      jobRankInLawEnforcement: [''],
      jobRankInMilitary: [''],
      lastName: [''],
      lawEnforcementJobChoice: 'none',
      milatoryJobChoice: 'none',
      mobilePhoneNumber: [''],
      othersHearAboutUs: [''],
      profilePicture: [''],
      promocode: [''],
      racerName: [''],
      rulesAndRegulation: [''],
      servingYearsInLawEnforcement: [''],
      servingYearsInMilitary: [''],
      signPicture: [''],
      state: [''],
      validDoumentId: [''],
      zipcode: ['']
    });
  }

  ngOnInit() {
    if (this.accountService.getUserRegistrationPage) {
      this.accountService.getUserRegistrationPage().subscribe(data => {
        if (data && data.pagelebelcollection) {
          this.formFields = data.pagelebelcollection[0];
          this.initializeForm();
        } else {
          console.error('Invalid API response structure.');
        }
      },
        error => {
          console.error('Error:', error);
        });
    }
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
        } else {
          // For other input types
          formGroupConfig[field.controlName] = ['', validatorsArray];
        }
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
      this.registrationFormData = { ...this.registrationFormData, ...this.registrationForm.value };
      this.accountService.createAccount(this.registrationFormData).subscribe({
        next: (data: any) => {
          // this.getUser();
          this.success = data.accountdetaildvocollection[0].success;
          setTimeout(() => {
            this.success = '';
            this.error = '';
          }, 3000);
        },
        error: error => {
          this.error = error;
        }        
      });

      setTimeout(() => {
        this.success = '';
        this.error = '';
      }, 3000);
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

  populateCardBody(j: string, c: Array<String>) {
    if (c.length > 0) {
      const varFormFields = Object.assign([], this.formFields);;
      let buttonitems: any = varFormFields?.find((item: { cardBodyType: String; }) => item.cardBodyType === j);
      // Making the default set data
      buttonitems.cardBodyListCollection.forEach((value: { controlName: String; hide: boolean; }) => {       
        if (!(value.controlName === 'milatoryJobChoice' || value.controlName === 'lawEnforcementJobChoice')) {
          value.hide = true;
        }       
      });
      // Making the default set data
      if ((buttonitems.cardBodyListCollection.length - 1) !== c.length) {
        buttonitems.cardBodyListCollection.forEach((value: { controlName: String; hide: boolean; }) => {
          c.forEach(item => {
            if (value.controlName === item) {
              value.hide = false;
            }
          })
        })
        this.isYesRadioSelected = true;
      } else {
        buttonitems.cardBodyListCollection.forEach((value: { controlName: String; hide: boolean; }) => {
          c.forEach(item => {
            if (value.controlName === item) {
              value.hide = true;
            }
          })
        });
        this.isYesRadioSelected = false;
      }
    }
  }

  radioChecked(id: any, i: any) {
    if (!!this.registrationForm.value) {
      let controlName: String[] = [];
      if (id === 'milatoryJobYes') {
        controlName = ['currentlyServingsInMilitary', 'servingYearsInMilitary', 'jobRankInMilitary', 'ifYes'];
        this.populateCardBody('milatoryJobDetails', controlName);
      }
      if (id === 'milatoryJobRetired') {
        controlName = ['pastServingsInMilitary', 'servingYearsPastInMilitary', 'pastJobRankInMilitary', 'ifNo'];
        this.populateCardBody('milatoryJobDetails', controlName);
      }
      if (id === 'milatoryJobNo') {
        controlName = ['currentlyServingsInMilitary', 'servingYearsInMilitary', 'jobRankInMilitary', 'ifYes', 'pastServingsInMilitary', 'servingYearsPastInMilitary', 'pastJobRankInMilitary', 'ifNo'];
        this.populateCardBody('milatoryJobDetails', controlName);
      }
      if (id === 'lawEnforcementJobActive') {
        controlName = ['currentlyServingsLawEnforcement', 'servingYearsInLawEnforcement', 'jobRankInLawEnforcement', 'ifYes'];
        this.populateCardBody('lawEnforcementJobDetails', controlName);
      }
      if (id === 'lawEnforcementJobRetired') {
        controlName = ['pastServingsLawEnforcement', 'servedYearsInLawEnforcement', 'pastJobRankInLawEnforcement', 'ifNo'];
        this.populateCardBody('lawEnforcementJobDetails', controlName);
      }
      if (id === 'lawEnforcementJobNo') {
        controlName = ['currentlyServingsLawEnforcement', 'servingYearsInLawEnforcement', 'jobRankInLawEnforcement', 'ifYes', 'pastServingsLawEnforcement', 'servedYearsInLawEnforcement', 'pastJobRankInLawEnforcement', 'ifNo'];
        this.populateCardBody('lawEnforcementJobDetails', controlName);
      }
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
  rulesAndRegulationCheck(value: any) {
    if ((value.target as HTMLInputElement).checked) {
      const modalRefTermandconditions = this.modalService.open(TermandconditionsComponent, this.config);

      modalRefTermandconditions.component.formTermsAndConditionSubmitted.subscribe((signImage) => {
        if (!!signImage) {
          const dataToAppend = { ...this.registrationForm.value, ...{ 'signImage': signImage } };
          this.registrationFormData = { ...this.registrationFormData, ...dataToAppend };
        }
      })
    }
  }

  onFileChange(event: any) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // Display a preview of the selected image
      this.previewSelectedImage(file);
    }
  }

  previewSelectedImage(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result;
      const dataToAppend = { ...this.registrationForm.value, ...{ 'profilePicture': this.previewImage } };
      this.registrationFormData = { ...this.registrationFormData, ...dataToAppend };
    };
    reader.readAsDataURL(file);
  }

}
