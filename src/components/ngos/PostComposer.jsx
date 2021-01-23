import React, { useState, useRef, useEffect } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from 'draft-js-mention-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import editorStyles from '../../styles/editorStyles.module.css';
import mentionsStyles from '../../styles/mentionsStyles.module.css';
// import mentions from './mentions';
import 'draft-js-mention-plugin/lib/plugin.css';
import 'draft-js-linkify-plugin/lib/plugin.css';
import Entry from './Entry';
import positionSuggestions from './positionSuggestions';
import _ from 'lodash';
import { connect } from 'react-redux';
import { postFeed } from '../../redux/actions/feedAction';
import Map from '../common/Map';
import client from '../../feathers/feathersClient';

const userService = client.service('users');

// import 'draft-js/dist/Draft.css';

const mentionPlugin = createMentionPlugin({
  entityMutability: 'IMMUTABLE',
  theme: mentionsStyles,
  positionSuggestions,
  mentionPrefix: '@',
  supportWhitespace: true,
});
const linkifyPlugin = createLinkifyPlugin();

const { MentionSuggestions } = mentionPlugin;

const plugins = [mentionPlugin, linkifyPlugin];

const PostComposer = ({ postFeed, id }) => {
  const myEditor = useRef(null);
  const myMap = useRef(null);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [suggestions, setSuggestions] = useState([]);

  const [marker, setMarker] = useState({
    longitude: 83.32147657871246,
    latitude: 17.71590375180617,
  });

  const [viewport, setViewport] = useState({
    longitude: 83.32147657871246,
    latitude: 17.71590375180617,
    zoom: 8,
    width: '500px' || myMap.current.clientWidth,
    height: '500px' || myMap.current.clientHeight,
  });

  const handleGeolocate = () => {
    const handleLocation = (pos) => {
      const crd = pos.coords;
      setMarker({
        ...marker,
        latitude: crd.latitude,
        longitude: crd.longitude,
      });
    };
    navigator.geolocation.getCurrentPosition(handleLocation, null, {
      enableHighAccuracy: true,
      timeout: 5000,
    });
  };
  const { latitude, longitude } = marker;

  const getCoordinates = (event) => {
    setMarker({
      ...marker,
      longitude: event.lngLat[0],
      latitude: event.lngLat[1],
    });
    setViewport({
      ...viewport,
      longitude: event.lngLat[0],
      latitude: event.lngLat[1],
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setViewport({
        ...viewport,
        width: myMap.current.clientWidth,
        height: myMap.current.clientHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  const onSearchChange = async ({ value }) => {
    const res = await userService.find({
      query: { usertag: { $search: value } },
    });
    console.log(res.data);
    // setSuggestions(defaultSuggestionsFilter(value, res.data));
    setSuggestions(res.data);
  };

  const focus = () => {
    myEditor.current.focus();
  };

  const handleSubmit = () => {
    const contentState = editorState.getCurrentContent();
    const message = _.assign({}, convertToRaw(contentState));
    console.log(message);
    postFeed({ id, message, longitude, latitude });
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className={editorStyles.editor} onClick={focus}>
        <Editor
          editorState={editorState}
          onChange={(editorState) => setEditorState(editorState)}
          plugins={plugins}
          ref={myEditor}
          placeholder="What you need, Where you need?"
        />
        <MentionSuggestions
          onSearchChange={(value) => onSearchChange(value)}
          suggestions={suggestions}
          entryComponent={Entry}
        />
      </div>
      <div className="mx-1 p-1">
        <div ref={myMap} className="m-2">
          <Map
            viewport={viewport}
            latitude={latitude}
            longitude={longitude}
            setViewport={setViewport}
            handleGeolocate={handleGeolocate}
            getCoordinates={getCoordinates}
          />
        </div>
        <button
          onClick={() => handleSubmit()}
          className="button is-primary m-2"
        >
          Add message
        </button>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  id: state.authReducer.user._id,
});

export default connect(mapStateToProps, { postFeed })(PostComposer);
