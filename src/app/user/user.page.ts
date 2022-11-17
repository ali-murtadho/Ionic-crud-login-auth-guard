import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage {
  email: any;
  password: any;
  nama: any;
  user: any[];
  constructor(
    public _apiService: ApiService,
    private alertController: AlertController,
    public loadingController: LoadingController,
  ) {
    this.getUser();
  }

  ngOnInit() {
    console.log('Cek Fungsi Halaman init');
  }

  ionViewDidEnter() {
    console.log('Jika Selesai Loading');
    this.getUser();
  }
  getUser() {
    this._apiService.getUser().subscribe((res: any) => {
        console.log("Sukses", res);
        this.user = res;
      },(error: any) => {
        console.log("gagal", error);
        this.alertController.create({
            header: 'notifikasi',
            message: 'Gagal Memuat Data',
            buttons: ['OK']
          }).then(res => {
            res.present();
          })
      }) 
  }




  deleteUser(id) {

    this.alertController.create({
        header: 'Perhatian',
        subHeader: 'Yakin ingin menghapus data ini?',
        buttons: [
          {
            text: 'Batal',
            handler: (data: any) => {
              console.log('dibatalkan', data);
            }
          },
          {
            text: 'yakin',
            handler: (data: any) => {
              this._apiService.deleteUser(id).subscribe((res: any) => {
                  console.log('sukses dihapus', res);
                  this.getUser();
                },(error: any) => {
                  console.log('Error', error);
                  this.alertController.create({
                      header: 'Notifikasi',
                      message: 'Gagal Memuat Data hapus',
                      buttons: ['OK']
                    }) .then(res => {
                      res.present();
                    })
                })
            }
          }
        ]
      }).then(res => {
        res.present();
      })
  }
}
