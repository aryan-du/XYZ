import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import { Colors } from '../../utils/AppConstant';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.themeColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgView: {
    alignSelf: 'center',
    // backgroundColor:'pink',
    width:'100%'
  },
  img: {
    width: vw(100),
    height: vh(60),
    borderRadius: 20,
    alignSelf: 'center',
  },
  txt: {
    fontSize: 30,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: Colors.white,
  },
});

export default styles;
