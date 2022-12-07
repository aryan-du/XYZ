import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  StyleSheet,
  Text,
  View,
  Image,
  // TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';
import {TextInput, DataTable} from 'react-native-paper';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import Images from '../../utils/images';
import {Colors} from '../../utils/AppConstant';
import {useNavigation} from '@react-navigation/native';
import ApiModel from '../../common/ApiModel';
import moment from 'moment'

export default function Home() {
  const navigation = useNavigation();
  const [isLoding, setIsLoading] = useState(false)
  const [task, setTask] = useState('')

  console.log('----------------------task', task)


   //Login function
   const onFindTasks = () => {
    console.log('HIT')
    // setIsLoading(true);
    let form = JSON.stringify({
      "userId": 306, 
      "status": "Assigned", 
      "action": "My Active Task"
    });
    ApiModel.sendApiCall(
      '/teg/TaskEasy/Reports/taskReport/findTasks',
      form,
      null,
      response => {
        // console.log('-------FIND TASK----response', response)
        setIsLoading(false);
        if (response?.result == 'Success') {
          setTask(response?.responseData)
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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      onFindTasks();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(()=>{
    onFindTasks()
   },[])
  

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: '#F5F5F5',
          paddingHorizontal: 5,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          height: 56,
          width: '100%',
          elevation: 5,
          shadowColor: '#00000040',
        }}>
        <Image
          resizeMode="center"
          source={Images.User}
          style={{height: 50, top: 2, width: 50}}
        />

        <Image
          resizeMode="center"
          source={Images.ColoredLogo}
          style={{justifyContent: 'center', width: 130}}
        />

        <Image
          resizeMode="center"
          source={Images.Notification}
          style={{height: 22, justifyContent: 'center', width: 22}}
        />
      </View>
      <View style={styles.searchBar}>
      <TextInput
          // style={styles.searchBox}
          placeholder="Search"
          style={styles.TextInput}
          placeholderTextColor="#9CA3AF"
          // theme={{roundness: 15}}
          right={
            <TextInput.Icon name={Images.Search} size={12} color={'#9CA3AF'} />
          }
        />
      </View>

      <View style={styles.readingsContainer}>
        <View style={styles.readingView}>
          <TextInput style={styles.readingInput1}></TextInput>
          <Text>Total Tickets</Text>
        </View>
        <View style={styles.readingView}>
          <TextInput style={styles.readingInput2}></TextInput>
          <Text>Open Tickets</Text>
        </View>
        <View style={styles.readingView}>
          <TextInput style={styles.readingInput3}></TextInput>
          <Text>Closed Tickets</Text>
        </View>
      </View>

      <View style={styles.smallContainer}>
        <Text style={styles.textTicket}>Total Tickets</Text>
        <View style={styles.iconsContainer}>
          <Image
            resizeMode="center"
            source={Images.CardView}
            style={styles.iconimg}
          />
          <Image
            resizeMode="center"
            source={Images.Filter}
            style={styles.iconimg}
          />
          <Image
            resizeMode="center"
            source={Images.Calander}
            style={styles.iconimg}
          />
        </View>
      </View>



      <View style={styles.tableContainer}>
        <DataTable style={styles.table}>
          <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title style={styles.title}>
              <View style={{flex: 0.5}}>
                <Text style={{color: '#fff', fontSize: 15,marginLeft:-10}}>TicketId</Text>
              </View>
              <View style={styles.upDownicon}>
                <Text style={{marginLeft: 15}}>
                  <Icon name="caretup" size={10} color="#fff" />
                </Text>
                <Text style={{marginLeft: 15}}>
                  <Icon name="caretdown" size={10} color="#fff" />
                </Text>
              </View>
            </DataTable.Title>
            <DataTable.Title style={styles.title}>
              <View style={{flex: 0.5, justifyContent:'flex-start',alignSelf:'flex-start'}}>
                <Text style={{color: '#fff', fontSize: 15}}>Severity</Text>
              </View>
              <View style={styles.upDownicon}>
                <Text style={{marginLeft: 10}}>
                  <Icon name="caretup" size={10} color="#fff" />
                </Text>
                <Text style={{marginLeft: 10}}>
                  <Icon name="caretdown" size={10} color="#fff" />
                </Text>
              </View>
            </DataTable.Title>
            <DataTable.Title style={styles.title}>
              <View style={{flex: 0.5}}>
                <Text style={{color: '#fff', fontSize: 15,marginLeft: 5}}>Status</Text>
              </View>
              <View style={styles.upDownicon}>
                <Text style={{marginLeft: 15}}>
                  <Icon name="caretup" size={10} color="#fff" />
                </Text>
                <Text style={{marginLeft: 15}}>
                  <Icon name="caretdown" size={10} color="#fff" />
                </Text>
              </View>
            </DataTable.Title>


            <DataTable.Title style={styles.title1}>
              <View style={{flex: 0.5}}>
              <Text style={{color: '#fff', fontSize: 15}}>CreatedData</Text>
              
              </View>
              <View style={styles.upDownicon}>
                <Text>
                  <Icon name="caretup" size={10} color="#fff" />
                </Text>
                <Text>
                  <Icon name="caretdown" size={10} color="#fff" />
                </Text>
              </View>
            </DataTable.Title>
          </DataTable.Header>

          <FlatList
              data={task}
              renderItem={({ item, index }) => (
                      <DataTable.Row style={styles.row}>
                        <DataTable.Cell>{item?.taskId}</DataTable.Cell>
                        <DataTable.Cell>{item?.priority}</DataTable.Cell>
                        <DataTable.Cell>{item?.status}</DataTable.Cell>
                        <DataTable.Cell>{moment(item?.createdDate).format('DD/MM/YYYY')}</DataTable.Cell>
                      </DataTable.Row>
                  )}
                  keyExtractor={(i, index) => 'id' + index}
              />


         
          
          
        </DataTable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: "center",
    // justifyContent: "center",
  },
  imgView: {
    alignSelf: 'center',
    width: '100%',
    marginTop: -vh(5),
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
    marginTop: vh(3),
  },
  userimg: {
    width: vw(15),
    height: vh(12),
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: -vh(4),
  },
  iconimg: {
    width: vw(8),
    textAlign: 'right',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    // marginTop: -vh(14),
  },
  inputView: {
    borderRadius: 5,
    borderColor: 'grey',
    // borderWidth:1,
    width: '95%',
    height: 45,
    marginBottom: 20,
    alignSelf: 'center',
    marginLeft: 30,
  },

  TextInput: {
    width: '90%',
    fontSize: 15,
    backgroundColor: '#F5F5F5',
    paddingLeft: 14,
    alignSelf: 'center',
    height: 50,
    marginTop: 20,
    // flex: 1,
    // padding: 10,
    // marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 20,
    alignSelf: 'flex-end',
    marginRight: 28,
    color: 'black',
    // marginTop:-vh(1),
  },

  loginBtn: {
    width: '80%',
    // borderRadius: 25,
    height: 50,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: -vh(2),
    backgroundColor: '#0000B9',
  },
  text: {
    height: 30,
    marginBottom: 20,
    alignSelf: 'center',
    color: 'black',
    marginTop: 9,
  },

  img6: {
    width: vw(10),
    height: vh(10),
    // borderRadius: 5,
    alignSelf: 'center',
    marginTop: -vh(3),
  },
  searchBar: {
    // marginTop: 10,
    // padding: 2,
    backgroundColor: '#FFF',
    // elevation: 10,
    // shadowColor: '##00000029',
  },
  searchBox: {
    borderColor: '#C0C0C0',
    elevation: 5,
    shadowColor: '##00000029',
  },
  readingsContainer: {
    flex: 0.1,
    flexDirection: 'row',
    width: '90%',
    marginTop: 10,
    height: 20,
    // alignItems:'center',
    // alignContent:'center',
    alignSelf: 'center',
    // padding: 2,
    backgroundColor: '#FFF',
  },
  readingView: {
    width: '30%',
    marginRight: 15,
    // height:20,
  },
  readingInput1: {
    height: 50,
    backgroundColor: '#2E3191',
    // borderRadius:20,
    marginTop: 10,
    elevation: 3,
    shadowColor: '##00000029',
  },
  readingInput2: {
    height: 50,
    backgroundColor: '#FFF9E8',
    borderColor: '#E8AE0C',
    borderWidth: 1,
    // borderRadius:20,
    marginTop: 10,
    elevation: 3,
    shadowColor: '##00000029',
  },
  readingInput3: {
    height: 50,
    backgroundColor: '#F5F5F5',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    // borderRadius:20,
    marginTop: 10,
    elevation: 3,
    shadowColor: '##00000029',
  },
  smallContainer: {
    flex: 0.1,
    flexDirection: 'row',
    width: '90%',
    marginTop: 50,
    alignSelf: 'center',
  },
  textTicket: {
    fontSize: 24,
    fontWeight: 'bold',
    // marginBottom: 20,
    alignSelf: 'center',
    color: '#2E3191',
    marginTop: 9,
  },
  iconsContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 50,
    justifyContent: 'flex-end',
  },
  tableContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '90%',
    passingTop: 150,
    alignSelf: 'center',
    fontSize: 30,
    color: '#FFF',
  },
  table: {
    borderWidth: 1,
    borderColor: '#B1B1B1',
  },
  tableHeader: {
    backgroundColor: '#2E3191',
    height: 40,
    textAlign: 'center',
    justifyContent: 'center',
  },
  title: {
    // flex: 1,
    // marginTop: 0,
    // marginBottom: 0,
    // justifyContent: 'center',
    // textAlign: 'left',
    // alignSelf: 'center',
    // marginRight: 10,
    // paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: '#FFF',
  },
  title1: {
    // fontSize: 20,
    // // marginLeft: 10,
    // // marginRight: 10,
    // color: '#FFF',
    // borderRightWidth: 1,
    // borderRightColor: '#FFF',
  },
  row: {height: 40, backgroundColor: '#F5F5F5'},
  row1: {height: 40, backgroundColor: '#FCFCFC'},

  upDownicon: {
    // marginTop:20,
    flex: 1,
    flexDirection: 'column',
    // alignItems: 'flex-end',
    // alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 20,
    // marginLeft: 15,
    // paddingLeft:15,
  },
  upDownicon1: {
    marginBottom: 20,
  },
});
