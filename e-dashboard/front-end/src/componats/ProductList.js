import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            let result = await fetch('http://localhost:5000/products');
            result = await result.json();
            if (result === 'error' || result === 'Product not found') {
                setError(result);
            } else {
                setProducts(result);
            }
        } catch (err) {
            setError('Error fetching products');
        }
    };

    const deleteProduct = (id) => {
        fetch(`http://localhost:5000/products/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                console.log(`Product with ID ${id} deleted successfully`);
                // Perform any additional actions after successful deletion
                alert(`Product with id: ${id} deleted successfully`);
                // Refresh product list
                getProducts();
            } else {
                console.error(`Failed to delete product with ID ${id}`);
                // Handle error scenarios
            }
        })
        .catch(error => {
            console.error('Error occurred while deleting product:', error);
            // Handle network errors or other unexpected errors
        });
    };

       const searchHandle=async(event)=>{
        let key = event.target.value;
        if(key)
            {
                let result = await fetch(`http://localhost:5000/search/${key}`);
        result= await result.json();
        if(result)
            {
                setProducts(result)
            }
            }
            else
            {
                getProducts(); 
            }


       }
    


    return (
        <div className="container mt-5">
            <h1 className="mb-4">Products List</h1>
            <input
                type="text"
                placeholder="Search products..."
                className="form-control mb-4"
                onChange={searchHandle}  // Update search query state
            />

            {error ? (
                <div className="alert alert-danger">{error}</div>
            ) : (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Sr. No</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Company</th>
                            <th>Category</th>
                            <th>Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product.id}>
                                <td>{index + 1}</td>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.company}</td>
                                <td>{product.category}</td>
                                <td><button onClick={()=>deleteProduct(product.id)}>Delete</button> <Link to={"/update/"+product.id}>Update</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ProductList;










