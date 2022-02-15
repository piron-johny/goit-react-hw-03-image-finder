import { Header } from './SearchBar.styled';
import Form from '../Form';

const SearchBar = ({fetchValue}) => {
  return (
    <Header>
      <Form fetchValue={fetchValue}/>
    </Header>
  );
};

export default SearchBar;
