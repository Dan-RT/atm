import * as React from 'react';
import { List as MuiList, ListItem } from 'material-ui/List';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { API_URL } from '../App';

class List extends React.Component {
  state = {
    movies: [],
  };

  fetchMovies = (city = null) => {
    let url = `${API_URL}/movies`;
    if (city) {
      url += `?city=${city}`;
    }
    fetch(url)
    .then(response => {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      return response.json();
    }).then(data => {
      this.setState({
        movies: data,
      });
    });
  };

  componentWillMount() {
    this.fetchMovies();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.parameters.city !== this.props.parameters.city) {
      this.fetchMovies(nextProps.parameters.city);
    }
  }

  changeCity = (event, index, city) => {
    if (city === 'all') {
      this.props.changeRoute('list')();
      return;
    }

    this.props.changeRoute('list', {city})();
  }

  render() {
    return (
      <div>
        <h2>
          {this.props.parameters.city
            ? `All movies in ${this.props.parameters.city}`
            : 'All movies'
          }
        </h2>

        <SelectField
          floatingLabelText="City"
          value={this.props.parameters.city || 'all'}
          onChange={this.changeCity}
        >
          <MenuItem value="all" primaryText="All" />
          <MenuItem value="Paris" primaryText="Paris" />
          <MenuItem value="Lyon" primaryText="Lyon" />
          <MenuItem value="Nantes" primaryText="Nantes" />
          <MenuItem value="Lille" primaryText="Lille" />
          <MenuItem value="Villejuif" primaryText="Villejuif" />
        </SelectField>

        <MuiList>
        {this.state.movies.map(movie => (
          <ListItem
            key={`movie-${movie.id}`}
            onClick={this.props.changeRoute('show', {id: movie.id})}
          >
            {movie.title}
          </ListItem>
        ))}
        </MuiList>
      </div>
    )
  }
}

export default List;
