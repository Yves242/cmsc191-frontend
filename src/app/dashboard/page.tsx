"use client";

import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Unstable_Grid2';
import OriginalGrid from '@mui/material/Grid';
import dayjs from 'dayjs';

import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

import { config } from '@/config';
import { Budget } from '@/components/dashboard/overview/budget';
import { LatestOrders } from '@/components/dashboard/overview/latest-orders';
import { LatestProducts } from '@/components/dashboard/overview/latest-products';
import { Sales } from '@/components/dashboard/overview/sales';
import { TasksProgress } from '@/components/dashboard/overview/tasks-progress';
import { TotalCustomers } from '@/components/dashboard/overview/total-customers';
import { TotalProfit } from '@/components/dashboard/overview/total-profit';
import { Traffic } from '@/components/dashboard/overview/traffic';
import { Box, TextField, Typography } from '@mui/material';
import { useState } from 'react';

export default function Page(): React.JSX.Element {

  const [searchString, setSearchString] = useState(''); // State to store text
  const [selectedFilterOption1, setSelectedFilterOption1] = useState<string>('oldest');
  const [selectedFilterOption2, setSelectedFilterOption2] = useState<string>('both');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value); // Update state when input changes
  };

  const handleSubmit = () => {
    console.log('Stored Text:', searchString); // Use the stored value (e.g., send to API or display)
    alert(`You entered: ${searchString}`);
  };

  const handleOption1Change = (event: SelectChangeEvent<string>) => {
    setSelectedFilterOption1(event.target.value);
  };
  
  const handleOption2Change = (event: SelectChangeEvent<string>) => {
    setSelectedFilterOption2(event.target.value);
  };
  
  return (
    <Grid container spacing={0}>
      <Grid lg={12} sm={24} xs={48} spacing={1}>
        <OriginalGrid container xs={12} spacing={0}>
          
          {/* This grid container contains search box */}
          <OriginalGrid item xs={7}>
            <OriginalGrid container spacing={0}>

              {/* "Search" button */}
              <OriginalGrid item xs={1.3} spacing={0}>
                <Box onClick={handleSubmit} sx={{ 
                  backgroundColor: '#8e1537', height: '55px', width: '55px', display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                  <img src="search_button.png" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)'}}/>
                </Box>
              </OriginalGrid>

              {/* "Search" Text Area */}
              <OriginalGrid item xs={10.7} spacing={0}>
              <TextField variant="outlined" placeholder="Search by using a keyword, author, or title"
                sx={{
                  width: '98%', padding: 0, margin: 0,
                  '& .MuiOutlinedInput-root': { 
                    backgroundColor: 'lightblue', 
                    borderRadius: 0, 
                    '& fieldset': {
                      border: 'none', // Remove the outline
                    },
                    '&:hover fieldset': {
                      border: 'none', // Remove the hover outline
                    },
                    '&.Mui-focused fieldset': {
                      border: 'none', // Remove the focused outline
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: "black",
                      opacity: 0.5, // Set the opacity to 50% for the placeholder
                      fontSize: '20px',
                    },
                    '& .MuiInputBase-input': {
                      padding: '12px 14px', 
                      fontSize: '20px', 
                    },
                  },
                }}
                  value={searchString} 
                  onChange={handleChange} 
                />
              </OriginalGrid>
            </OriginalGrid> 
          </OriginalGrid>

          {/* This grid container contains FILTER AND CLASSIFICATION */}
          <OriginalGrid item xs={5}>
            <OriginalGrid container spacing={0}>


            {/* spacer */}
            <OriginalGrid item xs={0.35} spacing={0}>
                <Typography> &nbsp; </Typography>
            </OriginalGrid>


              {/* FILTER PART */}
              <OriginalGrid item xs={4} spacing={0}>
                <Box sx={{ 
                    backgroundColor: 'transparent', height: '55px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'
                  }}>

                  {/* Label */}
                  <Typography>Filter:&nbsp;&nbsp;&nbsp; </Typography> 

                  {/* Combo box */}
                  <FormControl fullWidth>
                    <Select value={selectedFilterOption1} onChange={handleOption1Change}
                      sx={{
                        background: "rgba(255,255,255,1)",
                        width: '147px', padding: 0, margin: 0, height: '43px',
                        '& .MuiOutlinedInput-root': { 
                          backgroundColor: 'lightblue', 
                          borderRadius: 0, 
                          '& fieldset': {
                            border: 'none', // Remove the outline
                          },
                          '&:hover fieldset': {
                            border: 'none', // Remove the hover outline
                          },
                          '&.Mui-focused fieldset': {
                            border: 'none', // Remove the focused outline
                          },
                          '& .MuiInputBase-input': {
                            padding: '12px 14px', 
                            fontSize: '20px', 
                          },
                        },
                    }}>
                      <MenuItem value="oldest">Oldest First</MenuItem>
                      <MenuItem value="newest">Newest First</MenuItem>
                      <MenuItem value="last5Years">Last 5 Years</MenuItem>
                      <MenuItem value="dateRange">Date Range</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </OriginalGrid>


            {/* spacer */}
            <OriginalGrid item xs={1.45} spacing={0}>
                <Typography> &nbsp; </Typography>
            </OriginalGrid>


              {/* CLASSIFICATION PART */}
              <OriginalGrid item xs={4} spacing={0}>
                <Box sx={{ 
                    backgroundColor: 'transparent', height: '55px', width: '100%', display: 'flex', justifyContent: 'right', alignItems: 'center'
                }}>

                  {/* Label */}
                  <Typography>Classification:&nbsp;&nbsp;&nbsp; </Typography> 

                  {/* Combo box */}
                  <FormControl fullWidth>
                    <Select value={selectedFilterOption2} onChange={handleOption2Change}
                      sx={{
                        width: '138px', padding: 0, margin: 0, height: '43px',
                        background: "rgba(255,255,255,1)",
                        '& .MuiOutlinedInput-root': { 
                          backgroundColor: 'lightblue !important', 
                          borderRadius: 0, 
                          '& fieldset': {
                            border: 'none', // Remove the outline
                          },
                          '&:hover fieldset': {
                            border: 'none', // Remove the hover outline
                          },
                          '&.Mui-focused fieldset': {
                            border: 'none', // Remove the focused outline
                          },
                          '& .MuiInputBase-input': {
                            padding: '12px 14px', 
                            fontSize: '20px', 
                          },
                        },
                    }}>                    
                      <MenuItem value="both">SP/Thesis</MenuItem>
                      <MenuItem value="sp">SP only</MenuItem>
                      <MenuItem value="thesis">Thesis only</MenuItem>
                    </Select>
                  </FormControl>
                </Box>                
              </OriginalGrid>
            </OriginalGrid>
          </OriginalGrid>
        </OriginalGrid>
      </Grid>      
    </Grid>
  );
}
