import React from 'react';
import PropTypes from 'prop-types';

const Noticia = ({noticia}) => {

  const {urlToImage, url, title, description, source} = noticia;

  return (
    <div className="col">
      <div className="card">
        <img src={urlToImage} alt="title" className="card-img"/>
        <div className="card-img-overlay">
          <span className="card-title text-white">{source.name}</span>
        </div>

        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a
            href={url}
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >Ver Noticia Completa</a>
        </div>
      </div>
    </div>
  );
};

Noticia.propTypes = {
  noticia: PropTypes.object.isRequired
}
export default Noticia;