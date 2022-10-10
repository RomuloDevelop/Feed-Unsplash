import {StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';

type Props = {children: string};

export const Biography = ({children}: Props) => (
  <Animatable.Text
    numberOfLines={4}
    style={styles.profileBio}
    animation={bioFadeIn}
    easing="ease-out-circ">
    {children}
  </Animatable.Text>
);

const styles = StyleSheet.create({
  profileBio: {
    fontSize: 12,
    color: '#030303',
  },
});

const bioFadeIn = {
  from: {
    top: 50 / 2,
    opacity: 0,
  },
  to: {
    top: 0,
    opacity: 1,
  },
};
