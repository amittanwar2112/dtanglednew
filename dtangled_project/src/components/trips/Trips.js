import React, { Component } from 'react';
import {Trip} from './Trip'
import './Trips.css'


export class Trips extends Component {
    constructor() {
        super()

    }


    render() {
        return (
            <div className="trips-container">
                {this.props.trips.map( trip => {
                    return <Trip
                        key={trip.id}
                        id={trip.id}
                        dest={trip.destination}
                        start={trip.start}
                        duration={trip.duration}
                        comment={trip.comment}
                        color={trip.color}
                        deleteTripAction={this.props.deleteTripAction}
                        editTripAction={this.props.editTripAction}

                     />
                } )}
            </div>
        )
    }
}