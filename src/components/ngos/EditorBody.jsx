import React from 'react';
import Editor from 'draft-js-plugins-editor';
import { convertFromRaw, EditorState } from 'draft-js';
import getAllPluginDecorators from '../../utils/getPluginDecorators';

const EditorBody = ({ data }) => {
  const contentState = convertFromRaw(JSON.parse(data));
  let decorators = getAllPluginDecorators();
  const editorState = EditorState.createWithContent(contentState, decorators);
  return (
    <>
      <Editor editorState={editorState} readOnly={true} />
    </>
  );
};

export default EditorBody;
