import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router , NavigationExtras} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AnimationController} from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import jsQR, { QRCode } from 'jsqr';
import { Asistencia } from 'src/app/model/asistencia';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit, AfterViewInit {

  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;
  @ViewChild('itemNombre', { read: ElementRef }) itemNombre!: ElementRef;
  @ViewChild('itemApellido', { read: ElementRef }) itemApellido!: ElementRef;
  @ViewChild('video')
  private video!: ElementRef;

  @ViewChild('canvas')
  private canvas!: ElementRef;

  public asistencia: Asistencia = new Asistencia();
  public escaneando = false;
  public datosQR: string = '';
  public usuario: Usuario;
  public datos = false;



  constructor(
    private activeroute: ActivatedRoute 
  , private router: Router 
  , private alertController: AlertController 
  , private animationController: AnimationController
  , private toastController: ToastController) { 

this.usuario = new Usuario('', '', '', '', '', '');


this.activeroute.queryParams.subscribe(params => { 

  const nav = this.router.getCurrentNavigation();
  if (nav) {

    if (nav.extras.state) {
      this.usuario = nav.extras.state['usuario'];
      this.datosQR = nav.extras.state['qr'];
      return;
    }
  }
  this.router.navigate(['/login']);

});
}

  public ngOnInit(): void {

  }

  public logOff(): void{
    this.router.navigate(['/login'])
  }

  public ngAfterViewInit(): void {
    if (this.itemTitulo) {
    const animation = this.animationController
      .create()
        .addElement(this.itemTitulo.nativeElement)
        .iterations(Infinity)
        .duration(6000)
        .fromTo('transform', 'translate(0%)', 'translate(100%)')
      //  .fromTo('opacity', 0.2, 1)
        ;

      animation.play();
    }
  }

  public limpiarFormulario(): void {

    this.usuario.nombre = '';
    this.usuario.apellido = '';

    this.animateItem(this.itemNombre.nativeElement);
    this.animateItem(this.itemApellido.nativeElement);
  }

  public animateItem(elementRef: any) {
    this.animationController
      .create()
      .addElement(elementRef)
      .iterations(1)
      .duration(600)
      .fromTo('transform', 'translate(100%)', 'translate(0%)')
      .play();
  }

  public mostrarDatosPersona(): void {
    

    if (this.usuario.nombre.trim() === '' && this.usuario.apellido === '') {
      this.presentAlert('Datos personales', 'Para mostrar los datos de la persona, '
        + 'al menos debe tener un valor para el nombre o el apellido.');
      return;
    }

    let mensaje = '';
    if (this.usuario) {
      mensaje += '<br><b>Usuario</b>: <br>' + this.usuario.getCorreo();
      mensaje += '<br><b>Nombre</b>: <br>' + this.usuario.getNombre();
      mensaje += '<br><b>Apellido</b>: <br>' + this.usuario.getApellido();

      this.presentAlert('Datos personales', mensaje);
    }
  }

  public async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
  public async comenzarEscaneoQR() {
    const mediaProvider: MediaProvider = await navigator.mediaDevices.getUserMedia({
      video: {facingMode: 'environment'}
    });
    this.video.nativeElement.srcObject = mediaProvider;
    this.video.nativeElement.setAttribute('playsinline', 'true');
    this.video.nativeElement.play();
    this.escaneando = true;
    requestAnimationFrame(this.verificarVideo.bind(this));
  }
  async verificarVideo() {
    if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA) {
      if (this.obtenerDatosQR() || !this.escaneando) return;
      requestAnimationFrame(this.verificarVideo.bind(this));
    } else {
      requestAnimationFrame(this.verificarVideo.bind(this));
    }
  }
  public obtenerDatosQR(): boolean {
    const w: number = this.video.nativeElement.videoWidth;
    const h: number = this.video.nativeElement.videoHeight;
    this.canvas.nativeElement.width = w;
    this.canvas.nativeElement.height = h;
    const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
    context.drawImage(this.video.nativeElement, 0, 0, w, h);
    const img: ImageData = context.getImageData(0, 0, w, h);
    let qrCode: QRCode | null = jsQR(img.data, w, h, { inversionAttempts: 'dontInvert' });
    if (qrCode) {
      if (qrCode.data !== '') {
        this.escaneando = false;
        this.mostrarDatosQROrdenados(qrCode.data);
        this.datosQR = qrCode.data;
        this.datos = true;
        return true;
      }
    }
    this.datos = false;
    return false;
  }
  public mostrarDatosQROrdenados(datosQR: string): void {
    this.datosQR = datosQR;
    const objetoDatosQR = JSON.parse(datosQR);
    this.asistencia.setAsistencia(objetoDatosQR.bloqueInicio,objetoDatosQR.bloqueTermino,objetoDatosQR.dia,objetoDatosQR.horaFin,objetoDatosQR.horaInicio, objetoDatosQR.idAsignatura, objetoDatosQR.nombreAsignatura,objetoDatosQR.nombreProfesor,objetoDatosQR.seccion,objetoDatosQR.sede);
  }

  public detenerEscaneoQR(): void {
    this.escaneando = false;
  }

  public ingresar(): void {
    if (this.datos) {
      const navigationExtras: NavigationExtras = {
        state: {
          asistencia: this.asistencia
        }
      };
      
      this.router.navigate(['/misclase'], navigationExtras);
    }
    else{
      this.mostrarMensaje(`No se encontro una clase`);
    }
  }
  async mostrarMensaje(mensaje: string, duracion?: number) {

    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }

  
}







