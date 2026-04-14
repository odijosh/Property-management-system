import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PropertyService } from '../Services/property.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class ListingComponent implements OnInit {
  propertyForm: FormGroup;
  submitted = false;
  imagePreview: string = 'assets/home13.jpeg';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private propertyService: PropertyService
  ) {
    this.propertyForm = this.fb.group({
      title: ['', Validators.required],
      propertyType: ['', Validators.required],
      rooms: ['', Validators.required],
      kitchen: ['', Validators.required],
      toilet: ['', Validators.required],
      bathroom: ['', Validators.required],
      state: ['', Validators.required],
      lga: ['', Validators.required],
      country: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      description: ['', Validators.required],
      image1: [''],
      image2: [''],
      image3: ['']
    });
  }

  // ✅ FIXED MULTIPLE IMAGE HANDLING
  // onImageSelected(event: any) {
  //   const files = event.target.files;

  //   if (files.length > 0) {
  //     for (let i = 0; i < files.length && i < 3; i++) {
  //       const reader = new FileReader();

  //       reader.onload = () => {
  //         const image = reader.result as string;

  //         if (i === 0) {
  //           this.propertyForm.patchValue({ image1: image });
  //           this.imagePreview = image;
  //         }

  //         if (i === 1) {
  //           this.propertyForm.patchValue({ image2: image });
  //         }

  //         if (i === 2) {
  //           this.propertyForm.patchValue({ image3: image });
  //         }
  //       };

  //       reader.readAsDataURL(files[i]);
  //     }
  //   }
  // }

  onImageSelected(event: any, index: number) {
  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    const image = reader.result as string;

    if (index === 1) {
      this.propertyForm.patchValue({ image1: image });
    }

    if (index === 2) {
      this.propertyForm.patchValue({ image2: image });
    }

    if (index === 3) {
      this.propertyForm.patchValue({ image3: image });
    }
  };

  reader.readAsDataURL(file);
}
  ngOnInit() {
    const editData = this.propertyService.getEditProperty();

    if (editData) {
      this.propertyForm.patchValue(editData.property);
    }
  }

  onCreate() {
    this.submitted = true;

    if (this.propertyForm.valid) {
      const formValue = this.propertyForm.value;
      const editData = this.propertyService.getEditProperty();

      if (editData) {
        this.propertyService.updateProperty(formValue, editData.index);
      } else {
        this.propertyService.addProperty(formValue);
      }

      // ✅ CLEAR EDIT MODE AFTER SAVE
      localStorage.removeItem('editProperty');

      // ✅ NAVIGATE AFTER SAVE
      this.router.navigate(['dashboard/properties']);
    } else {
      this.propertyForm.markAllAsTouched();
    }
  }
}
