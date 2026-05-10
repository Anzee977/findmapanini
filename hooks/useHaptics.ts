import * as Haptics from 'expo-haptics';

export const haptic = {
  scanSuccess: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
  scanError: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error),
  cardStick: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
  filterChange: () => Haptics.selectionAsync(),
  buttonPress: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid),
};
