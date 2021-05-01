/**
 * Função fromEvent de rxjs, que converte
 * um evento em um observable
 */
const { fromEvent } = rxjs;

/**
 * Função ajax, que realiza requisições
 * assíncronas
 */
const { ajax } = rxjs.ajax;

/**
 * Alguns operadores do rxjs
 */
const { debounceTime, delay, filter, map, switchMap } = rxjs.operators;

/**
 * URL's da API de Star Wars
 */
const STAR_WARS_API_URL = 'https://swapi.co/api/people/?search=';

export class Observables {
  /**
   * Construtor
   */
  constructor(item, event, searchCallback, whileTypingCallback, clearCallback) {
    /**
     * Parâmetros do construtor
     */
    this._item = item;
    this._event = event;
    this._searchCallback = searchCallback;
    this._clearCallback = clearCallback;
    this._whileTypingCallback = whileTypingCallback;

    /**
     * Observables
     */
    this._clear$ = undefined;
    this._search$ = undefined;
    this._whileTyping$ = undefined;

    /**
     * Subscriptions (para controlar ativação e desativação)
     */
    this._searchSubscription = undefined;
    this._clearSubscription = undefined;
    this._whileTypingSubscription = undefined;

    /**
     * Configurando (mas não ativando)
     * os observables
     */
    this._configObservables();
  }

  /**
   * Método público
   * de ativação
   */
  start() {
    this._activateSearch();
  }

  /**
   * Método público
   * de desativação
   */
  stop() {
    this._cancelSearch();
  }

  _configObservables() {
    /**
     * Observable de busca
     */
    this._search$ = fromEvent(this._item, this._event)
      /**
       * Obtendo o valor do input
       */
      .pipe(
        /**
         * Controlando o intervalo entre
         * as requisições
         */
        debounceTime(300),

        /**
         * Mapeando somente o texto digitado
         * pelo usuário
         */
        map(event => event.target.value),

        /**
         * Filtrando somente texto com 2 ou mais caracteres
         */
        filter(value => {
          return value.length > 1;
        }),

        /**
         * Mapeando o retorno da URL e "desligando" a consulta
         * anterior para evitar conflitos (switchMap)
         */
        switchMap(searchValue => ajax(encodeURI(`${STAR_WARS_API_URL}${searchValue}`))),

        /**
         * Simulando um atraso na requisição
         */
        delay(1000),

        /**
         * Mapeando o resultado a partir
         * da requisição
         */
        map(data => {
          return data.response.results;
        }),

        /**
         * Ordenando o resultado por nome
         */
        map(data => data.sort((a, b) => a.name.localeCompare(b.name)))
      );

    /**
     * Observable para limpar os resultados
     * caso a quantidade de caracteres seja menor que 2
     *
     * Como é muito semelhante ao anterior, omiti
     * os comentários
     */
    this._clear$ = fromEvent(this._item, this._event).pipe(
      debounceTime(300),
      map(event => event.target.value),
      filter(value => value.length < 2)
    );

    /**
     * Observable de feedback durante a pesquisa
     */
    this._whileTyping$ = fromEvent(this._item, this._event).pipe(
      map(event => event.target.value),
      filter(value => value.length > 0)
    );
  }

  _activateSearch() {
    this._searchSubscribe();
    this._whileTypingSubscribe();
    this._clearSubscribe();
  }

  _cancelSearch() {
    /**
     * Cancelando todos os observables
     */
    this._searchSubscription.unsubscribe();
    this._whileTypingSubscription.unsubscribe();
    this._clearSubscription.unsubscribe();

    /**
     * Atribuindo evento na digitação para
     * reativar os observables
     */
    this._activateSearch();
  }

  _searchSubscribe() {
    this._searchSubscription = this._search$.subscribe(results => {
      this._searchCallback(results);
    });
  }

  _clearSubscribe() {
    this._clearSubscription = this._clear$.subscribe(() => {
      this._clearCallback();
    });
  }

  _whileTypingSubscribe() {
    this._whileTypingSubscription = this._whileTyping$.subscribe(() => {
      this._whileTypingCallback();
    });
  }
}
