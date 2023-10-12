import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Asistencia } from 'src/app/model/asistencia';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.page.html',
  styleUrls: ['./misdatos.page.scss'],
})

export class MisdatosPage implements OnInit, AfterViewInit {
  public asistencia: Asistencia = new Asistencia();
  
  constructor(private activeroute: ActivatedRoute , private router: Router , private toastController: ToastController) { }
  
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  

  segmentChanged(event: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        asistencia: this.asistencia
      }
    };
    this.router.navigate([event.detail.value], navigationExtras);
  }

}
