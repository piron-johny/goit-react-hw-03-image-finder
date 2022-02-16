// import axios from 'axios';
import { Component } from 'react';
import { StyledImageGallery, Image, GalleryItem } from './ImageGallery.styled';
import {fetchMoviesWithQuery} from 'services/api';

class ImageGallery extends Component {
  state = {
    images: [],
    searchValue: '',
    isLoading: false,
    error: null,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });

    const { searchValue } = this.props;
    this.setState({ searchValue });

    try {
      const { searchValue } = this.state;
      const images = await fetchMoviesWithQuery(searchValue);

      console.log('images :>> ', images);
      this.setState({ images });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  async componentDidUpdate(prevState, prevProps) {
    if (prevState.searchValue !== this.state.searchValue) {
      this.setState({ searchValue: this.props.searchValue });
    }
  }

  render() {
    const { images } = this.state;
    return (
      <>
        {images.length > 0 && (
          <StyledImageGallery>
            {images.map(({ id, webformatURL, tags }) => (
              <GalleryItem key={id}>
                <Image src={webformatURL} alt={tags} />
              </GalleryItem>
            ))}
          </StyledImageGallery>
        )}
      </>
    );
  }
}

export default ImageGallery;
