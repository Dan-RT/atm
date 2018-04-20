import * as React from 'react';
import { API_URL } from '../App';

class Show extends React.Component {
  state = {
    movie: null,
  };

  componentWillMount() {
    const url = `${API_URL}/movies/${this.props.parameters.id}`;
    fetch(url)
    .then(response => {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      return response.json();
    }).then(data => {
      this.setState({
        movie: data,
      });
    });
  }

  render() {
    const { movie } = this.state;

    if (!movie) {
      return <p>Unknown movie</p>;
    }

    return (
      <div>
        <h2>{movie.title}</h2>
        <hr/>
        <p><strong>Length :</strong> <span>{movie.duration} minutes</span></p>
        <p><strong>Director :</strong> <span>{movie.director}</span></p>
        <p><strong>Starring :</strong> <span>{movie.mainActors.join(', ')}</span></p>
        <p><strong>Minimum age :</strong> <span>{movie.minAge} ans</span></p>
        <hr/>
        <p><strong>Language :</strong> <span>{movie.language}</span></p>
        {!!movie.subtitles && <p><strong>Subtitle :</strong> <span>{movie.subtitles}</span></p>}
        <p><strong>From :</strong> <span>{movie.startAt}</span></p>
        <p><strong>To :</strong> <span>{movie.endAt}</span></p>
        <p><strong>At :</strong> <span>{movie.city}</span></p>
        <p><strong>Sessions :</strong></p>
        <ul>
          {movie.sessions.map((session, index) => (
            <li key={`session-${index}`}>
              On {session.day} at {session.time}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Show;
