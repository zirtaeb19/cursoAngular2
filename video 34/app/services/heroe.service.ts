import { Injectable} from '@angular/core';
import {HEROES} from '../mocks/mock-heroes';
import { Heroe} from '../clases/heroe';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'


@Injectable()
export class HeroeService {

    private ruta: string = 'http://127.0.0.1:8080/heroes/getHeroes';
    private header = new Headers({'content-type': 'application/json'});
    constructor(private http: Http){

    }

     getHeroes():Heroe[]{
        return HEROES;
    }

    getHeroesRetardo():Promise<Heroe[]>{
        return new Promise<Heroe[]>(
            (resolve) => {
                setTimeout(resolve, 1000)
            }
        ).then(()=> this.getHeroes());
    }
    getHeroe(id:number): Promise<Heroe>{
        return this.getHeroesRetardo().then(
            (heroes) => heroes.find(heroe => heroe.id === id));

    }
    getheroesHttp():Observable<Heroe[]>{
        return this.http.get(this.ruta).map(
            (response)=>{
                let body = response.json();
                return body;
            }
        )
    }


  // LLamada con promesas:
/*    getHeroesHttp():Promise<Heroe[]>{
        return this.http.get(this.ruta)
            .toPromise()
            .then(
                (response) => {
                    let respuesta:any = response;
                    let heroes: Heroe[] = JSON.parse(respuesta._body);
                    return heroes;
                }

            ).catch()
    }*/
    insertarHeroeHttp(heroe: Heroe): Promise<any>{
        let ruta:string = 'http://127.0.0.1:8080/heroes/putHeroe';
        return  this.http.post(ruta, heroe, {headers: this.header})
            .toPromise().then(
                ()=> 'el heroe se ha guardado correctamente'

        ).catch()
    }
    eliminarHttp(id: number):Promise<string>{
        let ruta : string = 'http://127.0.0.1:8080/heroes/deleteHeroe';
        return this.http.post(ruta, id, {headers:this.header})
            .toPromise().then(
                ()=> 'el hereo fue eliminado correctamente'
            ).catch();
    }
}
