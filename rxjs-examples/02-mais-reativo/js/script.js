/**
 * Garantindo que o JavaScript só irá
 * ser executado após o total
 * carregamento da página.
 */
window.addEventListener('load', init);

/**
 * Variáveis globais que guardam
 * referências aos componentes HTML.
 */
var n1 = document.querySelector('#n1');
var n2 = document.querySelector('#n2');
var sum = document.querySelector('#sum');

function init() {
  n1.addEventListener('input', react);
  n2.addEventListener('input', react);

  /**
   * Já invocando react() pela
   * primeira vez.
   */
  react();
}

/**
 * Reagindo às mudanças nos inputs
 */
function react() {
  sum.value = +n1.value + +n2.value;
}
