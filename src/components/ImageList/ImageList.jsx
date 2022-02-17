import { StyledImageGallery, Image, GalleryItem } from './ImageList.styled';

const ImageList =({images}) => {
  return (
    <StyledImageGallery>
            {images.map(({ id, webformatURL, tags }) => (
              <GalleryItem key={id}>
                <Image src={webformatURL} alt={tags} />
              </GalleryItem>
            ))}
          </StyledImageGallery>
  )
}

export default ImageList