import React, { Component } from "react";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiServices } from "../../services/api";
import { Searchbar } from "../Searchbar/Searchbar";
import { ImageGallery } from "../ImageGallery/ImageGallery";

export class App extends Component {
  state = {
    searchQuery: "",
    page: 1,
    imageCards: [],
    isLoading: false,
    showModal: false,
    largeImage: "",
    error: null,
  };
  handleFofmSubmit = (searchQuery) => {
    return this.setState({ searchQuery });
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.searchQuery;
    const nextName = this.state.searchQuery;

    if (prevName !== nextName) {
      this.fetchImages();
    }
  }
  fetchImages = async () => {
    const { searchQuery, page } = this.state;
    this.setState({ isLoading: true });
    try {
      const hits = await apiServices({ searchQuery, page });
      if (hits.length === 0) {
        toast.warn("Nothing found with your search query");
        this.setState({ isLoading: false });
        return;
      }
      this.setState((prevState) => ({
        imageCards: [...prevState.imageCards, ...hits],
        page: prevState.page + 1,
      }));
    } catch (error) {
      console.log(error);
      this.setState({ error: error.message });
    }
  };
  render() {
    const { imageCards } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFofmSubmit} />
        <ImageGallery imageCards={imageCards} />
        <ToastContainer
          theme="dark"
          position="top-center"
          limit={3}
          autoClose={2000}
          transition={Zoom}
        />
      </>
    );
  }
}

export default App;
