import React, { Component } from 'react'
import MovieCard from './MovieCard';
import { Button } from 'semantic-ui-react'

export default class MovieList extends Component {
    render() {
        const { movies, handleLoadMoreClick } = this.props;
        return (
            <div className="ui cards">
                { movies.map(movie => <MovieCard movie={movie} />) }
                <Button fluid primary onClick={(e) => handleLoadMoreClick(e)}> Load more </Button>
            </div>
        )
    }
}
