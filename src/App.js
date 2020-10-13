import React from "react";
import "./App.css";
import DogBar from './dogBar'
import DisplayDog from './displayDog'

export default class App extends React.Component {

  state = {
    filter: false,
    dogList: [],
    selectedDog: -1
  }

  selectedDog = (id) => {
    this.setState({selectedDog: parseInt(id)})
  }

  renderDog = () => {
    return this.state.selectedDog === -1 ? null : this.state.dogList.find(dog => dog.id === this.state.selectedDog)
  }

  onClick = () => {
    this.setState({filter: !this.state.filter})
  }

  goodDog = (dogObj) => {
    const dogI = this.state.dogList.findIndex((obj => obj.id === dogObj.id));
    const newArr = this.state.dogList
    let item = {...newArr[dogI], isGoodDog: !this.state.dogList[dogI].isGoodDog}
    newArr[dogI] = item
    this.setState({dogList: newArr})

    const options = {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(item)
    }
    fetch(`http://localhost:3000/pups/${dogObj.id}`, options)
  }

  componentDidMount() {
    fetch('http://localhost:3000/pups')
      .then(resp => resp.json())
      .then(data => this.setState({dogList: data}))
  }

  render() {
    let filterWord = 'OFF'
    if(this.state.filter){
      filterWord = 'ON'
    }
    return (
      <div className="App">
        <div id="filter-div">
      <button onClick={this.onClick} id="good-dog-filter">Filter good dogs: {filterWord}</button>
        </div>
        <div id="dog-bar">
          <DogBar selectedDog={this.selectedDog} dogList={this.state.dogList} filter={this.state.filter}/>
        </div>
        <div id="dog-summary-container">
          <h1>DOGGO:</h1>
          <div id="dog-info">
            <DisplayDog goodDog={this.goodDog} selectedDog={this.renderDog()}/>
          </div>
        </div>
      </div>
    )
  }
}
