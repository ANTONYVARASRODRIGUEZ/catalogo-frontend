import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Catálogo Autos</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="nav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink to="/autos" className="nav-link">Autos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/concesionarios" className="nav-link">Concesionarios</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
