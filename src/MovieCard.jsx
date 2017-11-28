import React, { Component } from 'react'
import "./MovieCard.css";
import { Card, Icon, Image, Modal, Header, Button } from 'semantic-ui-react'


export default class MovieCard extends Component {
    showMovie = () => {
        const movie = this.props.movie
        this.setState({
            open: true
        })
    }

    constructor(props) {
        super(props)
        this.state = {
            movie: null,
            open: false
        }
    }

    componentDidMount() {
        this.setState({
            movie: this.props.movie

        })
    }

    handleClosePopup() {
        this.setState({
            open: false
        })
    }



    render() {
        const { movie } = this.props;
        const imagePrefix = "https://image.tmdb.org/t/p/w500";
        var dateFormat = require('dateformat');

        var text_truncate = function (str, length, ending) {
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
                <Modal dimmer='blurring' open={this.state.open} onClose={this.handleClosePopup.bind(this)}>
                    <Modal.Content image>
                        <Image size='large' src={imagePrefix.concat(movie.poster_path)} />
                        <Modal.Description>
                            <Header>{movie.title}</Header>
                            Overview: <p>{movie.overview}</p>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            </Card>
        )
    }
}
