import React, { useState, useRef, useEffect } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createMentionPlugin from 'draft-js-mention-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import editorStyles from '../../styles/editorStyles.module.css';
import mentionsStyles from '../../styles/mentionsStyles.module.css';
import 'draft-js-mention-plugin/lib/plugin.css';
import 'draft-js-linkify-plugin/lib/plugin.css';
import Entry from '../ngos/Entry';
import positionSuggestions from '../ngos/positionSuggestions';
import _ from 'lodash';
import { connect } from 'react-redux';
import client from '../../feathers/feathersClient';
import { postComment } from '../../redux/actions/commentAction';
import Modal from 'react-modal';
import { modalStyle } from '../common/modalStyle';

const mentionPlugin = createMentionPlugin({
  entityMutability: 'IMMUTABLE',
  theme: mentionsStyles,
  positionSuggestions,
  mentionPrefix: '@',
  supportWhitespace: true,
});
const linkifyPlugin = createLinkifyPlugin();

const userService = client.service('users');

const { MentionSuggestions } = mentionPlugin;

const plugins = [mentionPlugin, linkifyPlugin];

const Comment = ({ postComment, isCommentActive, id }) => {
  const myComment = useRef(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [suggestions, setSuggestions] = useState([]);

  const onSearchChange = async ({ value }) => {
    const res = await userService.find({
      query: { usertag: { $search: value } },
    });
    setSuggestions(res.data);
  };

  const focus = () => {
    myComment.current.focus();
  };

  const handleSubmit = () => {
    const contentState = editorState.getCurrentContent();
    const message = _.assign({}, convertToRaw(contentState));
    console.log(message);
  };

  return (
    <>
      <div>
        <p>Replying to </p>
      </div>
      <div className={editorStyles.editor} onClick={focus}>
        <Editor
          editorState={editorState}
          onChange={(editorState) => setEditorState(editorState)}
          plugins={plugins}
          ref={myComment}
          placeholder="What you need, Where you need?"
        />
        <MentionSuggestions
          onSearchChange={(value) => onSearchChange(value)}
          suggestions={suggestions}
          entryComponent={Entry}
        />
      </div>
      <button className="button is-info" onClick={() => handleSubmit()}>
        Reply
      </button>
    </>
  );
};

export default connect(null, { postComment })(Comment);
