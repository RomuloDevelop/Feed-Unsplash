import {useCallback, useRef} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Basic} from 'unsplash-js/dist/methods/photos/types';
import {ANIMATION_DURATION} from './config';
import {FeedItem} from './Feeditem';

type Props = {
  data: Basic[];
  onPress: (id: number | string) => void;
  onEndReached: () => void;
  header?: () => JSX.Element;
};

export const Feed = ({data, onPress, onEndReached, header}: Props) => {
  const lastDataIndex = useRef<number>(0);
  const delayBase = useRef<number>(0);

  const _onEndReached = useCallback(() => {
    delayBase.current = lastDataIndex.current + 1;
    onEndReached();
  }, [onEndReached]);

  return (
    <FlatList
      ListHeaderComponent={header}
      style={styles.container}
      contentContainerStyle={styles.listContainer}
      data={data}
      keyExtractor={(item: Basic, index) => item.id + index}
      numColumns={2}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index}) => {
        let activeAnimation = true;
        let counter = 0;
        if (index >= delayBase.current) {
          counter = index - delayBase.current;
        } else {
          activeAnimation = false;
        }
        const {description, likes} = item;
        const marginTopRight =
          index % 2 ? {marginTop: 26, marginLeft: 26} : undefined;
        const delay = counter * ANIMATION_DURATION * 0.6;
        lastDataIndex.current = index;
        return (
          <FeedItem
            onPress={() => onPress(item.id)}
            customStyles={marginTopRight}
            imageUri={item.urls.small}
            description={description}
            likes={likes}
            animationDelay={delay}
            activeAnimation={activeAnimation}
          />
        );
      }}
      onEndReached={_onEndReached}
      onEndReachedThreshold={0.1}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  listContainer: {
    paddingHorizontal: 25,
    paddingBottom: 26,
  },
});
