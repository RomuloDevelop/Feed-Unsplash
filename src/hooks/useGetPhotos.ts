import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import {FETCH_STATE} from '../config/enums';
import {RootState} from '../store';

export const useGetPhotos = (reduceKey: 'user' | 'photos') => {
  const {loading, ...params} = useSelector(
    (state: RootState) => state[reduceKey],
  );

  useEffect(() => {
    if (loading === FETCH_STATE.FAILED) {
      Toast.show({
        type: 'error',
        text1: 'There was an error obtaining batch of photos',
      });
    }
  }, [loading]);

  return {...params, loading};
};
