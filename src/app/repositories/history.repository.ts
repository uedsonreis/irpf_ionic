import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HistoryRepository {

    private static readonly KEY: string = "pagadores";

    constructor(private storage: Storage) {}

    public save(pagador: any): void {
        this.list().then(pagadores => {
            pagadores.push(pagador);
            this.storage.set(HistoryRepository.KEY, pagadores);
        });
    }

    public async delete(nome: string): Promise<any[]> {
        let pagadores = await this.list();
        pagadores = pagadores.filter(p => p.nome !== nome);
        this.storage.set(HistoryRepository.KEY, pagadores);
        return pagadores;
    }

    public async list(): Promise<any[]> {
        const pagadores = await this.storage.get(HistoryRepository.KEY);
        if (pagadores) return pagadores;
        else return new Array<any>();
    }

}