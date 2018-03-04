import React, { Component } from 'react';
import '../App.css';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'; 

var infoWindow = [];

class Map extends Component{
    constructor(props){
        super(props);
        this.state = {
            center: this.props.center,
            showInfo: false,
            infoWindow: []
        }
    }  

    showTitle(i){
        infoWindow[i] =  
                <InfoWindow onCloseClick={this.closePost(i)}>
                    
                    <div>{this.props.posts[i].title}</div>

                </InfoWindow>
        this.setState({
            infoWindow: infoWindow 
        });
    }
    
    showPost(i){
        infoWindow[i] =  
                <InfoWindow onCloseClick={this.closePost(i)}>
                    <div>
                        <div>{this.props.posts[i].title}</div>
                        <div>{this.props.posts[i].body}</div>
                    </div>
                </InfoWindow>
        this.setState({
            infoWindow: infoWindow 
        });
    }
    
    closePost(i){
        infoWindow[i] = null;
        this.setState({
            infoWindow: infoWindow 
        });   
    }
    
    handleMapClick = (resp)=>{
        console.log(resp.latLng.lat());
    }
    
    
    
//      this.mapClick = function(resp){
//        if(props.loggedin === true){
//
//        let coords = {
//            lat:resp.latLng.lat(),
//            long:resp.latLng.lng()
//        };
//        console.log("click data:"+ coords.lat, coords.long);
//        props.addCoords(coords);
//        props.pushMarkersData(resp.latLng);
//            
//        } else if(props.loggedin === false){
//            //alert("You need to log in!");
//        }
//    }
//    this.markerInfo = function(){
//        console.log("click");
//    }
    
    
    
    
    render(){
        var posts = 
            this.props.posts.map((obj, i)=>{
                return(
                    <Marker key={i} 
                        position={{lat: obj.coords.lat, lng: obj.coords.long}}
                        onClick={this.showTitle.bind(this, i)}
                        onDblClick={this.showPost.bind(this, i)}>
                            
                        {this.state.infoWindow[i]}
                    </Marker>
                );  
            });
            
        return(
            <div>
                <GoogleMap
                    onClick={this.handleMapClick.bind(this)}
                    
                    defaultZoom={this.props.zoom}
                    defaultCenter={this.state.center}
                > 
                    {posts}
                </GoogleMap> 
            </div>
        );
    }
}

export default withScriptjs(withGoogleMap(Map));