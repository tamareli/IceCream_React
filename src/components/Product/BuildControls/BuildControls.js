import classes from './BuildControls.module.css';
import React, { Component } from 'react';
import ToppingsButton from './ToppingsButton/ToppingsButton';
import BuildControl from './BuildControl/BuildControl';

const TOPPINGS = {
  1: [
    { id: 6, title: 'שוקולד חום' },
    { id: 7, title: 'שוקולד לבן' },
    { id: 8, title: 'ריבת חלב' },
  ],
  2: [
    { id: 1, title: 'קליק לבן' },
    { id: 2, title: 'מקופלת' },
    { id: 3, title: 'פקאנים' },
    { id: 4, title: 'אוראו' },
    { id: 5, title: 'תות' },
  ],
};

class BuildControls extends Component {
  state = {
    categories: [
      { id: 1, title: 'רטבים' },
      { id: 2, title: 'תוספות' },
    ],
    toppings: null,
    categoryClicked: null,
  };
  componentDidMount() {
    //axios.get('hk'+ this.props.productId).then(this.setState({categories: ...}))
  }

  categoryClickedHandler = (catgId) => {
    this.setState({ categoryClicked: catgId, toppings: TOPPINGS[catgId] });
  };
  backClickHandler = () => {
    this.setState({ categoryClicked: null });
  };
  render() {
    let controls = null;
    if (this.state.toppings !== null)
      controls = this.state.toppings.map((topping) => {
        return (
          <BuildControl
            key={topping.title}
            title={topping.title}
            addClicked={() =>
              this.props.addTopping(topping.id, this.state.categoryClicked)
            }
            removeClicked={() =>
              this.props.removeTopping(topping.id, this.state.categoryClicked)
            }
          />
        );
      });
    return (
      <div className={classes.BuildControls}>
        {this.state.categoryClicked ? (
          <p onClick={this.backClickHandler} style={{ fontWeight: 'bold' }}>
            ---&#62;
          </p>
        ) : null}
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
