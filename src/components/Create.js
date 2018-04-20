import * as React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import { API_URL } from '../App';

class Create extends React.Component {
  state = {
    title: null,
    duration: null,
    language: 'fr-FR',
    subtitles: null,
    director: null,
    mainActors: [],
    minAge: null,
    city: 'paris',
    startAt: null,
    endAt: null,
    sessions: [{day: 'Monday'}, {day: 'Monday'}, {day: 'Monday'}],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const movie = {...this.state};
    const token = localStorage.getItem('token');
    fetch(`${API_URL}/movies`, {
      method: 'post',
      body: JSON.stringify(movie),
      headers: new Headers({
    		'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    	})
    }).then(response => {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      return response.text();
    }).then(data => {
      this.props.changeRoute('show', {id: data})();
    });
  };

  render() {
    const logged = localStorage.getItem('token') !== null;

    if (!logged) {
      return <p>You must be connected to add a movie ;)</p>;
    }

    return (
      <div>
        <h2>Add a movie</h2>
        <form onSubmit={this.handleSubmit}>
          <h3>Informations</h3>
          <TextField
            required={true}
            type="text"
            onChange={(e) => {this.setState({title: e.target.value})}}
            floatingLabelText="Title"
            floatingLabelFixed={true}
          />
          <br/>
          <TextField
            onChange={(e) => {this.setState({duration: parseInt(e.target.value, 10)})}}
            required={true}
            type="number"
            floatingLabelText="Length (in minutes)"
            floatingLabelFixed={true}
          />
          <br/>
          <SelectField
            floatingLabelText="Language"
            floatingLabelFixed={true}
            value={this.state.language}
            required={true}
            onChange={(e, i, language) => {this.setState({language})}}
          >
          <MenuItem value="fr-FR" primaryText="French (France)" />
          <MenuItem value="fr-BE" primaryText="French (Belgique)" />
          <MenuItem value="en-UK" primaryText="English (United-Kingdom)" />
          <MenuItem value="en-US" primaryText="English (United States of America)" />
          <MenuItem value="es-ES" primaryText="Spanish (Spain)" />

          </SelectField>
          <br/>
          <SelectField
            floatingLabelText="Subtitle"
            floatingLabelFixed={true}
            value={this.state.subtitles}
            required={true}
            onChange={(e, i, subtitles) => {this.setState({subtitles})}}
          >
            <MenuItem value={null} />
            <MenuItem value="fr-FR" primaryText="French (France)" />
            <MenuItem value="fr-BE" primaryText="French (Belgique)" />
            <MenuItem value="en-UK" primaryText="English (United-Kingdom)" />
            <MenuItem value="en-US" primaryText="English (United States of America)" />
            <MenuItem value="es-ES" primaryText="Spanish (Spain)" />
          </SelectField>
          <br/>
          <TextField
            required={true}
            onChange={(e) => {this.setState({director: e.target.value})}}
            floatingLabelText="Director"
            floatingLabelFixed={true}
          />
          <br/>
          <TextField
            required={true}
            onChange={(e) => {
              let mainActors = e.target.value.split(',');
              mainActors = mainActors.map(actor => {
                return actor.trim();
              });
              this.setState({mainActors})
            }}
            floatingLabelText="Main actors (use comma to separate)"
            floatingLabelFixed={true}
          />
          <br/>
          <TextField
            onChange={(e) => {this.setState({minAge: parseInt(e.target.value, 10)})}}
            required={true}
            type="number"
            floatingLabelText="Minimum age"
            floatingLabelFixed={true}
          />
          <br/>
          <SelectField
            floatingLabelText="City"
            floatingLabelFixed={true}
            value={this.state.city}
            required={true}
            onChange={(e, i, city) => {this.setState({city})}}
          >
            <MenuItem value={null} />
            <MenuItem value="Paris" primaryText="Paris" />
            <MenuItem value="Lyon" primaryText="Lyon" />
            <MenuItem value="Nantes" primaryText="Nantes" />
            <MenuItem value="Lille" primaryText="Lille" />
            <MenuItem value="Villejuif" primaryText="Villejuif" />

          </SelectField>
          <br/>
          <DatePicker
            name="startAt"
            floatingLabelText="From"
            floatingLabelFixed={true}
            required={true}
            onChange={(e, startAt) => {this.setState({startAt: startAt.toISOString()})}}
          />
          <br/>
          <DatePicker
            name="endAt"
            floatingLabelText="To"
            floatingLabelFixed={true}
            required={true}
            onChange={(e, endAt) => {this.setState({endAt: endAt.toISOString()})}}
          />
          <br/>
          <hr/>
          <h3>Sessions</h3>
          {[0,1,2].map(index => (
            <div key={`session-${index}`}>
              <h4>Session {index +1}</h4>
              <SelectField
                required={true}
                floatingLabelText="Day"
                floatingLabelFixed={true}
                value={this.state.sessions[index].day}
                onChange={(e, i, day) => {
                  const { sessions } = this.state;
                  sessions[index].day = day;
                  this.setState({sessions});
                }}
              >
                <MenuItem value="Monday" primaryText="Monday" />
                <MenuItem value="Tuesday" primaryText="Tuesday" />
                <MenuItem value="Wednesday" primaryText="Wednesday" />
                <MenuItem value="Thursday" primaryText="Thursday" />
                <MenuItem value="Friday" primaryText="Friday" />
                <MenuItem value="Saturday" primaryText="Saturday" />
                <MenuItem value="Sunday" primaryText="Sunday" />
              </SelectField>
              <br/>
              <TimePicker
                format="24hr"
                required={true}
                floatingLabelText="Hour"
                floatingLabelFixed={true}
                onChange={(e, time) => {
                  const { sessions } = this.state;
                  sessions[index].time = `${time.getHours()}:${('0'+time.getMinutes()).slice(-2)}`;
                  this.setState({sessions});
                }}
              />
              <br/>
            </div>
          ))}
          <hr/>
          <RaisedButton
            primary
            label="Submit"
            type="submit"
          />
        </form>
      </div>
    )
  }
};

export default Create;
