import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
})
export class CorrectoPage implements OnInit {

  public usuario: Usuario;


  constructor(
        private activeroute: ActivatedRoute, private router: Router) {

    this.usuario = new Usuario('', '', '', '', '', '')

    this.activeroute.queryParams.subscribe(params => { 

      const nav = this.router.getCurrentNavigation();
      if (nav) {
        if (nav.extras.state) {
          this.usuario = nav.extras.state['usuario'];
          return;
        }
      }
    });
  }
  public ngOnInit(): void {
  }

  public iniciarSesion(): void{
    this.router.navigate(['/login'])
  }
}