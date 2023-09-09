import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router'; // Permite navegar y pasar parámetros extra entre páginas
import { ToastController } from '@ionic/angular'; // Permite mostrar mensajes emergente
import { Usuario } from 'src/app/model/usuario';


@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
})
export class CorreoPage implements OnInit {

  constructor(private router: Router, private toastController: ToastController) { 
    this.usuario = new Usuario('', '', '', '', '', '')
  }
  public usuario: Usuario;
  public ngOnInit(): void {

    // Puedes descomentar la siguiente línea si quieres que la aplicación navegue directamente
    // a la página Home, así te ahorras de estar apretando el botón "Ingresar" a cada rato
    
    //if (this.usuario.correo !== '') this.ingresar();
  }
  public correo: string = '';

  public IrPregunta() : void {
    const usu = new Usuario('', '', '', '', '', '');
    const usuarioValidado= usu.buscarCorreoValido(this.correo);

    if (!usuarioValidado) {
      this.router.navigate(['/incorrecto']);
    } else {
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: usuarioValidado
        }
      };
      this.router.navigate(['/pregunta'], navigationExtras);
    }
    
  }

  // public RecuperarContrasena(): void {
    
  //   if (this.usuario) {
  //     const usu: Usuario | undefined = this.usuario.buscarCorreoValido(this.correo);
      
  //     if (usu) {
  //       // NavigationExtras sirve para pasarle parámetros a la página Home. Los parámetros se agregan al objeto "state"
  //       const navigationExtras: NavigationExtras = {
  //         state: {
  //           usuario: usu
  //         }
  //       };
  //       this.router.navigate(['/pregunta'], navigationExtras); // Navegamos hacia el Home y enviamos la información extra
  //     }
  //   }
  // }

  async mostrarMensaje(mensaje: string, duracion?: number) {
    // Permite mostrar un mensaje emergente que dura unos pocos segundos y desaparece. El mensaje es asincrónico, 
    // los que permite que el mensaje se pueda ver incluso cuando ya ha cambiado a la siguiente página.
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }

}