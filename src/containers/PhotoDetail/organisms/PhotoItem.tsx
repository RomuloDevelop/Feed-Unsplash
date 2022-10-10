import {useState} from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
import {Basic as BasicPhoto} from 'unsplash-js/dist/methods/photos/types';
import {PROFILE} from '@navigation/routes';
import {AppDispatch} from '@store/index';
import {setUser} from '@store/user';
import {Title} from '../atoms/Title';
import {INFO_ANIMATION_DURATION, INFO_HEIGHT} from '../config';
import {Likes} from '../atoms/Likes';
import {ProfileInfo} from '../molecules/ProfileInfo';
import {PhotoContainer} from '../molecules/PhotoContainer';

type Props = {activeAnimation: boolean; photo: BasicPhoto};

export const PhotoItem = ({activeAnimation, photo}: Props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(true);

  const goToProfile = () => {
    if (photo.user) {
      dispatch(setUser(photo.user));
      navigation.navigate(PROFILE);
    }
  };

  const finishLoadingImage = () => {
    setLoading(false);
  };

  return (
    <PhotoContainer
      imageUri={photo.urls.full}
      loading={loading}
      finishLoadingImage={finishLoadingImage}>
      <Animatable.View
        style={styles.infoContainer}
        animation={activeAnimation ? infoFadeIn : undefined}
        duration={INFO_ANIMATION_DURATION}>
        <LinearGradient
          style={styles.infoGradient}
          colors={['#00000033', '#000000b3']}>
          <Title activeAnimation={activeAnimation}>
            {photo.description || 'No description'}
          </Title>
          <Likes activeAnimation={activeAnimation}>{photo.likes || 0}</Likes>
          <ProfileInfo
            activeAnimation={activeAnimation}
            name={photo.user.name}
            imageUri={photo.user?.profile_image.small}
            onViewDetail={goToProfile}
          />
        </LinearGradient>
      </Animatable.View>
    </PhotoContainer>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    height: INFO_HEIGHT,
  },
  infoGradient: {
    width: '100%',
    height: '100%',
    paddingTop: 33,
    paddingHorizontal: 26,
    paddingBottom: 52,
  },
});

const infoFadeIn = {
  from: {
    bottom: -INFO_HEIGHT,
    opacity: 0,
  },
  to: {
    bottom: 0,
    opacity: 1,
  },
};
