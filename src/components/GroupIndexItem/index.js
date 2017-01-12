import React, { Component } from "react";
import { browserHistory } from "react-router";

export default class GroupIndexItem extends Component {
  showDetail = () => {
    browserHistory.push(`groups/${this.props.group.get('id')}`);
  }

  render() {
    const group = this.props.group;
    const tagTitles = group.get('tags').map(tag => tag.get('name'));
    return (
      <div className="group-index-card" onClick={this.showDetail}>
        <div
          href="#"
          className="group-index-item front-side"
          style={{
            backgroundImage: `url(${group.get('imageUrl')})`,
            backgroundSize: 'cover'
          }}
        >
          <div className="image-mask"></div>
          <h4>{group.get('title')}</h4>
        </div>
        <div className="back-side">
          <p>We have {group.get('participants').size} members!</p>
          <p>Location: {`${group.get('city')}, ${group.get('state')}`}</p>
          <div id="hidden-tags">
            {
              tagTitles.map((tag, index) => {
                return <div className="hidden-tags-tags" key={index + tag}>{tag}</div>
              })
            }
          </div>
        </div>
        <div className="effeckt-overlay" id="effeckt-overlay"></div>
      </div>
    );
  }
};
