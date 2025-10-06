import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import {deleteProduct, listProducts} from "../../services/ProductService.js";

const ListProductsComponent = () => {

    const [products, setProducts]  = useState([]);
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(5)

    const navigator = useNavigate();

    useEffect( () => {
            getAllProducts();
        }, []
    )

    function getAllProducts(){
        listProducts()
            .then((response) => setProducts(response.data))
            .catch(error => console.error(error))
    }

    function addNewProduct(){
        navigator('/add-product')
    }

    function updateProduct(id) {
        navigator(`/edit-product/${id}`)
    }

    function deleteProduct_f(id){
        deleteProduct(id)
            .then(response => getAllProducts())
            .catch(error => console.error(error))
    }

    const filteredProducts = products.filter((product) => {
        const term = searchTerm.toLowerCase();
        return (
            product.productName.toLowerCase().includes(term) ||
            product.category.toLowerCase().includes(term)
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
    const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    return (
        <div className="container">

            <br/>
            <h2 className="text-center">List of Products</h2>

            <br/>
            <div className="d-flex align-items-center gap-3 mb-2">
                {sessionStorage.getItem('role') !== 'USER' && (
                    <button className="btn btn-primary" onClick={addNewProduct}>
                        Add Product
                    </button>
                )}
                <br/>
                <input
                    type="text"
                    className="form-control w-25"
                    placeholder="Filter by name or category..."
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
                    <th style={{ textAlign: "center" }}>Product Name</th>
                    <th style={{ textAlign: "center" }}>Unit Price</th>
                    <th style={{ textAlign: "center" }}>Category</th>
                    {sessionStorage.getItem('role') !== 'USER' && (
                        <th style={{ textAlign: "center" }}>Actions</th>
                    )}
                </tr>
                </thead>
                <tbody>
                {
                    currentProducts.map(product =>
                        <tr key={product.id}>
                            <td>{product.productName}</td>
                            <td>{product.unitPrice}</td>
                            <td>{product.category}</td>
                            {sessionStorage.getItem('role') !== 'USER' && (
                                <td className="d-flex" style={{ gap: '0.5rem' }}>
                                    <button
                                        className="btn btn-info flex-fill"
                                        onClick={() => updateProduct(product.id)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="btn btn-danger flex-fill"
                                        onClick={() => deleteProduct_f(product.id)}
                                    >
                                        Delete Product
                                    </button>
                                </td>
                                )}
                        </tr>
                    )
                }
                <tr>

                </tr>
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

export default ListProductsComponent