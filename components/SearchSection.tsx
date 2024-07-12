import { Component, ChangeEvent } from 'react';
import { CiSearch } from "react-icons/ci";

interface SearchSectionProps {
    onSearch: (newSearchTerm: string) => void;
}

interface SearchSectionState {
    searchTerm: string;
}

class SearchSection extends Component<SearchSectionProps, SearchSectionState> {
    constructor(props: SearchSectionProps) {
        super(props);
        this.state = {
            searchTerm: ''
        };
    }

    componentDidMount() {
        const savedTerm = localStorage.getItem('searchTerm');
        if (savedTerm) {
            this.setState({ searchTerm: savedTerm });
        }
    }

    handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ searchTerm: event.target.value.trim() });
    };

    handleSearch = () => {
        const { searchTerm } = this.state;

        localStorage.setItem('searchTerm', searchTerm);

        this.props.onSearch(searchTerm);
        console.log(searchTerm);
    };

    render() {
        const { searchTerm } = this.state;

        return (
            <div className="search-section">
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Enter search term..."
                        value={searchTerm}
                        onChange={this.handleInputChange}
                    />
                    <span className='h-line'></span>
                    <button className='searchBtn' onClick={this.handleSearch}>
                        <CiSearch />
                    </button>
                </div>
            </div>
        );
    }
}

export default SearchSection;
