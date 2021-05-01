export class Observer {
  /**
   * O construtor recebe um agrupamento
   * de elementos HTML.
   * @param {Object} element
   */
  constructor(element) {
    this._element = element;
    this._input = undefined;
    this._button = undefined;
    this._configElement();
  }

  /**
   * Aqui, definimos que o input é o primeiro
   * elemento filho da div e o botão o 2o.
   */
  _configElement() {
    this._input = this._element.children[0];
    this._input.value = 'Estado inicial';
    this._button = this._element.children[1];
  }

  /**
   * Invocamos o método 'add' do subject
   * para que esse objeto passe a "escutar"
   * o subject
   * @param {Subject} subject
   */
  subscribeTo(subject) {
    subject.add(this);
  }

  /**
   * Deixamos de "escutar" o subject
   * @param {Subject} subject
   */
  unsubscribeFrom(subject) {
    subject.remove(this);
  }

  /**
   * Atualizamos nosso objeto a partir
   * da notificação do subject
   * @param {string} message
   */
  update(message) {
    this._input.value = message;
  }
}
