import React from 'react';

function Product({product}){
    return(
        <div>
        <h1>{product.name}</h1>
        <p>Precio: ${product.precio}</p>
        </div>
    );
}

export default Product;