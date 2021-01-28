import Select from 'react-select';

import React, { Component } from 'react';

export default class DeliveryTypes extends Component {
  render() {
    return (
      <div style={{ width: '100%', padding: '7px' }}>
        <Select
          onChange={this.props.handleSelectChange}
          options={this.props.delTypes}
          value={this.props.value}
          components={{
            IndicatorSeparator: () => null,
          }}
          className='select'
          styles={{
            control: (provided, state) => ({
              ...provided,
              borderRadius: '15px',
            }),
            menu: (provided, state) => ({
              ...provided,
              borderRadius: '15px',
            }),
            option: (provided, state) => ({
              ...provided,
              borderRadius: '15x',
            }),
          }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary25: '#dff0e1',
              primary: 'var(--green-color)',
            },
          })}
        />
      </div>
    );
  }
}
