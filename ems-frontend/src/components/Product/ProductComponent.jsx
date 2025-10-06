import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {createProduct, updateProduct, deleteProduct, getProduct} from "../../services/ProductService.js";


const ProductComponent = () => {

    const [productName, setProductName] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [category, setCategory] = useState('')
    const {id} = useParams();
    const [errors, setErrors] = useState({
        productName : '',
        unitPrice : '',
        category : ''
    })
    const navigator = useNavigate();


    useEffect(() => {
        if(id){
            getProduct(id).then(response => {
                setProductName(response.data.productName)
                setCategory(response.data.category)
                setUnitPrice(response.data.unitPrice)
            }).catch(error => console.error(error))
        }
    }, []);

    function saveOrUpdateProduct(e){
        e.preventDefault()

        if (validateForm()){
            const product = {productName, unitPrice, category}
            console.log(product)

            if (id) {
                updateProduct(id, product)
                    .then(response => navigator('/products'))
                    .catch(err => console.error(err))
            } else {
                createProduct(product)
                    .then(response => navigator('/products'))
                    .catch(err => console.error(err))
            }
        }
    }


    function validateForm() {
        let valid = true

        const errorsCopy = {...errors}

        if (productName.trim()) {
            errorsCopy.productName = '';
        } else {
            errorsCopy.productName = 'Product name is required';
            valid = false;
        }

        if (String(unitPrice).trim()) {
            errorsCopy.unitPrice = '';
        } else {
            errorsCopy.unitPrice = 'Unit price is required';
            valid = false;
        }

        if (String(category).trim()) {
            errorsCopy.category = '';
        } else {
            errorsCopy.category = 'Category is required';
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }

    function pageTitle(){
        if (id){
            return <h2 className="text-center">Update product</h2>
        } else {
            return <h2 className="text-center">Add product</h2>
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
                        <form className="form-group mb-2">
                            <br/>
                            <div>
                                <label className="form-label">Product name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter product name'
                                    name='productName'
                                    value={productName}
                                    className={`form-control ${errors.productName ? 'is-invalid' : ''}`}
                                    onChange={(e) => {setProductName(e.target.value)}}
                                ></input>
                                {errors.productName && <div className='invalid-feedback'>{errors.productName}</div>}
                            </div>
                            <br/>

                            <div>
                                <label className="form-label">Unit price:</label>
                                <input
                                    type='number'
                                    step='0.01'
                                    min='0'
                                    placeholder='Enter unit price'
                                    name='unitPrice'
                                    value={unitPrice}
                                    className={`form-control ${errors.unitPrice ? 'is-invalid' : ''}`}
                                    onChange={(e) => {setUnitPrice(e.target.value)}}
                                ></input>
                                {errors.unitPrice && <div className='invalid-feedback'>{errors.unitPrice}</div>}
                            </div>

                            <br/>
                            <div>
                                <label className="form-label">Category: </label>
                                <input
                                    type='text'
                                    placeholder='Category...'
                                    name='category'
                                    value={category}
                                    className={`form-control ${errors.category ? 'is-invalid' : ''}`}
                                    onChange={(e) => {setCategory(e.target.value)}}
                                ></input>
                                {errors.category && <div className='invalid-feedback'>{errors.category}</div>}
                            </div>

                            <br/>
                            <button
                                className="btn btn-success"
                                onClick={saveOrUpdateProduct}
                            >Sumbit</button>

                            <br/>


                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductComponent

