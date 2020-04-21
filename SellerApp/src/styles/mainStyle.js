import {StyleSheet} from 'react-native';

import variables from './variables';

const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  col6: {
    width: '50%',
  },
  infoGroup: {
    marginTop: 10,
    marginBottom: 10,
  },
  labelGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontSize: 20,
  },
  labelText: {
    fontSize: 20,
    color: '#797A9C',
    fontStyle: 'italic',
  },
  value: {
    color: variables.mainThemeColor,
    fontSize: 20,
  },
});

export default mainStyles;
