import React from 'react';

const Imagen = ({imagen}) => {

  const {largeImageURL, likes, previewURL, tags, views} = imagen;

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      <div className="card mb-4">
        <img src={previewURL} alt={tags} className="card-img-top"/>

        <div className="card-body">
          <p className="cart-text">{likes} Me gusta</p>
          <p className="cart-text">{views} Vistas</p>
        </div>

        <div className="card_footer">
          <a
            href={largeImageURL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-block"
          >Ver Imagen</a>
        </div>
      </div>
    </div>
  );
};

export default Imagen;