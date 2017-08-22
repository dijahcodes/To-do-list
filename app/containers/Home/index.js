/*
 *
 * Home
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

export default class Home extends React.PureComponent {

  constructor() {
    super();
    this.state = {
      listItems: [],
      inputItem: ""
    }
  };

  handleItem = (event) => {
    this.setState ({
      inputItem:event.target.value
    })
  }

  storeItem = () =>  {
    var listItems = this.state.listItems;

    var inputItem = this.state.inputItem;

    if (inputItem !== "") {
      listItems.push(inputItem);

      this.setState({
        listItems:listItems,
        inputItem:""
      })
    }
  };

  strikeItem = (event) => {
    var item = event.target;
    item.style.textDecoration = 'line-through'

  }

  enterKey = (event) => {
    var key = event.keyCode;

    if (key === 13) {
      this.storeItem();
    }
  }

  deleteList = () => {

    var listItems = this.state.listItems;

    var inputItem = this.state.inputItem;

    this.setState({
      listItems: [],
      inputItem: []
    })
  }

  render() {
    return (
      <div className="container">
        <Helmet title="Home" meta={[ { name: 'description', content: 'Description of Home' }]}/>

        <div className="inputContainer">
            <h1> Manage your tasks!</h1>
          <input type="text" className="todoInput" onChange={this.handleItem} value={this.state.inputItem} onKeyDown={this.enterKey} placeholder="What do you need to do?"/>
          <input type="submit" value="Add to List" className="todoButton" onClick={this.storeItem}/>
          <input type="submit" value="Delete All" className="deleteAll" onClick={this.deleteList} />
        </div>
          <div className="todoList">
          {this.state.listItems.map((item, index) => (
            <div className="listItem" key={index} onClick={this.strikeItem}>
              {item}

            </div>
          ))}

          </div>

      </div>
    );
  }
}

Home.contextTypes = {
  router: React.PropTypes.object
};
