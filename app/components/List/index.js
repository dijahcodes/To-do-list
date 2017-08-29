/*
 *
 * Home
 *
 */

import React from 'react';

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

// Enabling the use of the enter key instead of clicking
  enterKey = (event) => {
    var key = event.keyCode;

    if (key === 13) {
      this.storeItem();
    }
  }
// Function to clear the To-do List
  deleteList = () => {

    var listItems = this.state.listItems;

    var inputItem = this.state.inputItem;

    this.setState({
      listItems: [],
      inputItem: []
    })
  }

  // Function  to get all of the tasks saved on the Back-end

  getTasks = () => {
    fetch('http://localhost:8000/api/getTasks', {
      method: 'GET'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      this.setState({
        listItems:json.tasks
      })
    }.bind(this))
  };

  storeTask = () => {
    let data = new FormData();
    data.append('taskContent', this.state.inputItem);

    fetch('http://localhost:8000/api/storeTask', {
      method: 'POST',
      body:data
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      let listItems = this.state.listItems;
      listItems.push(json.task);
      this.setState({
        listItems:listItems
      })
      this.forceUpdate();
    }.bind(this))
  };

  componentWillMount() {
    this.getTasks();
  }

  render() {
    return (
      <div className="container">
        <div className="inputContainer">
            <h1> Manage your tasks!</h1>
              <input type="text" className="todoInput" onChange={this.handleItem} value={this.state.inputItem} onKeyDown={this.enterKey} placeholder="What do you need to do?"/>
        <div className="btn">

          <input type="submit" value="Add to List" className="todoButton" onClick={this.storeTask}/>
          <input type="submit" value="Delete All" className="deleteAll" onClick={this.deleteList} />

        </div>

        </div>
          <div className="todoList">
          {this.state.listItems.map((item, index) => (
            <div className="listItem" key={index} onClick={this.strikeItem}>
              {item.taskContent}

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
