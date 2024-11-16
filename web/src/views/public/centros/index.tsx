import { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Building2, 
  X,
  Hospital
} from 'lucide-react';

const CentrosMedicos = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState(null);

  const centers = [
    {
      city: "Santa Cruz",
      phone: "+591(3) 3352491",
      address: "C. Independencia esq. Ingavi Galería Central Of. 06",
      coordinates: { lat: -17.7833, lng: -63.1823 }
    },
    {
      city: "Cochabamba",
      phone: "+591(4) 4255855",
      address: "Av. Oquendo N° 654, Edif. Torres Sofer I, Piso 08 Of. 802",
      coordinates: { lat: -17.3895, lng: -66.1568 }
    },
    {
      city: "La Paz",
      phone: "+591(2) 2372400",
      address: "C. Reyes Ortiz No. 73, Edif. Torres Gundlach Oeste Of. 1201",
      coordinates: { lat: -16.5000, lng: -68.1500 }
    }
  ];

  const CenterCard = ({ center }:any) => (
    <div className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-lg transition-all hover:shadow-xl">
      <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br from-teal-50 to-blue-50 opacity-20 transition-transform duration-500 group-hover:scale-150" />
      
      <div className="relative">
        <div className="mb-4 flex items-center">
          <div className="mr-3 rounded-full bg-teal-50 p-3">
            <Building2 className="h-6 w-6 text-teal-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">{center.city}</h3>
        </div>

        <div className="space-y-3">
          <p className="flex items-start text-gray-600">
            <MapPin className="mr-2 h-5 w-5 flex-shrink-0 text-teal-400" />
            <span>{center.address}</span>
          </p>
          <p className="flex items-center text-gray-600">
            <Phone className="mr-2 h-5 w-5 text-teal-400" />
            <span>{center.phone}</span>
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedCenter(center);
            setShowModal(true);
          }}
          className="mt-4 inline-flex items-center rounded-lg bg-teal-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-600"
        >
          Ver en mapa
          <MapPin className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );

  const MapModal = ({ center, onClose }:any) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-xl">
        <div className="absolute right-4 top-4 z-10">
          <button
            onClick={onClose}
            className="rounded-full bg-white p-2 text-gray-500 shadow-lg transition-colors hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <h3 className="mb-4 text-2xl font-bold text-gray-800">
            Centro Médico - {center.city}
          </h3>
          
          <div className="mb-6 grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <p className="flex items-start text-gray-600">
                <MapPin className="mr-2 h-5 w-5 flex-shrink-0 text-teal-400" />
                <span>{center.address}</span>
              </p>
              <p className="flex items-center text-gray-600">
                <Phone className="mr-2 h-5 w-5 text-teal-400" />
                <span>{center.phone}</span>
              </p>
            </div>
          </div>

          <div className="h-[400px] overflow-hidden rounded-lg bg-gray-100">
            <iframe
              title={`Mapa de ${center.city}`}
              width="100%"
              height="100%"
              frameBorder="0"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                center.coordinates.lng - 0.01
              },${center.coordinates.lat - 0.01},${
                center.coordinates.lng + 0.01
              },${
                center.coordinates.lat + 0.01
              }&layer=mapnik&marker=${center.coordinates.lat},${
                center.coordinates.lng
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative overflow-hidden bg-white from-white to-teal-50 py-20">
      <div className="absolute left-0 top-1/4 h-64 w-64 rounded-full bg-teal-50 opacity-20 blur-3xl" />
      <div className="absolute right-0 top-3/4 h-64 w-64 rounded-full bg-blue-50 opacity-20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block rounded-full bg-teal-100 px-4 py-2">
            <Hospital className="mr-2 inline h-5 w-5 text-teal-500" />
            <span className="text-sm font-medium text-teal-700">Nuestros Centros</span>
          </div>
          
          <h2 className="mb-6 text-4xl font-bold text-gray-900">
            Centros Médicos
          </h2>
          
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Encuentre el centro médico más cercano a su ubicación y acceda a nuestros servicios de calidad.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {centers.map((center) => (
            <CenterCard key={center.city} center={center} />
          ))}
        </div>
      </div>

      {showModal && selectedCenter && (
        <MapModal center={selectedCenter} onClose={() => setShowModal(false)} />
      )}
    </section>
  );
};

export default CentrosMedicos;