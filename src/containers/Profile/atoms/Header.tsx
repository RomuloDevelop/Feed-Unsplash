import {useNavigation} from '@react-navigation/native';
import {Animated, Image, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';

export const Header = () => {
  const {goBack} = useNavigation();

  return (
    <Animated.View style={[styles.headerContainer]}>
      <TouchableOpacity style={styles.btnBack} onPress={() => goBack()}>
        <Image source={require('@assets/close_black.png')} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    zIndex: 2,
    width: '100%',
    paddingTop: 59,
    paddingLeft: 25,
    height: 100,
  },
  btnBack: {
    zIndex: 3,
    height: 40,
    aspectRatio: 1 / 1,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffffc7',
  },
});
