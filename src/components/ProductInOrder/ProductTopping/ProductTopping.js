import React from 'react';
import { Component } from 'react';
import classes from '../../../css/ProductTopping.module.css';

class ProductTopping extends Component {
  constructor(props) {
    super(props);
    this.test = React.createRef();
  }

  render() {
    return (
      <img
        ref={this.test}
        src={this.props.toppingImagePath}
        className='hidden'
      ></img>
    );
  }
}

export default ProductTopping;
