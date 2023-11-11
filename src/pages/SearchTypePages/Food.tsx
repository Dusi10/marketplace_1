import React from 'react'
import { AllListings } from '../../components/AllListings';

const Food = () => {
    const title = "Ételek"
    return (
        <div className="listingBackground">
            <h1>{title}</h1>
            <AllListings typeOfItem="Food" maxItemToShow={100}/>
        </div>
    );
}

export default Food