import { UserInfo } from '../classes/UserInfo';

/**
 * Utilizando RxJS
 */
import { of, forkJoin, from } from 'rxjs';
import { map, delay } from 'rxjs/operators';

export class UserServiceObservable {
  constructor() {
    this.userInfo = null;
    this.currentLogin = '';
  }

  _fetchFrom = async url => {
    const res = await fetch(url);
    if (res.ok) {
      return res.json();
    } else {
      throw new Error('Usuário inválido ou Github fora do ar!');
    }
  };

  getUserInfoFrom(login) {
    /**
     * Se não há login, retornamos um
     * Observable nulo
     */
    if (!login) {
      return of(null);
    }

    /**
     * Evitando a mesma requisição
     * duas vezes seguidas (cache)
     */
    if (this.currentLogin.trim() === login.trim()) {
      console.log('Obtendo usuário através do cache');
      return of(this.userInfo);
    }

    /**
     * Se chegou aqui, precisamos
     * processar o login
     */
    this.currentLogin = login.trim();

    /**
     * Mapeando as URL's necessárias
     */
    const GITHUB_API_URL = 'https://api.github.com/users/';
    const GITHUB_API_USER = `${GITHUB_API_URL}${this.currentLogin}`;
    const GITHUB_API_REPOS = `${GITHUB_API_USER}/repos`;
    const GITHUB_API_STARRED = `${GITHUB_API_USER}/starred`;

    /**
     * Objetos que receberão os respectivos
     * JSON's
     */
    let jsonUsers, jsonRepos, jsonStarred;

    /**
     * Observable para obter dados do usuário
     */
    const user$ = from(this._fetchFrom(`${GITHUB_API_USER}`)).pipe(
      map(json => (jsonUsers = json)),
    );

    /**
     * Observable para obter dados dos
     * repositórios do usuário
     */
    const repos$ = from(this._fetchFrom(`${GITHUB_API_REPOS}`)).pipe(
      map(json => (jsonRepos = json)),
    );

    /**
     * Observable para obter dados
     * projetos favoritados pelo usuário
     */
    const starred$ = from(this._fetchFrom(`${GITHUB_API_STARRED}`)).pipe(
      map(json => (jsonStarred = json)),
    );

    /**
     * Como são 3 observables, podemos fazer um
     * merge (união) dos 3 para que sejam executados
     * em um mesmo 'susbscribe' posteriormente.
     *
     * No caso, quero que o observable só continue o
     * processamento após os 3 observables do conjunto
     * serem executados. Assim, posso utilizar o operador
     * forkJoin
     */
    return forkJoin(user$, repos$, starred$).pipe(
      delay(2000),
      map(() => {
        /**
         * Criando o objeto de UserInfo
         * através dos JSON's
         */
        this.userInfo = UserInfo.fromJSON(jsonUsers, jsonRepos, jsonStarred);

        /**
         * Clonando o objeto para garantir imutabilidade.
         * Object.create clona o objeto juntamente com
         * os seus métodos
         */
        return Object.create(this.userInfo);
      }),
    );
  }
}
