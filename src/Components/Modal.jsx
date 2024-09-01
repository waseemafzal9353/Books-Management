import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios";

const Modal = ({ isOpen, onClose, onBookAddedOrUpdated, book }) => {
  const [show, setShow] = useState(isOpen);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [nextId, setNextId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      if (book) {
        setTitle(book.title);
        setAuthor(book.author);
        setGenre(book.genre);
        setYear(book.year);
        setIsEditing(true);
      } else {
        fetchNextId();
        setIsEditing(false);
      }
    } else {
      const timer = setTimeout(() => {
        setShow(false);
        resetForm();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, book]);

  const fetchNextId = async () => {
    try {
      const response = await axios.get("http://localhost:4000/books");
      const books = response.data;
      const maxId = books.reduce((max, book) => Math.max(max, book.id), 0);
      setNextId(maxId + 1);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookData = {
        title,
        author,
        genre,
        year: parseInt(year, 10),
      };
  
      if (isEditing) {
        await axios.put(`http://localhost:4000/books/${book.id}`, bookData);
      } else {
        await axios.post("http://localhost:4000/books", {
          ...bookData,
          id: nextId,
        });
      }
  
      resetForm();
      onClose();
      onBookAddedOrUpdated();
    } catch (error) {
      console.error("Error adding/updating book:", error.response ? error.response.data : error.message);
      alert("An error occurred while saving the book. Please try again.");
    }
  };
  

  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setGenre("");
    setYear("");
  };

  if (!show) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-lg max-w-sm w-full transform transition-transform duration-300 ${
          isOpen ? "scale-100" : "scale-90"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <IoClose size={24} />
        </button>
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "Edit Book" : "Add New Book"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="author" className="block text-gray-700 mb-2">
              Author
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="genre" className="block text-gray-700 mb-2">
              Genre
            </label>
            <input
              type="text"
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="year" className="block text-gray-700 mb-2">
              Year
            </label>
            <input
              type="number"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 rounded text-white transition duration-300 ${
              isEditing
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isEditing ? "Update Book" : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
