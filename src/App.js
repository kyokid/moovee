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
  Search,
} from 'semantic-ui-react';

const api_key = '4d88b953b70c08814373723637099542'
const defaultUrl = `https://api.themoviedb.org/3`

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      loading: true,
      page: 1,
      errorMessage: '',
      isSearching: false,
      keyword: ''
    }
  }

  //https://api.themoviedb.org/3/movie/now_playing?api_key=4d88b953b70c08814373723637099542

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }


  async fetchMovie(page) {
    const url = `${defaultUrl}/movie/now_playing?api_key=${api_key}&page=${page}&include_adult=false`;
    const results = await fetch(url);
    this.setState({
      loading: true,
    })
    const data = await results.json();
    // await this.sleep(3000);
    return data.results;
  }

  async searchMovie(page) {
    const url = `${defaultUrl}/search/movie?api_key=${api_key}&query=${this.state.keyword}&page=${page}&include_adult=false`;
    const results = await fetch(url);
    this.setState({
      isSearching: true,
    })
    const data = await results.json();
    // await this.sleep(3000);
    return data.results;
  }

  async componentDidMount() {
    await this.fetchMovie(this.state.page).then((res) => {
    
      this.setState({
        movies: res,
        loading: false
      })
    }).catch(error => {
      this.setState({
        errorMessage: 'no internet connection',
        loading: false
      })
    });
  }

  async handleLoadMore() {
    const page = this.state.page + 1
    await this.fetchMovie(page).then((newMovies) => {
      this.setState({
        page,
        movies: this.state.movies.concat(newMovies),
        loading: false
      });
    })
  }

  async refreshListMovie() {
    await this.fetchMovie(1).then((movies) => {
      this.setState({
        movies,
        loading: false
      })
    })
  }

  renderExampleIndeterminate() {
    return (
      <div>
        <Loader className="center-loading" active inline='centered'>mooving...</Loader>
      </div>
    )
  }

  handleSearchChange = (e, { value }) => {
    setTimeout(() => {
    this.setState({ isSearching: true, keyword: value }, () => {
      this.searchMovie(1).then(movies => {
        this.setState({
          movies,
          isSearching: false
        })
      })
    })
  }, 500)
    

    // setTimeout(() => {
    //   if (this.state.value.length < 1) return this.resetComponent()

    //   const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
    //   const isMatch = result => re.test(result.title)

    //   this.setState({
    //     isLoading: false,
    //     results: _.filter(source, isMatch),
    //   })
    // }, 500)
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
          <Menu.Item as='' active>Home</Menu.Item>
          <Menu.Item as=''>Playing now</Menu.Item>
          <Menu.Item as=''>Top rated</Menu.Item>
          <Menu.Item position='right'>
            <Search loading={this.state.isSearching}
              onSearchChange={this.handleSearchChange.bind(this)}
              value={this.state.keyword}
            />
            <Button onClick={this.refreshListMovie.bind(this)}>Refresh</Button>
          </Menu.Item>
        </Container>

      </Menu>
    )

    return (
      <Container>
        <FixedMenu />
        {this.state.errorMessage ? alert(this.state.errorMessage) : ''}
        <Container style={{ marginTop: 5 + 'em' }}>
          {content}
        </Container>



      </Container>
    );
  }


}

export default App;
