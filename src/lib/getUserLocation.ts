export const getUserLocation = (): Promise<{
  latitude: number;
  longitude: number;
}> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error obtaining location:', error);
          reject(error);
        },
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      reject(new Error('Geolocation not supported.'));
    }
  });
};
