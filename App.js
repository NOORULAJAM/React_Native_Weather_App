import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Image,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import {API, API_KEY} from './utills/utilts';
import LottieView from 'lottie-react-native';
import Toast from 'react-native-toast-message';
import axios from 'axios';

const App = () => {
  const [search, setsearch] = useState('');
  const [ApiData, setApiData] = useState('');
  const [loader, setloader] = useState(true);

  const Find_Location = async () => {
    const url = await axios
      .get(`${API}${search}&units=metric&appid=${API_KEY}`)
      .then(function (response) {
        setApiData(url.data.main);
        Keyboard.dismiss();
        setloader(false);
      })
      .catch(function (error) {
        console.log('Errorrryyyy', error);
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Error',
          text2: 'Records not found.',
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      });
  };

  const Reset = () => {
    setloader(true);
    setsearch('');
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../react_native_weather_app/src/images/cloud.jpg')}
        style={{flex: 1}}
        resizeMode="cover">
        <View
          style={{
            width: '96%',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
            justifyContent: 'space-around',
          }}>
          <TextInput
            style={{
              width: '80%',
              height: 50,
              borderWidth: 1,
              borderRadius: 30,
              backgroundColor: 'rgba(212, 212, 212, 0.47)',
              padding: 15,
            }}
            placeholder="Enter City Name"
            value={search}
            onChangeText={text => setsearch(text)}
          />
          <TouchableOpacity onPress={() => Find_Location()}>
            <Image
              style={{width: 50, height: 50, tintColor: 'white'}}
              source={require('../react_native_weather_app/src/images/search.png')}
            />
          </TouchableOpacity>
        </View>
        {loader ? (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <LottieView
              style={{width: '100%', height: '90%'}}
              source={require('../react_native_weather_app/src/images/loader.json')}
              autoPlay
              loop
            />
            <Toast />
          </View>
        ) : (
          <View style={{flex: 1, marginTop: '20%', alignItems: 'center'}}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 55}}>
              {ApiData.temp}°C
            </Text>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 55}}>
              {search}
            </Text>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 50,
              }}>
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
                  {ApiData.temp_min}°C
                </Text>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
                  Min. Temp
                </Text>
              </View>
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
                  {ApiData.temp_max}°C
                </Text>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
                  Max. Temp
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%',
                borderBottomWidth: 3,
                borderColor: 'rgba(212, 212, 212, 0.77)',
                padding: 10,
                position: 'absolute',
                bottom: '10%',
              }}>
              <View style={{alignItems: 'center'}}>
                <Image
                  style={{width: 30, height: 30, marginBottom: 5}}
                  source={require('../react_native_weather_app/src/images/humidity.png')}
                />
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
                  {ApiData.humidity}
                </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Image
                  style={{width: 30, height: 30, marginBottom: 5}}
                  source={require('../react_native_weather_app/src/images/pressure.png')}
                />
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
                  {ApiData.pressure}
                </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Image
                  style={{
                    tintColor: 'white',
                    width: 30,
                    height: 30,
                    marginBottom: 5,
                  }}
                  source={require('../react_native_weather_app/src/images/feel.png')}
                />
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
                  {ApiData.feels_like}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={{position: 'absolute', bottom: 10}}
              onPress={() => Reset()}>
              <Image
                style={{width: 50, height: 50}}
                source={require('../react_native_weather_app/src/images/reset.png')}
              />
            </TouchableOpacity>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

export default App;
