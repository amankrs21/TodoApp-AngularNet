import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AppComponent } from '../../app.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  data: any = {};
  submitted = false;
  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, public httpApiService: AppComponent, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit = async () => {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    try {
      this.data = await this.httpApiService.post('auth/register', this.registerForm.value).toPromise();
      this.toastr.success(this.data.message);
      this.router.navigate(['/login']);

    } catch (error) {
      console.error('Error during register:', error);
      this.toastr.error('Username already exists! Please try another username.');
    }
  }
}
