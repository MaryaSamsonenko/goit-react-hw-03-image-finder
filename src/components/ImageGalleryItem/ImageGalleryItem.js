import { ImageGalleryItemStyle, Image } from "./ImageGalleryItem.styled";

export const ImageGalleryItem = ({ id, webformatURL, largeImageURL, tags }) => {
  return (
    <ImageGalleryItemStyle className="gallery-item">
      <Image src={webformatURL} alt={tags} />
    </ImageGalleryItemStyle>
  );
};
