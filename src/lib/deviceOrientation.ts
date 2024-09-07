export const getDeviceOrientation = (callback: (alpha: number) => void) => {
  if (window.DeviceOrientationEvent) {
    window.addEventListener(
      'deviceorientation',
      (event) => {
        const alpha = event.alpha; // 北を基準にデバイスの方位を取得
        callback(alpha);
      },
      true,
    );
  } else {
    console.error('Device Orientation is not supported on this device.');
  }
};
