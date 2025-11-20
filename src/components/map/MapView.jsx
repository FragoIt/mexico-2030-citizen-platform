import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { CATEGORIES } from '../../data/constants';

// Fix for default leaflet icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom DivIcon factory
const createCustomIcon = (categoryName) => {
  const category = CATEGORIES.find(c => c.name === categoryName) || CATEGORIES[0];
  const IconComponent = category.icon;

  const iconHtml = renderToStaticMarkup(
    <div className={`w-8 h-8 ${category.color} rounded-full flex items-center justify-center border-2 border-white shadow-lg`}>
      <IconComponent size={16} color="white" />
    </div>
  );

  return L.divIcon({
    html: iconHtml,
    className: 'custom-marker-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

const MapView = ({ reports }) => {
  // Center on Rionegro, Antioquia
  const center = [6.1549, -75.3736];

  return (
    <MapContainer
      center={center}
      zoom={14}
      style={{ height: '100%', width: '100%', borderRadius: '0.75rem' }}
      className="z-0"
    >
      {/* Dark Mode Tiles (CartoDB Dark Matter) */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      {reports.filter(r => r.status !== 'Rechazado' && r.status !== 'Resuelto').map((report) => (
        <Marker
          key={report.id}
          position={[report.coordinates.lat, report.coordinates.lng]}
          icon={createCustomIcon(report.category)}
        >
          <Popup className="custom-popup">
            <div className="p-1">
              <h3 className="font-bold text-sm mb-1">{report.title}</h3>
              <p className="text-xs text-gray-600 mb-2">{report.location}</p>
              <span className={`px-2 py-1 text-[10px] font-semibold rounded-full text-white ${report.priority === 'Alta' ? 'bg-red-500' :
                  report.priority === 'Media' ? 'bg-yellow-500' : 'bg-green-500'
                }`}>
                {report.priority}
              </span>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
