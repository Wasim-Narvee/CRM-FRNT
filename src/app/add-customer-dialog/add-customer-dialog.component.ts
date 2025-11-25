import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-customer-dialog',
  templateUrl: './add-customer-dialog.component.html',
  styleUrls: ['./add-customer-dialog.component.scss']
})
export class AddCustomerDialogComponent implements OnInit {

  customerForm!: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddCustomerDialogComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {

    // 1️⃣ CREATE FORM FIRST
    this.customerForm = this.fb.group({
      name: ['', []],
      email: ['', [Validators.required, Validators.email]],
      phoneNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      country: ['', [Validators.required]],
      address: ['', []],
      websiteUrl: ['', []]
    });

    // 2️⃣ APPLY STRICT VALIDATORS
    this.customerForm.get('name')?.setValidators([
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern(/^[A-Za-z0-9 .'-]+$/),
      this.noWhitespaceValidator
    ]);

    this.customerForm.get('address')?.setValidators([
      Validators.maxLength(200),
      this.noWhitespaceValidator
    ]);

    this.customerForm.get('websiteUrl')?.setValidators([
      this.urlValidator
    ]);

    // 3️⃣ Update validation
    this.customerForm.get('name')?.updateValueAndValidity();
    this.customerForm.get('address')?.updateValueAndValidity();
    this.customerForm.get('websiteUrl')?.updateValueAndValidity();

    // 4️⃣ If EDIT mode, patch values
    if (this.data) {
      this.isEditMode = true;
      this.customerForm.patchValue(this.data);
    }
  }

  // ❌ Prevent whitespace only
  noWhitespaceValidator: ValidatorFn = (control: AbstractControl) => {
    if (control.value && control.value.trim().length === 0) {
      return { whitespace: true };
    }
    return null;
  };

  // 🌐 URL MUST start with http:// or https://
  urlValidator: ValidatorFn = (control: AbstractControl) => {
    const value = control.value;
    if (!value) return null;

    const pattern = /^(https?:\/\/)[\w.-]+\.[a-z]{2,}$/i;
    return pattern.test(value) ? null : { invalidUrl: true };
  };

  // SAVE handler
  save() {
    if (this.customerForm.valid) {
      const customerData = this.customerForm.value;

      if (this.isEditMode) {
        this.snackBar.open('Company updated successfully!', 'Close', {
          duration: 3000,
          panelClass: 'snackbar-success'
        });
      } else {
        this.snackBar.open('Company added successfully!', 'Close', {
          duration: 3000,
          panelClass: 'snackbar-success'
        });
      }

      this.dialogRef.close(customerData);
    } else {
      this.customerForm.markAllAsTouched();
      this.snackBar.open('Please fill all fields correctly.', 'Close', {
        duration: 3000,
        panelClass: 'snackbar-error'
      });
    }
  }

  close() {
    this.dialogRef.close();
  }

  // Show user-friendly validation messages
  getErrorMessage(controlName: string) {
    const control = this.customerForm.get(controlName);
    if (!control) return null;

    if (control.hasError('required'))
      return `${this.prettyName(controlName)} is required`;

    if (control.hasError('minlength')) {
      const min = control.getError('minlength').requiredLength;
      return `${this.prettyName(controlName)} must be at least ${min} characters`;
    }

    if (control.hasError('maxlength')) {
      const max = control.getError('maxlength').requiredLength;
      return `${this.prettyName(controlName)} cannot exceed ${max} characters`;
    }

    if (controlName === 'email' && control.hasError('email'))
      return 'Please enter a valid email address';

    if (controlName === 'phoneNo' && control.hasError('pattern'))
      return 'Phone number must be exactly 10 digits';

    if (control.hasError('whitespace'))
      return `${this.prettyName(controlName)} cannot contain only spaces`;

    if (control.hasError('invalidUrl'))
      return 'Enter a valid URL starting with http or https';

    return null;
  }

  prettyName(field: string): string {
    switch (field) {
      case 'name': return 'Company name';
      case 'email': return 'Email';
      case 'phoneNo': return 'Phone number';
      case 'country': return 'Country';
      case 'address': return 'Address';
      case 'websiteUrl': return 'Website URL';
      default: return field;
    }
  }

  get f() {
    return this.customerForm.controls;
  }
}
