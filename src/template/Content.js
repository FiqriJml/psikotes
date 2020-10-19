import React from "react";

export default function Content({title, content, history}) {
  return (
    <div className="content-wrapper" style={{ minHeight: 608 }}>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">{title}</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                {history && history.map((item, key) => (
                  <li className="breadcrumb-item" key={key}>
                    <a href={item.path}>{item.label}</a>
                  </li>
                ))}
                <li className="breadcrumb-item active">{title}</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <section className="content" >
          {content}
      </section>
    </div>
  );
}
