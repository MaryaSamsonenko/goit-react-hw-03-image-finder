import React, { Component } from "react";
import { Searchbar } from "../Searchbar/Searchbar";

export class App extends Component {
  state = {
    imageCards: [],
  };
  onSubmit() {}
  render() {
    return <Searchbar onSubmit={this.onSubmit} />;
  }
}

export default App;
