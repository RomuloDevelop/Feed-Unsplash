import {StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {DEVICE_WIDTH} from '@config/sizes';
import {INFO_ANIMATION_DURATION, TITLE_ANIMATION_DURATION} from '../config';

type Props = {activeAnimation: boolean; children: string};

export const Title = ({activeAnimation, children}: Props) => (
  <Animatable.Text
    animation={activeAnimation ? titleFadeIn : undefined}
    duration={TITLE_ANIMATION_DURATION}
    delay={INFO_ANIMATION_DURATION}
    style={styles.infoTitle}
    numberOfLines={2}>
    {children || 'No description'}
  </Animatable.Text>
);

const styles = StyleSheet.create({
  infoTitle: {
    color: 'white',
    fontSize: 42,
  },
});

const titleFadeIn = {
  from: {
    left: DEVICE_WIDTH,
    opacity: 0,
  },
  to: {
    left: 0,
    opacity: 1,
  },
};
