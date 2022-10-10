import {useRef} from 'react';
import {
  FlatList,
  ListRenderItem,
  ViewabilityConfigCallbackPair,
  ViewabilityConfigCallbackPairs,
} from 'react-native';
import {Basic} from 'unsplash-js/dist/methods/photos/types';
import {DEVICE_WIDTH} from 'config/sizes';

type Props = {
  initialScrollIndex: number;
  data: Basic[];
  renderItem: ListRenderItem<Basic>;
};

const ITEM_WIDTH = DEVICE_WIDTH;

export const HorizontalList = ({
  initialScrollIndex,
  data = [],
  renderItem,
}: Props) => {
  const listRef = useRef<any>(null);
  const nextIndex = useRef<number | null>(null);

  const onViewableItemsChanged: ViewabilityConfigCallbackPair['onViewableItemsChanged'] =
    event => {
      nextIndex.current = event.changed[0].index;
    };

  const viewabilityConfigCallbackPairs = useRef<ViewabilityConfigCallbackPairs>(
    [
      {
        onViewableItemsChanged,
        viewabilityConfig: {viewAreaCoveragePercentThreshold: 50},
      },
    ],
  );

  const onResponderRelease = () => {
    if (listRef?.current) {
      listRef.current?.scrollToIndex({
        animated: true,
        index: nextIndex.current,
      });
    }
  };

  return (
    <FlatList
      ref={listRef}
      data={data}
      keyExtractor={(item, index) => item.id + index}
      onScrollEndDrag={onResponderRelease}
      onMomentumScrollEnd={onResponderRelease}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      initialScrollIndex={initialScrollIndex}
      getItemLayout={(_, index) => ({
        length: ITEM_WIDTH,
        offset: ITEM_WIDTH * index,
        index,
      })}
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      renderItem={renderItem}
    />
  );
};
