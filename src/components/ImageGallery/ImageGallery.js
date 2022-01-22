import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import { ImageGalleryStyle } from "./ImageGallery.styled";
export const ImageGallery = ({ imageCards }) => {
  return (
    <ImageGalleryStyle>
      {imageCards.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      ))}
    </ImageGalleryStyle>
  );
};
