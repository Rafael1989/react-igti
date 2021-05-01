/**
 * Importações referentes ao React
 */
import React, { Component } from "react";

/**
 * Importação da classe Task
 */
import { Task } from "./classes/Task";

/**
 * Importação do CSS
 */
import "./App.css";

/**
 * Constante para facilitar a
 * identificação da tecla ENTER
 */
const ENTER = 13;

/**
 * Classe App. Classes React devem herdar
 * de React.Component
 */
export default class App extends Component {
  /**
   * Classes que guardem estado (statefull)
   * geralmente possuem construtores
   */
  constructor() {
    /**
     * A invocação de super é obrigatória
     * para algumas lógicas do React
     */
    super();

    /**
     * Definição do estado de App
     */
    this.state = {
      tasks: [
        new Task("Estudar REA"),
        new Task("Exercícios REA"),
        new Task("Trabalho REA")
      ]
    };
  }

  /**
   * Tratamento de dados do input de
   * cadastro de tarefas
   * @param {Event} event Dados do input
   */
  _handleTask(event) {
    /**
     * Obtendo o código da tecla recém digitada
     */
    const key = event.which;

    /**
     * Guardando o valor do input
     * retirando espaços em branco
     */
    const taskDescription = event.target.value.trim();

    /**
     * A tarefa só será cadastrada se o usuário
     * pressionou ENTER e preencheu uma tarefa que
     * ainda não exista na lista
     */
    if (
      key === ENTER &&
      taskDescription !== "" &&
      this._isNewTask(taskDescription)
    ) {
      /**
       * Utilizo o spread operator (...)
       * para "espalhar" os valores e juntá-los
       * à nova tarefa, gerando um novo vetor
       * de tarefas (imutabilidade)
       */
      this.setState({
        tasks: [...this.state.tasks, new Task(taskDescription)]
      });
    }
  }

  /**
   * Verificando se a tarefa a ser incluída
   * já existe no vetor de tarefas
   * @param {string} taskDescription Descrição da tarefa a ser incluída
   */
  _isNewTask(taskDescription) {
    /**
     * Faço um filtro pela descrição e retorno
     * verdadeiro se não houve nenhum resultado
     * no filtro
     */
    return (
      this.state.tasks.filter(task => task.description === taskDescription)
        .length === 0
    );
  }

  /**
   * Marco a tarefa como cumprida e atualizo a
   * lista de forma imutável
   * @param {Task} task Tarefa a ser cumprida
   */
  _completeTask(task) {
    /**
     * Completo a tarefa via método de classe
     */
    task.completeTask();

    /**
     * Crio uma nova lista de tarefas
     * e atualizo o índice correto
     */
    const newTasks = this.state.tasks;
    newTasks[newTasks.indexOf(task)] = task;

    /**
     * Atualizo o estado com
     * imutabilidade
     */
    this.setState({ tasks: newTasks });
  }

  /**
   * Excluindo a tarefa de forma imutável
   * @param {Task} task Tarefa a ser removida
   */
  _removeTask(task) {
    /**
     * Crio uma nova lista e excluo a tarefa
     * a partir de seu índice com o método
     * splice
     */
    const newTasks = this.state.tasks;
    newTasks.splice(newTasks.indexOf(task), 1);

    /**
     * Atualizo estado com
     * imutabilidade
     */
    this.setState({ tasks: newTasks });
  }

  _renderTasks() {
    /**
     * Para cada tarefa, montamos uma <li>.
     *
     * O atributo 'key' deve ter valor único e é
     * importante para auxiliar
     * o algoritmo de diff do React (Virtual DOM)
     */
    return (
      <ul>
        {this.state.tasks.map((task, index) => {
          return (
            <li key={index} className={task.isCompleted() ? "completed" : ""}>
              <button
                onClick={() => this._removeTask(task)}
                className="waves-effect waves-light btn-small red"
              >
                x
              </button>
              <button
                disabled={task.isCompleted()}
                onClick={() => this._completeTask(task)}
                className="waves-effect waves-light btn-small"
              >
                ✓
              </button>
              &nbsp;&nbsp;&nbsp;{task.description}
            </li>
          );
        })}
      </ul>
    );
  }

  /**
   * Método obrigatório de renderização do
   * componente com React.
   *
   * Lembre-se que o código abaixo é JavaScript (JSX)
   * e não HTML. Portanto, há algumas diferenças.
   */
  render() {
    return (
      <div>
        <h1>React to-do list</h1>

        <div id="cadastro">
          <label>
            Nova tarefa:
            {/* No input, vinculo o método _handleTask no evento onKeyUp
                com arrow functions (garante o contexto de 'this' correto)
            */}
            <input
              autoFocus
              type="text"
              onKeyUp={event => this._handleTask(event)}
            />
          </label>

          <p>Lista de tarefas:</p>

          {/* Testo se há tarefas e, em caso afirmativo, monto a lista.
                Em caso negativo, indico ao final que não há tarefa cadastrada.
            */}
          {!!this.state.tasks && this.state.tasks.length > 0 ? (
            this._renderTasks()
          ) : (
            <p>Nenhuma tarefa cadastrada.</p>
          )}
        </div>
      </div>
    );
  }
}
