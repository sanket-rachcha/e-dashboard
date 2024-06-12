import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(null); // State to handle errors


    const AddProducts = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        const userId = JSON.parse(localStorage.getItem('user')).id;

        console.log(name, price, category, company, userId);

        try {
            const response = await fetch('http://localhost:5000/add-product', {
                method: 'post',
                body: JSON.stringify({ name, price, category, company, userId }),
                headers: {
                    'Content-type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error('Failed to add product');
            } else {
                // Clear form fields after successful submission
                setName("");
                setPrice("");
                setCategory("");
                setCompany("");
                // You might want to add further actions upon successful submission, like displaying a success message
                alert("Product added to database successfully");
            }
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Add Product</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={AddProducts}> {/* Attach onSubmit event to the form */}
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
                <button type="submit" className="btn btn-primary">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
