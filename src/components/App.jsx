import { Component } from 'react';
import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';

class App extends Component {
  state = {
    searchValue: '',
  };

  handleFormSubmit = searchValue => {
    this.setState({ searchValue });
  };

  render() {
    const { searchValue } = this.state;
    return (
      <>
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchValue={searchValue} />
      </>
    );
  }
}

export default App;
