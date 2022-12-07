import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Splash from '../screens/Splash/index';
import Login from '../screens/Login/Login';
import {Colors} from '../utils/AppConstant';
import Home from '../screens/Home';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function AppContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Tab.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const Bottom = () => {
//   return (
//     <Tab.Navigator
//       initialRouteName="Home"
//       screenOptions={({route}) => ({
//         headerShown: false,
//         tabBarIcon: ({focused}) => {
//           let iconName;

//           if (route.name === 'Home') {
//             iconName = focused ? Icons.home_selected : Icons.home_unselected;
//           } else if (route.name === 'Repayment') {
//             iconName = focused
//               ? Icons.repaymentFill
//               : Icons.repayment;
//           }  else if (route.name === 'Repayment History') {
//             iconName = focused
//               ? Icons.transactionLight
//               : Icons.TransactionDrk;
//            } else if (route.name === 'Profile') {
//             iconName = focused ? Icons.user : Icons.user_unselected;
//           }
//           return <Image source={iconName} style={styles.img} />;
//         },
//         tabBarActiveTintColor: Colors.black,
//         tabBarInactiveTintColor: 'gray',
//       })}>
//       <Tab.Screen name="Home" component={Home} />
//       <Tab.Screen name='Repayment' component={Repayment}/>
//       <Tab.Screen name='Repayment History' component={Repayment_History}/>
//       <Tab.Screen name="Profile" component={Profile} />
//     </Tab.Navigator>
//   );
// };

const styles = StyleSheet.create({
  img: {
    width: 25,
    height: 25,
    top: 2,
  },
});
