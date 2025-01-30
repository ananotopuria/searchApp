import { Component } from 'react';
import ErrorBoundary from './ErrorBoundary';
import Header from './components/Header';
import Main from './components/MainComponent';

interface AppState {
  searchTerm: string;
}

class App extends Component<Record<string, never>, AppState> {
  state: AppState = {
    searchTerm: localStorage.getItem('searchTerm') ?? '',
  };

  constructor(props: Record<string, never>) {
    super(props);
  }

  handleSearch = (term: string) => {
    localStorage.setItem('searchTerm', term);
    this.setState({ searchTerm: term });
  };

  render() {
    return (
      <ErrorBoundary>
        <Header onSearch={this.handleSearch} /> {/* Ensure Header passes this */}
        <Main searchTerm={this.state.searchTerm} />
      </ErrorBoundary>
    );
  }
}

export default App;
