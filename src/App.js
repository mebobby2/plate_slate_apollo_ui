import React, { Component } from 'react';
import './App.css';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class App extends Component {
  componentWillMount() {
    this.props.subscribeToNewMenuItems();
  }

  get menuItems() {
    const { data } = this.props;
    if (data && data.menuItems) {
      return data.menuItems;
    } else {
      return []
    }
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

const query = gql`
  { menuItems { id name } }
`;

const subscription = gql`
  subscription {
    newMenuItem { id name }
  }
`;

export default graphql(query, {
  props: props => {
    return Object.assign(props, {
      subscribeToNewMenuItems: params => {
        return props.data.subscribeToMore({
          document: subscription,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) {
              return prev;
            }
            const newMenuItem = subscriptionData.data.newMenuItem;
            return Object.assign({}, prev, {
              menuItems: [newMenuItem, ...prev.menuItems]
            });
          }
        })
      }
    });
  }
})(App);
