import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppComponent } from '../../app.component';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

interface ApiResponse {
  token: string;
  message: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  submitted = false;
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, public httpApiService: AppComponent, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit = async () => {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    try {
      const data: ApiResponse = await this.httpApiService.post('auth/login', this.loginForm.value).toPromise() as ApiResponse;

      if (data && data.token) {
        localStorage.setItem('token', data.token);
        this.authService.setToken(data.token);
        this.router.navigate(['/todo']);
      }

    } catch (error) {
      console.error('Error during login:', error);
    }
  }
}
