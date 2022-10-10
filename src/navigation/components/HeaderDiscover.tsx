import * as Animatable from 'react-native-animatable';
import {Image, StyleSheet, View} from 'react-native';

export const HeaderDiscover = ({
  children,
}: {
  children: string;
  tintColor?: string | undefined;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image source={require('../../../assets/lines.png')} />
      </View>
      <Animatable.Text
        duration={800}
        delay={500}
        animation={fadeInTitle}
        style={styles.title}>
        {children}
      </Animatable.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    paddingHorizontal: 26,
  },
  iconContainer: {
    left: 26,
    position: 'absolute',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24,
    color: 'black',
  },
});

const fadeInTitle = {
  from: {
    top: 20,
    opacity: 0,
  },
  to: {
    top: 0,
    opacity: 1,
  },
};
