import {Wrapper} from "../../components/Wrapper";
import {Role} from "../../models/role";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Product} from "../../models/product";

function Products() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get('products');
                setProducts(data.data);
            }
        )();
    }, []);
    return (
        <Wrapper>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        products.map((p: Product) => {
                            return (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td><img src={p.image} width={'50'}/></td>
                                    <td>{p.title}</td>
                                    <td>{p.description}</td>
                                    <td>{p.price}</td>
                                    <td></td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            </div>
        </Wrapper>
    );
}

export default Products;