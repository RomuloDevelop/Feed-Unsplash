import {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store';
import {fetchPhotos, setPhotoShowed} from '../../store/photos';
import {useNavigation} from '@react-navigation/native';
import {Loader} from '../../components/loader';
import {Feed} from '../../components/Feed';
import {PHOTO_DETAIL} from '../../navigation/routes';

export const DiscoverPhotos = () => {
  const navigation = useNavigation();
  const [page, setPage] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const {photos, loading} = useSelector((state: RootState) => state.photos);

  useEffect(() => {
    dispatch(fetchPhotos(page));
  }, [dispatch, page, navigation]);

  const onPressItem = (photoId: number | string) => {
    dispatch(setPhotoShowed(photoId));
    navigation.navigate(PHOTO_DETAIL, {});
  };

  const addNewPage = useCallback(() => {
    if (!loading && page < 12) {
      setPage(page + 1);
    }
  }, [loading, page]);

  if (loading && !page) {
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
