import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonButton, IonList, IonLabel, IonItemSliding, IonItemOptions, IonItemOption, IonToast, IonSelect, IonSelectOption } from '@ionic/angular/standalone';

type Harcama = {
  isim:string,
  tutar:number,
  kategori:string,
  tarih:string
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule,FormsModule,IonToast, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonButton, IonItem, IonInput, IonHeader, IonToolbar, IonTitle, IonContent, IonSelect, IonSelectOption],
})
export class HomePage implements OnInit {
  isim:string='';
  tutar:number=0;
  seciliKategori:string='Yiyecek';
  harcamalar:Harcama[]=[];
  kategoriler:string[]=['Yiyecek','Ulaşım','Eğlence','Sağlık','Diğer'];
  isOpen:boolean=false;
  formGonderildi:boolean=false;
  constructor() {}
  ngOnInit(): void {
    const data = localStorage.getItem('harcamalar');
    if(data){
      this.harcamalar = JSON.parse(data);
    }
  }
  toplamHesapla(){
    let toplam = 0;
    for(let i=0; i<this.harcamalar.length; i++){
      toplam = toplam + this.harcamalar[i].tutar;
    }
    return toplam;
  }
  harcamaEkle(){
    this.formGonderildi = true;
    if(this.isim.trim()==''||this.tutar<=0){
      return;
    }
    const yeniKayit:Harcama = {
      isim: this.isim,
      tutar: this.tutar,
      kategori: this.seciliKategori,
      tarih: new Date().toLocaleDateString('tr-TR')
    };
    this.harcamalar.push(yeniKayit);
    localStorage.setItem('harcamalar',JSON.stringify(this.harcamalar));
    this.isim = '';
    this.tutar = 0;
    this.seciliKategori = 'Yiyecek';
    this.formGonderildi = false;
    this.isOpen =true;
  }
  harcamaSil(index:number){
    if(confirm('Silmek istediğinize emin misiniz?')){
      this.harcamalar.splice(index,1);
      localStorage.setItem('harcamalar',JSON.stringify(this.harcamalar));
    }
  }
  getRenk(kategori:string){
    if(kategori=='Yiyecek') return '#4CAF50';
    if(kategori=='Ulaşım') return '#2196F3';
    if(kategori=='Eğlence') return '#FF9800';
    if(kategori=='Sağlık') return '#F44336';
    return '#9E9E9E';
  }
}
