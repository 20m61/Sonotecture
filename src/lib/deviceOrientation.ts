export const getDeviceOrientation = (callback: (alpha: number) => void) => {
  if (window.DeviceOrientationEvent) {
    window.addEventListener(
      'deviceorientation',
      (event) => {
        const alpha = event.alpha; // 北を基準にデバイスの方位を取得

        if (alpha !== null) {
          // alphaがnullでない場合のみcallbackを呼び出す
          callback(alpha);
        }
      },
      true,
    );
  } else {
    console.error('Device Orientation is not supported on this device.');
  }
};
