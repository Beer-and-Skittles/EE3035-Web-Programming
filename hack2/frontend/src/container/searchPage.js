/****************************************************************************
  FileName      [ searchPage.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ display the search result ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React, { useState, useEffect } from 'react'
import '../css/searchPage.css'
import { useNavigate, useLocation } from 'react-router-dom'

import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})

const SearchPage = () => {
    const { state } = useLocation();
    const [restaurants, setRestaurant] = useState([])
    const getRestaurant = async () => {
        // TODO Part I-3-b: get information of restaurants from DB
        console.log('getRestaurant');
        const priceFilter = state.priceFilter;
        const mealFilter = state.mealFilter;
        const typeFilter = state.typeFilter;
        const sortBy = state.sortBy;
        // console.log(priceFilter, mealFilter, typeFilter, sortBy);
        const {
            data: { message, content },
        } = await axios.get('http://localhost:4000/api/getSearch', null);
        
        console.log();

    }

    useEffect(() => {
        getRestaurant()
    }, [state.priceFilter, state.mealFilter, state.typeFilter, state.sortBy])


    const navigate = useNavigate();
    const ToRestaurant = (id) => {
        // TODO Part III-1: navigate the user to restaurant page with the corresponding id
    }
    const getPrice = (price) => {
        let priceText = ""
        for (let i = 0; i < price; i++)
            priceText += "$"
        return (priceText)
    }

    return (

        <div className='searchPageContainer'>
            {
                restaurants.map(({id, img, name, price}) => (
                    // TODO Part I-2: search page front-end
                    <div className='resBlock' id={id} key={id}>
                        <div className='resImgContainer'>
                            <img className='resImg' src={img}></img>
                        </div>
                        <div className='resInfo'>
                            <div className='title'>
                                <p className='name'>{name}</p>
                                <p className='price'>{getPrice(price)}</p>
                                <p className='distance'></p>
                            </div>
                            <div className='description'></div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
export default SearchPage