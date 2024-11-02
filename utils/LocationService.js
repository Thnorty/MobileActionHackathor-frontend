import { useEffect } from 'react';
import * as Location from 'expo-location';
import backend from './Backend';
import { useUser } from './UserContext';

export const LocationService = ({ children }) => {
    const { userRole } = useUser();

    useEffect(() => {
        let intervalId;

        const startLocationTracking = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            const sendLocation = async () => {
                try {
                    const location = await Location.getCurrentPositionAsync({});
                    await backend.post("/api/update_senior_location/", {
                        senior_id: 1,
                        location_lat: location.coords.latitude,
                        location_lon: location.coords.longitude
                    });
                } catch (error) {
                    console.error("Error updating location:", error);
                }
            };

            // Initial location send
            sendLocation();
            // Set up interval
            intervalId = setInterval(sendLocation, 3000);
        };

        if (userRole === "senior") {
            startLocationTracking();
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [userRole]);

    useEffect(() => {
        let intervalId;

        const checkFallDetection = async () => {
            try {
                const response = await backend.post("/api/latest_fall_detection/", {
                    senior_id: 1,
                });
                
                if (response.data.message === "No fall detection found") {
                    return;
                }
                const { location_lat, location_lon } = response.data;

                alert("Fall detected at location: " + location_lat + ", " + location_lon);
            } catch (error) {
                console.error("Error checking fall detection:", error);
            }
        };

        if (userRole === "caregiver") {
            // Initial check
            checkFallDetection();
            // Set up interval
            intervalId = setInterval(checkFallDetection, 3000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [userRole]);

    return children;
};