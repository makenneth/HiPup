import React, { Component } from 'react';
import CurrentUserState from "../../mixin/currentUserState";
import { hashHistory } from 'react-router';
import Autocomplete from '../../mixin/autoComplete';
import GroupFormMixin from '../../mixin/groupFormMixin';

@connect(
  ({ auth: { user }, tags }) => ({
    allTags: tags.tags,
    loaded: tags.loaded,
    loading: tags.loading,
    user
  }),
  { createGroup, fetchTags })
export default class NewGroupForm extends Component {
  // mixins: [CurrentUserState, Autocomplete, GroupFormMixin],
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lng: 0,
      title: "",
      description: "",
      image_url: "",
      city: "",
      state: "",
      tags: [],
      numOfTags: 1
    };
  }
  componentDidMount() {
    if (!(this.props.loaded | this.props.loading)){
      this.props.fetchTags();
    }
  }
  updateField(field, e) {
    const fieldObj = {};
    fieldObj[field] = e.target.value;
    this.setState(fieldObj);
  }
  toggleSelect = (box, e) => {
    this.setState({
      tags: {
        ...tags,
        [box]: e.target.value
      }
    });
  }
  moreTags = () => {
    this.setState({ numOfTags: this.state.numOfTags + 1 });
  }
  isSelected(tag) {
    return this.state.tags.indexOf(tag) > -1;
  }
  selectDiv(id) {
    return (<select class="form-tag-checkbox" onChange={this.toggleSelect.bind(null, id)} key={id}>
      <option value={null}></option>
      {
        this.state.allTags.map((tag) => {
          return (<option key={tag.id} value={tag.id}>
                   {tag.name}</option>);
        })
      }
    </select>);
  }
  multipleCheckBox(id) {
    return (
      <div id="multiple-checkbox-div">
        {
          Array.from(Array(this.state.numOfTags), (a, i) => {
            return this.selectDiv(i);
          })
        }
      </div>
    );
  }
  _back(e) {
    if (e) e.preventDefault();
    HashHistory.goBack();
  }

  _handleSubmit = (e) => {
    e.preventDefault();
    this.props.createGroup({
      lat: this.state.lat,
      lng: this.state.lng,
      city: this.state.city,
      state: this.state.state,
      title: this.state.title,
      image_url: this.state.image_url,
      description: this.state.description,
      creator_id: this.props.user.id,
      tag_ids: this.state.tags
    }).then((group) => {
      //this will produce error for sure
      hashHistory.push(`groups/${group.id}/home`);
    });
  }
  render() {
    return (
      <div className="group-form-container">
        <div className="paw-print"></div>
        <div className="group-form-title">New Group</div>
        <div className="group-form-parent">
          <form className="group-form" onSubmit={this._handleSubmit}>
            <div className="form-line">
              <label for="title">Title</label>
              <input type="text" value={this.state.title}
                     onChange={this.updateField.bind(null, "title")} id="title" required/>
            </div>
            <div className="form-line">
              <label for="image">Image Url</label>
              <input type="url" value={this.state.image_url}
                     onChange={this.updateField.bind(null, "image_url")} id="image"/>
            </div>
            <div className="form-line">
              <label for="autocomplete">Primary city</label>
              <input className="city" id="autocomplete"
                    onChange={this.updateField.bind(null, "city")}  value={this.state.city} />
            </div>
            <div className="form-line">
              <label for="state">Primary state</label>
              <input className="state" id="state"
                    onChange={this.updateField.bind(null, "state")} value={this.state.state} />
            </div>
            <div className="form-line">
              <label for="description">Description</label>
              <textarea value={this.state.description}
                        onChange={this.updateField.bind(null, "description")}
                        id="description" rows="5" required/>
            </div>
            <div className="form-line">
              <label for="tag">Tags</label>
              {this.multipleCheckBox()}
            </div>
            <a onClick={this.moreTags} style={{alignSelf: 'flex-end'}}>Add More tags</a>

            <input className="create-group-button" type="submit" value="Create New Group" />
          </form>
          <div className="back-button" onClick={() => hashHistory.push("/")}></div>
        </div>
      </div>
    );
  }
}
