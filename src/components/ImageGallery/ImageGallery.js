import PropTypes from "prop-types";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import { ImageGalleryStyle } from "./ImageGallery.styled";

export const ImageGallery = ({ imageCards, modalOpen }) => {
  return (
    <ImageGalleryStyle>
      {imageCards.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
          modalOpen={modalOpen}
        />
      ))}
    </ImageGalleryStyle>
  );
};
ImageGallery.propTypes = {
  modalOpen: PropTypes.func.isRequired,
  imageCards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
};
