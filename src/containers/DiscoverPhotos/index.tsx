import {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {AppDispatch, RootState} from '../../store';
import {fetchPhotos, setPhotoShowed} from '../../store/photos';
import {useNavigation} from '@react-navigation/native';
import {Loader} from '../../components/loader';
import {Feed} from '../../components/Feed';
import {PHOTO_DETAIL} from '../../navigation/routes';
import {usePhotosPaginator} from '../../hooks/usePaginator';
import {FETCH_STATE} from '../../config/enums';
import {useGetPhotos} from '../../hooks/useGetPhotos';

export const DiscoverPhotos = () => {
  const navigation = useNavigation();
  const addPage = usePhotosPaginator((page: number) => fetchPhotos(page));
  const dispatch = useDispatch<AppDispatch>();
  const {photos, loading} = useGetPhotos('photos') as RootState['photos'];

  const onPressItem = (photoId: number | string) => {
    dispatch(setPhotoShowed(photoId));
    navigation.navigate(PHOTO_DETAIL);
  };

  const addNewPage = useCallback(() => {
    if (loading !== FETCH_STATE.PENDING) {
      addPage();
    }
  }, [loading, addPage]);

  if (loading === FETCH_STATE.PENDING && !photos?.length) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <Feed data={photos} onPress={onPressItem} onEndReached={addNewPage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});
