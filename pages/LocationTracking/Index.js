import { Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import backend from "../../utils/Backend";
import { useEffect, useState } from "react";

const Index = () => {
    const [location, setLocation] = useState({});
    const [region, setRegion] = useState({
        latitude: 39.9341562587734,
        longitude: 32.848992453450066,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const fetchLocation = async () => {
        const payload = {
            "senior_id": 1
        };
        try {
            const response = await backend.post("/api/get_senior_location/", payload);
            setLocation(response.data);
            setRegion({
                latitude: response.data.location_lat,
                longitude: response.data.location_lon,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        } catch (error) {
            console.error("Error fetching location:", error);
        }
    };

    useEffect(() => {
        fetchLocation();
        
        const intervalId = setInterval(fetchLocation, 3000);
        
        return () => clearInterval(intervalId);
    }, []);

    return (
        <View>
            <MapView 
                style={{width: "100%", height: "100%"}}
                region={region}
            >
                {location.location_lat && (
                    <Marker
                        coordinate={{
                            latitude: location.location_lat,
                            longitude: location.location_lon
                        }}
                        title="Senior's Location"
                    />
                )}
            </MapView>
        </View>
    );
};

export default Index;