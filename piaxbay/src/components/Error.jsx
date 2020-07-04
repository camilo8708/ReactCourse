import React from 'react';

const Error = ({error}) => {
  return (
    <p className="alert alert-danger text-center">{error}</p>
  );
};

export default Error;