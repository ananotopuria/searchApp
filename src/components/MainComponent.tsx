import { Component } from 'react';
import axios from 'axios';
import CardList from './CardList';

interface MainProps {
  searchTerm: string;
}

interface MainState {
  results: { name: string }[];
  isLoading: boolean;
  error: string | null;
}

class Main extends Component<MainProps, MainState> {
  constructor(props: MainProps) {
    super(props);
    this.state = {
      results: [],
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps: MainProps) {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    this.setState({ isLoading: true, error: null });

    try {
      const response = await axios.get<{ results: Array<{ name: string }> }>(
        'https://pokeapi.co/api/v2/pokemon?limit=10',
      );

      this.setState({ results: response.data.results, isLoading: false });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch data.';
      console.error('API Request Failed:', error);
      this.setState({ error: errorMessage, isLoading: false });
    }
  };

  render() {
    const { results, isLoading, error } = this.state;
    const { searchTerm } = this.props;

    const filteredResults = searchTerm
      ? results.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      : results;

    return (
      <main>
        <h2>Search Term: {searchTerm}</h2>
        {isLoading && <div className="loader">Loading...</div>}
        {error && <p className="error">{error}</p>}
        <CardList items={filteredResults} />
      </main>
    );
  }
}

export default Main;
