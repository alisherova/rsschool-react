import { Component } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import SearchSection from '../components/SearchSection';
import ResultsSection from '../components/ResultsSection';


class App extends Component {
  state = {
    searchTerm: localStorage.getItem('searchTerm') ? localStorage.getItem('searchTerm') : " ",
  };

  handleSearchTermChange = (newSearchTerm: string) => {
    this.setState({ searchTerm: newSearchTerm.trim() });
  };

  render() {
    const { searchTerm } = this.state;
    return (
      <ErrorBoundary>
        <div className="app">
          <SearchSection onSearch={this.handleSearchTermChange} />
          <ResultsSection searchTerm={searchTerm} />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
