import React, { Component } from 'react';
import './App.css'

import AppHeader from './components/app-header/app-header';
import SearchPanel from './components/search-panel/search-panel';
import TodoList from './components/todo-list/todo-list';
import ItemStatusFilter from './components/item-status/item-status-filter';
import AddItemForm from './components/add-item-form/add-item-form';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
      
    ],
    term: '',
    filter: 'all' //activ, all, done
  };

  createTodoItem (label) {
    return {
      label,
      important:false,
      done: false,
      id: this.maxId++ 
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx +1)
      ];

      return {
        todoData: newArray
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArray = [
        ...todoData,
        newItem
      ];

      return {
        todoData: newArray
      };
    });
  };

  toggleProporty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = { ...oldItem,
       [propName]: !oldItem[propName]};

    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx +1)
    ];

  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {

      return {
        todoData: this.toggleProporty(todoData, id, 'important')
      };

    })
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {

      return {
        todoData: this.toggleProporty(todoData, id, 'done')
      };

    });
  };

  onSearchChange = (term) => {
    this.setState({ term });
  };
  onFilterChange = (filter) => {
    this.setState({ filter });
  };


  search (items, term) {
    if(term.length === 0){
      return items;
    }

    return items.filter((item) => {
      return item.label
            .toLowerCase()
            .indexOf(term.toLowerCase()) > - 1;
    });
  };
  
  filter (items, filter) {
    switch(filter){
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }

  render() { 

    const { todoData, term, filter } = this.state;

    const visibleCount = this.filter(
      this.search(todoData, term), filter);

    const doneCount  = todoData.filter((el) => el.done).length;

    const todoCount = todoData.length - doneCount;
    
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel
          onSearchChange={this.onSearchChange} />
          <ItemStatusFilter 
            filter={filter} 
            onFilterChange= {this.onFilterChange}
          />
        </div>

        <TodoList 
          todos={visibleCount}
          onDeleted={ this.deleteItem }
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <AddItemForm 
          onItemAdded={ this.addItem }/>
      </div>
    );
  }
}