import { Subject } from './Subject.js';
import { Observer } from './Observer.js';

/**
 * Ações somente após o carregamento
 * total da página
 */
window.addEventListener('load', iniciar);

function iniciar() {
  /**
   * Mapeamento de elementos
   */
  const divObservers = document.querySelector('.observers');
  const btCreateObserver = document.querySelector('#btCreateObserver');
  const inputMessage = document.querySelector('#subject');

  /**
   * Criando o Subject
   */
  const subject = new Subject();

  /**
   * Const que recebe a função de criação
   * de um Observer. Ou seja, não é executada
   * neste momento. Será executada "mais abaixo"
   */
  const createObserver = () => {
    /**
     * Criando os três elementos que serão,
     * em seguida, agrupados em uma div (componente)
     */
    const newDiv = document.createElement('div');
    const newInput = document.createElement('input');
    const newButton = document.createElement('button');
    newDiv.classList.add('observer');
    newDiv.appendChild(newInput);
    newDiv.appendChild(newButton);

    /**
     * Criando o observer e o vinculando à div
     */
    const observer = new Observer(newDiv);

    /**
     * Configurando o botão. No click, irá acionar
     * o observer para efetuar o unsubscribe e
     * ficará invisível.
     */
    newButton.textContent = 'X';
    newButton.classList.add('waves-effect', 'waves-light', 'btn', 'red', 'darken-4', 'space');

    newButton.addEventListener('click', () => {
      observer.unsubscribeFrom(subject);
      newButton.style = 'display: none';
    });

    /**
     * Inicializando o observer, se inscrevendo
     * ao subject
     */
    observer.subscribeTo(subject);

    /**
     * Por fim, adicionamos a div recém criada
     * à div de observers que é exibida no HTML.
     */
    divObservers.appendChild(newDiv);
  };

  /**
   * Função de notificação
   */
  const notify = () => {
    subject.notify(inputMessage.value);
  };

  /**
   * Mapeamento do evento de criação
   * de inputs ao botão correspondente
   */
  btCreateObserver.addEventListener('click', createObserver);

  /**
   * Mapeamento do input da mensagem para
   * propagar aos seus observadores
   */
  inputMessage.addEventListener('input', notify);
}
