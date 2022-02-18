// import axios from 'axios';
import { Component } from 'react';
import { fetchMoviesWithQuery } from 'services/api';
import { Paragraph } from './ImageGallery.styled';
import Modal from '../Modal';
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
    objectOfModal: {},
    isModal: false,
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
    const idImage = e.target.parentNode.id;
    const objectOfModal = this.state.images.find(
      image => image.id === +idImage
    );
    this.setState({ isModal: true, objectOfModal });
  };

  onCloseModal = () => {
    this.setState({ isModal: false });

  }

  render() {
    const { images, status, loading, objectOfModal, isModal } = this.state;
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
          <Modal modalObject={objectOfModal} isModal={isModal} onCloseModal={this.onCloseModal}/>
          <ImageList images={images} onOpenModal={this.onOpenModal} />
          {loading ? <Loader /> : <Button onLoadMore={this.onLoadMore} />}
        </>
      );
    }

    return null;
  }
}

export default ImageGallery;
