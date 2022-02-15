import axios from 'axios';

import { StyledImageGallery, Image, GalleryItem } from './ImageGallery.styled';
import { Component } from 'react';

class ImageGallery extends Component {
  state = {
    images: null,
  };

  async componentDidMount() {
    const value = this.props.searchValue;
    try {
      const data = await axios.get(
        `https://pixabay.com/api/?q=cat&page=1&key=24644022-4984203066fb287d0befab6c3&image_type=photo&orientation=horizontal&per_page=12&q=cat}`
      );
      const images = data.data.hits;
      console.log('dataImages :>> ', images);

      this.setState({ images });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { images } = this.state;
    return (
      <>
        {images && (
          <StyledImageGallery>
            {images.map(({ id, previewURL, tags }) => (
              <GalleryItem key={id}>
                <Image src={previewURL} alt={tags} />
              </GalleryItem>
            ))}
          </StyledImageGallery>
        )}
      </>
    );
  }
}

export default ImageGallery;
