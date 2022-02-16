// import axios from 'axios';
import { Component } from 'react';
import { StyledImageGallery, Image, GalleryItem } from './ImageGallery.styled';
import { fetchMoviesWithQuery } from 'services/api';
import Loader from '../Loader';
import Button from '../Button';

class ImageGallery extends Component {
  state = {
    images: [],
    // loading: false,
    searchValue: '',
    error: null,
    status: 'idle',
  };

  async componentDidUpdate(_, prevProps) {
    const prevSearchValue = prevProps.searchValue;
    const nextSearchValue = this.props.searchValue;

    if (prevSearchValue !== nextSearchValue) {
      this.setState({ searchValue: nextSearchValue, status: 'pending' });
      // this.setState({ loading: true });
      try {
        const images = await fetchMoviesWithQuery(nextSearchValue);
        this.setState({ images, status: 'resolved' });
        // this.setState({ images, loading: false });

        if (images.length === 0) {
          this.setState({ status: 'rejected' });
        }
      } catch (error) {
        this.setState({ error });
      }
    }
  }

  render() {
    const { images, status, loading } = this.state;
    if (status === 'idle') {
      return <p>Enter a request</p>;
    }

    if (status === 'rejected') {
      return <p>Error request</p>;
    }

    if (status === 'resolved') {
      return (
        <>
          <StyledImageGallery>
            {images.map(({ id, webformatURL, tags }) => (
              <GalleryItem key={id}>
                <Image src={webformatURL} alt={tags} />
              </GalleryItem>
            ))}
          </StyledImageGallery>
          <Button />
          {/* {status === 'pending' && <Loader />} */}
        </>
      );
    }

    if (status === 'pending') {
      return <Loader />;
    }
    return null;
  }
}

export default ImageGallery;
