// import axios from 'axios';
import { Component } from 'react';
import { fetchMoviesWithQuery } from 'services/api';
import { Paragraph } from './ImageGallery.styled';
import ImageList from '../ImageList';
import Loader from '../Loader';
import Button from '../Button';

class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    loading: false,
    searchValue: '',
    error: null,
    status: 'idle',
  };

  async componentDidUpdate(prevProps, prevState) {
    const nextSearchValue = this.props.searchValue;

    if (prevProps.searchValue !== nextSearchValue)
      this.setState({ images: [] });

    if (
      prevProps.searchValue !== nextSearchValue ||
      prevState.page !== this.state.page
    ) {
      this.setState({ searchValue: nextSearchValue, loading: true });
      const { page } = this.state;

      try {
        const fetchImages = await fetchMoviesWithQuery(nextSearchValue, page);
        this.setState(({ images }) => ({
          images: [...images, ...fetchImages],
          status: 'resolved',
          loading: false,
        }));

        if (fetchImages.length === 0) {
          this.setState({ status: 'rejected' });
        }
      } catch (error) {
        this.setState({ error });
      }
    }
  }

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onOpenModal = e => {
    console.log('e.target', e.target);
  };

  render() {
    const { images, status, loading } = this.state;
    if (status === 'idle') {
      return <Paragraph>Enter a request</Paragraph>;
    }

    if (status === 'rejected') {
      return (
        <Paragraph color={'red'}>Error request. Try again please 😊</Paragraph>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <ImageList images={images} onOpenModal={this.onOpenModal} />
          {loading ? <Loader /> : <Button onLoadMore={this.onLoadMore} />}
        </>
      );
    }

    return null;
  }
}

export default ImageGallery;
