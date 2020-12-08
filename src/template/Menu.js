import React from "react";

export default function Menu({active_link}) {

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-3">
      {/* Brand Logo */}
      <a href="index3.html" className="brand-link">
        <img
          src="/dist/img/AdminLTELogo.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light">Psikotes Rumah Hijau</span>
      </a>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src="/dist/img/user2-160x160.jpg"
              className="img-circle elevation-2"
              alt="User_Image"
            />
          </div>
          <div className="info">
            <a href="/#" className="d-block">
              Admin
            </a>
          </div>
        </div>
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <a href="/" className={`nav-link ${active_link === 1 ? "active": ""}`}>
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>
                  Dashboard
                </p>
              </a>
            </li>
            <li className="nav-item">
              <a href="/psikotes" className={`nav-link ${active_link === 2 ? "active": ""}`}>
                <i className="nav-icon far fa-list-alt"></i>
                <p>
                  Soal Psikotes
                </p>
              </a>
            </li>
            <li className="nav-item">
              <a href="/peserta" className={`nav-link ${active_link === 3 ? "active": ""}`}>
                <i className="nav-icon fa fa-users"></i>
                <p>
                  Peserta Tes
                </p>
              </a>
            </li>
            <li className={`nav-item has-treeview ${(active_link > 3 && active_link < 6 ) ? "menu-open": ""}`}>
              <a href="/#" className={`nav-link ${(active_link > 3 && active_link < 6 ) ? "active": ""}`}>
                <i className="nav-icon fas fa-chalkboard" />
                <p>
                  Other Link
                  <i className="fas fa-angle-left right" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="/materi/document" className={`nav-link ${active_link === 4 ? "active": ""}`}>
                    <i className="far fa-circle nav-icon" />
                    <p>Document</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/materi/video" className={`nav-link ${active_link === 5 ? "active": ""}`}>
                    <i className="far fa-circle nav-icon" />
                    <p>Video</p>
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <a href="/ujian" className={`nav-link ${active_link === 6 ? "active": ""}`}>
                <i className="nav-icon fa fa-circle"></i>
                <p>
                  Ujian
                </p>
              </a>
            </li>
            <li className="nav-item">
              <br /> <br />
            </li>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
}
