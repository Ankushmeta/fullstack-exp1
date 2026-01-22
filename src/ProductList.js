import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from './AuthContext';
import { addProduct, updateProduct, removeProduct, addToCart } from './store';

const ProductList = () => {
  const products = useSelector(state => state.products.items);
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const { role, isLoggedIn } = useAuth();
  
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });
  const [editingId, setEditingId] = useState(null);

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price) {
      dispatch(addProduct({ name: newProduct.name, price: Number(newProduct.price) }));
      setNewProduct({ name: '', price: '' });
    }
  };

  const handleUpdateProduct = (product) => {
    dispatch(updateProduct(product));
    setEditingId(null);
  };

  if (!isLoggedIn) {
    return <div style={{ padding: '20px' }}>Please login to view products</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h3>Products</h3>
      
      {role === 'admin' && (
        <form onSubmit={handleAddProduct} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd' }}>
          <h4>Add New Product</h4>
          <input
            type="text"
            placeholder="Product name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
            style={{ margin: '5px', padding: '5px' }}
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
            style={{ margin: '5px', padding: '5px' }}
          />
          <button type="submit" style={{ margin: '5px', padding: '5px' }}>Add Product</button>
        </form>
      )}

      <div>
        {products.map(product => (
          <div key={product.id} style={{ border: '1px solid #eee', padding: '10px', margin: '5px' }}>
            {editingId === product.id ? (
              <EditProduct product={product} onSave={handleUpdateProduct} onCancel={() => setEditingId(null)} />
            ) : (
              <>
                <h4>{product.name}</h4>
                <p>Price: ${product.price}</p>
                <button onClick={() => dispatch(addToCart(product))} style={{ margin: '5px', padding: '5px' }}>
                  Add to Cart
                </button>
                {role === 'admin' && (
                  <>
                    <button onClick={() => setEditingId(product.id)} style={{ margin: '5px', padding: '5px' }}>
                      Edit
                    </button>
                    <button onClick={() => dispatch(removeProduct(product.id))} style={{ margin: '5px', padding: '5px' }}>
                      Delete
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ddd' }}>
        <h4>Cart ({cart.length} items)</h4>
        {cart.map(item => (
          <div key={item.id} style={{ padding: '5px' }}>
            {item.name} - ${item.price} x {item.quantity}
          </div>
        ))}
      </div>
    </div>
  );
};

const EditProduct = ({ product, onSave, onCancel }) => {
  const [editData, setEditData] = useState({ ...product });

  const handleSave = (e) => {
    e.preventDefault();
    onSave({ ...editData, price: Number(editData.price) });
  };

  return (
    <form onSubmit={handleSave}>
      <input
        type="text"
        value={editData.name}
        onChange={(e) => setEditData({...editData, name: e.target.value})}
        style={{ margin: '5px', padding: '5px' }}
      />
      <input
        type="number"
        value={editData.price}
        onChange={(e) => setEditData({...editData, price: e.target.value})}
        style={{ margin: '5px', padding: '5px' }}
      />
      <button type="submit" style={{ margin: '5px', padding: '5px' }}>Save</button>
      <button type="button" onClick={onCancel} style={{ margin: '5px', padding: '5px' }}>Cancel</button>
    </form>
  );
};

export default ProductList;