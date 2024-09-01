import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { IoSearchOutline } from 'react-icons/io5';
import Modal from '../Components/Modal';
import Card from '../Components/Card';
import axiosInstance from '../api/axiosInstance';

const BooksListing = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpenModal = useCallback((book = null) => {
    setCurrentBook(book);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setCurrentBook(null);
  }, []);

  const fetchBooks = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/books');
      const sortedBooks = response.data.sort((a, b) => b.id - a.id);
      setBooks(sortedBooks);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }, []);

  const handleEdit = useCallback((book) => {
    handleOpenModal(book);
  }, [handleOpenModal]);

  const handleDelete = useCallback(async (id) => {
    try {
      await axiosInstance.delete(`/books/${id}`);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  }, []);

  const handleBookAddedOrUpdated = useCallback(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const filteredBooks = useMemo(
    () =>
      books.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [books, searchQuery]
  );

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="w-full lg:w-1/4 bg-gray-100 p-6 flex flex-col">
        <p className="font-semibold mb-4 text-center">Welcome {userInfo?.username}</p>

        <div className="relative mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full p-2 pl-10 border border-gray-300 rounded-lg shadow-md focus:outline-none"
            placeholder="Search for a book"
          />
          <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-300"
        >
          Add New Book
        </button>
      </div>

      <div className="flex-1 bg-white p-6 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-6 text-center">Books Listing</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredBooks.map((book) => (
            <Card
              key={book.id}
              title={book.title}
              author={book.author}
              genre={book.genre}
              year={book.year}
              onEdit={() => handleEdit(book)}
              onDelete={() => handleDelete(book.id)}
            />
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onBookAddedOrUpdated={handleBookAddedOrUpdated}
        book={currentBook}
      />
    </div>
  );
};

export default BooksListing;
