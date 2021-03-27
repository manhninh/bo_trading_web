import { Colors } from 'styles/colors';
import { s } from 'styles/scalingUtils';
import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  imgLogo: {
    marginTop: s(30),
    width: Dimensions.get('window').width - s(150),
    height: Dimensions.get('window').width - s(150),
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white
  }
});

export default styles;
