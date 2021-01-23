import React from 'react';
import mentionsStyles from '../../styles/mentionsStyles.module.css';

const Entry = (props) => {
  const {
    mention,
    theme,
    searchValue, // eslint-disable-line no-unused-vars
    isFocused, // eslint-disable-line no-unused-vars
    ...parentProps
  } = props;

  console.log(mention);

  return (
    <div {...parentProps}>
      <div className={mentionsStyles.mentionSuggestionsEntryContainer}>
        <div className={mentionsStyles.mentionSuggestionsEntryContainerLeft}>
          <img
            src={mention.avatar}
            className={mentionsStyles.mentionSuggestionsEntryAvatar}
            role="presentation"
            alt="gravatar"
          />
        </div>
        <div className={mentionsStyles.mentionSuggestionsEntryContainerRight}>
          <div className={mentionsStyles.mentionSuggestionsEntryText}>
            {mention.name}
          </div>

          <div className={theme.mentionSuggestionsEntryTitle}>
            {mention.usertag}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Entry;
