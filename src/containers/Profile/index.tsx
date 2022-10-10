import {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Basic} from 'unsplash-js/dist/methods/users/types';
import {Feed} from '../../components/Feed';
import {Loader} from '../../components/loader';
import {usePhotosPaginator} from '../../hooks/usePaginator';
import {RootState} from '../../store';
import {fetchUserPhotos} from '../../store/user';
import {Header} from './atoms/Header';
import {Title} from './atoms/Title';
import {ProfileContainer} from './molecules/ProfileContainer';

export const Profile = () => {
  const {user, loading, photos} = useSelector((state: RootState) => state.user);
  const addPage = usePhotosPaginator((page: number) =>
    fetchUserPhotos({page, username: user?.username || ''}),
  );
  const addNewPage = useCallback(() => {
    if (!loading) {
      addPage();
    }
  }, [loading, addPage]);

  if (loading && !photos?.length && user === null) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <Header />
      <Feed
        data={photos}
        onEndReached={addNewPage}
        header={() => (
          <>
            <ProfileContainer user={user as Basic} />
            <Title />
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});
