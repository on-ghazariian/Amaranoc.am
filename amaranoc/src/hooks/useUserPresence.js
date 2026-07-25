import { useEffect } from 'react';
import { db } from '../lib/firebase'; // ստուգիր firebase.js-ի ճիշտ path-ը
import { ref, update, onValue, onDisconnect, serverTimestamp } from 'firebase/database';

export function useUserPresence(user) {
  useEffect(() => {
    if (!user) return;

    const userRef = ref(db, `users/${user.uid}`);
    const connectedRef = ref(db, '.info/connected');

    let watchId = null;
    let lastCoords = null;

    // Հեռավորությունը հաշվող ֆունկցիա (մետրերով)
    const getDistanceInMeters = (lat1, lon1, lat2, lon2) => {
      const R = 6371e3;
      const rad = Math.PI / 180;
      const dLat = (lat2 - lat1) * rad;
      const dLon = (lon2 - lon1) * rad;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * rad) * Math.cos(lat2 * rad) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    // 1. Real-time GPS Tracking (բոլոր էջերում)
    if ('geolocation' in navigator) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;

          if (
            !lastCoords ||
            getDistanceInMeters(lastCoords.lat, lastCoords.lng, latitude, longitude) > 3
          ) {
            lastCoords = { lat: latitude, lng: longitude };

            update(userRef, {
              location: {
                lat: latitude,
                lng: longitude,
                accuracy: accuracy,
                updatedAt: serverTimestamp(),
              },
            });
          }
        },
        (error) => console.error('GPS Error:', error.message),
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 10000,
        }
      );
    }

    // 2. Global Online / Offline Status
    const connectedRefUnsubscribe = onValue(connectedRef, (snap) => {
      if (snap.val() === true) {
        onDisconnect(userRef)
          .update({
            isOnline: false,
            lastSeen: serverTimestamp(),
          })
          .then(() => {
            update(userRef, {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL || '',
              isOnline: true,
              lastSeen: serverTimestamp(),
            });
          });
      }
    });

    return () => {
      connectedRefUnsubscribe();
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [user]);
}