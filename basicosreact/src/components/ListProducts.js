import React, { Component, Fragment } from 'react';
import Product from './Product';

class ListProducts extends Component {
    state = {
        products: []
    }

    componentDidMount(){
        console.log(1);
        this.setState({
            products: [
                { id: 1, name: 'Camisa ReactJS', precio: 30 },
                { id: 2, name: 'Camisa Angular', precio: 40 },
                { id: 3, name: 'Camisa VueJS', precio: 20 },
                { id: 4, name: 'Camisa Node.JS', precio: 10 }
            ]
        })
    
    }

    componentWillMount(){
        console.log(2);

    }

    componentDidUpdate(){
        console.log(3);

    }

    componentWillUnmount(){
        console.log(4);
    }


    render() {
        console.log(5);
        
        const { products } = this.state;

        return (
            <Fragment>
                <h1>Lista de Productos</h1>
                {products.map(product => (
                    <Product 
                        key = {product.id}
                        product = {product}
                    />
                ))}
            </Fragment>
        );
    }

}

export default ListProducts;