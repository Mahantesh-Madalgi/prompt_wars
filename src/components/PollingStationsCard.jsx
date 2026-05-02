import { useState, useEffect, useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { pollingStations } from '../data/pollingStations';
import { maharashtraCities } from '../data/maharashtraCities';
import { registrationCenters } from '../data/registrationCenters';
import { MapPin, Navigation, Landmark } from 'lucide-react';
import { LanguageContext } from '../context/LanguageContext';

const translations = {
  English: {
    pollingStations: 'Polling Stations',
    registrationCenters: 'Registration Centers',
    selectCityDesc: 'Select a city to view locations',
    pollingBoothsOpt: 'Polling Booths',
    regCentersOpt: 'Registration Centers',
    selectCityOpt: 'Select a city',
    noCityMsg: 'Please select a city to view locations',
    noDataMsg: 'No data available for this city',
    getDirections: 'Get Directions'
  },
  Hindi: {
    pollingStations: 'मतदान केंद्र',
    registrationCenters: 'पंजीकरण केंद्र',
    selectCityDesc: 'स्थान देखने के लिए शहर चुनें',
    pollingBoothsOpt: 'मतदान केंद्र',
    regCentersOpt: 'पंजीकरण केंद्र',
    selectCityOpt: 'शहर चुनें',
    noCityMsg: 'स्थान देखने के लिए कृपया एक शहर चुनें',
    noDataMsg: 'इस शहर के लिए कोई डेटा उपलब्ध नहीं है',
    getDirections: 'दिशा-निर्देश प्राप्त करें'
  },
  Marathi: {
    pollingStations: 'मतदान केंद्रे',
    registrationCenters: 'नोंदणी केंद्रे',
    selectCityDesc: 'ठिकाणे पाहण्यासाठी शहर निवडा',
    pollingBoothsOpt: 'मतदान केंद्रे',
    regCentersOpt: 'नोंदणी केंद्रे',
    selectCityOpt: 'शहर निवडा',
    noCityMsg: 'ठिकाणे पाहण्यासाठी कृपया शहर निवडा',
    noDataMsg: 'या शहरासाठी डेटा उपलब्ध नाही',
    getDirections: 'दिशा-निर्देश मिळवा'
  }
};

// Fix for default Leaflet icon missing issues in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function PollingStationsCard() {
  const { language } = useContext(LanguageContext);
  const t = translations[language] || translations.English;

  // Try to load persisted city, default to 'pune'
  const [selectedCity, setSelectedCity] = useState(() => {
    return localStorage.getItem('selectedPollingCity') || 'pune';
  });

  const [displayType, setDisplayType] = useState('polling_booth'); // 'polling_booth' or 'registration_center'
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const handleMapMarkerEvent = (e) => {
      if (e.detail?.type) {
        setDisplayType(e.detail.type);
      }
    };
    
    window.addEventListener('showMapMarker', handleMapMarkerEvent);
    return () => window.removeEventListener('showMapMarker', handleMapMarkerEvent);
  }, []);

  useEffect(() => {
    if (selectedCity) {
      let dataList = [];
      if (displayType === 'polling_booth') {
        dataList = pollingStations[selectedCity] || [];
      } else if (displayType === 'registration_center') {
        dataList = registrationCenters[selectedCity] || [];
      }
      setLocations(dataList);
      localStorage.setItem('selectedPollingCity', selectedCity);
    } else {
      setLocations([]);
    }
  }, [selectedCity, displayType]);

  const handleCityChange = (e) => {
    const newCity = e.target.value;
    setSelectedCity(newCity);
    localStorage.setItem('selectedPollingCity', newCity);
    window.dispatchEvent(new Event('cityChanged'));
  };

  const handleDirections = (e, destLat, destLng) => {
    e.stopPropagation(); // Prevent map click events

    // Open window synchronously to bypass browser popup blockers
    const newWindow = window.open('about:blank', '_blank');
    
    // Correct OpenStreetMap routing format
    const getOsmUrl = (userLat, userLng) => {
      if (userLat && userLng) {
        return `https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=${userLat}%2C${userLng}%3B${destLat}%2C${destLng}#map=12/${destLat}/${destLng}`;
      }
      return `https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=%3B${destLat}%2C${destLng}#map=12/${destLat}/${destLng}`;
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          newWindow.location.href = getOsmUrl(position.coords.latitude, position.coords.longitude);
        },
        () => {
          // Fallback if user denies location or it fails
          newWindow.location.href = getOsmUrl(null, null);
        },
        { timeout: 5000 } // Don't hang forever
      );
    } else {
      newWindow.location.href = getOsmUrl(null, null);
    }
  };

  const mapCenter = locations.length > 0 
    ? [locations[0].lat, locations[0].lng] 
    : [18.5204, 73.8567]; // Default to Pune

  const cardTitle = displayType === 'polling_booth' ? t.pollingStations : t.registrationCenters;
  const IconComponent = displayType === 'polling_booth' ? MapPin : Landmark;

  return (
    <div id="map-section" className="bg-white/5 border border-white/10 rounded-[2rem] p-8 shadow-xl backdrop-blur-xl mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-7">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-indigo-500/20 flex items-center justify-center">
            <IconComponent className="text-indigo-400" size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">{cardTitle}</h2>
            <p className="text-xs text-zinc-500 mt-0.5">{t.selectCityDesc}</p>
          </div>
        </div>
        
        <div className="flex gap-2 items-center">
          <select 
            value={displayType} 
            onChange={(e) => setDisplayType(e.target.value)}
            className="bg-zinc-800/80 border border-white/10 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none cursor-pointer"
          >
            <option value="polling_booth">{t.pollingBoothsOpt}</option>
            <option value="registration_center">{t.regCentersOpt}</option>
          </select>
          <select 
            value={selectedCity} 
            onChange={handleCityChange}
            className="bg-zinc-800/80 border border-white/10 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none min-w-[150px] cursor-pointer capitalize"
          >
            <option value="" disabled>{t.selectCityOpt}</option>
            {maharashtraCities.map(city => (
              <option key={city} value={city} className="capitalize">{city.charAt(0).toUpperCase() + city.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      {!selectedCity ? (
        <div className="h-[400px] rounded-[1.25rem] bg-black/20 border border-white/5 flex items-center justify-center text-zinc-400">
          {t.noCityMsg}
        </div>
      ) : locations.length === 0 ? (
        <div className="h-[400px] rounded-[1.25rem] bg-black/20 border border-white/5 flex items-center justify-center text-zinc-400">
          {t.noDataMsg}
        </div>
      ) : (
        <div className="relative rounded-[1.25rem] overflow-hidden border border-white/10 shadow-lg h-[400px] z-0">
          <MapContainer 
            center={mapCenter} 
            zoom={12} 
            scrollWheelZoom={false} 
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            <ChangeView center={mapCenter} />
            
            {locations.map(loc => (
              <Marker key={loc.id} position={[loc.lat, loc.lng]} title={loc.name}>
                <Popup className="custom-popup">
                  <div className="p-1 min-w-[180px]">
                    <h3 className="font-bold text-sm text-zinc-900 mb-1">{loc.name}</h3>
                    <p className="text-xs text-zinc-600 mb-3">{loc.address}</p>
                    <button 
                      onClick={(e) => handleDirections(e, loc.lat, loc.lng)}
                      className="flex items-center justify-center gap-1.5 w-full bg-indigo-600 text-white text-xs font-medium py-2 rounded-lg hover:bg-indigo-700 transition-colors pointer-events-auto"
                    >
                      <Navigation size={12} /> {t.getDirections}
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        .leaflet-container {
          background-color: #242f3e;
          font-family: inherit;
        }
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          padding: 4px;
        }
        .custom-popup .leaflet-popup-tip-container {
          display: none;
        }
      `}} />
    </div>
  );
}

