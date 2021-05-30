import classes from '../../../css/BuildControls.module.css';
import React, { Component } from 'react';
import ToppingsByCatg from '../ToppingsByCatg';
import ErrorBoundary from '../../ErrorBoundary';
import ErrorMessage from '../../UI/Error/ErrorMessage'

class BuildControls extends Component {
  render() {
    let controls = null;
    if(this.props.catgsToppingsError){
      return <ErrorMessage />
    }
    if (this.props.toppingsForCategories.length !== 0) {
      controls = this.props.toppingsForCategories.map((category, index) => {
        return (
          <ErrorBoundary key={index}>
            <ToppingsByCatg
              categoryForToppings={category}
              addTopping={this.props.addTopping}
              removeTopping={this.props.removeTopping}
              toppingsCatgs={this.props.toppingsCatgs}
              toppings={this.props.toppings}
            />
          </ErrorBoundary>
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
