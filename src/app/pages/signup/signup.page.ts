import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  newUser = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  constructor(
    private router: Router,
    private userService: UserService,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) { }

  ngOnInit() {
  }

  async register() {
    let toaster = this.toastCtrl.create({
      message: 'Error Please field ',
      duration: 3000,
      position: 'bottom'
    });

    if (this.newUser.firstname == '' ||
      this.newUser.lastname == '' ||
      this.newUser.email == '' ||
      this.newUser.password == '' ||
      this.newUser.confirmPassword == '') {
      (await toaster).message = 'All fields are require';
      (await toaster).present();
    } else if (this.newUser.password !== this.newUser.confirmPassword) {
      (await toaster).message = "Passowrd don't match";
      (await toaster).present();
    } else if (this.newUser.password.length < 8) {
      (await toaster).message = 'Passowrd should have more than 8 characters';
      (await toaster).present();
    } else {
      let loader = await this.loadingCtrl.create({
        message: 'Please wait'
      });
      loader.present();

      this.userService.addUser(this.newUser).then((res: any) => {
        loader.dismiss();
        console.log('res', res)
        this.router.navigate(['login']);
      },
        async (err) => {
          loader.dismiss();
          (await toaster).message = 'Please try again \n'+ err;
          (await toaster).present();
        });
      };
  }

  goBackToLogin() {
    this.router.navigate(['login']);
  }
}
