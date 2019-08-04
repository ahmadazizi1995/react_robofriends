import {connect} from 'react-redux';
import {setSearchField} from '../actions';
import React, {Component} from 'react';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import Scroll from '../Components/Scroll';
import ErrorBoundry from '../Components/ErrorBoundry';
import './App.css';

//map state to props from reducers
const mapStateToProps = state => {
    return {
        searchField: state.searchField
    }
}
 //to trigger an action
const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    }
}

class App extends Component{

    constructor(){
        super();
        this.state = {
            Robot: []
            //,Searchfield: ''
        }
    }

    // onSearchChange = (event) => {
    //     this.setState({Searchfield: event.target.value});
    // }
    
    componentDidMount(){
        //console.log(this.props.store.getState());
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            return response.json();
        })
        .then(users => {
            this.setState({Robot: users});
        })
    }

    render(){
        //const {Robot, Searchfield} = this.state;
        const {Robot} = this.state;
        const {searchField, onSearchChange} = this.props;
        const filteredRobot = Robot.filter(Robot => {
            // return Robot.name.toLowerCase().includes(Searchfield.toLowerCase());
            return Robot.name.toLowerCase().includes(searchField.toLowerCase());
        })
        //if API takes time to load, display loading bar...
        //return !Robot.length ?
        return Robot.length === 0 ?
        (<h1 className='tc pa3 ma3'>LOADING</h1>) :
        ( 
        <div className='tc'>
            <h1 className='f1'>RoboFriends</h1>
            {/* <SearchBox searchChange={this.onSearchChange}/> */}
            <SearchBox searchChange={onSearchChange}/>
            <Scroll>
                <ErrorBoundry>
                    <CardList Robot={filteredRobot}/>
                </ErrorBoundry>
            </Scroll>
            {/* <CardList Robot={Robot}/> */}
            {/* ^ instead of passing Robot we can now pass Robot through state (Component parent) */}
        </div>
        );
    }
}

//higher order funtion, connect
export default connect(mapStateToProps, mapDispatchToProps)(App);
