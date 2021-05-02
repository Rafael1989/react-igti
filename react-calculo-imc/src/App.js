/**
 * Importações referentes ao React
 */
 import React, { Component } from "react";

 
 /**
  * Importação do CSS
  */
 import "./App.css";
 
 
 /**
  * Classe App. Classes React devem herdar
  * de React.Component
  */
 export default class App extends Component {
   /**
    * Classes que guardem estado (statefull)
    * geralmente possuem construtores
    */

   state = {
      peso: 0,
      altura: 0,
      imc: 0
   };

   _calcular() {
    if(this.state.peso.includes(",") || this.state.peso.includes(".") || this.state.altura.includes(",") || this.state.altura.includes("."))
      alert("Não use vírgula, nem ponto.")
    this.setState({...this.state, imc: (this.state.peso / ((this.state.altura/100) * (this.state.altura/100))).toFixed(2)})
   }

   handlePesoChange(event) {
    this.setState({...this.state, peso: event.target.value});
   }

   handleAlturaChange(event) {
    this.setState({...this.state, altura: event.target.value});
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
         <h1>Cálculo de IMC</h1>
          <div>
              <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>

              <p>O índice é calculado da seguinte maneira: divide-se o peso do paciente pela sua altura elevada ao quadrado. Diz-se que o indivíduo tem peso normal quando o resultado do IMC está entre 18,5 e 24,9.</p>
                  
              <p>Quer descobrir seu IMC? Insira seu peso e sua altura nos campos abaixo e compare com os índices da tabela. Importante: siga os exemplos e use pontos como separadores.</p>
              <form autoComplete="off">
                  <div className="ui-g ui-fluid">
              
                      <div className="ui-g-12">
                          <label htmlFor="peso">Peso (Ex: 95)</label>
                          <input id="peso" type="text" name="peso" placeholder="0,00" required value={this.state.peso} onChange={this.handlePesoChange.bind(this)}
                          />
                      </div>

                      <div className="ui-g-12">
                          <label htmlFor="altura">Altura (Ex: 185)</label>
                          <input id="altura" type="text" name="altura" placeholder="0,00" required value={this.state.altura} onChange={this.handleAlturaChange.bind(this)}
                          />
                      </div>
                  
                      <div className="ui-g-12">
                          <button type="button" onClick={() => this._calcular()}>Calcular</button>
                      </div>
                  </div>
              </form>
            </div>
  
            <div>
              <h2>
                Veja a interpretação do IMC
              </h2>

              <table>
                  <thead>
                    <tr>
                        <th>IMC</th>
                        <th>CLASSIFICAÇÃO</th>
                        <th>OBESIDADE (GRAU)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                        <td>MENOR QUE 18,5</td>
                        <td>MAGREZA</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>ENTRE 18,5 E 24,9</td>
                        <td>NORMAL</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>ENTRE 25,0 E 29,9</td>
                        <td>SOBREPESO</td>
                        <td>I</td>
                    </tr>
                    <tr>
                        <td>ENTRE 30,0 E 39,9</td>
                        <td>OBESIDADE</td>
                        <td>II</td>
                    </tr>
                    <tr>
                        <td>MAIOR QUE 40,0</td>
                        <td>OBESIDADE GRAVE</td>
                        <td>III</td>
                    </tr>
                  </tbody>
              </table>
            </div>

            <div>
                <h2>SEU IMC: {this.state.imc}</h2>
            </div>
  
       </div>
     );
   }
 }
 