import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import MoviesIcon from 'material-ui/svg-icons/av/movie';
import FlatButton from 'material-ui/FlatButton';

const Header = (props) => {
  const logged = localStorage.getItem('token') !== null;

  return (
    <AppBar
      title="CinemAPI"
      iconElementLeft={
        <IconButton onClick={props.changeRoute('list')}>
          <MoviesIcon />
        </IconButton>
      }
      iconElementRight={
        logged
          ? <FlatButton
            onClick={props.changeRoute('create')}
            label="Add a movie"
          />
          : <FlatButton
            onClick={props.changeRoute('login')}
            label="Connexion"
          />
      }
    />
  );
}

export default Header;
