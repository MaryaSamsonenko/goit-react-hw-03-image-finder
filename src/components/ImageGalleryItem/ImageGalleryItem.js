import { ImageGalleryItemStyle, Image } from "./ImageGalleryItem.styled";

export const ImageGalleryItem = ({
  id,
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
