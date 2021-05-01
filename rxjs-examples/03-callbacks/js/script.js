'use strict';

/**
 * Apelidando document.querySelector de $
 */
const $ = document.querySelector.bind(document);

/**
 * Mapeando os elementos do formulário
 */
var btWithoutCallback = $('#btWithoutCallback');
var btWithCallback = $('#btWithCallback');

/**
 * Para o checkbox, fazemos com que a
 * a variável forceDelay reflita o seu
 * estado.
 */
var cbForceDelay = $('#cbForceDelay');
var forceDelay = cbForceDelay.checked;
cbForceDelay.addEventListener('change', function() {
  forceDelay = this.checked;
});

/**
 * Demais eventos
 */
btWithoutCallback.addEventListener('click', withoutCallback);
btWithCallback.addEventListener('click', withCallback);

/**
 * Variáveis que serão
 * utilizadas no cálculo
 */
var v1 = undefined;
var v2 = undefined;
var v3 = undefined;

/**
 * Reiniciamos as variáveis
 */
function restart() {
  v1 = undefined;
  v2 = undefined;
  v3 = undefined;
}

/**
 * Executa o retorno de 1 após 1 segundo,
 * caso o atraso esteja habilitado
 * @param {function} callback Função a ser executada ao final do cálculo
 */
function f1(callback) {
  console.log('Início de f1');

  if (forceDelay) {
    setTimeout(() => {
      v1 = 1;
      /**
       * O callback é executado
       * somente se o mesmo existir
       * !! (converte o valor para booleano)
       */
      if (!!callback) callback();
    }, 1000);
  } else {
    console.log('sem atraso');
    v1 = 1;
    if (!!callback) {
      console.log('invocando f2');
      callback();
    }
  }
  console.log('fim de f1');
}

/**
 * Executa o retorno de 2 após 2 segundos,
 * caso o atraso esteja habilitado
 * @param {function} callback Função a ser executada ao final do cálculo
 */
function f2(callback) {
  console.log('início de f2');
  if (forceDelay) {
    setTimeout(() => {
      v2 = 2;
      if (!!callback) callback();
    }, 2000);
  } else {
    console.log('sem atraso');
    v2 = 2;
    if (!!callback) {
      console.log('invocando f3');
      callback();
    }
  }
  console.log('fim de f2');
}

/**
 * Executa o retorno de 3 após 3 segundos,
 * caso o atraso esteja habilitado
 * @param {function} callback Função a ser executada ao final do cálculo
 */
function f3(callback) {
  console.log('início de f3');
  if (forceDelay) {
    setTimeout(() => {
      v3 = 3;
      if (!!callback) callback();
    }, 3000);
  } else {
    console.log('sem atraso');
    v3 = 3;
    if (!!callback) {
      console.log('invocando callback');
      callback();
    }
  }
  console.log('fim de f3');
}

/**
 * A execução sem callbacks só
 * funciona bem se o atraso
 * estiver desligado
 */
function withoutCallback() {
  /**
   * Limpando o console para uma
   * melhor visualização
   */
  console.clear();

  console.log("%c Início 'semCallbacks'", 'background: red; color: white');

  restart();
  f1();
  f2();
  f3();

  console.log(v1 + v2 + v3);
  console.log("%c Fim 'semCallbacks'", 'background: red; color: white');
}

/**
 * A execução com callbacks só
 * funciona bem se o atraso
 * estiver ligado
 */
function withCallback() {
  console.log("%c Início 'comCallbacks'", 'background: green; color: white');

  restart();

  /**
   * Perceba o callback hell!
   */
  f1(
    f2(
      f3(() => {
        console.log(v1 + v2 + v3);
        console.log("%c Fim 'comCallbacks'", 'background: green; color: white');
      })
    )
  );
}
