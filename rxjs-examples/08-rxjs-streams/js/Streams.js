'use strict';

/**
 * Funções de criação de observables
 */
const { interval, from } = rxjs;

/**
 * Alguns operadores do rxjs
 */
const { map, filter } = rxjs.operators;

/**
 * Apelidando document.querySelector
 */
const $ = document.querySelector.bind(document);

export class Streams {
  constructor() {
    this._iniciar();
  }

  _iniciar() {
    const v1 = [];
    const v2 = [];
    const v3 = [];

    const s1 = $('#s1');
    const s2 = $('#s2');
    const s3 = $('#s3');

    const p1 = $('#stream1');
    const p2 = $('#stream2');
    const p3 = $('#stream3');

    /**
     * Primeiro observable: a cada 100 milisegundos,
     * inserimos o valor produzido no vetor e atualizamos
     * o valor do parágrafo
     */
    const p1$ = interval(100);
    p1$.subscribe(value => {
      v1.push(value);
      p1.textContent = v1.join(' ');
    });

    /**
     * Segundo observable: a partir do 1o observable,
     * filtramos, dos valores produzidos, somente valores ímpares
     * e atualizamos o valor do parágrafo
     */
    const p2$ = from(p1$).pipe(filter(value => value % 2 === 1));
    p2$.subscribe(value => {
      v2.push(value);
      p2.textContent = v2.join(' ');
    });

    /**
     * Terceiro observable: a partir do 2o observable,
     * multiplicamos os valores produzidos por 7 e atualizamos
     * o valor do parágrafo
     */
    const p3$ = from(p2$).pipe(map(value => value * 7));
    p3$.subscribe(value => {
      v3.push(value);
      p3.textContent = v3.join(' ');
    });

    /**
     * Observables para contar a quantidade de elementos
     * produzidos em cada caso
     */
    const s1$ = from(p1$).subscribe(
      () => (s1.textContent = `| s1: ${v1.length}`)
    );

    const s2$ = from(p2$).subscribe(
      () => (s2.textContent = `| s2: ${v2.length}`)
    );

    const s3$ = from(p3$).subscribe(
      () => (s3.textContent = `| s3: ${v3.length}`)
    );
  }
}
