import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { fetchTags, isLoading } from 'redux/modules/tags';
import Immutable from 'immutable';

@asyncConnect([{
  promise: ({ store }) => {
    let promise;

    if (!isLoading(store.getState().tags)) {
      promise = store.dispatch(fetchTags());
    }

    return promise;
  }
}])
@connect(
  ({ auth: { user }, tags }) => ({
    allTags: tags.get('tags'),
    loaded: tags.loaded,
    loading: tags.loading,
    user
  }),
  { createGroup, fetchTags })
export default class NewGroupForm extends Component {
  //TODO: Add uploader for images
  constructor(props) {
    super(props);

    this.state = {
      lat: null,
      lng: null,
      title: '',
      description: '',
      imageUrl: '',
      city: '',
      state: '',
      tags: new Immutable.List(),
      numOfTags: 1,
      errors: new Immutable.Map();
    };

    this.validConditions = {
      title: this.state.title.length > 0,
      description: this.state.description.length > 0,
      city: this.state.city.length > 0,
      state: this.state.state.length > 0,
    };

    this.errorMessages = {
      title: 'Title cannot be empty',
      description: 'Description cannot be empty',
      City: 'City cannot be empty',
      State: 'State cannot be empty',
    };
  }

  componentDidMount() {
    const options = {
      types: ['(regions)'],
      componentRestrictions: {country: "us"}
    };

    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      options
    );

    this.acListener = this.autocomplete.addListener('place_changed', this.fillInAddress);
  }

  componentWillUnmount() {
    if (this.acListener) this.acListener.remove();
  }

  fillInAddress = () => {
    const place = this.autocomplete.getPlace();
    let city = place.adr_address.match(/locality\">(\w+\s?\w+)</);
    let state = place.adr_address.match(/region\">(\w+)</);
    let location = place.geometry.location;
    city = city ? city[1] : '';
    state = state ? state[1] : '';

    this.setState({
      lat: location.lat(),
      lng: location.lng(),
      state,
      city,
    });
  }

  updateField = (field, e) => {
    const fieldObj = {};
    fieldObj[field] = e.target.value;
    this.setState(fieldObj);
  }

  validateField = (field) => {
    const isValid = eval(this.validConditions(field));

    if (!isValid) {
      this.setState({
        errors: this.state.errors.set(field, this.errorMessages[field])
      });
    } else {
      this.setState({
        errors: this.state.errors.set(field, null)
      });
    }
  }

  toggleSelect = (box, e) => {
    this.setState({ tags: this.state.tags.set(box, e.target.value) });
  }

  moreTags = () => {
    this.setState({ numOfTags: this.state.numOfTags + 1 });
  }

  isSelected(tag) {
    return this.state.tags.indexOf(tag) > -1;
  }

  selectDiv(id) {
    return (<select
      className="form-tag-checkbox"
      onChange={(e) => this.toggleSelect(id, e)}
      key={id}
    >
      <option value={null}></option>
      {
        this.props.allTags.map((tag) => {
          return (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          );
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

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createGroup({
      lat: this.state.lat,
      lng: this.state.lng,
      city: this.state.city,
      state: this.state.state,
      title: this.state.title,
      image_url: this.state.imageUrl,
      description: this.state.description,
      creator_id: this.props.user.id,
      tag_ids: this.state.tags
    }).then((group) => {
      //this will produce error for sure
      browserHistory.push(`groups/${group.id}`);
    });
  }
  render() {
    const errors = this.state.errors;

    return (
      <div className="group-form-container">
        <div className="paw-print"></div>
        <div className="group-form-title">New Group</div>
        <div className="group-form-parent">
          <form className="group-form" onSubmit={this.handleSubmit}>
            <div className="form-line">
              <label for="title">Title</label>
              <input
                type="text"
                id="title"
                className={errors.get('title') ? 'error-field' : ''}
                value={this.state.title}
                onBlur={this.validateField}
                onChange={this.updateField.bind(null, 'title')}
              />
            </div>
            <div className="form-line">
              <label for="image">Image Url</label>
              <input
                id="image"
                type="url"
                className={errors.get('imageUrl') ? 'error-field' : ''}
                value={this.state.imageUrl}
                onChange={this.updateField.bind(null, 'imageUrl')}
              />
            </div>
            <div className="form-line">
              <label for="autocomplete">Primary city</label>
              <input
                id="autocomplete"
                className="city"
                className={errors.get('city') ? 'error-field' : ''}
                onChange={this.updateField.bind(null, 'city')}
                value={this.state.city}
                onBlur={this.validateField}
              />
            </div>
            <div className="form-line">
              <label for="state">Primary state</label>
              <input
                id="state"
                className="state"
                className={errors.get('state') ? 'error-field' : ''}
                onChange={this.updateField.bind(null, 'state')}
                value={this.state.state}
                onBlur={this.validateField}
              />
            </div>
            <div className="form-line">
              <label for="description">Description</label>
              <textarea
                id="description"
                className={errors.get('description') ? 'error-field' : ''}
                value={this.state.description}
                onBlur={this.validateField}
                onChange={this.updateField.bind(null, 'description')}
                rows="5"
              />
            </div>
            <div className="form-line">
              <label for="tag">Tags</label>
              {this.multipleCheckBox()}
            </div>
            <a onClick={this.moreTags} style={{alignSelf: 'flex-end'}}>Add More tags</a>

            <input className="create-group-button" type="submit" value="Create New Group" />
          </form>
          <div className="back-button" onClick={() => browserHistory.push("/")}></div>
        </div>
      </div>
    );
  }
}
