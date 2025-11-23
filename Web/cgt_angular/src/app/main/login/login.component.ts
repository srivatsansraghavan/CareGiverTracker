import { Component, EventEmitter, Output, TemplateRef } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "src/app/shared/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrl: 'login.component.css',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule]
})
export class LoginComponent {
    @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
    loginForm: FormGroup;

    constructor(private modal: NgbModal, private authService: AuthService) { }

    ngOnInit() {
        this.loginForm = new FormGroup({
            loginEmail: new FormControl('', [Validators.required, Validators.email]),
            loginPassword: new FormControl(null, Validators.required),
        });
    }

    doLogin(): void {
        const loginEmail = this.loginForm.get('loginEmail').value;
        const loginPassword = this.loginForm.get('loginPassword').value;
        this.authService.loginUser(loginEmail, loginPassword);
        this.closeModal.emit(true);
    }
}