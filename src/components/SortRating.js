import React, { useState, useContext, useEffect } from 'react';
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined';
import { getSortRatingDevices } from "../http/deviceAPI";
import StarIcon from '@mui/icons-material/Star';

const SortRating = observer(
    ({ setSort }) => {
        // const [sortBy, setSortBy] = useState('');
        const { device } = useContext(Context);


        // const SortRating = ({ setSort }) => {
        const handleSort = (order) => {
            setSort({ type: 'rating', order });
        };
        // useEffect(() => {
        //     getSortRatingDevices(sortBy)
        //         .then(
        //             (data) => {
        //                 device.setDevices(data);
        //             }
        //         );
        // }, [sortBy]);

        // const handleSort = (value) => {
        //     setSortBy(value);
        // }
        // debugger

        return (
            <div className='SortPrice Row'>
                <div
                    className='Button'
                    // onClick={() => handleSort('asc')}
                    onClick={() => handleSort('asc')}

                >
                    <StarIcon  />
                    Рейтинг: від низького до високого
                </div>
                <div
                    className='Button'
                    // onClick={() => handleSort('desc')}
                    onClick={() => handleSort('desc')}
                >
                    <StarIcon  />
                    Рейтинг: від високого до низького
                </div>
            </div>
        )
    }
)

export default SortRating;
