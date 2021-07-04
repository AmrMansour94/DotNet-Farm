import React, { Component } from 'react';
import { Layout } from './components/Layout';
import './custom.css'
import TabBar from './components/NavBar/NavBar';


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <TabBar />
      </Layout>
    );
  }
}
