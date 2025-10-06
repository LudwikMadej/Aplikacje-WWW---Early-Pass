import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {createBook, getBook, updateBook} from "../../services/BookService.js";



const BookComponent = () => {
    const [title, setTitle] = useState()
    const [author, setAuthor] = useState()
    const [averageRating, setAverageRating] = useState()
    const [language, setLanguage] = useState()
    const [numberOfPages, setNumberOfPages] = useState()
    const {id} = useParams()
    const [errors, setErrors] = useState({
        title : '',
        author : '',
        averageRating : '',
        language : '',
        numberOfPages : ''
    })
    const navigator = useNavigate()

    useEffect(() => {
        if (id){
            getBook(id).then(response => {
                setTitle(response.data.title)
                setAuthor(response.data.author)
                setLanguage(response.data.language)
                setAverageRating(response.data.averageRating)
                setNumberOfPages(response.data.numberOfPages)
            }).catch(err => console.error(err))
        }
    }, []);

    function saveOrUpdateBook(e) {
        e.preventDefault()

        if (validateForm()){
            const book = {
                title,
                author,
                averageRating,
                language,
                numberOfPages
            }

            console.log(book)

            if (id){
                updateBook(id, book)
                    .then(response => navigator('/books'))
                    .catch(err => console.error(err))
            } else {
                createBook(book)
                    .then(response => navigator('/books'))
                    .catch(err => console.error(err))
            }
        }

    }

    function validateForm(){
        let valid = true
        const errorsCopy = {...errors}

        if (String(title).trim()) {
            errorsCopy.title = '';
        } else {
            errorsCopy.title = 'Title is required';
            valid = false;
        }

        if (String(author).trim()) {
            errorsCopy.author = '';
        } else {
            errorsCopy.author = 'Author is required';
            valid = false;
        }

        if (String(averageRating).trim()) {
            errorsCopy.averageRating = '';
        } else {
            errorsCopy.averageRating = 'Average rating is required';
            valid = false;
        }

        if (String(language).trim()) {
            errorsCopy.language = '';
        } else {
            errorsCopy.language = 'Language is required';
            valid = false;
        }

        if (String(numberOfPages).trim()) {
            errorsCopy.numberOfPages = '';
        } else {
            errorsCopy.numberOfPages = 'Number of pages is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid
    }

    function pageTitle(){
        if (id){
            return <h2 className="text-center">Update book</h2>
        } else {
            return <h2 className="text-center">Add book</h2>
        }
    }
    
    return (
        <div className="container">
            <br/>
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    {
                        pageTitle()
                    }
                    <div className="card-body">
                        <form>
                            <br/>
                            <div>
                                <label className="form-label">Title:</label>
                                <input
                                    type='text'
                                    placeholder='Enter title'
                                    name='title'
                                    value={title}
                                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                    onChange={(e) => {setTitle(e.target.value)}}
                                ></input>
                                {errors.title && <div className='invalid-feedback'>{errors.title}</div>}
                            </div>
                            <br/>

                            <div>
                                <label className="form-label">Author:</label>
                                <input
                                    type='text'
                                    placeholder='Enter author'
                                    name='author'
                                    value={author}
                                    className={`form-control ${errors.author ? 'is-invalid' : ''}`}
                                    onChange={(e) => {setAuthor(e.target.value)}}
                                ></input>
                                {errors.author && <div className='invalid-feedback'>{errors.author}</div>}
                            </div>
                            <br/>

                            <div>
                                <label className="form-label">Average rating:</label>
                                <input
                                    type='number'
                                    step='0.01'
                                    min='0'
                                    max='10'
                                    placeholder='Enter average rating'
                                    name='averageRating'
                                    value={averageRating}
                                    className={`form-control ${errors.averageRating ? 'is-invalid' : ''}`}
                                    onChange={(e) => {
                                        let value = e.target.value;
                                        if (value > 10) value = 10;
                                        if (value < 0) value = 0;
                                        setAverageRating(value);
                                    }}
                                    onKeyDown={(e) => {
                                        if (['e', 'E', '+', '-'].includes(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                ></input>
                                {errors.averageRating && <div className='invalid-feedback'>{errors.averageRating}</div>}
                            </div>
                            <br/>

                            <div>
                                <label className="form-label">Language:</label>
                                <input
                                    type='text'
                                    placeholder='Enter language'
                                    name='language'
                                    value={language}
                                    className={`form-control ${errors.language ? 'is-invalid' : ''}`}
                                    onChange={(e) => {setLanguage(e.target.value)}}
                                ></input>
                                {errors.language && <div className='invalid-feedback'>{errors.language}</div>}
                            </div>
                            <br/>

                            <div>
                                <label className="form-label">Number of pages:</label>
                                <input
                                    type='number'
                                    step='1'
                                    min='1'
                                    max='100000'
                                    placeholder='Enter number of pages'
                                    name='numberOfPages'
                                    value={numberOfPages}
                                    className={`form-control ${errors.numberOfPages ? 'is-invalid' : ''}`}
                                    onChange={(e) => {
                                        let value = e.target.value;
                                        if (value > 100000) value = 100000;
                                        if (value < 0) value = 0;
                                        setNumberOfPages(value);
                                    }}
                                    onKeyDown={(e) => {
                                        if (['e', 'E', '+', '-'].includes(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                ></input>
                                {errors.numberOfPages && <div className='invalid-feedback'>{errors.numberOfPages}</div>}
                            </div>
                            <br/>

                            <button
                                className="btn btn-success"
                                onClick={saveOrUpdateBook}
                            >Sumbit</button>

                        </form>

                    </div>
                </div>

            </div>
        </div>
    )
}
export default BookComponent
