const express = require('express');
const connection = require('./DB/config');
const cors = require('cors'); // Import the cors package


const app = express();

app.use(express.json());

// Use the cors middleware
app.use(cors());

app.post('/signup', (req, res) => {
    const data = req.body;
    connection.query('INSERT INTO users SET ?', data, (err, result, fields) => {
        if (err) {
            return res.status(500).send(err);
        }
        delete result.password;

        

        res.send(result);
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    connection.query('SELECT * FROM users WHERE email = ? AND password = ?',[email, password], (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }

            if (results.length > 0) {
                const user = { ...results[0] }; // Copy user object
                delete user.password; // Remove password field
                
                
                
                
                res.send({ message: 'Login successful', user });
            } else {
                res.status(401).send('Invalid email or password');
            }
        }
    );
});



app.post('/add-product', (req, res) => {
    const data = req.body;
    connection.query('INSERT INTO products SET ?', data, (err, result, fields) => {
        if (err) {
            return res.status(500).send(err);
        }
        delete result.password;
        res.send(result);
    });
});


app.get('/products', (req, res) => {
    connection.query("SELECT * FROM products", (err, result) => {
        if (err) {
            res.status(500).send('Error occurred while fetching products');
        } else if (result.length > 0) {
            res.status(200).send(result);
        } else {
            res.status(404).send('Product not found');
        }
    });
});


app.delete('/products/:id', (req, res) => {
    const productId = req.params.id;
    connection.query("DELETE FROM products WHERE id = ?", [productId], (err, result) => {
        if (err) {
            res.status(500).send('Error occurred while deleting product');
        } else if (result.affectedRows > 0) {
            res.status(200).send(`Product with ID ${productId} deleted successfully`);
        } else {
            res.status(404).send(`Product with ID ${productId} not found`);
        }
    });
});


app.get('/products/:id', (req, res) => {
    const productId = req.params.id;

    connection.query("SELECT * FROM products WHERE id = ?", [productId], (err, result) => {
        if (err) {
            res.status(500).send('Error occurred while fetching product details');
        } else if (result.length === 0) {
            res.status(404).send(`Product with ID ${productId} not found`);
        } else {
            res.status(200).json(result[0]); // Return the first product found (assuming IDs are unique)
            console.log(result);
        }
    });
});


app.put('/products/:id', (req, res) => {
    const productId = req.params.id;
    const { name, price, category, company } = req.body;

    connection.query("UPDATE products SET name=?, price=?, category=?, company=? WHERE id=?", [name, price, category, company, productId], (err, result) => {
        if (err) {
            res.status(500).send('Error occurred while updating product');
        } else if (result.affectedRows === 0) {
            res.status(404).send(`Product with ID ${productId} not found`);
        } else {
            res.status(200).send(`Product with ID ${productId} updated successfully`);
        }
    });
});


app.get('/search/:key', (req, res) => {
    const searchKey = req.params.key;

    const query = `
        SELECT * FROM products
        WHERE name LIKE ? OR price LIKE ? OR category LIKE ? OR company LIKE ?
    `;
    const searchValue = `%${searchKey}%`;

    connection.query(query, [searchValue, searchValue, searchValue, searchValue], (err, results) => {
        if (err) {
            res.status(500).send('Error occurred while searching for products');
        } else {
            res.status(200).json(results);
        }
    });
});










app.listen(5000, () => {
    console.log('Server is running on port 5000');
});







