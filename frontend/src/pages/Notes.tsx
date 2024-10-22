import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Container, Button, TextField, Box, Card, InputAdornment, AppBar, Toolbar, Typography, FormControl, Input, colors, alpha } from '@mui/material'

// In progress
function Notes() {
    const Search = () =>{
        return (
            <Box>
                <FormControl>
                    <TextField
                    id='search-bar'
                    variant='outlined'
                    sx={{backgroundColor: 'lightblue'}}
                    onChange={(e) => console.log(e.target.value)}
                    slotProps={{
                        input:{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            style: {color:'white'}
                        },
                    
                    }}
                            
                    />
                </FormControl>
            </Box>
        )
    }
    return (
        <Box sx={{
            flexGrow: 1
        }}>
            <AppBar position="static">
                <Toolbar
                sx={{backgroundColor:'darkblue'}}
                >
                    <Typography
                    variant='h5'
                    flexGrow={1}
                    >
                        Dashboard
                    </Typography>
                    <Search/>

                </Toolbar>
            </AppBar>
        </Box>
        
    )
}

export default Notes