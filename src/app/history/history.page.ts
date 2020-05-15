import { Component, OnInit } from '@angular/core';
import { HistoryRepository } from '../repositories/history.repository';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

    private historic: any[];

    constructor(private repository: HistoryRepository, private router: Router) {}

    open(pagador: any) {
        const opcoes: NavigationExtras = { state: pagador };
        this.router.navigate(['result'], opcoes);
    }

    async delete(pagador: any) {
        this.historic = await this.repository.delete(pagador.nome);
    }

    ngOnInit() {
        this.repository.list().then(pagadores => {
            this.historic = pagadores;
        });
    }

}