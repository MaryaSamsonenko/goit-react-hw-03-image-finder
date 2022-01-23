import PropTypes from "prop-types";
import { ImageGalleryItemStyle, Image } from "./ImageGalleryItem.styled";

export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  modalOpen,
}) => {
  return (
    <ImageGalleryItemStyle className="gallery-item">
      <Image
        onClick={(event) => {
          modalOpen(event.target.dataset.image);
        }}
        src={webformatURL}
        alt={tags}
        data-image={largeImageURL}
      />
    </ImageGalleryItemStyle>
  );
};
ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  modalOpen: PropTypes.func.isRequired,
};
