import { Component, OnInit } from '@angular/core';
import data from '../../../assets/form.json';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JsonServiceService } from '../../service/json-service.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  formdata: any;
  showPersonalFormData = true;
  disableNextButton = true;
  inputName: any[] = [];
  errorText = false;
  form!: FormGroup;
  companyForm!: FormGroup;
  current = 0;
  fullName: any;
  dob: any;
  gender: any;
  interestlist: any;
  state: any;
  skills: any;
  doj: any;
  reviewForm = false;

  constructor(
    private message: NzMessageService,
    private fb: FormBuilder,
    private jsonService: JsonServiceService
  ) {}

  ngOnInit(): void {
    this.jsonService.getFormData().subscribe((res) => {
      this.formdata = res;
      console.log(this.formdata);
      this.createForm();
    });
  }

  //create form builder
  createForm() {
    var formFieldsdata: any = {};
    var formFieldsdata1: any = {};

    this.formdata?.formFields?.forEach((group: any) => {
      group?.fields?.forEach((field: any) => {
        if (field.type === 'checkbox' && Array.isArray(field.options)) {
          const checkboxGroup: any = {};
          field.options.forEach((option: any) => {
            checkboxGroup[option.value] = [false]; // Initialize checkboxes as false
          });
          formFieldsdata[field.name] = this.fb.group(checkboxGroup);
        } else {
          const validators = [];
          if (field.validations && field.validations.isRequired) {
            validators.push(Validators.required);
          }
          if (field.validations && field.validations.pattern) {
            validators.push(Validators.pattern(field.validations.pattern));
          }
          formFieldsdata[field.name] = ['', validators];
        }
      });
    });
    this.formdata?.fields?.forEach((group: any) => {
      const validators = [];
      if (group.validations && group.validations.isRequired) {
        validators.push(Validators.required);
      }
      if (group.validations && group.validations.pattern) {
        validators.push(Validators.pattern(group.validations.pattern));
      }
      formFieldsdata1[group.name] = [null, validators];
    });
    console.log(formFieldsdata1);

    this.companyForm = this.fb.group(formFieldsdata1);
    this.form = this.fb.group(formFieldsdata);
  }

  //date event change
  onChange(event: any) {}

  //go to previous page
  previousStep() {
    this.showPersonalFormData = true;
  }

  //submit the first form and data validation
  submitForm() {
    if (this.form.invalid) {
      this.message.warning(
        'Please fill all the mandatory details or enter valid input',
        { nzDuration: 10000 }
      );
      this.form.markAllAsTouched();
      this.showPersonalFormData = true;
    } else {
      this.showPersonalFormData = false;
    }
  }

  //submit the second form and validate the data
  submitForm1() {
    if (this.companyForm.invalid) {
      this.message.warning(
        'Please fill all the mandatory details or enter valid input',
        { nzDuration: 10000 }
      );
      this.form.markAllAsTouched();
      this.showPersonalFormData = false;
      this.reviewForm = false;
    } else {
      //assigning a form value
      this.fullName =
        this.form.get('first_name')?.value +
        ' ' +
        this.form.get('last_name')?.value;
      this.dob = this.form.get('dob')?.value;
      this.gender = this.form.get('gender')?.value;

      var interests = this.form.get('interests')?.value;
      var intersestArray: any[] = [];
      Object.keys(interests).forEach((key) => {
        if (interests[key]) {
          intersestArray.push(key);
        }
      });
      this.interestlist = intersestArray.join(', ');
      this.state = this.form.get('state')?.value;
      this.skills = this.companyForm.get('skill')?.value;
      this.doj = this.companyForm.get('doj')?.value;
      console.log(this.interestlist);
      this.reviewForm = true;
      // this.showPersonalFormData = true;
    }
  }

  //go to previous page
  previousTocompanyForm() {
    this.showPersonalFormData = false;
    this.reviewForm = false;
  }
  //submit the form and reset the form
  submit() {
    this.message.success('Form Submitted Successfully', { nzDuration: 10000 });
    this.form.reset();
    this.companyForm.reset();
    this.showPersonalFormData = true;
    this.reviewForm = false;
  }
}
