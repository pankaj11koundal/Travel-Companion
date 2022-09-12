import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import {Rating} from '@material-ui/lab';
import { GoogleMap } from '@react-google-maps/api';

import mapStyles from './mapStyles';
import useStyles from './styles';

const Map = ({setCoordinates, setBounds, coordinates, places, setChildClicked, weatherData}) => {
    const classes = useStyles();
    const isMobile = useMediaQuery('(mid-width: 600px');
    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                // bootstrapURLKeys={{ key: "AIzaSyAWakizGEdo2x_jjp3gVBaPeNOsHcDlauY"}}
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }} 
                onChange={(e) => {
                    setCoordinates( {lat: e.center.lat, lng: e.center.lng })
                    setBounds( {ne: e.marginBounds.ne, sw: e.marginBounds.sw })
                }}
                onChildClick={(child) => {setChildClicked(child)}}
            >
                {places?.map((place, i) => (
                    <div
                        className={classes.markerContainer}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                        key={i}
                    >
                        {
                            isMobile ? (
                                <LocationOnOutlinedIcon color="primary" fontSize="large" />
                            ) : (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography className={classes.typogrphy} vaiant="subtitle2" gutterBottom>
                                        {place.name}
                                    </Typography>
                                    <img className={classes.pointer}
                                            src={place.photo ? place.photo.images.large.url : 'https://media.istockphoto.com/photos/two-empty-wine-glasses-sitting-in-a-restaurant-on-a-warm-sunny-picture-id1018141890?k=20&m=1018141890&s=612x612&w=0&h=uMDP00MMIhlwQE77EEcoelc2oSKBT_B6avaXqtxgiow='
                                            }
                                            alt={place.name}
                                    />
                                    <Rating size="small" value={Number(place.rating)} readOnly />
                                </Paper>
                            )
                        }
                    </div>
                ))}
                {weatherData?.list?.map((data, i) => {
                    console.log(data);
                    return (<div key={i} lat={data.coord.lat} lng={data.coord.lon}>
                        <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} />
                    </div>)
                })}
            </GoogleMapReact>
        </div>
    )
}

export default Map;
