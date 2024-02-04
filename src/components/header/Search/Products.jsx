import React from 'react'
import ProductosHome from '../../ProductosSliderHome/ProductosHome';

export default function Products({ filtredProducts }) {
    return (

        <div
            className="list-container"
            style={{
                gap: "10px",
                display: "grid",
                placeItems: "center",
                alignContent: "stretch",
            }}
        >

            {filtredProducts !== null &&
                filtredProducts.map((producto) => {
                    return (

                        <ProductosHome
                            key={producto.id}
                            image={producto.image}
                            name={producto.name}
                            price={producto.price}
                            currency={producto.currency}
                            url={producto.url}
                        />
                    );
                })}

        </div>

    );
}
