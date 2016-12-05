import React, { Component } from "react";
import { HashHistory } from "react-router";

export default class GroupIndexItem extends Component {
  showDetail = () => {
    HashHistory.push("groups/" + this.props.group.id + "/home");
  }
  render() {
    const group = this.props.group;
    const tagTitles = group.tags.map(tag => tag.name);
    return (
      <div className="group-index-card" onClick={this.showDetail}>
        <div
          href="#"
          className="group-index-item front-side"
          style={{
            backgroundImage: 'url(' + group.image_url + ')',
            backgroundSize: "cover"
          }}
        >
          <div className="image-mask"></div>
          <h4>{group.title}</h4>
        </div>
        <div className="back-side">
          <p>We have { group.participants.length } members!</p>
          <p>Location: { group.city + ", " + group.state }</p>
          <div id="hidden-tags">
            {
              tagTitles.map((tag, index) => {
                return <div className="hidden-tags-tags" key={index + tag}>{tag}</div>
              })
            }
          </div>
        </div>
        <div class="effeckt-overlay" id="effeckt-overlay"></div>
      </div>
    );
  }
};
