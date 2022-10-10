import {StyleSheet} from 'react-native';
import {Image, View} from 'react-native-animatable';
import {Loader} from '../../../components/loader';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../../config/sizes';

type Props = {
  children: JSX.Element;
  imageUri: string;
  loading: boolean;
  finishLoadingImage: () => void;
};

export const PhotoContainer = ({
  children,
  imageUri,
  loading,
  finishLoadingImage,
}: Props) => {
  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loader}>
          <Loader />
        </View>
      )}
      <Image
        style={styles.backgroundImage}
        source={{uri: imageUri}}
        onLoad={finishLoadingImage}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
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
});
