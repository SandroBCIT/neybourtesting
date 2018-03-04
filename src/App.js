import React, { Component } from 'react';
import './App.css';

import Map from './comps/Map';

class App extends Component {  
    constructor(props){
        super(props);
        this.state={
            posts: []
        }
    }
    
    componentDidMount(){
        this.getAllPosts();
    }
    
    getAllPosts = ()=>{
        fetch('https://neybourapi.herokuapp.com/posts/')
        .then((res)=>{
            return res.json(); 
        })
        .then((data)=>{
            this.setState({
                posts: data.posts
            });
        });  
    }
    
    render() {
        return (
        <div className="App">
            <Map 
                googleMapURL={"https://maps.googleapis.com/maps/api/js?key=AIzaSyB32t1ZjptJtOM17HQHo87JJTxcQuQ2EnA&v=3.exp&libraries=geometry,drawing,places"}
                containerElement={<div style={{height: 100+'%'}}/>}
                mapElement={<div style={{height: 100+'%'}}/>}
                loadingElement={<div style={{height: 100+'%'}} />}
            
                center={{ lat: 49.2827, lng: -123.1207 }}
                zoom={14}
            
                posts={this.state.posts}
            />
        </div>
        );
    }
}

export default App;