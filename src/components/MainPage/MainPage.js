import React, { Component } from 'react';
import Categories from './Categories/Categories';
import axios from '../../axios';
import classes from './MainPage.module.css';

export class MainPage extends Component {
  state = {
    categories: [],
  };
  componentDidMount() {
    axios
      .get('category/categories')
      .then((res) => {
        this.setState({ categories: res.data });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className={classes.MainPage}>
        <Categories categories={this.state.categories} />
      </div>
    );
  }
}

export default MainPage;
