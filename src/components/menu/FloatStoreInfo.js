import React, { Component } from 'react';
import colors from '../../styles/colors';
import { 
    StyleSheet,
    Text, 
    View,
    TextInput,
    Image,
    Alert,
    Dimensions,
    TouchableHighlight,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import RoundedInputBar  from '../components/inputs/RoundedInputBar'
import MapView, {Marker, Callout, Polygon, PROVIDER_GOOGLE, Circle } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Map extends Component{
    render(){
        return(
            <View>
                
            </View>
        );
    }
}