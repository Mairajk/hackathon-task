import React from 'react'
import Navbar from '../../Navbar/Navbar'
import { useParams } from 'react-router'
import { useState } from 'react'
import { useEffect } from 'react'
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfigs/firebaseConfigs'
import ProductSlider from '../ProductSlider/ProductSlider'
import './SpecificProductpage.css'


const SpecificProductpage = () => {

    const { productType, id } = useParams()
    const [product, setProduct] = useState('')
    const [succesMsg, setSuccesMsg] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    const GetCurrentProduct = () => {
        useEffect(() => {
            const getProduct = async () => {
                const docRef = doc(db, `products-${productType.toUpperCase()}`, id);
                const docSnap = await getDoc(docRef);
                setProduct(docSnap.data());
            }
            getProduct()
        }, [])
        return product
    }
    GetCurrentProduct()

    function GetCurrentUser() {
        const [user, setUser] = useState(" ")
        const usersCollectionRef = collection(db, "users")

        useEffect(() => {
            auth.onAuthStateChanged(
                userlogged => {
                    if (userlogged) {
                        const getUsers = async () => {
                            const q = query(collection(db, "users"), where("uid", "==", userlogged.uid))
                            // console.log(q);
                            const data = await getDocs(q);
                            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
                        }
                        getUsers();
                    }
                    else {
                        setUser(null);
                    }
                })
        }, [])
        return user
    }
    const loggeduser = GetCurrentUser();



    return (
        <div>
            <Navbar />
            {product ?
                <div className='myprod-container'>
                    <img className='prod-img-cont' src={product.productimage} alt="" />
                <div className='prod-data'>
                 <p className='prod-head'>{product.productTitle}</p>
                 <p className='prod-head'>{product.keyspecs}</p>
                </div>
                </div> : <div>loding</div>}
        </div>
    )
}

export default SpecificProductpage
