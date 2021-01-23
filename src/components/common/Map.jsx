import React from 'react';
import ReactMapGL, { Marker, GeolocateControl } from 'react-map-gl';
import { FaMapMarkerAlt } from 'react-icons/fa';

const mapStyle = 'mapbox://styles/yashone7/ck9070hcn134b1ipcdw14pf5a';

const Map = (props) => {
  const {
    viewport,
    setViewport,
    handleGeolocate,
    latitude,
    longitude,
    getCoordinates,
  } = props;
  return (
    <ReactMapGL
      {...viewport}
      mapStyle={mapStyle}
      onViewportChange={(viewport) => setViewport(viewport)}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    >
      <GeolocateControl
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={false}
        showUserLocation={true}
        onGeolocate={handleGeolocate}
      />
      <Marker
        latitude={latitude}
        longitude={longitude}
        offsetLeft={0}
        offsetTop={0}
        draggable={true}
        captureScroll={true}
        captureDrag={true}
        onViewportChange={(marker) => setViewport(marker)}
        onDragEnd={(event) => getCoordinates(event)}
      >
        <FaMapMarkerAlt color="black" />
      </Marker>
      <div className="block m-2 w-2/5 sm:w-3/5  bg-gray-800 opacity-50">
        <span className="text-gray-100 text-sm">Latitude: {latitude}</span>
        <br />
        <span className="text-gray-100 text-sm">Longitude: {longitude}</span>
      </div>
    </ReactMapGL>
  );
};

export default Map;
