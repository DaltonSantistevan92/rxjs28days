import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Observable, Subscription, concatAll, interval, map, switchMap , of, filter, merge, concat, tap, delay, timestamp } from 'rxjs';

interface Post {
  userId : number;
  id : number;
  title : string;
  body : string;
}


interface Response {
  info: Info;
  results: Character[];
}

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Origin;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

interface Origin {
  name: string;
  url: string;
}

interface Info {
  count: number;
  pages: number;
  next: string;
  prev?: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '28 Days rxjs';
  //observables
  data$! : Observable<Post>;

  private http = inject(HttpClient);

  //hot observables y cold observables
  counter : number = 0;
  private intervalSubscripction! : Subscription 

  //observable de orden superior
  //dataCaracter$! : Observable<Character[]>; 
  dataCaracter$! : Observable<Character>; 

  private readonly API = 'https://rickandmortyapi.com/api/character';

  ngOnInit(): void {
    const observable = new Observable((subscriber) => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
    });

    observable.subscribe({ 
      next(x) { console.log('observable',x); }, 
      error(err) { console.log(err); },
      complete() { console.log('hecho') }
    });
 
    // hot observables y cold observables
    this.data$ = this.http.get<Post>('https://jsonplaceholder.typicode.com/posts/1');
    //this.start();

    //observable de orden superior
    /* this.dataCaracter$ = this.http.get<Response>(this.API).pipe(
      map( (response :Response) => response.results),
      map( () => Math.floor(Math.random() * 20)),
      map( (id :number) => this.http.get<Character>(`${this.API}/${id}`)),
      concatAll()
    ); */

    this.dataCaracter$ = this.http.get<Response>(this.API).pipe(
      map( (response :Response) => response.results),
      map( () => Math.floor(Math.random() * 20)),
      switchMap( (id :number) => this.http.get<Character>(`${this.API}/${id}`)),//order superior
    );

    //operadores
    this.operadores();
  }

  start(){
    this.intervalSubscripction = interval(1000).subscribe( (value) => {
        this.counter = value;
    });
  }

  stop(){//parar la emision de ese observable
    this.intervalSubscripction.unsubscribe();
  }


  // operadores de RxJS 
  operadores(){
    const numbers = of(1,2,3,4,5);
    const numbers2 = of(6,7);
  
    const squaredNumbers =numbers.pipe( map(x => x * x) );
    squaredNumbers.subscribe( (resp) => { console.log('operador map',resp); });


    //filtrdo los numeros pares
    const filterNumbers = numbers.pipe( filter(x => x % 2 === 0) );
    filterNumbers.subscribe( (resp) =>{ console.log('operador filter',resp); });

    //merge es unir
    const mergedNumbers = merge(numbers,numbers2)
    mergedNumbers.subscribe( (resp) => { console.log('operador merge',resp); });


    //concatenated
    const concatenatedNumbers = concat(numbers,numbers2)
    concatenatedNumbers.subscribe( (resp) => { console.log('operador concat',resp); });

    //tap es un operador que permite ejecutar una acción cada vez que se emite un valor de un observable, sin modificar el valor emitido. 
    //Es útil para realizar tareas como debugar, o para notificar a otros componentes de un cambio en el estado de un observable.
    //tap =>  es un espejo de su fuente
    const tapNumbers =numbers.pipe( 
      map((x:number) => x * x),
      tap((result:number) => result * result), 
      tap((resp:number) => { console.log('operador tap',resp) }) 
    );
    tapNumbers.subscribe( (resp) => {  });

    //delay es un operador que permite retrasar la emisión de valores de un observable durante un período de tiempo especificado. 
    //Es útil para simular retrasos en una red o en un sistema de archivos, o para sincronizar eventos en una aplicación.
    //delay
    const delayNumbers =numbers.pipe( 
      delay(1000), 
      tap((resp:number) => { console.log('operador delay',resp) }) 
    );
    delayNumbers.subscribe( (resp) => {  });

    //timestamp es un operador que permite añadir una marca temporal a cada valor emitido por un observable. 
    //Esto es útil para registrar cuándo se emitieron los valores, o para medir el tiempo transcurrido entre emisiones.

    const timeStampNumbers =numbers.pipe( 
      timestamp(), 
      tap((resp) => { console.log('operador timestamp',resp) }) 
    );
    timeStampNumbers.subscribe( (resp) => {  });

  }


 





}
