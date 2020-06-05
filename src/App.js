import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { render } from '@testing-library/react';

class App extends Component {
  get menuItems() {
    return [
      {id: "stub-1", name: "Stub Menu Item 1"},
      {id: "stub-2", name: "Stub Menu Item 2"},
      {id: "stub-3", name: "Stub Menu Item 3"},
    ]
  }

  renderMenuItem(menuItem) {
    return (
      <li key={menuItem.id}>{menuItem.name}</li>
    )
  }

  render() {
    return (
      <ul>
        {this.menuItems.map(menuItem => this.renderMenuItem(menuItem))}
      </ul>
    )
  }
}

export default App;
