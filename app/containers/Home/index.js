/*
 *
 * Home
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

import Slider from 'components/Slider';
import List from 'components/List';

export default class Home extends React.PureComponent {


  render() {
    return (
      <div className="container">
        <Helmet title="Home" meta={[ { name: 'description', content: 'Description of Home' }]}/>
          <List/>


      </div>
    );
  }
}

Home.contextTypes = {
  router: React.PropTypes.object
};
