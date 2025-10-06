import React, {useState, useEffect} from 'react'
import {deleteAppUSer, listAppUsers} from "../../services/AppUserService.js";
import {useNavigate} from "react-router-dom";

const ListAppUserComponent = () => {

    const [appUsers, setAppUsers] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    const navigator = useNavigate();

    useEffect(() => {
            getAllUsers()
    }, []);
    
    function getAllUsers(){
            listAppUsers().then((response) => {
                setAppUsers(response.data)
            }).catch(error => {
                console.error(error)
        })
    }

    function addNewAppUser(){
        navigator('/add-user')
    }

    function updateAppUser(id){
        navigator(`/edit-user/${id}`)
    }

    function deleteAppUser(id){
        console.log(id)

        deleteAppUSer(id).then(response => {
            getAllUsers()
        }).catch(error => console.error(error))
    }

    const filteredUsers = appUsers.filter((user) => {
        const term = searchTerm.toLowerCase();
        return (
            user.login.toLowerCase().includes(term) ||
            user.email.toLowerCase().includes(term) ||
            user.role.toLowerCase().includes(term)
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
    const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    return (
        <div className="container">
            <br/>
            <h2 className="text-center">List of Users</h2>
            <br/>
            <div className="d-flex align-items-center gap-3 mb-2">
                <input
                    type="text"
                    className="form-control w-25"
                    placeholder="Filter by login, e-mail or role..."
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
                        <th style={{textAlign: "center"}}>User Login</th>
                        <th style={{textAlign: "center"}}>User Email</th>
                        <th style={{textAlign: "center"}}>User Role</th>
                        <th style={{textAlign: "center"}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentUsers.map(appUser =>
                            <tr key={appUser.login}>
                                <td>{appUser.login}</td>
                                <td>{appUser.email}</td>
                                <td>{appUser.role}</td>
                                <td className="d-flex" style={{ gap: '0.5rem' }}>
                                    <button
                                        className="btn btn-info flex-fill"
                                        onClick={() => updateAppUser(appUser.login)}
                                    >Update</button>
                                    <br/>
                                    <button
                                        className="btn btn-danger flex-fill"
                                        onClick={() => deleteAppUser(appUser.login)}
                                    >Delete User</button>
                                </td>
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
export default ListAppUserComponent

