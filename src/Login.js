import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const Login = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('user');
  const { login, logout, isLoggedIn, userName } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    if (name.trim()) {
      login(name, role);
      setName('');
    }
  };

  if (isLoggedIn) {
    return (
      <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
        <h3>Welcome, {userName}!</h3>
        <p>Role: {role}</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ margin: '5px', padding: '5px' }}
        />
        <select 
          value={role} 
          onChange={(e) => setRole(e.target.value)}
          style={{ margin: '5px', padding: '5px' }}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" style={{ margin: '5px', padding: '5px' }}>Login</button>
      </form>
    </div>
  );
};

export default Login;