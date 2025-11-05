import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api, { MEDIA_BASE } from '../api/axiosConfig';

export default function AutoForm() {
  const { id } = useParams(); // undefined cuando es nuevo
  const navigate = useNavigate();

  const [modelo, setModelo] = useState('');
  const [marca, setMarca] = useState('');
  const [precio, setPrecio] = useState('');
  const [anio, setAnio] = useState('');
  const [concesionarioId, setConcesionarioId] = useState('');
  const [imagenFile, setImagenFile] = useState(null);
  const [concesionarios, setConcesionarios] = useState([]);
  const [existingImagen, setExistingImagen] = useState(null);

  useEffect(() => {
    fetchConcesionarios();
    if (id) fetchAuto();
  }, [id]);

  const fetchConcesionarios = async () => {
    try {
      const res = await api.get('concesionarios/');
      setConcesionarios(res.data);
    } catch (err) {
      console.error(err);
      alert('Error al cargar concesionarios.');
    }
  };

  const fetchAuto = async () => {
    try {
      const res = await api.get(`autos/${id}/`);
      const a = res.data;
      setModelo(a.modelo || '');
      setMarca(a.marca || '');
      setPrecio(a.precio || '');
      setAnio(a['año'] ?? a.anio ?? a.year ?? '');
      setConcesionarioId(a.concesionario || '');
      setExistingImagen(a.imagen || null);
    } catch (err) {
      console.error(err);
      alert('Error al cargar el auto.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('modelo', modelo);
      formData.append('marca', marca);
      formData.append('precio', precio);
      // append using the key your backend expects; try 'año' first:
      // if backend uses 'anio', change accordingly
      formData.append('año', anio);
      formData.append('concesionario', concesionarioId);
      if (imagenFile) formData.append('imagen', imagenFile);

      if (id) {
        // Use PATCH so partial update allowed (and easier with formdata)
        await api.patch(`autos/${id}/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Auto actualizado');
      } else {
        await api.post('autos/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Auto creado');
      }
      navigate('/autos');
    } catch (err) {
      console.error(err);
      alert('Error al guardar (ver consola).');
    }
  };

  const imageUrl = (imagenPath) => {
    if (!imagenPath) return null;
    if (imagenPath.startsWith('http')) return imagenPath;
    return `${MEDIA_BASE}${imagenPath}`;
  };

  return (
    <div>
      <h2>{id ? 'Editar Auto' : 'Nuevo Auto'}</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Modelo</label>
          <input className="form-control" value={modelo} onChange={e=>setModelo(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Marca</label>
          <input className="form-control" value={marca} onChange={e=>setMarca(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input type="number" step="0.01" className="form-control" value={precio} onChange={e=>setPrecio(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Año</label>
          <input type="number" className="form-control" value={anio} onChange={e=>setAnio(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Concesionario</label>
          <select className="form-select" value={concesionarioId} onChange={e=>setConcesionarioId(e.target.value)} required>
            <option value="">-- Selecciona --</option>
            {concesionarios.map(c => (
              // la API de Concesionarios devuelve {id, nombre, ...}
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Imagen</label>
          <input type="file" className="form-control" onChange={e=>setImagenFile(e.target.files[0])} accept="image/*" />
          {existingImagen && !imagenFile && (
            <div className="mt-2">
              <small>Imagen actual:</small>
              <div>
                <img src={imageUrl(existingImagen)} alt="actual" style={{height:120, objectFit:'cover'}} />
              </div>
            </div>
          )}
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-primary" type="submit">{id ? 'Actualizar' : 'Crear'}</button>
          <button type="button" className="btn btn-secondary" onClick={()=>navigate('/autos')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
