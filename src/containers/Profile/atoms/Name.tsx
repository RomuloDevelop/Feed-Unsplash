import {StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {DEVICE_WIDTH} from '../../../config/sizes';

type Props = {children: string};

export const Name = ({children}: Props) => (
  <Animatable.Text
    numberOfLines={1}
    style={styles.profileName}
    animation={nameFadeIn}
    easing="ease-out-circ">
    {children}
  </Animatable.Text>
);

const styles = StyleSheet.create({
  profileName: {
    fontSize: 22,
    color: 'black',
  },
});

const nameFadeIn = {
  from: {
    left: DEVICE_WIDTH / 2,
    opacity: 0,
  },
  to: {
    left: 0,
    opacity: 1,
  },
};
