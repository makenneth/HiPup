import React, { Component } from "react";
import { connect } from "react-redux";
import { EventIndexByDate } from "containers";
import { GroupIndexItem, TagIndex, MainNav } from "components";
import { fetchGroups, setRange } from "redux/modules/groups";
import { fetchTags, changeAllTags, toggleTag } from "redux/modules/tags";
import Modal from 'react-modal';
import DateModalStyle from './dateModalStyle';
import FaAngleDown from "react-icons/lib/fa/angle-down";

const banner = "https://images.unsplash.com/photo-1443750200537-00fd518bdc82?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=ad7a9ff44b3026fcf49d80830ffb20ee";

@connect(
  ({ groups, tags, geolocation, auth: { user } }) => ({
    groups: groups.groups,
    groupsLoaded: groups.loaded,
    tags: tags.tags,
    selected: tags.selected,
    geolocation: geolocation.location,
    locationError: geolocation.error,
    user
  }),
  ({
    setRange,
    fetchGroups,
    fetchTags,
    changeAllTags,
    toggleTag
  })
)
export default class GroupIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagSearchModalOpen: false,
      searchString: "",
      dateModalIsOpen: false,
      searchBarOpen: false,
      distanceSearchOpen: false,
      selectedTags: {},
      miles: 50
    };
  }
  componentDidMount() {
    if (!this.props.groupsLoaded) {
      if (this.props.locationError) {
        this.props.fetchAllGroups();
      } else {
        this.props.fetchAllGroups();
      }
    }

    if (!tagsLoaded) {
      this.props.fetchTags();
    }
    this.placeScrollDownDiv();
  }
  setSearchString = (e) => {
    this.setState({ searchString: e.target.value });
  }
  openDateModal = () => {
    this.setState({ dateModalIsOpen: true });
  }
  closeDateModal = () => {
    this.setState({ dateModalIsOpen: false });
  }
  searchTooltip() {
    return (<div className="search-tooltip">
      <div className="search-container-sm cf">
        <img className="search-icon-sm" src="/search-icon-2.png"/>
        <input
          id="search-box"
          type="text"
          onChange={this.setSearchString}
          autoFocus
          value={this.state.searchString}
          placeholder="Find a pet event"
        />
      </div>
    </div>);
  }
  locationTooltip() {
    return (<div className="location-tooltip">
      <p>Searching within {this.state.miles} Miles</p>
      {
        !this.props.locationError ?
          (<input
            id="distance-range"
            type="range"
            min="25"
            max="300"
            step="25"
            value={this.state.miles}
            onChange={(e) => this.setState({ miles: e.target.value })}
          />) : "Could not detect your location"
      }
    </div>);
  }
  tagTooltip() {
    return (<TagIndex
      toggleTag={this.props.toggleTag}
      tags={this.props.tags}
      selected={this.props.selected}
      changeAllTags={this.props.changeAllTags}
    />);
  }
  mainNav() {
    return (this.props.location.pathname === "/" &&
      <MainNav
        userButtons={this.props.userButtons}
        openDateModal={this.openDateModal}
        searchTooltip={this.searchTooltip}
        tagTooltip ={this.tagTooltip}
        locationTooltip={this.locationTooltip}
        currentUser={this.props.user}
      />)
  }
  showAll = () => {
    this.setState({ miles: Infinity })
  }
  groupIndex(libraries) {
    if (libraries.length) {
      return (<div className="group-index cf">
        {libraries.map(group => <GroupIndexItem group={group} key={group.id} />)}
      </div>);
    } else {
      return (<div className="group-index cf">
        <h1>There are no events matching your search criteria around
         { " " + this.props.geolocation.place + " :(" }
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
    document.getElementsByClassName("scroll-down-div")[0].style.bottom = bottomPX + "px";
  }

  scrollDown = () => {
    const h = window.innerHeight;

    window.scrollTo(0, h);
  }
  render() {
    const searchCriteria = this.state.searchString.toLowerCase().trim();

    const libraries = this.props.groups.filter((group) => {
      return (
        (group.distance === Infinity || group.distance <= this.state.miles) &&
        group.title.toLowerCase().match(searchCriteria) &&
          group.tags.some(tag => this.props.selected[tag.id])
      );
    });
    return (
      <div>
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
        <Modal
          isOpen={this.state.dateModalIsOpen}
          onRequestClose={this.closeDateModal}
          style={DateModalStyle}>
          <EventIndexByDate closeModal={this.closeDateModal} />
        </Modal>
        <div className="group-index-body">
          {this.groupIndex(libraries)}
        </div>
        <footer>
          <div className="my-name">Kenneth Ma</div>
          <a href="https://github.com/makenneth"><div className="git-logo"></div></a>
          <a href="https://www.linkedin.com/in/kenneth-ma-a813b3116"><div className="link-logo"></div></a>
        </footer>
      </div>
    );
  }
};
