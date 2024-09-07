'use client';

import { useEffect, useState } from 'react';
import { Deck } from '@deck.gl/core';
import { GeoJsonLayer } from '@deck.gl/layers';
import { getUserLocation } from '../lib/getUserLocation';
import { getDeviceOrientation } from '../lib/deviceOrientation';

export default function Home() {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [bearing, setBearing] = useState(0); // デバイスの向き

  useEffect(() => {
    // ユーザーの位置情報を取得
    getUserLocation()
      .then((location) => {
        setUserLocation(location);
      })
      .catch((error) => {
        console.error('Error obtaining location', error);
      });

    // デバイスの方角（向き）を取得
    getDeviceOrientation((alpha) => {
      setBearing(alpha); // 方角を更新
    });
  }, []);

  // 初期表示のビューを設定
  const initialViewState = {
    longitude: userLocation?.longitude || 139.6917, // 東京都の経度をデフォルト
    latitude: userLocation?.latitude || 35.6895, // 東京都の緯度をデフォルト
    zoom: 14,
    pitch: 45,
    bearing, // デバイスの向きを反映
  };

  const layers = [
    new GeoJsonLayer({
      id: 'buildings-layer',
      data: '/plateau/Building.geojson', // publicディレクトリ内のGeoJSONファイル
      extruded: true,
      getFillColor: [255, 140, 0],
      getElevation: (d) => d.properties.height || 0, // 建物の高さを反映
    }),
  ];

  // deck.glの地図表示
  useEffect(() => {
    if (userLocation) {
      new Deck({
        initialViewState,
        controller: true,
        layers,
      });
    }
  }, [userLocation, bearing]);

  return <div id="map" style={{ width: '100%', height: '100vh' }} />;
}
