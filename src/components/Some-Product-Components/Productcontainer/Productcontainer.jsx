import React from 'react'
import './Productcontainer.css'
import { Link } from 'react-router-dom';

const Productcontainer = (product) => {
    let p = product.product
    // console.log(p);

    let overalltax = 10 / 100;
    let overcommission = 10 / 100;
    let extraforfun = 10 / 100;

    let mrp = parseInt(p.price);
    mrp = mrp + overalltax * mrp + overcommission * mrp + extraforfun * mrp
    const saleprice = mrp - extraforfun * mrp




    return (
        <div className='product-container'>
            <img src={p.productimage} alt="" />
            <div className='product-details'>
                    <p className='producttitle'>{p.productTitle}</p>
                    
                <div className='price-container'>
                    <span className='mrp'>MRP: <p className='rate'>Rs.{mrp}</p> </span>
                    <span className='saleprice'>Discount <p className='rate'>Rs.{saleprice}</p> </span>
                    <span className='yousave'>You Save: Rs.{mrp - saleprice} </span>
                </div>
                <a className='Link' href={`/product/${p.productType}/${p.id}`}>
                <button className='showmore-btn'>More Details</button>
                </a>
            </div>

        </div >
    )
}

export default Productcontainer