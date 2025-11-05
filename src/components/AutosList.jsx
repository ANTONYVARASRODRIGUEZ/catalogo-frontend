import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api, { MEDIA_BASE } from '../api/axiosConfig';

export default function AutosList() {
  const [autos, setAutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAutos = async () => {
    try {
      const res = await api.get('autos/');
      setAutos(res.data);
    } catch (err) {
      console.error('Error fetching autos', err);
      alert('Error al obtener autos (mira la consola).');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAutos();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este auto?')) return;
    try {
      await api.delete(`autos/${id}/`);
      setAutos(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      console.error(err);
      alert('Error al eliminar (revisa la consola).');
    }
  };

  const imageUrl = (imagenPath) => {
    if (!imagenPath) return null;
    // imagenPath may be like "/media/autos/archivo.jpg"
    if (imagenPath.startsWith('http')) return imagenPath;
    return `${MEDIA_BASE}${imagenPath}`;
  };

  if (loading) return <div>Cargando autos...</div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Autos</h2>
        <div>
          <Link to="/autos/new" className="btn btn-primary me-2">Nuevo Auto</Link>
          <Link to="/concesionarios" className="btn btn-outline-secondary">Concesionarios</Link>
        </div>
      </div>

      {autos.length === 0 ? (
        <div>No hay autos registrados.</div>
      ) : (
        <div className="row">
          {autos.map(auto => (
            <div className="col-md-4 mb-3" key={auto.id}>
              <div className="card h-100">
                {auto.imagen ? (
                  <img src={imageUrl(auto.imagen)} className="card-img-top" alt={`${auto.marca} ${auto.modelo}`} style={{height: 200, objectFit: 'cover'}} />
                ) : (
                  <div style={{height:200, display:'flex', alignItems:'center', justifyContent:'center', background:'#f2f2f2'}}>Sin imagen</div>
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{auto.marca} {auto.modelo}</h5>
                  <p className="card-text mb-1"><strong>Precio:</strong> S/. {auto.precio}</p>
                  <p className="card-text mb-1"><strong>Año:</strong> {auto['año'] ?? auto.anio ?? auto.year}</p>
                  <p className="card-text"><strong>Concesionario:</strong> {auto.concesionario}</p>
                  <div className="mt-auto d-flex justify-content-between">
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(auto.id)}>Eliminar</button>
                    <div>
                      <button className="btn btn-sm btn-secondary me-2" onClick={() => navigate(`/autos/edit/${auto.id}`)}>Editar</button>
                      <Link className="btn btn-sm btn-outline-primary" to={`/autos/${auto.id}`}>Ver</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
