import {
  StyledSearchbar,
  Form,
  Button,
  Label,
  Input,
} from './Searchbar.styled';

const Searchbar = () => {
  return (
    <StyledSearchbar>
      <Form>
        {/* <Label> */}
          <Input placeholder='Search images and photo'/>
        {/* </Label> */}
        <Button />
      </Form>
    </StyledSearchbar>
  );
};

export default Searchbar;
