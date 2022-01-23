import React, { Component } from "react";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiServices } from "../../services/api";
import { Searchbar } from "../Searchbar/Searchbar";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";
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
    return this.setState({ searchQuery, page: 1, imageCards: [] });
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
      if (data.hits.length === 0) {
        toast.warn("Nothing found with your search query");
        this.setState({ isLoading: false, totalPages: null });

        return;
      }

      this.setState((prevState) => ({
        imageCards: [...prevState.imageCards, ...data.hits],
        totalPages: Math.ceil(data.totalHits / 12),
        page: prevState.page + 1,
      }));
      console.log(this.state.largeImage);
    } catch (error) {
      console.log(error);
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  setModalImage = (imageLink) => {
    return this.setState((prevState) => ({ largeImage: imageLink }));
  };
  openLargeImage = (imageLink) => {
    this.setModalImage(imageLink);
    this.toggleModal();
  };

  handleOnClick = () => {
    this.fetchImages();
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };
  render() {
    const {
      imageCards,
      totalPages,
      isLoading,
      error,
      page,
      showModal,
      largeImage,
    } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.handleFofmSubmit} />
        {totalPages > 0 && !error && (
          <>
            <ImageGallery
              imageCards={imageCards}
              onClick={this.toggleModal}
              modalOpen={this.openLargeImage}
            />
            {totalPages > 1 && totalPages !== page - 1 && (
              <Button onClick={this.handleOnClick} />
            )}
          </>
        )}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImage} alt="largeImage" />
          </Modal>
        )}
        <ToastContainer limit={3} autoClose={2000} transition={Zoom} />
      </Container>
    );
  }
}

export default App;
