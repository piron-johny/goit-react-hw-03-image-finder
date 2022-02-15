import { Component } from 'react';
import { StyledForm, Button, Span, Input } from './Form.styled';

class Form extends Component {
  state = {
    search: '',
  };

  onHandleInput = e => {
    const value = e.target.value;
    this.setState({ search: value });
  };

  onHandleSubmit = e => {
    e.preventDefault();
  };

  reset = () => {
    this.setState({ seatch: '' });
  };

  render() {
    const inputValue = this.state.search;
    return (
      <StyledForm>
        <Input
          onChange={this.onHandleInput}
          value={inputValue}
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <Button type="submit" onSubmit={this.onHandleSubmit}>
          <Span>Search</Span>
        </Button>
      </StyledForm>
    );
  }
}

export default Form;
