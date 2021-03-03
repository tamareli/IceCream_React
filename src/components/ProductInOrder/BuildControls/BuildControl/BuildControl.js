import classes from '../../../../css/BuildControl.module.css';
import React from 'react';
import { Component } from 'react';

class BuildControl extends Component {
  state = {
    chosen: false,
  };
  componentDidMount = () => {
    this.setState({ chosen: this.props.chosen });
  };
  toppingClickedHandler = (active) => {
    if (!active) {
      return;
    }
    console.log('clicked');
    let func = null;
    if (this.state.chosen) {
      func = this.props.removeClicked;
    } else {
      func = this.props.addClicked;
    }
    this.setState({ chosen: !this.state.chosen });
    console.log(func, 'func');
    func();
  };
  render() {
    let toppingClasses = [
      classes.Topping,
      'rounded-circle',
      this.state.chosen || this.props.chosen ? classes.Chosen : null,
    ].join(' ');
    if (this.props.active === false) {
      toppingClasses = [
        classes.NotActive,
        classes.Topping,
        'rounded-circle',
      ].join(' ');
    }
    const toppingImage = require(`../../../../assets/images/toppings/${this.props.image}`);
    return (
      <div className={['col-md-4', classes.BuildControl].join(' ')} disabled>
        <div
          className={toppingClasses}
          style={{ backgroundImage: 'url(' + toppingImage + ')' }}
          onClick={() => this.toppingClickedHandler(this.props.active)}
        ></div>
        <h6>{this.props.title}</h6>
      </div>
    );
  }
}

export default BuildControl;
