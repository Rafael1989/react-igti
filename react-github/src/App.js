import React, { Component } from 'react';

import { Home } from './components/home/Home';
import { Repos } from './components/repos/Repos';
import { UserServiceObservable } from './services/UserServiceObservable';

import './App.css';
import react_logo from './assets/img/react.png';

/**
 * Guardamos o ASCII da tecla
 * ENTER para facilitar a leitura
 * do código
 */
const ENTER = 13;

export default class App extends Component {
  /**
   * Construtor do componente
   */
  constructor() {
    /**
     * Quando herdamos de React.Component,
     * devemos invocar super()
     */
    super();

    /**
     * Definindo o estado
     * inicial do componente
     */
    this.state = {
      /**
       * Controlando a aba ativa
       */
      currentTab: 'home',

      /**
       * Controlando o usuário
       * atual obtido via Github
       */
      currentUser: '',

      /**
       * Indica se há consulta
       * à API do Github em
       * um determinado momento
       */
      isFetchingData: false,

      /**
       * Lista de repositórios
       * do usuário
       */
      repos: null,

      /**
       * Lista de repositórios
       * favoritados do usuário
       */
      starred: null,

      /**
       * Objeto de dados do
       * usuário
       */
      userInfo: null,
    };

    /**
     * Serviço de busca de usuários
     * no Github utilizando Observables
     */
    this.userServiceObservable = new UserServiceObservable();
  }

  /**
   * Realiza a busca de usuários na API do
   * Github
   */
  _handleSearch = async event => {
    /**
     * Obtendo o código da tecla recém digitada.
     * event.which || event.keyCode é um fallback
     * para navegadores mais antigos, que só fornecem
     * event.keyCode. Portanto, na ausência de event.which
     * obtemos event.keyCode
     *
     * Fonte: https://www.w3schools.com/jsref/event_key_keycode.asp
     */
    const keyCode = event.which || event.keyCode;

    /**
     * Somente processamos se a tecla digitada
     * for ENTER
     */
    if (keyCode !== ENTER) return;

    /**
     * Obtendo o novo usuário a ser pesquisado
     */
    const currentUser = event.target.value.trim();

    /**
     * Caso seja um usuário inválido ou "bata"
     * com o último pesquisado, não precisamos
     * pesquisar novamente
     */
    if (!currentUser || currentUser === this.state.currentUser) return;

    /**
     * Indicando que haverá requisição
     */
    this.setState({ isFetchingData: true });

    /**
     * Executando observable
     */
    this.userServiceObservable.getUserInfoFrom(currentUser).subscribe(
      /**
       * Tratando requisição ok
       */
      userInfo => {
        this.setState({
          userInfo,
          currentUser,
          repos: userInfo.repos,
          starred: userInfo.starred,
          isFetchingData: false,
        });
      },
      /**
       * Tratando requisição com erro
       */
      error => {
        console.error(error);

        this.setState({
          currentUser: '',
          isFetchingData: false,
          repos: null,
          starred: null,
          userInfo: null,
        });
      },
    );
  };

  /**
   * Para renderizar a tela, defini os 3 links com o chaveamento
   * do link ativo a partir de 'currentTab'.
   *
   * Além disso, utilizei também 'currentTab' para
   * definir qual conteúdo é exibido em tempo real
   */
  render() {
    /**
     * Desestruturando state para
     * facilitar a escrita de código
     * com seus valores
     */
    const { repos, starred, userInfo, isFetchingData, currentTab } = this.state;

    return (
      <div>
        <div className="title">
          <h1>Pesquisa de usuários no Github com React</h1>
          <img src={react_logo} style={{ width: '100px' }} alt="React logo" />
        </div>

        <ul className="header">
          <li
            onClick={() => this.setState({ currentTab: 'home' })}
            className={currentTab === 'home' ? 'active' : ''}>
            Home
          </li>

          <li
            onClick={() => this.setState({ currentTab: 'repos' })}
            className={currentTab === 'repos' ? 'active' : ''}>
            Repositórios{!isFetchingData && !!repos ? ` (${repos.length})` : ''}
          </li>

          <li
            onClick={() => this.setState({ currentTab: 'starred' })}
            className={currentTab === 'starred' ? 'active' : ''}>
            Favoritos
            {!isFetchingData && !!starred ? ` (${starred.length})` : ''}
          </li>
        </ul>

        <div className="content">
          {currentTab === 'home' && (
            <Home
              handleSearch={this._handleSearch}
              isFetchingData={isFetchingData}
              userInfo={userInfo}
            />
          )}

          {currentTab === 'repos' && (
            <Repos isFetchingData={isFetchingData} repos={repos} type="repos" />
          )}

          {this.state.currentTab === 'starred' && (
            <Repos
              isFetchingData={isFetchingData}
              repos={starred}
              type="starred"
            />
          )}
        </div>
      </div>
    );
  }
}
