import { Observables } from './Observables.js';

/**
 * Mapeamento de document.querySelector para $
 */
const $ = document.querySelector.bind(document);

export class StarWarsSearch {
  /**
   * Construtor
   */
  constructor() {
    /**
     * Atributos gerais
     */
    this._btCancelar = $('#btCancelar');
    this._buscaEmAndamento = undefined;
    this._divResults = $('.results');
    this._inputSearch = $('#inputSearch');
    this._nenhumEncontrado = undefined;
    this._results = undefined;

    /**
     * Inicializações diversas
     */
    this._inicializar();

    /**
     * Objeto de observables
     */
    this.myObservables = new Observables(
      this._inputSearch,
      'input',
      results => this.handleSearch(results),
      () => this.handleWhileTyping(),
      () => this.handleClear()
    );
    this.myObservables.start();
  }

  /**
   * Métodos que serão passados
   * para Observables
   */
  handleSearch(results) {
    /**
     * Primeiramente, limpamos os itens
     * que já existem na tela
     */
    this._clearItems();

    /**
     * Reatribuímos os resultados
     * obtidos (imutabilidade)
     */
    this._results = results;

    /**
     * Invocamos o método para
     * renderizar os resultados em tela,
     * simulando reatividade.
     */
    this._showResults();
  }

  handleClear() {
    this._clearItems();
    this._results = [];
    this._divResults.innerHTML = '';
    this._divResults.appendChild(this._nenhumEncontrado);
  }

  handleWhileTyping() {
    this._divResults.innerHTML = '';
    this._divResults.appendChild(this._buscaEmAndamento);
  }

  _inicializar() {
    this._nenhumEncontrado = document.createElement('p');
    this._nenhumEncontrado.textContent = 'Nenhum personagem encontrado';

    this._buscaEmAndamento = document.createElement('p');
    this._buscaEmAndamento.textContent = 'Busca em andamento...';

    this._btCancelar.addEventListener('click', () => {
      this._cancelSearch();
    });
  }

  _cancelSearch() {
    /**
     * Cancelando todos os observables
     */
    this.myObservables.stop();

    /**
     * Limpando os dados da tela
     * e obtendo foco do input
     */
    this._inputSearch.value = '';
    this._results = [];
    this._divResults.innerHTML = '';
    this._inputSearch.focus();

    /**
     * Atribuindo evento na digitação para
     * reativar os observables
     */
    this.myObservables.start();
  }

  /**
   * Inclui um item na tela
   * @param {string} characterName
   */
  _addItem(characterName) {
    /**
     * Montando o item "na mão" (Vanilla JS)
     */
    const item = document.createElement('div');
    item.classList.add('cardItem');
    item.textContent = characterName;

    /**
     * Inserindo o item na div de resultados
     */
    this._divResults.appendChild(item);
  }

  _clearItems() {
    this._divResults.innerHTML = '';
  }

  _showResults() {
    /**
     * Tratando o caso de nenhum
     * personagem encontrado
     */
    if (!this._results.length) {
      this._divResults.innerHTML = '';
      this._divResults.appendChild(this._nenhumEncontrado);
      return;
    }

    /**
     * Tratando itens encontrados
     */
    this._results.forEach(result => {
      this._addItem(result.name);
    });
  }
}
