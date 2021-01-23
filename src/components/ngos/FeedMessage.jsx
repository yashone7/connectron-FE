import React, { useRef, useState, Fragment } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import ResizeDetector from 'react-resize-detector';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { connect } from 'react-redux';
import { getFeeds } from '../../redux/actions/feedAction';

const FeedMessage = (props) => {
  const { state: b } = props.location;
  const myMap = useRef(null);

  const handleResize = () => {
    myMap.current &&
      setViewport({
        ...viewport,
        height: myMap.current.clientHeight,
        width: myMap.current.clientWidth,
      });
  };

  const [viewport, setViewport] = useState({
    longitude: b.location.coordinates[0],
    latitude: b.location.coordinates[1],
    zoom: 8,
    width: '400px' || myMap.current.clientWidth,
    height: '400px' || myMap.current.clientHeight,
  });

  const markerCoords = [b.location.coordinates[0], b.location.coordinates[1]];

  const mapStyle = 'mapbox://styles/yashone7/ck9070hcn134b1ipcdw14pf5a';

  return (
    <Fragment>
      <div className="sm:w-full md:w-2/5">
        {b && (
          <div className="rounded-sm shadow-sm bg-gray-200 mx-2">
            <div className="my-1 px-2">
              <p className="text-lg my-1">Organisation Name</p>
              <p className="text-md mx-1">{b.name}</p>
            </div>
            <div className="my-1 px-2">
              <p className="text-lg my-1">Address</p>
              <p className="text-md mx-1">{b.address}</p>
            </div>
            <div className="my-1 px-2">
              <p className="text-lg my-1">Phone</p>
              <p className="text-md mx-1">{b.phone}</p>
            </div>
            <div className="my-1 px-2">
              <p className="text-lg my-1">Message</p>
              <p className="text-md mx-1">{b.message}</p>
            </div>
          </div>
        )}
      </div>
      <div className="mx-1 p-1 ">
        <ResizeDetector
          handleWidth
          handleHeight
          onResize={handleResize}
          targetDomEl={myMap}
        >
          <div className="sm:w-3/5 sm:h-3/5 lg:w-2/5 lg:h-2/5" ref={myMap}>
            <ReactMapGL
              {...viewport}
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
              onViewportChange={(viewport) => setViewport(viewport)}
              mapStyle={mapStyle}
            >
              <Marker
                latitude={markerCoords[1]}
                longitude={markerCoords[0]}
                offsetLeft={0}
                offsetTop={0}
              >
                <FaMapMarkerAlt color="black" />
              </Marker>
              <div className="block m-2 w-2/5 sm:w-3/5 bg-gray-800 opacity-50">
                <span className="text-gray-100 text-sm">
                  Latitude: {markerCoords[1]}
                </span>
                <br />
                <span className="text-gray-100 text-sm">
                  Longitude: {markerCoords[0]}
                </span>
              </div>
            </ReactMapGL>
          </div>
        </ResizeDetector>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  feeds: state.feedReducer.feeds,
});

export default connect(mapStateToProps, { getFeeds })(FeedMessage);
