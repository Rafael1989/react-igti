/**
 * Funções de criação de observables
 * e operadores
 */
const { interval } = rxjs;
const { filter } = rxjs.operators;

/**
 * Função auxiliar para incluir
 * elementos em tela
 */
function addValueToElement(element, value) {
  element.textContent += value + ' | ';
}

/**
 * Função que aciona o observable
 */
function filterFrom(x) {
  const element = document.querySelector('#observable');

  /**
   * A cada 100 milisegundos, o Observable
   * vai emitir um valor iniciando em 0
   */
  const observable$ = interval(100)
    /**
     * "pipe" é usado para encadear funções.
     * Neste caso, usamos somente uma "filter".
     *
     * Estamos filtrando somente elementos divisíveis
     * por 'x'
     */
    .pipe(filter(value => value % x === 0));

  /**
   * Com o subscribe, o observable "passa a funcionar"
   */
  observable$.subscribe(filteredValue => {
    addValueToElement(element, filteredValue);
  });
}

/**
 * Executando a função considerando
 * o valor 7
 */
filterFrom(7);
