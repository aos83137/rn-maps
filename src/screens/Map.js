import React, { Component } from 'react';
import colors from '../styles/colors'
import { 
    StyleSheet,
    Text, 
    View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import MapView, {Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps



export default class Map extends Component{
    constructor(props){
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            error: null,
        };
    }

    componentDidMount() {
        // Instead of navigator.geolocation, just use Geolocation.
            Geolocation.getCurrentPosition(
                (position) => {
                    this.setState({ 
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        error: null,
                    });
                    console.log(position);
                },
                (error) => {
                    // See error code charts below.
                    this.setState({error:error.message}),
                    console.log(error.code, error.message);
                    console.log('hellod');
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        
    }

    render(){
        return(
            <View style={styles.container}>

                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={{
                        latitude: 35.896198,
                        longitude: 128.622353,
                        latitudeDelta: 0.0115,
                        longitudeDelta: 0.0121,
                    }}
                >
                    <Marker
                        coordinate={{latitude: 35.896198, longitude: 128.622353}}
                        title="this is a marker"
                        description="this is a marker example"
                    />
                </MapView>

                <View style={styles.header}>
                    <Text >latitude : {this.state.latitude}</Text>
                    <Text >longitude : {this.state.longitude}</Text>
                </View>
                <View style={styles.title}><Text>title</Text></View>
                <View style={styles.content}><Text>content</Text></View>
                <View style={styles.footer}><Text>footer</Text></View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex : 1,
        justifyContent: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        zIndex:1,
    },
    header: {
        height:"7%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9aa9ff',
    },
    title : {
        height:"10%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor : 'yellow',
    },
    content : {
        flex : 4,
        // backgroundColor: '#d6ca1a',
    },
    footer: {
        flex : 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1ad657',
    },
});
