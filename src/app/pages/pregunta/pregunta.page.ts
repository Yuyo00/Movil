import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular'; // Permite mostrar mensajes emergente
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage implements OnInit, AfterViewInit {

  @ViewChild('itemNombre', { read: ElementRef }) itemNombre!: ElementRef;
  @ViewChild('itemApellido', { read: ElementRef }) itemApellido!: ElementRef;

  public usuario: Usuario;
  public respuestaUsuario: string = '';

  constructor(private activeroute: ActivatedRoute , private router: Router, private toastController: ToastController ) {

    this.usuario = new Usuario('', '', '', '', '', '', 0, null);
        
    this.activeroute.queryParams.subscribe(params => { 

      const nav = this.router.getCurrentNavigation();
      if (nav) {
        if (nav.extras.state) {
          this.usuario = nav.extras.state['usuario'];
          return;
        }
      }

      this.router.navigate(['/login']);
    });
  }

  public Responder() : void {
    if (this.usuario.respuestaSecreta === this.respuestaUsuario) {
      alert('Correcto' + this.usuario.password)
    } else {
      alert('Incorrecto')
    }
  }
  public ngOnInit(): void {

  }

  public ngAfterViewInit(): void {

    }
  }

  