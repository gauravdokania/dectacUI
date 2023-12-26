import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserDetails } from '@app/_models/userDetails';
import * as moment from 'moment';
import { AccountService } from '../_services';

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

  constructor(
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
    this.formFields?.forEach((cardBody) => {
      cardBody.cardBodyListCollection.forEach((field: { buttonList: any[]; inputType: string | number; }) => {
        if (field.inputType === 'radio') {
          const buttonitem = field.buttonList.find((item) => item.id === id);
          console.log(`Button ${id} checked: ${buttonitem?.checked}`);
          field.buttonList.forEach((item: { id: any; checked: boolean; }) => {
            item.checked = item.id === id;
          });
        }
      });
    });
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

}
