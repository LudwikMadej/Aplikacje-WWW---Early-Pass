import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import {deleteBook, listBooks} from "../../services/BookService.js";

function ListBookComponent() {

    const [books, setBooks] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const navigator = useNavigate()

    useEffect(() => {
        return () => {
            getAllBooks()
        };
    }, []);

    function getAllBooks(){
        listBooks()
            .then(response => setBooks(response.data))
            .catch(error => console.error(error))
    }

    function addNewBook(){
        navigator('/add-book')
    }

    function updateBook(id){
        navigator(`/edit-book/${id}`)
    }

    function deleteBook_f(id){
        deleteBook(id)
            .then(response => getAllBooks())
            .catch(error => console.error(error))
    }

    const filteredBooks = books.filter((book) => {
        const term = searchTerm.toLowerCase();
        return (
            book.title.toLowerCase().includes(term) ||
            book.author.toLowerCase().includes(term)
        );
    });

    const getPageNumbers = (totalPages) => {
        const pages = [];

        if (totalPages <= 10) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage > 6){
                pages.push(1)
                pages.push("...");
            }


            for (let i = Math.max(1, currentPage-5);
                 i <= Math.min(currentPage + 5, totalPages, currentPage+5); i++) pages.push(i);

            if (totalPages - currentPage > 5){
                pages.push("...");
                pages.push(totalPages)
            };
        }

        return pages;
    };

    const indexOfLast = currentPage * itemsPerPage
    const indexOfFirst = indexOfLast - itemsPerPage
    const currentBooks = filteredBooks.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

    return (
        <div className="container">
            <br/>
            <h2 className="text-center">List of Books</h2>
            <br/>

            <div className="d-flex align-items-center gap-3 mb-2">
                {
                    sessionStorage.getItem('role') !== 'USER' &&
                    <button
                        className="btn btn-primary"
                        onClick={addNewBook}
                    >
                        Add Book
                    </button>
                }
                <br/>

                <input
                    type="text"
                    className="form-control w-25"
                    placeholder="Filter by title or author..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                />
                <select
                    className="form-select w-25"
                    value={itemsPerPage}
                    onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                    }}
                >
                    <option value={2}>2 per page</option>
                    <option value={5}>5 per page</option>
                    <option value={10}>10 per page</option>
                    <option value={20}>20 per page</option>
                    <option value={50}>50 per page</option>
                </select>
            </div>
            <table className="table table-striped table-bordered" style={{ tableLayout: "fixed" }}>
                <thead>
                <tr>
                    <th style={{ width: "36%", textAlign: "center", verticalAlign: "middle" }}>Title</th>
                    <th style={{ width: "20%", textAlign: "center", verticalAlign: "middle" }}>Author</th>
                    <th style={{ width: "7%", textAlign: "center", verticalAlign: "middle" }}>Average reputation</th>
                    <th style={{ width: "7%", textAlign: "center", verticalAlign: "middle" }}>Language</th>
                    <th style={{ width: "7%", textAlign: "center", verticalAlign: "middle" }}>Number of pages</th>
                    {sessionStorage.getItem('role') !== 'USER' && (
                        <th style={{ width: "18%", textAlign: "center", verticalAlign: "middle" }}>Actions</th>
                    )}

                </tr>
                </thead>
                <tbody>
                {
                    currentBooks.map(book =>
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.averageRating}</td>
                            <td>{book.language}</td>
                            <td>{book.numberOfPages}</td>
                            {sessionStorage.getItem('role') !== 'USER' && (
                            <td className="d-flex gap-2">
                                <button
                                    className="btn btn-info"
                                    onClick={() => updateBook(book.id)}
                                >
                                    Update
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteBook_f(book.id)}
                                >
                                    Delete Book
                                </button>
                            </td>
                                )}
                        </tr>
                    )
                }
                </tbody>
            </table>
            <div className="d-flex justify-content-center">
                <nav>
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                            <button className="page-link" onClick={() => setCurrentPage(prev => prev - 1)}>Prev</button>
                        </li>

                        {getPageNumbers(totalPages, currentPage).map((page, index) =>
                            page === "..." ? (
                                <li key={index} className="page-item disabled">
                                    <span className="page-link">...</span>
                                </li>
                            ) : (
                                <li key={index} className={`page-item ${currentPage === page ? "active" : ""}`}>
                                    <button className="page-link" onClick={() => setCurrentPage(page)}>
                                        {page}
                                    </button>
                                </li>
                            )
                        )}

                        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                            <button className="page-link" onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
                        </li>
                    </ul>
                </nav>
            </div>

        </div>
    )
}

export default ListBookComponent
