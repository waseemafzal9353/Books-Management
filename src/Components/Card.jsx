import React from "react";

const Card = ({ title, author, genre, year, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4 flex flex-col h-full">
      <div className="flex-grow">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-700 mb-1">
          <strong>Author:</strong> {author}
        </p>
        <p className="text-gray-700 mb-1">
          <strong>Genre:</strong> {genre}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Year:</strong> {year}
        </p>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={onEdit}
          className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition duration-300"
        >
          Update
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;
