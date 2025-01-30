import { Component } from 'react';
import Search from './Search';

interface HeaderProps {
  onSearch: (term: string) => void;
}

class Header extends Component<HeaderProps> {
  render() {
    return (
      <header className="header">
        <h1>Search App</h1>
        <Search onSearch={this.props.onSearch} /> 
      </header>
    );
  }
}

export default Header;
