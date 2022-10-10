import {useSelector} from 'react-redux';
import {RootState} from 'store/index';
import {Header} from './atoms/Header';
import {HorizontalList} from './organisms/HorizontalList';
import {PhotoItem} from './organisms/PhotoItem';

export const PhotoDetail = () => {
  const {photos, photoShowed} = useSelector((state: RootState) => state.photos);

  const initialScrollIndex = photos.findIndex(
    photo => photoShowed?.id === photo.id,
  );

  return (
    <>
      <Header />
      <HorizontalList
        data={photos}
        initialScrollIndex={initialScrollIndex}
        renderItem={({item, index}) => {
          let activeAnimation = true;
          if (index !== initialScrollIndex) {
            activeAnimation = false;
          }
          return <PhotoItem photo={item} activeAnimation={activeAnimation} />;
        }}
      />
    </>
  );
};
