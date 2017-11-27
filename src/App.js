import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MovieList from './MovieList';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Visibility,
  Dimmer,
  Loader,
} from 'semantic-ui-react';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      loading: true,
      page: 1,
      errorMessage: '',
    }
  }

  //https://api.themoviedb.org/3/movie/now_playing?api_key=4d88b953b70c08814373723637099542

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async fetchMovie(page) {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=4d88b953b70c08814373723637099542&page=${page}`;
    const results = await fetch(url);
    this.setState({
      loading: true,
    })
    const data = await results.json();
    await this.sleep(3000);
    return data.results;
  }

  async componentDidMount() {
    await this.fetchMovie(this.state.page).then((res) => {
      // if bi loi {
      //   this.setState({
      //     errorMessage: res.loi 
      //   })
      // }

      this.setState({
        movies: res,
        loading: false
      })
    });
  }

  async handleLoadMore() {
    const page = this.state.page + 1
    await this.fetchMovie(page).then((newMovies) => {
      this.setState({
        page,
        movies: this.state.movies.concat(newMovies)
      });
    })
  }

  renderExampleIndeterminate() {
    return (
      <div>
        <Segment>
          <Loader className="center-loading" active inline='centered'>Preparing Files</Loader>
        </Segment>
      </div>
    )
  }

  render() {
    let content;
    if (this.state.loading) {
      content = this.renderExampleIndeterminate()
    } else {
      content = <MovieList handleLoadMoreClick={(e) => this.handleLoadMore(e)} movies={this.state.movies} />
    }

    const FixedMenu = () => (
      <Menu fixed='top' size='large'>
        <Container>
          <Menu.Item as='a' active>Home</Menu.Item>
          <Menu.Item as='a'>Work</Menu.Item>
          <Menu.Item as='a'>Company</Menu.Item>
          <Menu.Item as='a'>Careers</Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item className='item'>
              <Button as='a'>Log in</Button>
            </Menu.Item>
            <Menu.Item>
              <Button as='a' primary>Sign Up</Button>
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    )

    return (
      <Container>
        <FixedMenu />
        {this.state.errorMessage ? this.state.errorMessage : ''}
        <Container className="ui cards" style={{ marginTop: 5 + 'em' }}>
          {content}
        </Container>
      </Container>
    );
  }
}

export default App;
