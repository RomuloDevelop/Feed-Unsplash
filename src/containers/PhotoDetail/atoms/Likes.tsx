import {StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {LIKE_DELAY, TEXT_ANIMATION_DURATION} from '../config';

type Props = {activeAnimation: boolean; children: number};
export const Likes = ({activeAnimation, children}: Props) => (
  <Animatable.Text
    animation={activeAnimation ? likeFadeIn : undefined}
    delay={LIKE_DELAY}
    duration={TEXT_ANIMATION_DURATION}
    style={styles.infoLikes}>
    {children || 0} likes
  </Animatable.Text>
);

const styles = StyleSheet.create({
  infoLikes: {
    color: 'white',
    opacity: 0.75,
    fontSize: 16,
    marginVertical: 16,
  },
});

const likeFadeIn = {
  from: {
    left: 20,
    opacity: 0,
  },
  to: {
    left: 0,
    opacity: 1,
  },
};
