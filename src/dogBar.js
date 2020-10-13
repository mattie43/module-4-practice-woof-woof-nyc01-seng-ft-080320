import React from "react";

export default class DogBar extends React.Component {

  onClick = (e) => {
    this.props.selectedDog(e.target.id)
  }

  renderDogs = () => {
    let dogArr = this.props.dogList
    if(this.props.filter){
      dogArr = this.props.dogList.filter(dog => dog.isGoodDog)
    }
    return dogArr.map((dog) => (
      <span 
        key={dog.id} 
        id={dog.id} 
        onClick={this.onClick}>
        {dog.name}
      </span>
    ))
  }

  render() {
    return this.renderDogs()
  }
}
