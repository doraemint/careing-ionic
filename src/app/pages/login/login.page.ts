import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Iuser } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials = {} as Iuser;
  constructor(
    private router: Router,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) { }

  ngOnInit() {
  }

  login() {
    let toaster = this.toastCtrl.create({
      message: 'Error Please field ',
      duration: 3000,
      position: 'bottom'
    });

    this.authService.login(this.credentials).then((res: any) => {
      if (!res.code) {
        this.router.navigate(['signup']);
      }
    },
      async (err) => {
        (await toaster).message = 'Please try again' + err;
        (await toaster).present();
      });
  }

  gotoSignUp() {
    this.router.navigate(['signup']);
  }

}
