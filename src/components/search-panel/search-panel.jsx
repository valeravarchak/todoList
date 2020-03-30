import React, { Component } from 'react';

class SearchPanel extends Component {

    state = {
        term: ''
    }; 
    onSearchChange = (e) => {
        const term = e.target.value;
        this.setState({ term });
        this.props.onSearchChange(term)
    }

    render() {
        return (
            <input type="text"
            className="form-control search-input"
            placeholder="type to search" 
            value={this.state.term}
            onChange={this.onSearchChange}/>
        );
    }
}

export default SearchPanel;