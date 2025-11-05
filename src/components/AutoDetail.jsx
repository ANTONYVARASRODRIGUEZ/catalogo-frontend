import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api, { MEDIA_BASE } from '../api/axiosConfig';

export default function AutoDetail() {
  const { id } = useParams();
  const [auto, setAuto] = useState(null);

  useEffect(() => {
    fetchAuto();
  }, [id]);

  const fetchAuto = async () => {
    try {
      const res = await api.get(`autos/${id}/`);
      setAuto(res.data);
    } catch (err) {
      console.error(err);
      alert('Error al obtener detalle del auto.');
    }
  };

  if (!auto) return <div>Cargando...</div>;

  const imageUrl = (imagenPath) => {
    if (!imagenPath) return null;
    if (imagenPath.startsWith('http')) return imagenPath;
    return `${MEDIA_BASE}${imagenPath}`;
  };

  return (
    <div>
      <h2>{auto.marca} {auto.modelo}</h2>
      {auto.imagen && <img src={imageUrl(auto.imagen)} alt="auto" style={{maxWidth: '100%', height: 300, objectFit:'cover'}} />}
      <ul className="list-group mt-3">
        <li className="list-group-item"><strong>Precio:</strong> S/. {auto.precio}</li>
        <li className="list-group-item"><strong>Año:</strong> {auto['año'] ?? auto.anio ?? auto.year}</li>
        <li className="list-group-item"><strong>Concesionario:</strong> {auto.concesionario}</li>
      </ul>

      <div className="mt-3">
        <Link to="/autos" className="btn btn-outline-primary">Volver</Link>
      </div>
    </div>
  );
}
