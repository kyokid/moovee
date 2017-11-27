import React, { Component } from 'react'
import "./MovieCard.css";
import { Card, Icon, Image } from 'semantic-ui-react'
import { CardContent } from 'bloomer/lib/components/Card/CardContent';


export default class MovieCard extends Component {
    showMovie = () => {
        const movie = this.props.movie
        alert(movie.title)
    }

    constructor(props) {
        super(props)
        this.state = {
            movie: null
        }
    }

    componentDidMount() {
        this.setState({
            movie: this.props.movie
        })
    }

    render() {
        const { movie } = this.props;
        const imagePrefix = "https://image.tmdb.org/t/p/w500";
        var dateFormat = require('dateformat');

        var text_truncate = function(str, length, ending) {
            if (length == null) {
              length = 100;
            }
            if (ending == null) {
              ending = '...';
            }
            if (str.length > length) {
              return str.substring(0, length - ending.length) + ending;
            } else {
              return str;
            }
          };

        return (
            <Card onClick={this.showMovie}>
                <Image src={imagePrefix.concat(movie.poster_path)} />
                <Card.Content>
                    <Card.Header>
                        {movie.title}
                    </Card.Header>
                    <Card.Meta>
                        <span className="date">
                            {dateFormat(movie.release_date, "mmm dd yyyy")}
                        </span>
                    </Card.Meta>
                    <Card.Description className="block-with-text">
                        {text_truncate(movie.overview, 200)}
                    </Card.Description>
                </Card.Content>
            </Card>
        )
    }
}
