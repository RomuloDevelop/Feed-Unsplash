import {StyleSheet, Text} from 'react-native';
import * as Animatable from 'react-native-animatable';

export const Title = () => (
  <Animatable.View duration={700} animation={fadeInTitle}>
    <Text style={styles.title}>My Photos</Text>
  </Animatable.View>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 42,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 30,
  },
});

const fadeInTitle = {
  0: {
    top: 40,
    opacity: 0.3,
  },
  1: {
    top: 0,
    opacity: 1,
  },
};
