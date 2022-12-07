import {
  View,
  StatusBar,
  ImageBackground,
  Alert,
  Text,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import Images from '../../utils/images';
import styles from './styles';
import {Colors} from '../../utils/AppConstant';

export default function Splash() {
  const navigation = useNavigation();
  const [retry, settry] = useState(0);
  const [getMobile, setAsync] = useState('');
  const TRANSITIONS = ['fade', 'slide', 'none'];
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0],
  );

  // const gettingData = async () => {
  //   let Mobile = await AsyncStorage.getItem('UserId');
  //   setAsync(Mobile)
  //   settry(retry + 1);
  // await NetInfo.refresh().then(state => {
  //     if (state.isConnected) {
  //       setTimeout(() => {
  //         if (Mobile != null) {
  //           navigation.replace('Bottom')
  //         }else {
  //         navigation.replace('Login')
  //         }
  //       }, 2000);
  //     }
  //   });

  // };

  // useEffect(()=>{
  //   gettingData()
  // }, [getMobile])

  // const refreshPage = async () => {
  //   settry(retry + 1);
  //   let Mobile = await AsyncStorage.getItem('UserId');
  //   NetInfo.refresh().then(state => {
  //     if (state.isConnected) {
  //       setTimeout(() => {
  //         if (Mobile != null) {
  //           navigation.replace('Bottom')
  //         }else {
  //         navigation.replace('Login')
  //         }
  //       }, 2000);
  //     }
  //   });
  // };

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
  }, [retry]);

  return (
    <ImageBackground source={Images.BackgroundImg} style={styles.container}>
      <StatusBar
        backgroundColor={'black'}
        animated={true}
        showHideTransition={statusBarTransition}
      />
      <View style={styles.imgView}>
        <Image resizeMode="center" source={Images.Logo} style={styles.img} />
      </View>
    </ImageBackground>
  );
}
