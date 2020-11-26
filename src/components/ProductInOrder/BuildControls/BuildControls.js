import classes from './BuildControls.module.css';
import React, { Component } from 'react';
import ToppingsButton from './ToppingsButton/ToppingsButton';
import BuildControl from './BuildControl/BuildControl';
import { Link } from 'react-router-dom';
import axios from '../../../axios';

// like database
/*const TOPPINGS = {
  23: [
    { id: 6, title: 'שוקולד חום' },
    { id: 7, title: 'שוקולד לבן' },
    { id: 8, title: 'ריבת חלב' },
  ],
  24: [
    { id: 1, title: 'קליק לבן' },
    { id: 2, title: 'מקופלת' },
    { id: 3, title: 'פקאנים' },
    { id: 4, title: 'אוראו' },
    { id: 5, title: 'תות' },
  ],
};*/

class BuildControls extends Component {
  state = {
    toppingsForCategory: null,
    categoryClicked: null,
  };
  componentDidMount() {}
  categoryClickedHandler = (catgId) => {
    axios.get('topping/toppings/' + catgId).then((res) => {
      console.log(res.data);
      this.setState({
        categoryClicked: catgId,
        toppingsForCategory: res.data,
      });
    });
  };
  backClickHandler = () => {
    this.setState({ categoryClicked: null });
  };
  render() {
    let controls = null;
    if (this.state.toppingsForCategory !== null)
      controls = this.state.toppingsForCategory.map((topping) => {
        return (
          <BuildControl
            key={topping.toppingId}
            title={topping.toppingName}
            addClicked={() =>
              this.props.addTopping(
                topping.toppingId,
                this.state.categoryClicked
              )
            }
            removeClicked={() =>
              this.props.removeTopping(
                topping.toppingId,
                this.state.categoryClicked
              )
            }
          />
        );
      });

    return (
      <div className={classes.BuildControls}>
        {this.state.categoryClicked ? (
          <button
            onClick={this.backClickHandler}
            style={{ color: 'black', cursor: 'pointer' }}
          >
            <i className='fa fa-arrow-right'></i>
          </button>
        ) : null}
        {!this.state.categoryClicked
          ? this.props.toppingsCatgs.map((catg) => {
              return (
                <ToppingsButton
                  key={catg.categoryId}
                  title={catg.categoryName}
                  clicked={() => this.categoryClickedHandler(catg.categoryId)}
                />
              );
            })
          : controls}
        {!this.state.categoryClicked ? (
          <div>
            <div
              onClick={this.props.openPref}
              style={{
                width: '100px',
                height: '50px',
                backgroundColor: 'aliceblue',
                margin: '1rem',
                cursor: 'pointer',
              }}
            >
              בחר גודל
            </div>
          </div>
        ) : null}

        <a className={classes.FinishButton} onClick={this.props.openSummary}>
          סיום
        </a>
      </div>
    );
  }
}

export default BuildControls;
