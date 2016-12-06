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
          <li key={tag.id}>
            <div>{tag.name}</div>
            <input
              type="checkbox"
              onChange={() => props.toggleTag(tag.id)}
              checked={props.selected[tag.id]}
            />
        </li>);
      })
    }
    </ul>
  );
};

export default TagIndex;
