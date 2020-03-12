import React, { Component } from 'react';
import colors from '../styles/colors'
import { 
    StyleSheet,
    Text, 
    View,
    TextInput,
    Image,
    Alert,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import RoundedInputBar  from '../components/inputs/RoundedInputBar'
import MapView, {Marker, Callout, Polygon, PROVIDER_GOOGLE, Circle } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

export default class Map extends Component{

    //constructor
    //생성자 메소드로 컴포넌트가 생성될 때 단 한번만 실행된다.
    //이 메소드에서만 state를 설정할 수 있다.
    constructor(props){
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            coordinate:{
                latitude:35.8943188,
                longitude:128.6238612,
            },
            error: null,
            coordinates:[
                { name : '1', latitude:35.8938, longitude:128.6245},
                { name : '2', latitude:35.8970, longitude:128.6249},
                { name : '3', latitude:35.8965,  longitude:128.6220},
                { name : '4', latitude:35.8940, longitude:128.6219},
                { name : '5', latitude:35.8943188, longitude:128.6238612},
                
            ],
        };
    }
    
    //componentDidMount : render가 호출된 후 실행되는 메서드
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
    //Alert 사용
    showWelcomMesage = () =>{
        Alert.alert(
            //Header
            'Welecome to San 대구',
            //title
            'The food is amazing',
            //footer button
            [
                {
                    text:'Cancel',
                    style: 'cancel'
                },
                {
                    text:'Ok'
                }
            ]
        )
    }

    
    render(){
        return(
            <View style={styles.container}>

                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={{
                        latitude: 35.8943188,
                        longitude:128.6238612,
                        latitudeDelta: 0.0115,
                        longitudeDelta: 0.0121,
                    }}
                >
                    {/* <Polygon 
                        // coordinates={this.state.coordinates}
                    /> */}
                    <Circle
                        center={{ latitude: 35.8943188,
                            longitude:128.6238612, }}
                        radius={100}
                        fillColor={'rgba(100,100,200,0.5)'}
                    />
                    <Marker
                        draggable
                        coordinate={this.state.coordinate}
                        // 드래그 이벤트 아직 작동 잘안해..
                        onDragEnd={
                            (e)=> this.setState({x: e.nativeEvent.coordinate})
                        }
                        //마커 이미지 사이즈가 안변함...
                        // image={require('../img/airbnb-logo.png')}
                        // style={{ width: 50, height: 5 }}

                        // title={"this is a marker"}
                    >
                        <Callout onPress={this.showWelcomMesage}>
                            {/* <Image source={require('../img/sushi.jpg')}/> */}
                            <Text>An Interstion city</Text>
                        </Callout>
                        {/* <Image source={require('../img/marker.png')}/> */}
                    </Marker>
                    <Marker
                        coordinate={{latitude: 35.896198, longitude: 128.622353}}
                        title="this is a marker"
                        description="this is a marker example"
                    />
                    
                    {
                        this.state.coordinates.map(marker=>(
                            <Marker
                            key={marker.name}
                            coordinate={{latitude:marker.latitude, longitude:marker.longitude}}
                            title={marker.name}
                        
                            >
                                
                            </Marker>
                        ))
                    }
                </MapView>

                <View style={styles.header}>
                    <Text >latitude : {this.state.latitude}</Text>
                    <Text >longitude : {this.state.longitude}</Text>
                </View>
                <View style={styles.title}>
                    <View style={styles.elem}>
                        <Text>title</Text>
                        <TextInput style={{borderColor: '#aaa', width:'70%', height:35, borderWidth: 1, borderRadius: 5, padding:5}}/>
                    </View>
                    <View style={styles.elem}>
                        <Text>title</Text>
                        <TextInput style={{borderColor: '#aaa', width:'70%', height:35, borderWidth: 1, borderRadius: 5, padding:5}}/>
                    </View>

                </View>
                <View style={styles.content}><Text>content</Text></View>
                <View style={styles.footer}>
                    <Text>footer</Text>
                    {/* <RoundedInputBar >
                        buttonColor={'#023e71'}
                        title={'회원가입'}
                        onPress={() => alert('회원가입 버튼')}/>
                    </RoundedInputBar > */}
                </View>
                
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
        backgroundColor : 'white',
        margin :30,
        padding :20,
        
        
    },
    content : {
        flex : 4,
        // backgroundColor: '#d6ca1a',
    },
    footer: {
        height : '5%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1ad657',
    },
    elem :{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor:'#eee',
        borderBottomWidth:0.5,
        paddingTop:5,
        
    },
    marker:{
        width:5,
        height:5,
    },
});
