export class UserInfo {
  constructor(pName, pAvatar, pLogin, pFollowers, pFollowing) {
    this._name = pName;
    this._avatar = pAvatar;
    this._login = pLogin;
    this._followers = pFollowers;
    this._following = pFollowing;
    this._repos = [];
    this._starred = [];
  }

  get name() {
    return this._name;
  }

  get avatar() {
    return this._avatar;
  }

  get login() {
    return this._login;
  }

  get followers() {
    return this._followers;
  }

  get following() {
    return this._following;
  }

  get repos() {
    /**
     * Imutabilidade
     */
    return [].concat(this._repos);
  }

  /**
   * Ordenando os repositórios antes
   * da atribuição
   */
  set repos(pRepos) {
    const sortedRepos = UserInfo.sortRepos(pRepos);
    this._repos = sortedRepos;
  }

  get starred() {
    /**
     * Imutabilidade
     */
    return [].concat(this._starred);
  }

  /**
   * Ordenando os repositórios antes
   * da atribuição
   */
  set starred(pStarred) {
    const sortedStarred = UserInfo.sortRepos(pStarred);
    this._starred = sortedStarred;
  }

  /**
   * Método estático para ordenar os repositórios
   * em ordem alfabética
   *
   * @param {array} reposToSort repositórios a serem ordenados
   */
  static sortRepos(reposToSort) {
    if (!!reposToSort && reposToSort.length > 0) {
      return reposToSort.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
      );
    }
  }

  /**
   * Método estático para facilitar a criação
   * do objeto através dos JSON's vindos
   * do Github
   * @param jsonUserInfo JSON com userInfo
   * @param jsonRepos JSON com repos
   * @param jsonStarred JSON com starred
   */
  static fromJSON(jsonUserInfo, jsonRepos, jsonStarred) {
    const userInfo = new UserInfo(
      jsonUserInfo['name'],
      jsonUserInfo['avatar_url'],
      jsonUserInfo['login'],
      jsonUserInfo['followers'],
      jsonUserInfo['following'],
    );

    userInfo.repos = [].concat(jsonRepos);
    userInfo.starred = [].concat(jsonStarred);

    return userInfo;
  }
}
