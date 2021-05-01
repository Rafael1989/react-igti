'use strict';

/**
 * Apelidando document.querySelector de $
 */
const $ = document.querySelector.bind(document);

/**
 * Mapeando os elementos do formulário
 */
var inputUserGithub = $('#inputUserGithub');
var btDefaultSearch = $('#btBuscaPadrao');
var btPromise = $('#btPromise');
var btAsyncAwait = $('#btAsyncAwait');

/**
 * Demais eventos
 */
btDefaultSearch.addEventListener('click', defaultSearch);
btPromise.addEventListener('click', searchWithPromise);
btAsyncAwait.addEventListener('click', searchWithAsyncAwait);

/**
 * URL padrão de busca de usuários
 * do Github
 */
const urlGithub = 'https://api.github.com/users/';

/**
 * Busca padrão. Não haverá resultado algum, pois
 * fetch retorna uma promise que não é "capturada".
 */
function defaultSearch() {
  const currentUsername = inputUserGithub.value;

  const userData = fetch(`${urlGithub}${currentUsername}`);
  console.log(userData);
}

/**
 * Busca com promise, que é capturada com then().
 */
function searchWithPromise() {
  const currentUsername = inputUserGithub.value;

  fetch(`${urlGithub}${currentUsername}`)
    .then(res => {
      return res.json();
    })
    .then(userData => {
      console.log(userData);
    });
}

/**
 * Busca com async/await, que é semelhante a promise,
 * com uma escrita mais amigável.
 */
async function searchWithAsyncAwait() {
  const currentUsername = inputUserGithub.value;
  const res = await fetch(`${urlGithub}${currentUsername}`);
  const userData = await res.json();
  console.log(userData);
}
