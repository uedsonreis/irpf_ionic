import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';

import { Pagador } from '../domain/model/pagador';
import { HistoryRepository } from '../repositories/history.repository';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    private pagador = { nome: null, ganhoAnual: null } as Pagador;

    constructor(private router: Router, private http: HttpClient, private repository: HistoryRepository) {}

    public goHistory(): void {
        this.router.navigate(['history']);
    }

    public calcular(): void {
        const body = {
            name: this.pagador.nome,
            value: this.pagador.ganhoAnual
        };

        this.http.post('http://localhost:3000/irpf', body).subscribe(data => {
            this.repository.save(data);
            const opcoes: NavigationExtras = { state: data };
            this.router.navigate(['result'], opcoes);

            this.pagador.nome = null;
            this.pagador.ganhoAnual = null;
        }, error => {
            console.error('Erro ao calcular o IRPF no servidor: ', error);
        });
    }

}