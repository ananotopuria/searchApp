// import { Component } from 'react';

// interface SearchProps {
//   onSearch: (term: string) => void;
// }

// interface SearchState {
//   searchTerm: string;
// }

// class Search extends Component<SearchProps, SearchState> {
//   constructor(props: SearchProps) {
//     super(props);
//     const savedTerm = localStorage.getItem('searchTerm') || '';
//     this.state = { searchTerm: savedTerm };
//   }

//   handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     this.setState({ searchTerm: event.target.value });
//   };

//   handleSearch = () => {
//     const trimmedSearch = this.state.searchTerm.trim();
//     this.props.onSearch(trimmedSearch);
//     localStorage.setItem('searchTerm', trimmedSearch);
//   };

//   render() {
//     return (
//       <div>
//         <input
//           type="text"
//           value={this.state.searchTerm}
//           onChange={this.handleInputChange}
//         />
//         <button onClick={this.handleSearch}>Search</button>
//       </div>
//     );
//   }
// }

// export default Search;

import { Component } from 'react';

interface SearchProps {
  onSearch: (term: string) => void;
}

interface SearchState {
  searchTerm: string;
}

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    const savedTerm = localStorage.getItem('searchTerm') || '';
    this.state = { searchTerm: savedTerm };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = () => {
    const trimmedSearch = this.state.searchTerm.trim();
    this.props.onSearch(trimmedSearch);
    localStorage.setItem('searchTerm', trimmedSearch);
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

export default Search;
