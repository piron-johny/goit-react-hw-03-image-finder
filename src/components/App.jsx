import { Component } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';

class App extends Component {
  state = {
    images: [],
  };

  async fetchData(value) {
    try {
      const data = await axios.get(
        `https://pixabay.com/api/?q=cat&page=1&key=24644022-4984203066fb287d0befab6c3&image_type=photo&orientation=horizontal&per_page=12&q=${value}`
      );
      const dataImages = data.data.hits;
      console.log('dataImages :>> ', dataImages);

      this.setState({ images: 132 }); // нужно разобраться !!!!!!!!!!!!!!
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <>
        <SearchBar fetchValue={this.fetchData} />
        <ImageGallery />
      </>
    );
  }
}

export default App;
