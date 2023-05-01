jest.mock('react-native-gesture-handler', () => {
  return {
    Swipeable: 'Swipeable',
    DrawerLayout: 'DrawerLayout',
    State: {},
    ScrollView: 'ScrollView',
    Slider: 'Slider',
    Switch: 'Switch',
    TextInput: 'TextInput',
    ToolbarAndroid: 'ToolbarAndroid',
    ViewPagerAndroid: 'ViewPagerAndroid',
    DrawerLayoutAndroid: 'DrawerLayoutAndroid',
    WebView: 'WebView',
    NativeViewGestureHandler: 'NativeViewGestureHandler',
    TapGestureHandler: 'TapGestureHandler',
    FlingGestureHandler: 'FlingGestureHandler',
    ForceTouchGestureHandler: 'ForceTouchGestureHandler',
    LongPressGestureHandler: 'LongPressGestureHandler',
    PanGestureHandler: 'PanGestureHandler',
    PinchGestureHandler: 'PinchGestureHandler',
    RotationGestureHandler: 'RotationGestureHandler',
    /* This needs to be added in order to use the latest version of the library */
    TouchableOpacity: 'TouchableOpacity',
    MainButton: 'MainButton',
    /* Other handlers can also be added here as required */
  };
});
