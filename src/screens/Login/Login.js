import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  // TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { TextInput } from 'react-native-paper';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import Images from "../../utils/images";
import { Colors } from "../../utils/AppConstant";
import { useNavigation } from "@react-navigation/native";
import ApiModel from "../../common/ApiModel";
import { colors } from "react-native-elements";
 
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation()
  const [isLoding, setIsLoading] = useState(false)
  


   //Login function
   const onLogin = () => {
    console.log('HIT')
    // setIsLoading(true);
    let form = JSON.stringify({
      "emailId": email, // "Neeru.Joshi@Straviso.com",  //email,
      "password":  password , //"Blueprint@10", // Blueprint@10
      "userLoginIp": "103.210.201.230",
      "loginBrowser": "Chrome",
      "deviceType": "Desktop",
      "loginType": "myTaskEasy"
    });
    ApiModel.sendApiCall(
      '/nsauth/auth/login',
      form,
      null,
      response => {
        console.log('-----------response', response)
        setIsLoading(false);
        if (response?.status == 'Success') {
          navigation.replace('Home');
          // props.saveUserData(response?.sussess);
        } else {
          setIsLoading(false);
          // Snack('Email or password is incorrect')
        }
      },
      error => {
        setIsLoading(false);
        console.log('the error is ==>', error);
      },
    );
  };

 
  return (
    <ImageBackground source={Images.BackgroundImg} 
    style={styles.container}>

<View style={{width:'100%', height:'100%', marginTop:vh(25), alignSelf:'center', borderTopEndRadius:40, borderTopStartRadius:40, backgroundColor:Colors.white}}>
      <View style={styles.imgView}>
        <Image resizeMode='center' source={Images.ColoredLogo} style={styles.img} />
      </View>
      <View style={styles.imgView}>
      </View>
      <View style={styles.imgView}>
        <Image resizeMode='center' source={Images.Welcome} style={styles.img1} />
      </View>
      <Image resizeMode='center' source={Images.User} style={styles.userimg} />


<View style={{ width:'95%',alignSelf:'center'}}>
      <View style={styles.inputView}>
        {/* <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        /> */}

        <TextInput
            style={styles.TextInput}
            value={email}
            placeholderTextColor="#003f5c"
            onChangeText={(email) => setEmail(email)}
            theme={{
              roundness: 5,
              colors: {
                primary: Colors.black,
                text: Colors.black,
                placeholder: Colors.black
              },
            }}
            underlineColor={Colors.appColor}
            mode="outlined"
            label="Email"
            left={
              <TextInput.Icon name={Images.Group} size={22} color={'black'}/>
            }
          />
      </View>
 
      <View style={styles.inputView}>
        {/* <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        /> */}

        <TextInput
            style={styles.TextInput}
            value={password}
            placeholderTextColor="#000000"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            theme={{
              roundness: 5,
              colors: {
                primary: Colors.black,
                text: Colors.black,
                placeholder: Colors.black
              },
            }}
            underlineColor={Colors.black}
            mode="outlined"
            label="Password."
            left={
              <TextInput.Icon name={Images.Union} size={22} color={'black'}/>
            }
          />
      </View>
  </View>

 
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
 
      <TouchableOpacity onPress={() => onLogin()}
      // onPress={() => navigation.navigate('Home')} 
      style={styles.loginBtn}>
        <Text style={{color:colors.white}}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.text}>Don't have an accout? Sign Up Now</Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', alignItems: 'center',paddingHorizontal:20}}>
<View style={{flex: 1, height: 2, backgroundColor: 'rgb(202,202,202)'}} />
<View>
<Text style={{width: 40,color:'black', textAlign: 'center'}}>Or</Text>
</View>
<View style={{flex: 1, height: 2, backgroundColor: 'rgb(202,202,202)'}} />
</View>
      <TouchableOpacity>
        <Text style={styles.text}>Sign up with  Social  Networks</Text>
      </TouchableOpacity>
      
      <View style={{flexDirection:'row', justifyContent:'space-around', width:'60%', alignSelf:'center'}}>
      <Image resizeMode='center' source={Images.azure} style={styles.img6} />
      <Image resizeMode='center' source={Images.Google} style={styles.img6} />
      <Image resizeMode='center' source={Images.facebook} style={styles.img6} />
      <Image resizeMode='center' source={Images.linkedin} style={styles.img6} />
      </View>
  </View>
    </ImageBackground>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  imgView: {
    alignSelf: 'center',
    width:'100%',
    marginTop:-vh(5),
  },
  img: {
    width: vw(50),
    height: vh(20),
    borderRadius: 20,
    alignSelf: 'center',
  },
  img1: {
    width: vw(25),
    height: vh(10),
    borderRadius: 5,
    alignSelf: 'center',
    marginTop:vh(3),
  },
  userimg: {
    width: vw(15),
    height: vh(12),
    borderRadius: 20,
    alignSelf: 'center',
    marginTop:-vh(4),
  },
  inputView: {
    borderRadius: 5,
    borderColor:'grey',
    // borderWidth:1,
    width: "95%",
    height: 45,
    marginBottom: 20,
    alignSelf: "center",
    marginLeft:30
  },
 
  TextInput: {
    height: 50,
    width:'90%',
    // flex: 1,
    // padding: 10,
    // marginLeft: 20,
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 20,
    alignSelf:'flex-end',
    marginRight:28,
    color: "black",
    // marginTop:-vh(1),
  },
 
  loginBtn: {
    width: "80%",
    // borderRadius: 25,
    height: 50,
    alignItems: "center",
    alignSelf:'center',
    justifyContent: "center",
    marginTop:-vh(2),
    backgroundColor: "#0000B9",
  },
  text: {
    height: 30,
    marginBottom: 20,
    alignSelf:'center',
    color: "black",
    marginTop: 9,
  },
  
  img6: {
    width: vw(10),
    height: vh(10),
    // borderRadius: 5,
    alignSelf: 'center',
    marginTop:-vh(3),
  },
});
