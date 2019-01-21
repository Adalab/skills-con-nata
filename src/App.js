import React, { Component } from 'react';
import './App.css';

const skillPoint = 'https://raw.githubusercontent.com/Adalab/dorcas-s2-proyecto-data/master/skills.json';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      skills: [],
      card: {
        skills: []
      }
    };

    this.addSkillorNot = this.addSkillorNot.bind(this);
  }

  getSkills() {
    fetch(skillPoint)
      .then(res => res.json())
      .then(data => {
        this.setState({
          skills: data.skills
        });
      })
  }

  componentDidMount(){
    this.getSkills();
  }

  saveCard(myCard) {
    localStorage.setItem('awesomeCard', JSON.stringify(myCard));
  }

  addSkillorNot(e){
    const {card} = this.state;
    const currentSkills = card.skills.slice(0);
    const check = e.currentTarget;
    const newSkill = e.currentTarget.value;
    const isChecked = check.checked;


    if (currentSkills.length < 3 && isChecked) {
      
      // Está marcado y hay menos de 3 skills
      currentSkills.push(newSkill);
    
    } else {
      
      // No está marcado o hay 3 skills o más
      check.checked = false;
      // si existe tengo que borrarlo
      const index = currentSkills.indexOf(newSkill);
      if (index > -1) {
        currentSkills.splice(index, 1);
      } 
    
    }

    const newCard = {...card, skills: currentSkills};
    this.saveCard(newCard);
    this.setState({
      card: newCard
    });
  }

  render() {
    return (
      <div className="App">
        <div className="result">
          <ul className="result__skills">
            {this.state.card.skills.map((item, index) => {
              return (
                <li className="result__skill" key={index}>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
        <ul className="skills">
          {this.state.skills.map((item, index) => {
            return (
              <li className="skill" key={index}>
                <label htmlFor={`skill--${index}`}>
                  <input type="checkbox" id={`skill--${index}`} name="skill" value={item} onClick={this.addSkillorNot} /> {item}
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
