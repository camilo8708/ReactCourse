import React from 'react';
import PropTypes from 'prop-types'

const Header = ({mensaje}) => {
  return (
    <header className="bg-primary text-white text-center">
      <h2>{ mensaje }</h2>
    </header>
  );
};

Header.propTypes = {
  mensaje: PropTypes.string.isRequired
}

export default Header;