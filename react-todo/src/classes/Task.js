/**
 * Classe de tarefa com TypeScript
 */
export class Task {
  /**
   * Construtor
   * @param pDescription Descrição da tarefa
   */
  constructor(pDescription) {
    /**
     * Atributo de descrição
     */
    this._description = pDescription;

    /**
     * Atributo de status
     */
    this._status = 'new';
  }

  /**
   * Getter de descrição
   */
  get description() {
    return this._description;
  }

  /**
   * Getter de status
   */
  get status() {
    return this._status;
  }

  /**
   * Método público para concluir
   * a tarefa
   */
  completeTask() {
    this._status = 'done';
  }

  /**
   * Método público para indicar
   * se a tarefa está completa/concluída
   */
  isCompleted() {
    return this._status === 'done';
  }
}
