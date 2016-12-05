import React, { Component } from "react";
import { GroupIndexItem } from "components";

const Modal = require('react-modal');
// const TagIndex = require("../tag/tagIndex");
// const EventIndexByDate = require('../events/eventIndexByDate');
// const DateModalStyle = require('../../modal/dateModalStyle');
// const CurrentUserState = require('../../mixin/currentUserState');
// const UserStore = require("../../stores/userStore");
// const LocationStore = require("../../stores/locationStore");
// const TagStore = require("../../stores/tagStore");
// const MainNav = require("../mainNav.jsx");
const FaAngleDown = require("react-icons/lib/fa/angle-down");

const banner = "https://images.unsplash.com/photo-1443750200537-00fd518bdc82?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=ad7a9ff44b3026fcf49d80830ffb20ee";

//async connect fetch all groups within 25;
export default class GroupIndex extends Component {
  // mixins: [CurrentUserState], .
  constructor(props) {
    super(props);
    this.state = {
      groups: GroupStore.findAllWithDistance(25),
      tagSearchModalOpen: false,
      searchString: "",
      dateModalIsOpen: false,
      searchBarOpen: false,
      distanceSearchOpen: false,
      tags: [],
      selectedTags: {},
      miles: 50,
      locationServiceError: ""
    };
  }
  _changeSelectedTags(id) {
    const selectedTags = this.state.selectedTags;
    selectedTags[id] = selectedTags[id] ? false : true;
    this.setState({ selectedTags });
  }
  setAllTags(bool) {
    const selectedTags = this.state.selectedTags;
    for (let key in selectedTags) {
      if (selectedTags.hasOwnProperty(key)) {
        selectedTags[key] = bool;
      }
    }
    this.setState({ selectedTags });
  }
  selectAllTags() {
    this.setAllTags(true);
  }
  deselectAllTags() {
    this.setAllTags(false);
  }
  componentDidMount() {
    this.groupIndexListener = GroupStore.addListener(this._onLoad);
    this.tagIdxListener = TagStore.addListener(this._onReceiveTags);

    if (LocationStore.currentLocation().coords.latitude) {
      if (!this.state.groups.length && !GroupStore.loading() && !GroupStore.loaded()) {
        // ClientActions.startGroupLoading();
        ClientActions.fetchAllGroups(LocationStore.currentLocation().coords);
      } else {
        this._onReceiveTags();
      }
    } else {
      this.usStoreListener = LocationStore.addListener(this._checkedUserLocation);
    }

    if (!this.state.tags.length) ClientActions.fetchTags();
    this.placeScrollDownDiv();
  }
  componentWillReceiveProps(nextProps) {
    this._onReceiveTags();
  }
  _checkedUserLocation() {
    const location = LocationStore.currentLocation().coords;
    const locationLoaded = LocationStore.hasLoaded();
    const locationError = LocationStore.hasError();
    if (!GroupStore.loading() && !GroupStore.loaded()
      && locationLoaded && !locationError) {
      // ClientActions.startGroupLoading();
      ClientActions.fetchAllGroupsWithLocation(location);
    }

    if (locationLoaded && locationError) {
      ClientActions.fetchAllGroups();
    }
  }
  _onLoad() {
    this.setState({
      groups: GroupStore.findAllWithDistance(this.state.miles)
    });
  }
  _onReceiveTags() {
    const selectedTags = this.state.selectedTags;
    const tags = TagStore.all();
    if (tags.length === 0) return;
    tags.forEach((tag) => {
      selectedTags[tag.id] = true;
    })

    this.setState({
      tags, selectedTags
    });
  }
  componentWillUnmount() {
    if (this.groupIndexListener) this.groupIndexListener.remove();
    if (this.tagIdxListener) this.tagIdxListener.remove();
    if (this.usStoreListener) this.usStoreListener.remove();
  }
  setSearchString(e) {
    this.setState({ searchString: e.target.value });
  }
  openDateModal() {
    this.setState({ dateModalIsOpen: true });
  }
  closeDateModal() {
    this.setState({ dateModalIsOpen: false });
  }
  changeDistance(e) {
    const selectedMiles = +e.target.value;
    this.setState({
      miles: selectedMiles,
      groups: GroupStore.findAllWithDistance(selectedMiles)
    });
  }
  _toggleLocationService() {
    if (this.state.locationServiceError.length) {
      this.setState({ locationServiceError: "" });
    } else {
      this.setState({ locationServiceError: "Location Service isn't available" });
    }
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
      <p>Searching within { this.state.miles } Miles</p>
      {
        !LocationStore.hasError ?
          (<input
            id="distance-range"
            type="range"
            min="25"
            max="300"
            step="25"
            value={ this.state.miles }
            onChange={ this.changeDistance }
          />) : "Could not detect your location"

      }
    </div>);
  }
  tagTooltip() {
    return <TagIndex changeSelectedTags={this._changeSelectedTags}
      tags={this.state.tags}
      selectedTags={this.state.selectedTags}
      selectAllTags={this.selectAllTags}
      deselectAllTags={this.deselectAllTags}
    />
  }
  mainNav() {
    return (this.props.location.pathname === "/" &&
      <MainNav
        userButtons={ this.props.userButtons }
        openDateModal={this.openDateModal}
        searchTooltip={this.searchTooltip}
        tagTooltip ={ this.tagTooltip }
        locationTooltip={ this.locationTooltip }
        currentUser={this.state.currentUser}
      />)
  }
  showAll() {
    this.setState({
      groups: GroupStore.findAllWithDistance(5000)
    });
  }
  groupIndex(libraries) {
    if (libraries.length) {
      return (<div className="group-index cf">
        {
          libraries.map((group) => {
            return <GroupIndexItem group={group} key={group.id} />;
          })
        }
      </div>);
    } else {
      return (<div className="group-index cf">
        <h1>There are no events matching your search criteria around
         { " " + LocationStore.currentLocation().place + " :(" }
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
  },
  scrollDown() {
    const h = window.innerHeight;

    window.scrollTo(0, h);
  }
  render() {
    const searchCriteria = this.state.searchString.toLowerCase().trim();

    const libraries = this.state.groups.filter((group) => {
      return (
        group.title.toLowerCase().match(searchCriteria) &&
          group.tags.some(tag => this.state.selectedTags[tag.id])
      );
    });
    return (
      <div>
        <div className="banner-img">
          <div className="logo">HiPup</div><span className="tagline">Playdates for pets</span>
        </div>
        <div className="banner">
          <div className="scroll-down-div" onClick={this.scrollDown}>
            <div className="scroll-down"><FaAngleDown /></div>
            <div className="scroll-down"><FaAngleDown /></div>
          </div>
        </div>
        { this.mainNav() }
        <Modal isOpen={ this.state.dateModalIsOpen }
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
