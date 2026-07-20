// import React, { useState, useContext, useEffect } from 'react';
// import { Context } from "../index";
// import { observer } from "mobx-react-lite";
// import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined';
// import { getSortPriceDevices } from "../http/deviceAPI";
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// // import Select from '@mui/material/Select';
// // import SelectSmall from './SelectSmall';

// const SortPrice = observer(() => {
//     const [sortBy, setSortBy] = useState('');
//     const { device } = useContext(Context);

//     // useEffect(() => {
//     //     getSortPriceDevices(sortBy)
//     //         .then(
//     //             (data) => {
//     //                 device.setDevices(data);
//     //             }
//     //         );
//     // }, [sortBy]);

//     const handleSort = (value) => {
//         setSortBy(value);
//     };

//     return (
//         <div className='SortPrice Row'>

//             <div
//                 className='Button'
//                 onClick={() => handleSort('asc')}
//             >
//                 <SwapVertOutlinedIcon />
//                 Сортувати за зростанням ціни
//             </div>
//             <div
//                 className='Button'
//                 onClick={() => handleSort('desc')}
//             >
//                 <SwapVertOutlinedIcon
//                 />
//                 Сортувати за спаданням ціни
//             </div>
//         </div>
//     )
// })

// export default SortPrice;



import React, { useState, useContext, useEffect } from 'react';
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined';
import { getSortPriceDevices } from "../http/deviceAPI";
import SortIcon from '@mui/icons-material/Sort';

const SortPrice = observer(({ setSort }) => {
    const { device } = useContext(Context);
    // const [sortBy, setSortBy] = useState('');

    // useEffect(() => {
    //     if (sortBy) {
    //         getSortPriceDevices(sortBy)
    //             .then((data) => {
    //                 device.setDevices(data);
    //             });
    //     }
    // }, [sortBy, device]);

    const handleSort = (order) => {
        // setSortBy(order);
        setSort({ type: 'price', order });
    };

    return (
        <div className='SortPrice Row'>
            <div
                className='Button'
                onClick={() => handleSort('asc')}
            >
                {/* <SwapVertOutlinedIcon /> */}
                <SortIcon />
                Ціна: від низької до високої
            </div>
            <div
                className='Button'
                onClick={() => handleSort('desc')}
            >
                <SortIcon />
                Ціна: від високої до низької
            </div>
        </div>
    );
});

export default SortPrice;
