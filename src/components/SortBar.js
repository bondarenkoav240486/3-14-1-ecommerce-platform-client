// import React, { useState, useContext, useEffect } from 'react';
// import { Context } from "../index";
// import { observer } from "mobx-react-lite";
// import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined';
// import SortPrice from './SortPrice';
// import SortRating from './SortRating';

// const SortBar = observer(() => {
//     const { device } = useContext(Context);
//     let devices = device.devices;

//     return (
//         <div className='SortBar Row'>
//             <SortPrice
            
//             />
//             <SortRating
            
//             />
//         </div>
//     )

// })  
  
// export  default SortBar;


import React from 'react';
import SortPrice from './SortPrice';
import SortRating from './SortRating';

const SortBar = ({ setSort }) => {
    // setSort()
    // debugger
    return (
        <div className='SortBar Row'>
            <SortPrice setSort={setSort} />
            <SortRating setSort={setSort} />
        </div>
    );
};

export default SortBar;
