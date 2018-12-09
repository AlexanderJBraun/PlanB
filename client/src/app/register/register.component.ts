import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  credentials: TokenPayload = {
    email: '',
    name: '',
    password: ''
  };

  constructor(private auth: AuthenticationService,
    private router: Router,
    private _flashMessagesService: FlashMessagesService) {}

  register() {
    const user = {
      name: this.credentials.name,
      email: this.credentials.email,
      password: this.credentials.password
    };

   // Required Fields
   if (!this.auth.validateRegister(user)) {
    this._flashMessagesService.show('Empty Fields', { cssClass: 'alert-danger', timeout: 3000 });
    return false;
  }

    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    });
  }
}
