import React from 'react';

const TagIndex = (props) => {
  return (
    <ul className="tag-list">
      <li>
        <button onClick={() => props.changeAllTags(true)}>Select All</button>
      </li>
      <li>
        <button onClick={() => props.changeAllTags(false)}>Clear All</button>
      </li>
      {
        props.tags.map((tag) => {
          return (
            <li key={tag.get('id')}>
              <div>{tag.get('name')}</div>
              <input
                type="checkbox"
                onChange={() => props.toggleTag(tag.get('id'))}
                checked={props.selected.get(tag.get('id'))}
              />
          </li>);
        })
      }
    </ul>
  );
};

export default TagIndex;
