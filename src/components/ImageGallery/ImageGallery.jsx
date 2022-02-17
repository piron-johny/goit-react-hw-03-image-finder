// import axios from 'axios';
import { Component } from 'react';
import ImageList from '../ImageList';
import { fetchMoviesWithQuery } from 'services/api';
import Loader from '../Loader';
import Button from '../Button';

class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    searchValue: '',
    error: null,
    status: 'idle',
  };

  async componentDidUpdate(prevState, prevProps) {
    const prevSearchValue = prevProps.searchValue;
    const nextSearchValue = this.props.searchValue;
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    
    if (prevSearchValue !== nextSearchValue ) {
    // if ( prevPage !== nextPage) {
      console.log('prevPage :>> ', prevPage);
      console.log('nextPage :>> ', nextPage);

      this.setState({ searchValue: nextSearchValue, status: 'pending' });
      const { page, searchValue } = this.state;

      try {
        const images = await fetchMoviesWithQuery(searchValue, page);
        this.setState({ images, status: 'resolved' });

        if (images.length === 0) {
          this.setState({ status: 'rejected' });
        }
      } catch (error) {
        this.setState({ error });
      }
    }
  }

  onLoadMore = () => {
    console.log('НАЖАТА КНОПКА');
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  render() {
    const { images, status } = this.state;
    if (status === 'idle') {
      return <p>Enter a request</p>;
    }

    if (status === 'rejected') {
      return <p>Error request</p>;
    }

    if (status === 'resolved') {
      return (
        <>
          <ImageList images={images} />
          <Button onLoadMore={this.onLoadMore} />
        </>
      );
    }

    if (status === 'pending') {
      return <Loader />;
    }

    // return null;
    return <Button onLoadMore={this.onLoadMore} />;
  }
}

export default ImageGallery;
