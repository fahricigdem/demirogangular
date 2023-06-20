import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe({
        next: (response) => {
          console.log(response);
          this.toastrService.info(
            response.success ? 'Basarili' : 'Hatali',
            'Login Info'
          );
          if (response.message) {
            this.router.navigate(['products']);
          }
          localStorage.setItem('token', response.data.token);
        },
        error: (errorResponse) => {
          console.log(errorResponse.error);
          this.toastrService.error(errorResponse.error, 'Dikkat!');
        },
        complete: () => console.info('login completed'),
      });
    } else {
      console.log('form valid degil');
    }
  }
}
