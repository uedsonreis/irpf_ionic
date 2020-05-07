import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';

import { Pagador } from '../domain/model/pagador';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    private pagador = { nome: null, ganhoAnual: null } as Pagador;

    constructor(private router: Router, private http: HttpClient) {}

    public calcular(): void {
        const body = {
            name: this.pagador.nome,
            value: this.pagador.ganhoAnual
        };

        this.http.post('http://localhost:3000/irpf', body).subscribe(data => {

            const opcoes: NavigationExtras = { state: data };
            this.router.navigate(['result'], opcoes);

        }, error => {
            console.error('Erro ao calcular o IRPF no servidor: ', error);
        });
    }

}