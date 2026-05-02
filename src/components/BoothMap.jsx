import { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '1rem'
};

const defaultCenter = {
  lat: 40.7128,
  lng: -74.0060
};

// Simulated booth locations
const booths = [
  { id: 1, name: "Central Library Booth", lat: 40.7128, lng: -74.0060, address: "10 Grand Army Plaza" },
  { id: 2, name: "Community Center Booth", lat: 40.7228, lng: -74.0160, address: "45 Main Street" },
  { id: 3, name: "High School Gym Booth", lat: 40.7028, lng: -73.9960, address: "120 School Lane" }
];

export default function BoothMap() {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  });

  const [map, setMap] = useState(null);
  const [selectedBooth, setSelectedBooth] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const findNearestBooth = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userPos);
          if (map) {
            map.panTo(userPos);
            map.setZoom(13);
          }
        },
        () => {
          console.error("Error: The Geolocation service failed.");
        }
      );
    } else {
      console.error("Error: Your browser doesn't support geolocation.");
    }
  };

  if (loadError) return <div className="p-4 bg-red-500/10 text-red-500 rounded-xl">Error loading Maps</div>;
  if (!isLoaded) return <div className="p-4 bg-white/5 rounded-xl animate-pulse h-[400px]">Loading Maps...</div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-400">Find your nearest polling station to cast your vote.</p>
        <button 
          onClick={findNearestBooth}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded-xl hover:bg-indigo-600/30 transition-colors text-sm font-medium"
        >
          <MapPin size={16} /> Locate Me
        </button>
      </div>
      
      <div className="relative rounded-[1.25rem] overflow-hidden border border-white/10 shadow-lg">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userLocation || defaultCenter}
          zoom={12}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            styles: [
              { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
              { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
              { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
              {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
              },
              {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
              },
              {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{ color: "#263c3f" }],
              },
              {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{ color: "#6b9a76" }],
              },
              {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#38414e" }],
              },
              {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{ color: "#212a37" }],
              },
              {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{ color: "#9ca5b3" }],
              },
              {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{ color: "#746855" }],
              },
              {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{ color: "#1f2835" }],
              },
              {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [{ color: "#f3d19c" }],
              },
              {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{ color: "#2f3948" }],
              },
              {
                featureType: "transit.station",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
              },
              {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#17263c" }],
              },
              {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{ color: "#515c6d" }],
              },
              {
                featureType: "water",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#17263c" }],
              },
            ],
            disableDefaultUI: true,
            zoomControl: true,
          }}
        >
          {booths.map(booth => (
            <Marker
              key={booth.id}
              position={{ lat: booth.lat, lng: booth.lng }}
              onClick={() => setSelectedBooth(booth)}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: "#8b5cf6",
                fillOpacity: 1,
                strokeColor: "#ffffff",
                strokeWeight: 2,
              }}
            />
          ))}

          {userLocation && (
            <Marker
              position={userLocation}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 6,
                fillColor: "#3b82f6",
                fillOpacity: 1,
                strokeColor: "#ffffff",
                strokeWeight: 2,
              }}
            />
          )}

          {selectedBooth && (
            <InfoWindow
              position={{ lat: selectedBooth.lat, lng: selectedBooth.lng }}
              onCloseClick={() => setSelectedBooth(null)}
            >
              <div className="p-2 text-zinc-900 max-w-[200px]">
                <h3 className="font-bold text-sm mb-1">{selectedBooth.name}</h3>
                <p className="text-xs text-zinc-600 mb-2">{selectedBooth.address}</p>
                <button className="w-full bg-indigo-600 text-white text-xs font-medium py-1.5 rounded hover:bg-indigo-700 transition-colors">
                  Get Directions
                </button>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </div>
  );
}
