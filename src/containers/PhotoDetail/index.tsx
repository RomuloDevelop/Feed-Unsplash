import {useRef, useState} from 'react';
import {
  FlatList,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewabilityConfigCallbackPair,
  ViewabilityConfigCallbackPairs,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import {Loader} from '../../components/loader';
import {PROFILE} from '../../navigation/routes';
import {AppDispatch, RootState} from '../../store';
import {fetchUserPhotos, setUser} from '../../store/user';
import {
  INFO_HEIGHT,
  LIKE_DELAY,
  TITLE_ANIMATION_DURATION,
  PROFILE_DELAY,
  TEXT_ANIMATION_DURATION,
  INFO_ANIMATION_DURATION,
} from './config';
import {Basic as BasicUser} from 'unsplash-js/dist/methods/users/types';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

export const PhotoDetail = () => {
  const listRef = useRef<any>(null);
  const nextIndex = useRef<number | null>(null);
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(true);
  const {photos, photoShowed} = useSelector((state: RootState) => state.photos);

  const initialScrollIndex = photos.findIndex(
    photo => photoShowed?.id === photo.id,
  );

  const onViewableItemsChanged: ViewabilityConfigCallbackPair['onViewableItemsChanged'] =
    data => {
      console.log('data', data.changed);
      nextIndex.current = data.changed[0].index;
      console.log(nextIndex.current);
    };

  const viewabilityConfigCallbackPairs = useRef<ViewabilityConfigCallbackPairs>(
    [
      {
        onViewableItemsChanged,
        viewabilityConfig: {viewAreaCoveragePercentThreshold: 51},
      },
    ],
  );

  const onResponderRelease = () => {
    console.log('release', nextIndex.current);
    if (nextIndex.current && listRef?.current) {
      listRef.current?.scrollToIndex({
        animated: true,
        index: nextIndex.current,
      });
    }
  };

  const gesture = Gesture.Pan().onEnd(onResponderRelease);

  const finishLoadingImage = () => {
    setLoading(false);
  };

  const goToProfile = (user: BasicUser) => {
    if (user) {
      dispatch(setUser(user));
      dispatch(fetchUserPhotos({page: 1, username: user.username}));
      navigation.navigate(PROFILE);
    }
  };

  return (
    <FlatList
      ref={listRef}
      data={photos}
      onScrollEndDrag={onResponderRelease}
      onMomentumScrollEnd={onResponderRelease}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      initialScrollIndex={initialScrollIndex}
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      renderItem={({item, index}) => {
        let activeAnimation = true;
        if (index !== initialScrollIndex) {
          activeAnimation = false;
        }
        return (
          <View
            style={styles.container}
            onResponderRelease={onResponderRelease}>
            {loading && (
              <View style={styles.loader}>
                <Loader />
              </View>
            )}
            <Image
              style={styles.backgroundImage}
              source={{uri: item?.urls.full}}
              onLoad={finishLoadingImage}
            />
            <Animatable.View
              style={styles.infoContainer}
              animation={activeAnimation ? animations.infoFadeIn : undefined}
              duration={INFO_ANIMATION_DURATION}>
              <LinearGradient
                style={styles.infoGradient}
                colors={['#00000033', '#000000b3']}>
                <Animatable.Text
                  animation={
                    activeAnimation ? animations.titleFadeIn : undefined
                  }
                  duration={TITLE_ANIMATION_DURATION}
                  delay={INFO_ANIMATION_DURATION}
                  style={styles.infoTitle}
                  numberOfLines={2}>
                  {item?.description || 'No description'}
                </Animatable.Text>
                <Animatable.Text
                  animation={
                    activeAnimation ? animations.likeFadeIn : undefined
                  }
                  delay={LIKE_DELAY}
                  duration={TEXT_ANIMATION_DURATION}
                  style={styles.infoLikes}>
                  {item?.likes || 0} likes
                </Animatable.Text>
                <Animatable.View
                  animation={
                    activeAnimation ? animations.profileFadeIn : undefined
                  }
                  delay={PROFILE_DELAY}
                  duration={TEXT_ANIMATION_DURATION}
                  style={styles.profileContainer}>
                  <Image
                    style={styles.profileImage}
                    source={{uri: item.user?.profile_image.small}}
                  />
                  <View style={styles.profileNameContainer}>
                    <Text style={styles.profileName}>
                      {item?.user?.first_name}
                    </Text>
                    <TouchableOpacity onPress={() => goToProfile(item.user)}>
                      <Text style={styles.profileActionText}>View profile</Text>
                    </TouchableOpacity>
                  </View>
                </Animatable.View>
              </LinearGradient>
            </Animatable.View>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  loader: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  backgroundImage: {
    flex: 1,
  },
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
  infoTitle: {
    color: 'white',
    fontSize: 42,
  },
  infoLikes: {
    color: 'white',
    opacity: 0.75,
    fontSize: 14,
    marginVertical: 16,
  },
  profileContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  profileImage: {
    width: 37,
    aspectRatio: 1 / 1,
    borderRadius: 37 / 2,
    marginRight: 8,
  },
  profileNameContainer: {
    flex: 1,
  },
  profileName: {
    color: 'white',
    fontSize: 12,
  },
  profileActionText: {
    fontSize: 10,
    opacity: 0.75,
    color: 'white',
    marginTop: 7,
  },
});

const animations = {
  infoFadeIn: {
    from: {
      bottom: -INFO_HEIGHT,
      opacity: 0,
    },
    to: {
      bottom: 0,
      opacity: 1,
    },
  },
  titleFadeIn: {
    from: {
      left: Dimensions.get('window').width,
      opacity: 0,
    },
    to: {
      left: 0,
      opacity: 1,
    },
  },
  likeFadeIn: {
    from: {
      left: 20,
      opacity: 0,
    },
    to: {
      left: 0,
      opacity: 1,
    },
  },
  profileFadeIn: {
    from: {
      top: 20,
      opacity: 0,
    },
    to: {
      top: 0,
      opacity: 1,
    },
  },
};
