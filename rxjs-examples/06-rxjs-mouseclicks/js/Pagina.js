'use strict';

/**
 * Função fromEvent de rxjs, que converte
 * um evento em um observable
 */
const { fromEvent } = rxjs;

/**
 * Alguns operadores do rxjs
 */
const { filter, debounceTime, throttleTime, take } = rxjs.operators;

export class Pagina {
  constructor() {
    /**
     * Declarando todos os atributos da classe
     */
    this._bt2Event;
    this._button3;
    this._button3$;
    this._checkboxAtraso;
    this._clicks;
    this._divObservable;
    this._inputAtraso;
    this._radioDebounce;
    this._radioThrottle;

    /**
     * Inicializando os atributos
     */
    this._inicializarAtributos();
  }

  _inicializarAtributos() {
    /**
     * Referência para os cliques do segundo radio button (bt2)
     */
    this._clicks = 0;

    /**
     * Referência para o evento de bt2. Foi necessário
     * para que a remoção do evento funcionasse
     * corretamente
     */
    this._bt2Event = this._bt2Listener.bind(this);

    /**
     * 3o radio button (observables)
     */
    this._button3 = document.querySelector('#bt3');

    /**
     * Observable de bt3. Ele será instanciado
     * somente ao selecionarmos o 3o radio button
     *
     * O símbolo $ é incluído convencionalmente em variáveis
     * que comportam observables
     */
    this._button3$ = undefined;

    /**
     * Componentes que manipulam o tempo
     * na requisição
     */
    this._divObservable = document.querySelector('#divObservable');
    this._checkboxAtraso = document.querySelector('#cbHabilitarAtraso');
    this._inputAtraso = document.querySelector('#inputAtraso');
    this._radioDebounce = document.querySelector('#radioDebounce');
    this._radioThrottle = document.querySelector('#radioThrottle');

    /**
     * Mapeando as ações dos elementos
     * referentes ao atraso da requisição
     */
    this._mapearElementosAtraso();

    /**
     * Mapeando os 3 radio buttons da página
     */
    this._mapearRadioButtons();

    /**
     * Habilitando o evento de bt1 no início
     */
    this._habilitarEvento('bt1');
  }

  _atribuirEvento(elemento, evento, funcao) {
    elemento.addEventListener(evento, funcao);
  }

  _mapearElementosAtraso() {
    /**
     * Elementos com comportamento
     * semelhante para o evento 'click'
     */
    const elementos = [
      this._checkboxAtraso,
      this._checkboxAtraso,
      this._inputAtraso,
      this._inputAtraso,
      this._radioDebounce,
      this._radioThrottle,
    ];

    /**
     * Percorrendo os elementos e atribuindo
     * o evento 'click'
     */
    elementos.forEach(elemento => this._atribuirEvento(elemento, 'click', this._check.bind(this)));

    /**
     * No caso do input, é melhor atribuir
     * a verificação também no evento 'change'
     */
    this._atribuirEvento(this._inputAtraso, 'change', this._check.bind(this));

    /**
     * Para a div, habilitamos a marcação do radio
     * button correspondente
     */
    this._divObservable.addEventListener('click', () => {
      this._button3.checked = true;
      this._removeAll();
      this._habilitarEvento('bt3');
    });
  }

  _mapearRadioButtons() {
    /**
     * Obtendo os radio buttons
     */
    const radioButtons = document.querySelectorAll("input[type='radio'");

    /**
     * Pra cada botão, atribuímos o evento de click
     */
    radioButtons.forEach(button => this._atribuirEvento(button, 'click', this._check.bind(this)));
  }

  _check(event) {
    /**
     * Removendo todos os event listeners para
     * evitar instabilidade
     */
    this._removeAll();

    /**
     * Obtendo o id do botão
     * que foi clicado
     */
    const id = event.target.id;

    /**
     * Habilitando o evento
     * do id correspondente
     */
    this._habilitarEvento(id);
  }

  /**
   * Habilita o monitoramento conforme
   * o id
   * @param {string} id id a ser habilitado
   */
  _habilitarEvento(id) {
    if (id === 'bt1') {
      document.addEventListener('click', this._bt1);
      return;
    }

    if (id === 'bt2') {
      this._bt2();
      return;
    }

    /**
     * O "else" é bt3
     */
    this._bt3();
  }

  /**
   * Para o primeiro botão, o monitoramento
   * é mais "direto"
   * @param {Event} event Evento a ser monitorado
   */
  _bt1(event) {
    console.log(`X: ${event.clientX} | Y: ${event.clientY}`);
  }

  /**
   * Para o segundo botão, o monitoramento
   * é mais complexo, exigindo uma função
   * própria (listener)
   */
  _bt2() {
    this._clicks = 0;
    document.addEventListener('click', this._bt2Event);
  }

  /**
   * Método para bt2
   * @param {Event} evento
   */
  _bt2Listener(event) {
    /**
     * Só vale para os primeiros 10
     * cliques válidos
     */
    if (this._clicks < 10) {
      /**
       * Filtrando o lado esquerdo da tela
       */
      if (event.clientX < window.innerWidth / 2) {
        /**
         * Incrementando o controle
         * de cliques
         */
        this._clicks++;

        console.log(`X: ${event.clientX} | Y: ${event.clientY}`);
      }
    } else {
      /**
       * Limite de cliques excedidos
       */
      document.removeEventListener('click', this._bt2Event);
    }
  }

  /**
   * Implementação de Observables. Contém
   * tudo o que é necessário e não há risco
   * de vazamento de memória nem alteração
   * externa de estado - boa prática
   */
  _bt3() {
    /**
     * Obtendo o tempo de atraso
     * Dica: +(string) converte a string para number
     */
    const tempoAtraso = this._checkboxAtraso.checked ? +this._inputAtraso.value : 0;

    /**
     * Definindo a função de
     * controle de cliques
     * (throttle ou debounce)
     */
    const delayStrategy = this._radioDebounce.checked
      ? debounceTime(tempoAtraso)
      : throttleTime(tempoAtraso);

    /**
     * Criação do observable
     */
    const obs$ =
      /**
       * Monitorando o evento de click em document
       */
      fromEvent(document, 'click').pipe(
        delayStrategy,
        /**
         * Filtrando somente a metade direita da tela
         */
        filter(event => event.clientX > window.innerWidth / 2),
        /**
         * Definindo apenas 10 ocorrências
         */
        take(10)
      );

    /**
     * O observable só é ativado após o fato
     * de alguém "assiná-lo" (subscribe).
     *
     * O sufixo '$' é uma convenção para nomear
     * observables
     */
    this._button3$ = obs$.subscribe(event => {
      console.log(`X: ${event.clientX} | Y: ${event.clientY}`);
    });
  }

  /**
   * Reinicia o monitoramento,
   * evitando conflitos entre
   * as funções. Além disso,
   * limpa o console para uma
   * melhor visualização dos dados.
   */
  _removeAll() {
    console.clear();

    document.removeEventListener('click', this._bt1);
    document.removeEventListener('click', this._bt2Event);

    /**
     * Se _button3$ "existe",
     * cancelamos o observable
     */
    if (!!this._button3$) {
      this._button3$.unsubscribe();
    }
  }
}
