import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <nav>
      <div className="nav-wrapper blue-grey darken-3">
        <Link
          to="/settings"
          className="brand-logo right"
          style={{ cursor: "pointer" }}
        >
          <i className="material-icons">settings</i>
        </Link>
        <ul>
          <li>
            <Link to="/">Tâche active</Link>
          </li>
          <li>
            <Link to="/tasks">Toutes les tâches</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
