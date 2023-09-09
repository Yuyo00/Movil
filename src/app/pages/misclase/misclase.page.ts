import { Component, OnInit } from '@angular/core';
import { Asistencia } from 'src/app/model/asistencia';
import { Usuario } from 'src/app/model/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AnimationController} from '@ionic/angular';

@Component({
  selector: 'app-misclase',
  templateUrl: './misclase.page.html',
  styleUrls: ['./misclase.page.scss'],
})

export class MisclasePage implements OnInit {

  public asistencia: Asistencia = new Asistencia();
  public escaneando = false;
  public datosQR: string = '';
  public usuario: Usuario;

  constructor(private activeroute: ActivatedRoute // Permite obtener los parámetros de la página login
  , private router: Router // Permite navegar entre páginas
  , private alertController: AlertController // Permite mostrar mensajes emergentes más complejos que Toast
  , private animationController: AnimationController) {
    this.usuario = new Usuario('', '', '', '', '', '');
    
   }

  ngOnInit() {
  }
  public logOff(): void{
    this.router.navigate(['/login'])
  }
  public mostrarDatosQROrdenados(datosQR: string): void {
    this.datosQR = datosQR;
    const objetoDatosQR = JSON.parse(datosQR);
    this.asistencia.setAsistencia(objetoDatosQR.bloqueInicio,objetoDatosQR.bloqueTermino,objetoDatosQR.dia,objetoDatosQR.horaFin,objetoDatosQR.horaInicio, objetoDatosQR.idAsignatura, objetoDatosQR.nombreAsignatura,objetoDatosQR.nombreProfesor,objetoDatosQR.seccion,objetoDatosQR.sede);

  }
}
