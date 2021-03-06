import React, {Component} from 'react';
import HeroImage from '../elements/HeroImage/HeroImage';
import SearchBar from '../elements/SearchBar/SearchBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import Spinner from '../elements/Spinner/Spinner';
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn';
import MovieThumb from '../elements/MovieThumb/MovieThumb'
import {API_KEY, API_URL, BACKDROP_SIZE, IMAGE_BASE_URL, POSTER_SIZE} from '../../config'
import './Home.css'

class Home extends Component {
    state = {
        movies: [],
        heroImage: null,
        loading: false,
        currentPage: 0,
        totalPages: 0,
        searchTerm: '',
    };

    componentDidMount() {
        this.setState({
            loading: true
        });
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        this.fetchItems(endpoint);
    }

    searchItems = (searchTerm) => {
        console.log(searchTerm);
        let endpoint = '';
        this.setState({
            movies: [],
            loading: true,
            searchTerm
        });
        if (searchTerm === '') {
            endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        } else {
            endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&&query=${searchTerm}`;
        }
        this.fetchItems(endpoint)
    };

    loadMoreItems = () => {
        let endPoint = '';
        this.setState({
            loading: true
        });
        if (this.state.searchTerm === '') {
            endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-us&page=${this.state.currentPage + 1}`;
        } else {
            endPoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-us&query=${this.state.searchTerm}&page=${this.state.currentPage + 1}`;
        }
        this.fetchItems(endPoint);
    };

    fetchItems = (endpoint) => {
        fetch(endpoint)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    movies: [...this.state.movies, ...res.results],
                    heroImage: this.state.heroImage || res.results[0],
                    loading: false,
                    currentPage: res.page,
                    totalPages: res.total_pages
                });
                console.log(res)
            })
    };

    render() {
        return (
            <div className="rmdb-home">
                {this.state.heroImage ?
                    <div>
                        <HeroImage
                            image={`${IMAGE_BASE_URL}/${BACKDROP_SIZE}${this.state.heroImage.backdrop_path}`}
                            title={this.state.heroImage.original_title}
                            text={this.state.heroImage.overview}/>
                        <SearchBar callback={this.searchItems}/>
                    </div> : null}
                <div className="rmdb-home-grid">
                    <FourColGrid
                        header={this.state.searchTerm ? 'Search Result' : 'Popular movies'}
                        loading={this.state.loading}>
                        {this.state.movies.map((element, i) => {
                            return <MovieThumb
                                key={i}
                                clickable={true}
                                image={element.poster_path ? `${IMAGE_BASE_URL}/${POSTER_SIZE}${element.poster_path}` : null}
                                movieId={element.id}
                                movieName={element.original_title}/>
                        })}
                    </FourColGrid>
                    {this.state.loading ? <Spinner/> : null}
                    {(this.state.currentPage <= this.state.totalPages && !this.state.loading) ?
                        <LoadMoreBtn text="Load More" onClick={this.loadMoreItems}/>
                        : null}
                </div>
            </div>
        )
    }
}

export default Home