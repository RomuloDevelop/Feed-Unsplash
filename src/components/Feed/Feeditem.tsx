import {
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import {ANIMATION_DURATION} from './config';
import {DEVICE_WIDTH} from '@config/sizes';

type Props = {
  onPress: TouchableOpacityProps['onPress'];
  imageUri: string;
  animationDelay: number;
  activeAnimation: boolean;
  customStyles?: Record<string, string | number> | null;
  likes?: number | null;
  description?: string | null;
};

export const FeedItem = ({
  onPress,
  imageUri,
  animationDelay,
  activeAnimation,
  customStyles = {},
  likes,
  description,
}: Props) => {
  const descriptionDelay = animationDelay + ANIMATION_DURATION * 0.7;
  const likesDelay = animationDelay + ANIMATION_DURATION * 1.5;

  return (
    <Animatable.View
      animation={activeAnimation ? animations.fadeInContainer : undefined}
      delay={animationDelay}>
      <TouchableOpacity
        style={[styles.container, customStyles]}
        onPress={onPress}>
        <Image source={{uri: imageUri}} style={styles.photo} />
        <LinearGradient
          style={styles.infoContainer}
          colors={['#00000033', '#000000b3']}>
          <Animatable.Text
            animation={activeAnimation ? animations.fadeInText : undefined}
            duration={ANIMATION_DURATION}
            delay={descriptionDelay}
            style={styles.title}
            numberOfLines={2}>
            {description || 'No description'}
          </Animatable.Text>
          <Animatable.Text
            animation={activeAnimation ? animations.fadeInText : undefined}
            duration={ANIMATION_DURATION}
            delay={likesDelay}
            style={styles.likes}>
            {likes || 0} likes
          </Animatable.Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animatable.View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    overflow: 'hidden',
    width: DEVICE_WIDTH / 2 - 26 * 1.5,
    aspectRatio: 151 / 218,
  },
  listContainer: {
    paddingHorizontal: 26,
  },
  photo: {
    flex: 1,
  },
  infoContainer: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    paddingHorizontal: 12,
    paddingTop: 19,
    paddingBottom: 12,
  },
  title: {
    fontSize: 14,
    color: 'white',
    marginBottom: 5,
  },
  likes: {
    fontSize: 10,
    color: 'white',
    opacity: 0.65,
  },
});

const animations = {
  fadeInContainer: {
    from: {
      left: 20,
      opacity: 0,
    },
    to: {
      left: 0,
      opacity: 1,
    },
  },
  fadeInText: {
    from: {
      top: 10,
      opacity: 0,
    },
    to: {
      top: 0,
      opacity: 1,
    },
  },
};
