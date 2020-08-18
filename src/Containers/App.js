import React, { Component } from 'react';
import {connect} from 'react-redux';
import CardList from '../Components/Cardlist';
import SearchBox from '../Components/Searchbox';
import Scroll from '../Components/Scroll';
import './App.css';
import {requestRobots, setSearchField} from '../actions';

const mapStateToProps = state => {
  return {
    searchfield: state.searchRobots.searchfield, 
    robots: state.requestRobots.robots, 
    isPending: state.requestRobots.isPending, 
    error: state.requestRobots.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
}
class App extends Component {

  componentDidMount() {
    this.props.onRequestRobots()
  }

  render() {
    const {searchfield, onSearchChange, robots, isPending} = this.props;
    const filteredRobots = robots.filter(robot =>{
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    return isPending ?
      <h1>Loading</h1> :
      (
        <div className='tc'>
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={onSearchChange}/>
          <Scroll>
            <CardList robots={filteredRobots} />
          </Scroll>
        </div>
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);