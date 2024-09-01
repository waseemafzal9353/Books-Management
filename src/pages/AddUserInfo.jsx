import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userInfo } from '../redux/slices/usersSlice';
import { useNavigate } from 'react-router-dom';

const UserInfo = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userInfo({username, email}))
    navigate('bookslisting')
  };
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h4 className="text-xl font-semibold mb-4 text-center">Please Provide Basic Information</h4>
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <div className="mb-4 w-full">
            <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              id="name"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your name"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Add Info
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserInfo;
