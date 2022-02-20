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
    largeImg: '',
    isModal: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const nextSearchValue = this.props.searchValue;

    if (
      prevProps.searchValue !== nextSearchValue ||
      prevState.page !== this.state.page // ИЗ-ЗА ТОГО, ЧТО ТУТ УСЛОВИЕ ОБНОВЛЕНИЯ PAGE. НЕ ЗНАЮ КАК СКИНУТЬ ПРИ САБМИТЕ
    ) {
      if (prevProps.searchValue !== nextSearchValue) {
        this.setState({ images: [], page: 1 }); // ПРОБЛЕМА В ОБНУДЕНИИ PAGE. ПРИ ДРУГОМ ЗАПРОСЕ ОТОБРАЖАЕТСЯ ПЕРВАЯ И ТЕКУЩАЯЯ СТРАНИЦА
      }

      this.setState({ searchValue: nextSearchValue, loading: true });
      const { page } = this.state;

      try {
        const fetchImages = await fetchMoviesWithQuery(nextSearchValue, page);
        this.setState(({ images }) => ({
          images: page > 1 ? [...images, ...fetchImages] : fetchImages,
          loading: false,
        }));

        if (this.state.page > 1) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      } catch (error) {
        this.setState({ error: error.response.error });
      }
    }
  }

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onOpenModal = e => {
    const { source } = e.target.dataset;
    this.setState({ largeImg: source, isModal: true });
  };

  onCloseModal = () => {
    this.setState({ isModal: false, largeImg: '' });
  };

  // --------------------------------render------------------------

  render() {
    const { images, loading, isModal, largeImg } = this.state;

    if (!!images.length) {
      return (
        <>
          <Modal
            isModal={isModal}
            onCloseModal={this.onCloseModal}
            largeImg={largeImg}
          />

          <ImageList images={images} onOpenModal={this.onOpenModal} />

          {loading ? <Loader /> : <Button onLoadMore={this.onLoadMore} />}
        </>
      );
    }

    return null;
  }
}

export default ImageGallery;
