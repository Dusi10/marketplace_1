import React from 'react'
import { AllListings } from '../../components/AllListings';

const Food = () => {
    const title = "Ételek"
    return (
        <div className="listingBackground">
            <AllListings typeOfItem="Food" maxItemToShow={100} title={title}/>
        </div>
    );
}

export default Food