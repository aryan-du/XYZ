import { StyleSheet, Platform } from 'react-native'

const Textstyles = StyleSheet.create({
    bold: { fontFamily: Platform.OS === 'android' ? 'Poppins-Bold' : 'Poppins-Bold' },
    normal: { fontFamily: Platform.OS === 'android' ? 'Poppins-Regular' : 'Poppins-Regular' },
    medium: { fontFamily: Platform.OS === 'android' ? 'Poppins-Medium' : 'Poppins-Medium' }

})

export default Textstyles