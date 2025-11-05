import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api, { MEDIA_BASE } from '../api/axiosConfig';

export default function ConcesionarioForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [existingLogo, setExistingLogo] = useState(null);

  useEffect(() => {
    if (id) fetchConcesionario();
  }, [id]);

  const fetchConcesionario = async () => {
    try {
      const res = await api.get(`concesionarios/${id}/`);
      setNombre(res.data.nombre || '');
      setUbicacion(res.data.ubicacion || '');
      setTelefono(res.data.telefono || '');
      setExistingLogo(res.data.logo || null);
    } catch (err) {
      console.error(err);
      alert('Error al cargar concesionario.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append('nombre', nombre);
      fd.append('ubicacion', ubicacion);
      fd.append('telefono', telefono);
      if (logoFile) fd.append('logo', logoFile);

      if (id) {
        await api.patch(`concesionarios/${id}/`, fd, { headers: {'Content-Type': 'multipart/form-data'}});
        alert('Concesionario actualizado');
      } else {
        await api.post('concesionarios/', fd, { headers: {'Content-Type': 'multipart/form-data'}});
        alert('Concesionario creado');
      }
      navigate('/concesionarios');
    } catch (err) {
      console.error(err);
      alert('Error al guardar concesionario.');
    }
  };

  const imageUrl = (p) => p ? (p.startsWith('http') ? p : `${MEDIA_BASE}${p}`) : null;

  return (
    <div>
      <h2>{id ? 'Editar Concesionario' : 'Nuevo Concesionario'}</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input className="form-control" value={nombre} onChange={e=>setNombre(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Ubicación</label>
          <input className="form-control" value={ubicacion} onChange={e=>setUbicacion(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input className="form-control" value={telefono} onChange={e=>setTelefono(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Logo</label>
          <input type="file" className="form-control" onChange={e=>setLogoFile(e.target.files[0])} accept="image/*" />
          {existingLogo && !logoFile && (
            <div className="mt-2">
              <small>Logo actual:</small>
              <div><img src={imageUrl(existingLogo)} alt="logo" style={{height:120, objectFit:'cover'}} /></div>
            </div>
          )}
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-primary" type="submit">{id ? 'Actualizar' : 'Crear'}</button>
          <button type="button" className="btn btn-secondary" onClick={()=>navigate('/concesionarios')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
