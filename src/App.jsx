import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import AutosList from './components/AutosList';
import AutoForm from './components/AutoForm';
import AutoDetail from './components/AutoDetail';
import ConcesionariosList from './components/ConcesionariosList';
import ConcesionarioForm from './components/ConcesionarioForm';

export default function App() {
  return (
    <div>
      <NavBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Navigate to="/autos" replace />} />

          {/* Autos */}
          <Route path="/autos" element={<AutosList />} />
          <Route path="/autos/new" element={<AutoForm />} />
          <Route path="/autos/edit/:id" element={<AutoForm />} />
          <Route path="/autos/:id" element={<AutoDetail />} />

          {/* Concesionarios */}
          <Route path="/concesionarios" element={<ConcesionariosList />} />
          <Route path="/concesionarios/new" element={<ConcesionarioForm />} />
          <Route path="/concesionarios/edit/:id" element={<ConcesionarioForm />} />
        </Routes>
      </div>
    </div>
  );
}
