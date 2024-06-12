import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';

const UpdateProduct = ({ productId }) => { // Accept productId as a prop
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(null); // State to handle errors
    const params = useParams();

    useEffect(() => {
        const getProductDetails = async () => {
            try {
                let result = await fetch(`http://localhost:5000/products/${params.id}`);
                if (!result.ok) {
                    throw new Error('Failed to fetch product details');
                }
                result = await result.json();
                setName(result.name);
                setPrice(result.price);
                setCategory(result.category);
                setCompany(result.company);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        getProductDetails();
    }, [params.id]); // Include params.id as a dependency

    const updateProduct = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        
        try {
            const response = await fetch(`http://localhost:5000/products/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    price,
                    category,
                    company
                })
            });
    
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || 'Failed to update product');
            }
    
            // Assuming the API responds with a success message
            setName("");
            setPrice("");
            setCategory("");
            setCompany("");
            alert('Product updated successfully');
        } catch (error) {
            console.error('Error:', error.message);
            setError(error.message); // Set error state to display the error message
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Update Product</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={updateProduct} className="needs-validation">
                <div className="mb-3">
                    <label htmlFor="productName" className="form-label">Product Name</label>
                    <input type="text" className="form-control" id="productName" placeholder="Enter Product Name" value={name} onChange={(e) => { setName(e.target.value) }} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="productPrice" className="form-label">Product Price</label>
                    <input type="text" className="form-control" id="productPrice" placeholder="Product Price" value={price} onChange={(e) => { setPrice(e.target.value) }} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="productCategory" className="form-label">Product Category</label>
                    <input type="text" className="form-control" id="productCategory" placeholder="Product Category" value={category} onChange={(e) => { setCategory(e.target.value) }} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="companyName" className="form-label">Company Name</label>
                    <input type="text" className="form-control" id="companyName" placeholder="Enter Company" value={company} onChange={(e) => { setCompany(e.target.value) }} required />
                </div>
                <button type="submit" className="btn btn-primary">Update Product</button>
            </form>
        </div>
    );
}; 

export default UpdateProduct;
