import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EventIndexByDate, MainNav } from 'containers';
import { GroupIndexItem } from 'components';
import { fetchGroups } from 'redux/modules/groups';
import { clearAllFilters } from 'redux/modules/query';
import { fetchTags } from 'redux/modules/tags';
import FaAngleDown from 'react-icons/lib/fa/angle-down';

import './dateModalStyle.scss';
import './styles.scss';

const banner = 'https://images.unsplash.com/photo-1443750200537-00fd518bdc82?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=ad7a9ff44b3026fcf49d80830ffb20ee';

@connect(
  ({ groups, tags, geolocation, auth, query }) => ({
    groups: groups.get('groups'),
    groupsLoaded: groups.get('loaded'),
    tagsLoaded: tags.get('loaded'),
    selected: query.get('tags'),
    searchString: query.get('searchString'),
    range: query.get('range'),
    hasLocation: query.get('location'),
    geolocation: geolocation.get('location'),
    user: auth.get('user'),
  }),
  ({
    clearAllFilters,
    fetchGroups,
    fetchTags,
  })
)
export default class GroupIndex extends Component {
  state = {
    dateModalOpen: false,
  };

  componentDidMount() {
    if (!this.props.groupsLoaded) {
      if (this.props.locationError) {
        this.props.fetchGroups();
      } else {
        this.props.fetchGroups();
      }
    }

    if (!this.props.tagsLoaded) {
      this.props.fetchTags();
    }
    this.placeScrollDownDiv();
  }

  openDateModal = () => this.setState({ dateModalOpen: true })
  closeDateModal = () => this.setState({ dateModalOpen: false })

  mainNav() {
    return (this.props.location.pathname === '/' &&
      <MainNav
        openDateModal={this.openDateModal}
        searchTooltip={this.searchTooltip}
        tagTooltip ={this.tagTooltip}
        locationTooltip={this.locationTooltip}
        user={this.props.user}
      />)
  }

  showAll = () => {
    this.props.clearAllFilters();
  }

  groupIndex(libraries) {
    if (libraries.size) {
      return (<div className="group-index cf">
        {libraries.map(group => <GroupIndexItem group={group} key={group.get('id')} />)}
      </div>);
    } else {
      const place = this.props.geolocation.get('place');
      return (<div className="group-index cf">
        <h1>There are no events matching your search criteria around
         {` ${place.get('city')}, ${place.get('state')} :(`}
         <p onClick={this.showAll}>Show all</p>
        </h1>
      </div>);
    }
  }

  placeScrollDownDiv() {
    const h = window.innerHeight;
    const w = window.innerWidth;
    let bottomPX = 50;
    if (h <= 842) bottomPX += 948 - h;
    if (w >= 1000) bottomPX += 100 + w - 1000;
    document.getElementsByClassName('scroll-down-div')[0].style.bottom = `${bottomPX}px`;
  }

  scrollDown = () => {
    const h = window.innerHeight;

    window.scrollTo(0, h);
  }

  render() {
    const searchCriteria = new RegExp(this.props.searchString.toLowerCase().trim(), 'i');

    let libraries = [];
    if (!this.props.hasLocation) {
      libraries = this.props.groups;
    } else {
      libraries = this.props.groups.filter((group) => {
        return (
          (this.props.range === Infinity || (group.get('distance') !== null && group.get('distance') <= this.props.range)) &&
          searchCriteria.test(group.get('title')) &&
          group.get('tags').some(tag => this.props.selected.get(tag.get('id')))
        );
      });
    }

    return (
      <div className="app-container">
        <div className="banner-img">
          <div className="logo">HiPup</div>
          <span className="tagline">Playdates for pets</span>
        </div>
        <div className="banner">
          <div className="scroll-down-div" onClick={this.scrollDown}>
            <div className="scroll-down"><FaAngleDown /></div>
            <div className="scroll-down"><FaAngleDown /></div>
          </div>
        </div>
        {this.mainNav()}

        <div className="group-index-body">
          {this.groupIndex(libraries)}
        </div>
        <footer>
          <div className="my-name">Kenneth Ma</div>
          <a href="https://github.com/makenneth"><div className="git-logo"></div></a>
          <a href="https://www.linkedin.com/in/kenneth-ma-a813b3116"><div className="link-logo"></div></a>
        </footer>
        {
          this.state.dateModalOpen && (<div className="overlay">
            <EventIndexByDate closeModal={this.closeDateModal} />
          </div>)
        }
      </div>
    );
  }
};
