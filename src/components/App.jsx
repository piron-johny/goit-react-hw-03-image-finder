import axios from 'axios';
import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
async function fetchData() {
  try {
    const data = await axios.get(
      'https://pixabay.com/api/?q=cat&page=1&key=24644022-4984203066fb287d0befab6c3&image_type=photo&orientation=horizontal&per_page=12'
    );
    console.log('data :>> ', data.data.hits);
  } catch (error) {
    console.log(error);
  }
}

fetchData();

const App = () => {
  return (
    <>
      <SearchBar/>
      <ImageGallery />
    </>
  );
};

export default App;
