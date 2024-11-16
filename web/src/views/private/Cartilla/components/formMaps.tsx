import React, { FC, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import Button from "@/components/common/button/button";
import { alertSuccess } from "@/utils/alertsToast";

interface Props {
  closeModalMap: () => void;
}

const CustionIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/7508/7508938.png",
  iconSize: [60, 60],
  iconAnchor: [20, 60],
  popupAnchor: [0, -60],
});

const LocationMarker: React.FC<{
  position: [number, number] | null;
  setPosition: React.Dispatch<React.SetStateAction<[number, number] | null>>;
}> = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={CustionIcon} />
  );
};

const Formmaps: FC<Props> = ({ closeModalMap }) => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const defaultPosition: [number, number] = [-17.783338, -63.182111];

  const handlePosition = () => {
    alertSuccess("Datos guardados");
    closeModalMap();
  };

  return (
    <div className="relative h-[500px] w-full max-w-4xl">
      <MapContainer
        center={defaultPosition}
        zoom={13}
        style={{ height: "100%", width: "600px", zIndex: 1 }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker position={position} setPosition={setPosition} />
      </MapContainer>

      <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2">
        <Button onClick={handlePosition}>Guardar Ubicación</Button>
      </div>
    </div>
  );
};

export default Formmaps;
