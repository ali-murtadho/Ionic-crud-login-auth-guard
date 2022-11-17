import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Http } from '@capacitor-community/http';
import { Alert } from 'selenium-webdriver';
@Component({
  selector: 'app-user-tambah',
  templateUrl: './user-tambah.page.html',
  styleUrls: ['./user-tambah.page.scss'],
})
export class UserTambahPage implements OnInit {
  email: any;
  nama: any;
  password: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public _apiService: ApiService,
    private alertController: AlertController,
    public loadingController: LoadingController,

  ) {}

  ngOnInit() {

  }

  addUser() {
    let url = this._apiService.apiURL() + "/tambah.php";
    Http.request({
      method: "POST",
      url: url,
      headers: { "Content-Type":"application/json" },
      data: {
        email: this.email,
        password: this.password,
        nama: this.nama
      },
    }).then((data) => {
        this.email = '';
        this.password = '';
        this.nama = '';
        this.alertController.create({
            header: 'Notifikasi',
            message: 'Berhasil Input data Mahasiswa',
            buttons: ['OK'],
          }).then(res => {
            res.present();
          });
        this.router.navigateByUrl('/user');
      },(error) => {
        this.alertController.create({
            header: 'Notifikasi',
            message: 'Gagal Input data Mahasiswa',
            buttons: ['OK'],
          }) .then(res => {
            res.present();
          });
      })
  }
}
