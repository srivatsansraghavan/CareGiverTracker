import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private changeDetector: ChangeDetectorRef, private loginService: AuthService) {
    }

  
    ngOnInit(): void {
      this.loginForm = new FormGroup({
        loginEmail: new FormControl('', [Validators.required, Validators.email]),
        loginPassword: new FormControl(null, Validators.required),
      });
    }

  doLogin(): void {
    const loginEmail = this.loginForm.get('loginEmail').value;
    const loginPassword = this.loginForm.get('loginPassword').value;
    this.loginService.loginUser(loginEmail, loginPassword);
  }

}
