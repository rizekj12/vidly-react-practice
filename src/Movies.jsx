import React, { Component } from "react";
import { getMovies } from "./services/fakeMovieService";
import { getGenres } from "./services/fakeGenreService";
import Like from "./common/Like";
import ListGroup from "./common/ListGroup";
import Pagination from "./common/Pagination";
import { paginate } from "./utils/paginate";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
  };

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({
      movies,
    });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;

    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {};

  render() {
    const { length: moviesCount } = this.state.movies;
    const { pageSize, currentPage, movies: allMovies } = this.state;

    if (moviesCount === 0) {
      return <p>There are no movies in the database</p>;
    }

    const movies = paginate(allMovies, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={this.state.genres}
            textPropery="name"
            valuePropery="_id"
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>there are {moviesCount} movies in the database</p>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genere</th>
                <th>Stock</th>
                <th>Rate</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    {" "}
                    <Like
                      liked={movie.liked}
                      onClick={() => this.handleLike(movie)}
                    />{" "}
                  </td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(movie)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            itemsCount={moviesCount}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
