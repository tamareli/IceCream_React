import classes from '../../../css/BuildControls.module.css';
import React, { Component } from 'react';
import ToppingsButton from './ToppingsButton/ToppingsButton';
import { Link } from 'react-router-dom';
import axios from '../../../axios';
import ToppingsByCatg from '../ToppingsByCatg';

class BuildControls extends Component {
  render() {
    let controls = null;
    if (this.props.toppingsForCategories.length !== 0) {
      controls = this.props.toppingsForCategories.map((category, index) => {
        return (
          <ToppingsByCatg
            key={index}
            categoryForToppings={category}
            removeTopping={this.props.removeTopping}
            addTopping={this.props.addTopping}
            toppingsCatgs={this.props.toppingsCatgs}
            toppings={this.props.toppings}
          />
        );
      });
    }

    return (
      <div className={classes.BuildControls}>
        <div className={classes.Controls}>{controls}</div>
      </div>
    );
  }
}

export default BuildControls;
