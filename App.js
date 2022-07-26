// import logo from "./logo.svg";
import "./App.css";
import React from "react";
import ListItem from "./ListItem";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

library.add(faTrash);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentItem: {
        text: "",
        key: "",
      },
    };
    this.handleInput = this.handleInput.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
  }
  handleInput(e) {
    this.setState({
      // set state is used in the case we can not update the state directly
      currentItem: {
        text: e.target.value,
        key: Date.now(),
      },
    });
  }
  addItem(e) {
    e.preventDefault();
    const newItem = this.state.currentItem;
    console.log(newItem);
    if (newItem.text !== "") {
      const newItems = [...this.state.items, newItem];
      console.log(newItems);
      this.setState({
        items: newItems,
        currentItem: {
          text: "",
          key: "",
        },
      });
    }
  }
  deleteItem(key) {
    const filteredItems = this.state.items.filter((item) => item.key !== key);
    this.setState({
      items: filteredItems,
    });
  }
  setUpdate(text, key) {
    const items = this.state.items;
    const updatedItems = items.map((item) => {
      if (item.key === key) {
        item.text = text;
        return item;
      }
      return item;
    });
    this.setState({
      items: updatedItems,
    });
  }
  render() {
    return (
      <div className="App">
        <header>
          <form id="to-do-form" onSubmit={this.addItem}>
            <input
              type="text"
              placeholder="Enter text"
              value={this.state.currentItem.text}
              defaultValue={""}
              onChange={this.handleInput}
            />

            <button type="submit">Add</button>
          </form>
          <ListItem
            items={this.state.items}
            deleteItem={this.deleteItem}
            setUpdate={this.setUpdate}
          />
        </header>
      </div>
    );
  }
}
export default App;
