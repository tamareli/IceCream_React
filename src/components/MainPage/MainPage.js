import React, { Component } from 'react';
import Categories from './Categories/Categories';

export class MainPage extends Component {
  render() {
    return (
      <div>
        <h1>ראשי/בית</h1>
        <Categories />
      </div>
    );
  }
}

export default MainPage;
