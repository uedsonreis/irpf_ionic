import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pagador } from '../domain/model/pagador';

@Component({
    selector: 'app-result',
    templateUrl: './result.page.html',
    styleUrls: ['./result.page.scss'],
})
export class ResultPage {

    private pagador: Pagador;

    constructor(private router: Router) {
        this.pagador = router.getCurrentNavigation().extras.state as Pagador;
    }

}