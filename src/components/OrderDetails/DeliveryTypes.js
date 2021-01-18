import Select from 'react-select';

import React, { Component } from 'react';

export default class DeliveryTypes extends Component {
  render() {
    return (
      <div style={{ width: '50%' }}>
        <Select
          placeholder='בחר סוג משלוח'
          onChange={this.props.handleSelectChange}
          options={this.props.delTypes}
        />
      </div>
    );
  }
}
