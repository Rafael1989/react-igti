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
var button = document.querySelector('#btSomar');

function init() {
  /**
   * Vinculando evento de click ao botão,
   * somando os valores dos inputs.
   *
   * Obs: +string converte a string para number
   */
  button.addEventListener('click', function() {
    sum.value = +n1.value + +n2.value;
  });
}
