import React, { Component } from "react";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiServices } from "../../services/api";
import { Searchbar } from "../Searchbar/Searchbar";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { Button } from "../Button/Button";
import { Container } from "./App.styled";

export class App extends Component {
  state = {
    searchQuery: "",
    page: 1,
    imageCards: [],
    isLoading: false,
    showModal: false,
    largeImage: "",
    error: null,
    totalPages: null,
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

    try {
      this.setState({ isLoading: true });
      const data = await apiServices({ searchQuery, page });
      if (data.length === 0) {
        toast.warn("Nothing found with your search query");
        this.setState({ isLoading: false, totalPages: null });
        console.log(data);
        return;
      }
      console.log(data);
      this.setState((prevState) => ({
        imageCards: [...prevState.imageCards, ...data.hits],
        totalPages: Math.ceil(data.totalHits / 12),
        page: prevState.page + 1,
      }));
    } catch (error) {
      console.log(error);
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleOnClick = () => {
    this.fetchImages();
  };
  render() {
    const { imageCards, totalPages, isLoading, error, page } = this.state;
    console.log(page, "page");
    console.log(totalPages, "totalPages");
    return (
      <Container>
        <Searchbar onSubmit={this.handleFofmSubmit} />
        <ImageGallery imageCards={imageCards} />
        {totalPages > 1 && totalPages !== page - 1 && (
          <Button onClick={this.handleOnClick} />
        )}

        <ToastContainer
          theme="dark"
          position="top-center"
          limit={3}
          autoClose={2000}
          transition={Zoom}
        />
      </Container>
    );
  }
}

export default App;
