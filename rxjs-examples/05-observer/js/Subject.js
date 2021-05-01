export class Subject {
  /**
   * Inicializamos o objeto com
   * o vetor de observers vazio.
   */
  constructor() {
    this.observers = [];
  }

  /**
   * Inclusão de um observer no vetor
   * @param {Observer} observer
   */
  add(observer) {
    this.observers.push(observer);
  }

  /**
   * Exclusão de um observer do vetor, com
   * ajuda do método splice
   * @param {Observer} observer
   */
  remove(observer) {
    const index = this.observers.indexOf(observer);
    this.observers.splice(index, 1);
  }

  /**
   * Para cada observer, invoca o método
   * "update" passando a mensagem como parâmetro
   * @param {string} message
   */
  notify(message) {
    this.observers.forEach(observer => observer.update(message));
  }
}
