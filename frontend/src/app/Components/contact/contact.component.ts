import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DashboardComponent } from "../dashboard/dashboard.component";

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  imports: [CommonModule, ReactiveFormsModule, DashboardComponent]
})
export class ContactComponent {
  contactForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  submitContact() {
    this.submitted = true;
    if (this.contactForm.invalid) {
      return;
    }
    console.log('Form submitted:', this.contactForm.value);

    this.submitted = false;
    this.toastr.success('Message Sent Successfully!!', 'Thanks for contacting us!');
    this.contactForm.reset();
  }
}