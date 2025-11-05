import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api, { MEDIA_BASE } from '../api/axiosConfig';

export default function ConcesionariosList() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await api.get('concesionarios/');
      setItems(res.data);
    } catch (err) {
      console.error(err);
      alert('Error al obtener concesionarios.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar concesionario?')) return;
    try {
      await api.delete(`concesionarios/${id}/`);
      setItems(prev => prev.filter(x => x.id !== id));
    } catch (err) {
      console.error(err);
      alert('Error al eliminar concesionario.');
    }
  };

  const imageUrl = (path) => {
    if (!path) return null;
    return path.startsWith('http') ? path : `${MEDIA_BASE}${path}`;
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h2>Concesionarios</h2>
        <Link to="/concesionarios/new" className="btn btn-primary">Nuevo</Link>
      </div>

      {items.length === 0 ? (
        <div>No hay concesionarios.</div>
      ) : (
        <div className="row">
          {items.map(c => (
            <div className="col-md-4 mb-3" key={c.id}>
              <div className="card">
                {c.logo ? (
                  <img src={imageUrl(c.logo)} className="card-img-top" alt={c.nombre} style={{height:180, objectFit:'cover'}} />
                ) : (
                  <div style={{height:180, background:'#f2f2f2', display:'flex', alignItems:'center', justifyContent:'center'}}>Sin logo</div>
                )}
                <div className="card-body">
                  <h5 className="card-title">{c.nombre}</h5>
                  <p className="card-text"><strong>Ubicación:</strong> {c.ubicacion}</p>
                  <p className="card-text"><strong>Tel:</strong> {c.telefono}</p>
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(c.id)}>Eliminar</button>
                    <button className="btn btn-sm btn-secondary" onClick={() => navigate(`/concesionarios/edit/${c.id}`)}>Editar</button>
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
