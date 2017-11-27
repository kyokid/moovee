import React, { Component } from 'react'
import MovieCard from './MovieCard';
import { Button } from 'semantic-ui-react'

class MovieList extends Component {
    render() {
        const { movies, handleLoadMoreClick } = this.props;
        if (!movies) return null;
        return (
            <div className="ui cards">
                { movies.map(movie => <MovieCard movie={movie} />) }
                <Button fluid primary onClick={(e) => handleLoadMoreClick(e)}> Load more </Button>
            </div>
        )
    }
}

export default MovieList;
