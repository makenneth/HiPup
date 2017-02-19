import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import { browserHistory } from 'react-router';
import { fetchTags, isLoading } from 'redux/modules/tags';
import { startLoad, endLoad } from 'redux/modules/common';
import { createGroup } from 'redux/modules/groups';
import Immutable from 'immutable';

// import banner from 'assets/images/dog-board-mini.png';
import './styles.scss';

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
  ({ auth, tags, group }) => ({
    allTags: tags.get('tags'),
    loaded: tags.get('loaded'),
    loading: tags.get('loading'),
    user: auth.get('user'),
    group: group.get('group'),
  }),
  { createGroup, fetchTags, startLoad, endLoad })
export default class NewGroupForm extends Component {
  //TODO: Add uploader for images
  constructor(props) {
    super(props);

    this.state = {
      lat: null,
      lng: null,
      title: '',
      description: '',
      city: '',
      state: '',
      numOfTags: 1,
      image: Immutable.fromJS({
        file_contents: '',
        filename: '',
        content_type: '',
      }),
      tags: new Immutable.List(),
      errors: new Immutable.Map(),
    };

    this.validConditions = {
      title: 'this.state.title.length > 0',
      city: 'this.state.city.length > 0',
      state: 'this.state.state.length > 0',
      description: 'this.state.description.length > 0',
    };

    this.errorMessages = {
      title: 'Title cannot be empty',
      city: 'City cannot be empty',
      state: 'State cannot be empty',
      description: 'Description cannot be empty',
    };
  }

  componentDidMount() {
    const options = {
      types: ['(regions)'],
      componentRestrictions: { country: 'us' },
    };

    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      options
    );

    this.acListener = this.autocomplete.addListener('place_changed', this.fillInAddress);
  }

  componentWillReceiveProps(nextProps) {
    if ((!this.props.group && nextProps.group) ||
      (this.props.group && (this.props.group.hashCode !== nextProps.group.hashCode))) {
      browserHistory.push(`/groups/${nextProps.group.get('id')}`);
    }
  }

  componentWillUnmount() {
    if (this.acListener) this.acListener.remove();
  }

  fillInAddress = () => {
    const place = this.autocomplete.getPlace();
    let errors = this.state.errors;
    let city = place.adr_address.match(/locality\">(\w+\s?\w+)</);
    let state = place.adr_address.match(/region\">(\w+)</);
    let location = place.geometry.location;

    if (!city) {
      errors = errors.set('city', this.errorMessages.city);
      city = '';
    } else {
      errors = errors.set('city', null);
      city = city[1];
    }

    if (!state) {
      errors = errors.set('state', this.errorMessages.state);
      state = '';
    } else {
      errors = errors.set('state', null);
      state = state[1];
    }

    this.setState({
      lat: location.lat(),
      lng: location.lng(),
      state,
      city,
      errors,
    });
  }

  updateFile = (ev) => {
    const file = ev.target.files[0];
    if (file && /.jpg|.jpeg|.png|.gif/.test(file.type)) {
      const reader = new FileReader();
      this.props.startLoad();
      reader.onload = (upload) => {
        this.setState({
          image: this.state.image.merge({
            file_contents: upload.target.result,
            filename: file.name,
            content_type: file.type,
          })
        });
        this.props.endLoad();
      };
      reader.readAsDataURL(file);
    } else {
      this.setState({
        errors: this.state.errors.set('image', 'The type of the file is not suppored.')
      });
    }
  }

  updateField = (field, e) => {
    const fieldObj = {};
    fieldObj[field] = e.target.value;
    this.setState(fieldObj);
  }

  validateField = (field) => {
    const isValid = eval(this.validConditions[field]);

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
            <option key={tag.get('id')} value={tag.get('id')}>
              {tag.get('name')}
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

  validateForm = () => {
    for (const field in this.validConditions) {
      if (!eval(this.validConditions[field])) {
        this.setState({
          errors: this.state.errors.set(field, this.errorMessages[field])
        });

        return false;
      }
    }

    return true;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      this.props.createGroup({
        lat: this.state.lat,
        lng: this.state.lng,
        city: this.state.city,
        state: this.state.state,
        title: this.state.title,
        image: this.state.image,
        description: this.state.description,
        creator_id: this.props.user.get('id'),
        tag_ids: this.state.tags
      });
    }
  }
  render() {
    const errors = this.state.errors;
        // (<div className="group-banner-container">
        //   <div className="banner" />
        // </div>)

    return (
      <div className="group-form-container">
        <form className="group-form" onSubmit={this.handleSubmit}>
          <div className="paw-print"></div>
          <div className="group-form-title">New Group</div>
          <div className="group-form-parent">
            <div className="form-line">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                className={errors.get('title') ? 'error-field' : ''}
                value={this.state.title}
                onBlur={() => this.validateField('title')}
                onChange={this.updateField.bind(null, 'title')}
              />
              <p className="hint">{errors.get('title')}</p>
            </div>
            <div className="form-line">
              <label htmlFor="image">Image</label>
              <input
                type="file"
                id="image"
                className={errors.get('image') ? 'error-field' : ''}
                onChange={this.updateFile}
              />
              {
                this.state.image.get('filename') === '' ||
                  <img src={this.state.image.get('dataUri')} height="50" />
              }
            </div>
            <div className="form-line">
              <label htmlFor="autocomplete">Primary city</label>
              <input
                id="autocomplete"
                value={this.state.city}
                className={`city ${errors.get('city') ? 'error-field' : ''}`}
                onChange={this.updateField.bind(null, 'city')}
                onBlur={() => this.validateField('city')}
              />
              <p className="hint">{errors.get('city')}</p>
            </div>
            <div className="form-line">
              <label htmlFor="state">Primary state</label>
              <input
                id="state"
                className="state"
                className={errors.get('state') ? 'error-field' : ''}
                onChange={this.updateField.bind(null, 'state')}
                value={this.state.state}
                onBlur={() => this.validateField('state')}
              />
              <p className="hint">{errors.get('state')}</p>
            </div>
            <div className="form-line">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                className={errors.get('description') ? 'error-field' : ''}
                value={this.state.description}
                onBlur={() => this.validateField('description')}
                onChange={this.updateField.bind(null, 'description')}
                rows="5"
              />
              <p className="hint">{errors.get('description')}</p>
            </div>
            <div className="form-line">
              <label htmlFor="tag">Tags</label>
              {this.multipleCheckBox()}
            </div>
            <div className="more-tags" onClick={this.moreTags}>
              <div>Add More tags</div>
            </div>
            <div className="form-line">
              <input className="create-group-button" type="submit" value="Create New Group" />
            </div>
            <div className="back-button" onClick={() => browserHistory.push('/')}></div>
          </div>
        </form>
      </div>
    );
  }
}
