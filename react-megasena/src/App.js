/**
 * Import obrigatório do React
 * { Component } é importado para evitar React.Component na
 * declaração da classe.
 */
import React, { Component } from 'react';

/**
 * Imports relacionados ao RxJS
 */
import { interval } from 'rxjs';
import { map, take } from 'rxjs/operators';

/**
 * CSS
 */
import './App.css';

/**
 * Componentes e funções que criei para
 * auxiliar e separar responsabilidades no App.
 */
import { Lottery } from './components/lottery/Lottery';
import { MyButton } from './components/forms/MyButton';
import { NewGameDialog } from './components/game/NewGameDialog';
import { Number } from './components/number/Number';
import { numberInArray } from './helpers/arrayHelpers';
import { randomNumbers, randomNumber } from './helpers/randomHelpers';

/**
 * Declaração da classe. Deve extender
 * de Component para "ganhar" funcionalidades
 * do React.
 */
export default class App extends Component {
  /**
   * Construtor. É bom criar
   * quando decidimos lidar
   * com state no component
   */
  constructor() {
    /**
     * Super invoca a classe mãe (Component)
     * invoca várias implementações do React.
     */
    super();

    /**
     * Este é o estado principal
     * do app, em forma de objeto {}
     */
    this.state = {
      /**
       * Vetor que guarda os jogos
       * criados pelo usuário.
       * Inicia vazio.
       */
      customGames: [],

      /**
       * Guarda o intervalo de espera
       * a cada geração de um novo número
       * do sorteio, em milisegundos.
       */
      interval: 2000,

      /**
       * Flag para indicar se estamos
       * realizando o sorteio ou não.
       * Útil para desabilitar componentes
       */
      loading: false,
      games: [],
      numbers: [],
      pickedNumbers: []
    };

    /**
     * Observable para trabalhar
     * com os números sorteados
     */
    this.pickedNumbers$ = null;
  }

  /**
   * Método do ciclo de vida do React
   * que é disparado após todo o render
   * do componente. É invocado apenas uma
   * vez e normalmente é utilizado para
   * inicializar algum componente já
   * renderizado. Neste caso, geramos os
   * jogos aleatórios.
   */
  componentDidMount() {
    this._generateRandomGames(5);
  }

  /**
   * Gera 3 jogos
   * com números
   * aleratórios
   *
   * Outra funcionalidade interessante
   * do ES6+ são os default parameters.
   *
   * Neste caso, indico que, caso nenhum
   * valor "chegue" na função, ela assume
   * o valor 3 para "numberOfGames".
   */
  _generateRandomGames(numberOfGames = 3) {
    /**
     * Criamos um vetor vazio
     */
    const games = [];

    /**
     * Para cada jogo a ser gerado, geramos
     * 6 números aleatoriamente e inserimos
     * esse jogo no vetor, ou seja, é um
     * vetor de vetores.
     */
    for (let i = 0; i < numberOfGames; i++) {
      games.push(randomNumbers(1, 60, 6));
    }

    /**
     * Por fim, atualizamos o estado do app.
     * Utilizamos aqui uma notação de abreviação do ES6,
     * onde a variável tem o mesmo identificador do
     * elemento do objeto do estado (games). Assim,
     * o comando abaixo poderia ser também:
     *
     * this.setState({ games: games });
     */
    this.setState({ games });
  }

  /**
   * Este método faz o sorteio propriamente
   * dito com o apoio do RxJS.
   */
  _generatePickedNumbers() {
    /**
     * Primeiramente, indicamos ao app que há
     * uma carga de dados. Assim, alguns componentes
     * reagirão e ficarão desabilitados para evitar
     * interações "perigosas" do usuário.
     */
    this.setState({ loading: true });

    /**
     * Criamos um vetor vazio
     * para guardar os números
     * do sorteio.
     */
    const pickedNumbers = [];

    /**
     * Aqui, criamos o Observable a partir
     * do intervalo (que é 1000, conforme state). Esse
     * observable será manipulado por dois operadores:
     * map e take. Esses operadores são agrupados pelo "pipe".
     *
     * Portanto, a cada 1 segundo, o observable emitirá
     * um valor, que não será utilizado. Ao invés disso,
     * a cada iteração (map), geraremos um número aleatório e o
     * incluiremos no vetor de números sorteados (caso seja
     * um número válido, ou seja, que ainda não exista no vetor).
     * Por fim, indicamos que isso será executado apenas 6 vezes (take).
     * Isso é suficiente para geramos os 6 números do sorteio.
     *
     * É importante lembrar que o observable só entrará em execução
     * após o subscribe, que é feito logo em seguida.
     *
     */
    const pickedNumbers$ = interval(this.state.interval).pipe(
      map(value => {
        /**
         * Considero o número inválido por padrão
         */
        let numberOk = false;

        /**
         * Enquanto o número for inválido,
         * gero um novo número aleatório.
         */
        while (!numberOk) {
          const newNumber = randomNumber(1, 60);

          /**
           * Validação do número recém gerado
           */
          if (pickedNumbers.indexOf(newNumber) === -1) {
            pickedNumbers.push(newNumber);
            numberOk = true;
          }
        }
      }),
      take(6)
    );

    /**
     * Aqui, habilitamos o observable e, a cada
     * valor obtido, atualizamos os números sorteados.
     */
    pickedNumbers$.subscribe(
      /**
       * Primeiro parâmetro, conhecido como "next".
       * Vai atualizar o estado do app.
       */
      () => this.setState({ pickedNumbers }),
      /**
       * O segundo parâmetro é para tratar erros.
       * Não iremos utilizá-lo aqui.
       */
      () => null,
      /**
       * O terceiro e último parâmetro é para indicar
       * alguma ação após o término da execução do
       * Observable. Neste caso, mudamos o estado do app
       * novamente para indicar que o sorteio foi finalizado.
       */
      () => this.setState({ loading: false })
    );
  }

  /**
   * Verificamos se o vetor de números sorteados
   * possui pelo menos um item e, por fim, se o
   * número do parâmetro está contido nesse vetor
   */
  _isNumberPicked = number => numberInArray(number, this.state.pickedNumbers);

  /**
   * Inserimos um novo jogo
   * no vetor de jogos customizados.
   *
   * Aqui, usamos o rest operator do ES6 (...),
   * que "quebra" o vetor em seus valores unindo,
   * por fim, com os números "que chegaram" do
   * parâmetro.
   */
  _newGame = numbers => {
    this.setState({ customGames: [...this.state.customGames, numbers] });
  };

  /**
   * Abstração para isolar a renderização
   * dos botões "Iniciar sorteio" e
   * "Gerar novos números".
   *
   * Perceba que "enviamos" as ações "_generatePickedNumbers"
   * e "_generateRandomGames" aos botões. "De lá", elas serão
   * executadas com o contexto "daqui" graças às arrow functions,
   * que levam o contexto consigo.
   *
   * Com o ES6+, o "return" pode ser implícito.
   * Basta que não utilizemos chaves no método,
   * como no exemplo abaixo.
   */
  _renderActionButtons = () => (
    <div className="row">
      <MyButton
        title="Iniciar sorteio"
        disabled={this.state.loading}
        onClick={() => this._generatePickedNumbers()}
      />

      <MyButton
        title="Gerar novos números"
        disabled={this.state.loading}
        onClick={() => this._generateRandomGames(3)}
      />
    </div>
  );

  /**
   * Neste método, não usei o "return"
   * implícito para deixar o código mais
   * claro para o desenvolvedor.
   *
   * Outro benefício é incluir alguma lógica
   * antes do return, como é o caso abaixo.
   */
  _renderGames = () => {
    /**
     * Unindo os jogos gerados aleatoriamente
     * com os jogos criados pelo usuário.
     */
    const allGames = this.state.games.concat(this.state.customGames);

    return (
      <div>
        <h2>Meus jogos</h2>
        {allGames.map((game, index) => {
          /**
           * Para ficar mais claro, refatorei
           * o código de inserção de cada jogo
           * em seu próprio método: "renderGame"
           */
          return this._renderGame(game, index);
        })}
      </div>
    );
  };

  /**
   * Renderiza um jogo qualquer
   */
  _renderGame(game, index) {
    return (
      <div key={index} className="row game">
        {index + 1}:&nbsp;
        {game.map(number => {
          /**
           * Para cada número de um jogo,
           * renderizamos com o respectivo
           * componente "Number". O número
           * fica "marcado" como sorteado (picked),
           * conforme o método auxiliar _isNumberPicked
           */
          return (
            <Number
              key={number}
              value={number}
              picked={this._isNumberPicked(number)}
            />
          );
        })}
      </div>
    );
  }

  /**
   * Renderizando o botão "Criar jogo"
   *
   * Perceba uma aplicação de CSS customizado
   * com o atributo style, bem semelhante ao HTML,
   * porém com a notação de double curly braces {{ }}
   */
  _renderNewGameButton = () => (
    <div style={{ marginTop: '15px' }}>
      <NewGameDialog
        disabled={this.state.loading}
        onSucess={numbers => this._newGame(numbers)}
      />
    </div>
  );

  /**
   * Renderização do componente
   * de loteria.
   */
  _renderLottery = () => <Lottery numbers={this.state.pickedNumbers} />;

  /**
   * Esse é o método render "oficial" de "App.js".
   * Uma boa prática é deixá-lo o mais simples e
   * legível possível. Vendo a página no navegador e
   * o código abaixo é possível inferir o que acontece.
   */
  render() {
    return (
      <div className="App">
        {this._renderLottery()}
        {this._renderActionButtons()}
        {this._renderGames()}
        {this._renderNewGameButton()}
      </div>
    );
  }
}
