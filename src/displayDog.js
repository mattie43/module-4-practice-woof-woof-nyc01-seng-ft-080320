import React from "react";

export default class DisplayDog extends React.Component {

  onClick = () => {
    this.props.goodDog(this.props.selectedDog)
  }

  render() {
    if(!this.props.selectedDog){
      return null
    }else{
      let goodDog = 'YES'
      if(!this.props.selectedDog.isGoodDog){goodDog = 'NO'}
      return(
        <React.Fragment>
          <h1>{this.props.selectedDog.name}</h1>
          <img src={this.props.selectedDog.image} alt=""/>
          <button onClick={this.onClick}>Good Dog: {goodDog}</button>
        </React.Fragment>
      )
    }
  }
}