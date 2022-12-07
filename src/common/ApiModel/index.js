import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {Alert} from 'react-native';

let baseUrl = 'https://mytaskeasy.straviso.net';


export default {
  sendApiCall: async (
    url,
    payload,
    method,
    successHandler,
    ErrorHandler,
    formDatas,
    showAPIError,
  ) => {
    method = method ? method : 'POST';
    // var token = await AsyncStorage.getItem('token');
    var token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0NjY5OCIsImVtYWlsSWQiOiJuZWVydS5qb3NoaUBzdHJhdmlzby5jb20iLCJidXNpbmVzc0lkIjoiTVRFMDAwMDEzIiwiZmlyc3ROYW1lIjoibmVlcnUiLCJsYXN0TmFtZSI6Impvc2hpIiwiaWF0IjoxNjcwNDM0NDE5LCJleHAiOjE2NzEyOTg0MTl9.oUJubTSzDQzwgRLa7cfsSY5P_xmONLiEy3TelnFGOwmM7It_Kt7gAtqR5-4RBaJBBPfteMwnOHbaFxicJqYC_A'
    var headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      var headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      };
    }

    if (formDatas) {
      var headers = {
        'Content-Type': 'multipart/form-data',
        // Authorization: 'Bearer' +token
      };
    }
    var callState = null;
    var requestBody = {
      method: method,
      headers: headers,
    };
    if (method == 'POST') {
      requestBody.body = payload;
    }

    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        fetch(baseUrl + url, requestBody)
          .then(response => {
            callState = response.status;
            return response.json();
          })
          .then(responsejson => {
            if (callState == 200 || callState == 201 || callState == 'ok') {
              if (responsejson.status == 'error') {
                ErrorHandler(responsejson);
                if (!showAPIError) {
                  Alert.alert(
                    'Error',
                    responsejson.error,
                    [{text: 'OK', onPress: () => {}, style: 'default'}],
                    {cancelable: false},
                  );
                }
              } else {
                successHandler(responsejson);
              }
            } else {
              ErrorHandler(responsejson);
            }
          })
          .catch(error => {
            ErrorHandler(error);
            Alert.alert(
              'Server Error',
              'Something went wrong, while communicating with server.',
              [{text: 'OK', onPress: () => {}, style: 'default'}],
              {cancelable: false},
            );
          });
      } else {
        Alert.alert(
          'Network Error',
          'You are not connected to the internet, check your network connection and try again.',
          [{text: 'OK', onPress: () => {}, style: 'default'}],
          {cancelable: false},
        );
      }
    });
  },
};
