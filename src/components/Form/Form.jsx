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

    this.props.fetchValue(this.state.search)

    this.reset();
  };

  reset = () => {
    this.setState({ search: '' });
  };

  render() {
    const { search } = this.state;
    return (
      <StyledForm onSubmit={this.onHandleSubmit}>
        <Input
          onChange={this.onHandleInput}
          value={search}
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <Button type="submit">
          <Span>Search</Span>
        </Button>
      </StyledForm>
    );
  }
}

export default Form;
