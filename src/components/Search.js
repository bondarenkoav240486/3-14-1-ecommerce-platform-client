import React, { useState, useContext, useEffect } from 'react';
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { useNavigate } from 'react-router-dom';
import { getSearchGoods, fetchDevices2 } from "../http/deviceAPI";
import { SEARCH_PAGE_ROUTE } from "../utils/consts";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useFormControl } from '@mui/material/FormControl';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';


const Search = observer(() => {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const { device } = useContext(Context);

    const navigate = useNavigate();

    const handleSearch = () => {
        device.setSearchQuery(searchTerm);

        fetchDevices2(
            // device.selectedType.id,
            // device.selectedType.id || 0, // або надайте значення за замовчуванням
            0,
            [], // selectedBrands
            [], // priceRange
            {}, // sort
            searchTerm, // search
            device.page,
            device.limit
        ).then(data => {
            device.setDevices(data.rows);
            device.setTotalCount(data.count);
            console.log(data);
        }).catch(e => console.log(e));

        navigate(SEARCH_PAGE_ROUTE);
    };


    return (
     

        <Box className="Search Row " sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch();
                }}
            >
                <InputBase
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search..."
                    // inputProps={{ 'aria-label': 'search' }}
                />
                <IconButton
                    type="submit"
                    // sx={{ p: '10px' }}
                    sx={{
                        outline: 'none',
                        boxShadow: 'none',
                        backgroundColor: 'transparent',
                        '&:focus': {
                            outline: 'none',
                            boxShadow: 'none',
                        },
                        '&:active': {
                            outline: 'none',
                            boxShadow: 'none',
                        }
                    }}
                    // aria-label="search"
                >
                    <SearchIcon />
                </IconButton>
            </Paper>
        </Box>
    );
})

export default Search;
