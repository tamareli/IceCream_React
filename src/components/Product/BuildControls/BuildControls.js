import classes from './BuildControls.module.css';
import React, { Component } from 'react';
import ToppingsButton from './ToppingsButton/ToppingsButton';
import BuildControl from './BuildControl/BuildControl';

const TOPPINGS = {
  1: [{ title: 'שוקולד חום' }, { title: 'שוקולד לבן' }, { title: 'ריבת חלב' }],
  2: [
    { title: 'קליק לבן' },
    { title: 'מקופלת' },
    { title: 'פקאנים' },
    { title: 'אוראו' },
    { title: 'תות' },
  ],
};

class BuildControls extends Component {
  state = {
    categories: [
      { id: 1, title: 'רטבים' },
      { id: 2, title: 'תוספות' },
    ],
    toppings: null,
    categoryClicked: false,
  };
  componentDidMount() {
    //axios.get('hk'+ this.props.productId).then(this.setState({categories: ...}))
  }

  categoryClickedHandler = (catgId) => {
    this.setState({ categoryClicked: true, toppings: TOPPINGS[catgId] });
  };
  render() {
    let controls = null;
    if (this.state.toppings !== null)
      controls = this.state.toppings.map((topping) => {
        return <BuildControl key={topping.title} title={topping.title} />;
      });
    return (
      <div className={classes.BuildControls}>
        {!this.state.categoryClicked
          ? this.state.categories.map((catg) => {
              return (
                <ToppingsButton
                  key={catg.id}
                  title={catg.title}
                  clicked={() => this.categoryClickedHandler(catg.id)}
                />
              );
            })
          : controls}
      </div>
    );
  }
}

export default BuildControls;
