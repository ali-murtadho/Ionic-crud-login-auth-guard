import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Http } from '@capacitor-community/http';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.page.html',
  styleUrls: ['./user-edit.page.scss'],
})
export class UserEditPage implements OnInit {
  email: any;
  password: any;
  nama: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public _apiService: ApiService,
    private alertController: AlertController,
    public LoadingController: LoadingController,
  ) {
    this.route.params.subscribe((param: any) => {
      this.email = param.email;
      console.log(this.email);
      this.ambilUser(this.email);
    })
  }

  ngOnInit() {

  }

  ambilUser(email) {
    this._apiService.ambilUser(email).subscribe((res: any) => {
        console.log('sukses', res);
        let user = res;
        this.nama = user.nama;
        this.password = user.password;
        this.email = user.email;
      },(error: any) => {
        console.log('error', error);
        alert('gagal ambil data');
      })
  }

  editUser(){
    let url = this._apiService.apiURL()+"/edit.php";
    Http.request({
      method: "POST",
      url: url,
      headers: { "Content-Type": "application/json"},
      data:{
        email: this.email,
        nama: this.nama,
        password: this.password,
      },
    }).then((data) => {
      this.alertController.create({
        header: 'Notifikasi',
        message: 'berhasil edit data mahasiswa',
        buttons: ['OK'],
      }).then(res => {
        res.present()
      });
      this.router.navigateByUrl('/user');
    },(err) => {
      this.alertController.create({
        header: 'Notifikasi',
        message: 'Gagal edit data',
        buttons: ['OK']
      }).then(res => {
        res.present()
      });
    })
  }
}
