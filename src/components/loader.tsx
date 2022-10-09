import {ActivityIndicator, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  loader: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});

export const Loader = () => (
  <ActivityIndicator size="large" color="black" style={styles.loader} />
);
