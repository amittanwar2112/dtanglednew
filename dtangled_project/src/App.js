import React from 'react';
import './App.css';
import { TripsCalendar } from './components/calendar/TripsCalendar'
import {Trips} from './components/trips/Trips'
import { Grid} from "@material-ui/core"
import axios from 'axios';

import HomeIcon from '@material-ui/icons/Home';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';


class App extends React.Component {

  state = {
    trips: []
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
      axios.get(`https://detangled.in/develop/4f659ee8-853d-4890-94f8-75f7d5f33044/events`)
      .then(res => {
      const trips = res.data;
      this.setState({ trips });
    })
  }

  deleteTrip = (tripId) => {
    axios.delete(`http://detangled.in/develop/4f659ee8-853d-4890-94f8-75f7d5f33044/events/${tripId}`)
    .then(res => {
      console.log(res)
      this.getData()
    })
  }

  editTrip = (newTrip) =>{
    axios.put('https://detangled.in/develop/4f659ee8-853d-4890-94f8-75f7d5f33044/events', newTrip)
    .then(function (response) {
      console.log(response);
      this.getData()
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {

    return (
      <div className="App">
        <div >
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start"  color="inherit" aria-label="menu">
                <HomeIcon />
              </IconButton>
              <Typography variant="h6" >
                Trip Calendar
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
        <Grid container className="flex-section">
          <Grid
            item
            xs={6}
            className={"flex-col-scroll"} >
            
            <Trips trips={this.state.trips}
              deleteTripAction={this.deleteTrip}
              editTripAction={this.editTrip} />
            
          </Grid>

          <Grid
            item
            xs={6}
            className={"flex-col-scroll"} >
            <TripsCalendar trips={this.state.trips}/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
