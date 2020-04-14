import React, { useState, useEffect } from 'react';
import './App.css';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps'
import * as parkData from './data/parkings.json'
import mapStyles from './mapstyles'
function Map() {

  const [selectedPark, setSelectedPark] = useState(null);

  useEffect(()=>{
    const listner = e =>{
      if(e.key === 'Escape'){
        setSelectedPark(null)
      }
    };
    window.addEventListener('keydown', listner);

    return () => {
      window.removeEventListener('keydown'. listner);
    }
  }, [])
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{
        lat: 45.421532,
        lng: -75.697189
      }}
      defaultOptions={{
        styles:mapStyles
      }}
    >
      {
        parkData.features.map((park) => {
          return (<Marker
            key={park.properties.PARK_ID}
            position={{
              lat: park.geometry.coordinates[1],
              lng: park.geometry.coordinates[0]
            }}
            onClick={() => {
              setSelectedPark(park)
            }}
            icon={{
              url:'/assets/images/park_icon.svg',
              scaledSize: new window.google.maps.Size(25,25)
            }}
          />)
        })
      }
      {
        selectedPark && (
          <InfoWindow
            position={{
              lat: selectedPark.geometry.coordinates[1],
              lng: selectedPark.geometry.coordinates[0]
            }}
            onCloseClick={
              () => {
                return setSelectedPark(null)
              }
            }
          >
            <div>
              <h1>{selectedPark.properties.NAME}</h1>
              <p>{selectedPark.properties.DESCRIPTIO}</p>
            </div>
          </InfoWindow>
        )

      }
    </GoogleMap>
  )
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

function App() {

  return (
    <div className="App" style={{ height: "100vh", width: "100vw" }}>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: "100vh" }} />}
        containerElement={<div style={{ height: "100vh" }} />}
        mapElement={<div style={{ height: "100vh" }} />}
      />
    </div>
  );
}

export default App;
