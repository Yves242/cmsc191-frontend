"use client";

import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import OriginalGrid from '@mui/material/Grid';
import { Select, MenuItem, FormControl, SelectChangeEvent } from '@mui/material';
import { Box, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@mui/material';

export default function Page(): React.JSX.Element {

  const [searchString, setSearchString] = useState(''); // State to store text
  const [selectedFilterOption1, setSelectedFilterOption1] = useState<string>('oldest');
  const [selectedFilterOption2, setSelectedFilterOption2] = useState<string>('both');
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

  // Sample data with 13 believable rows of SP/Thesis research publications
  const rows = [
    { title: 'The Impact of Artificial Intelligence in Healthcare', author: 'John Doe', keywords: 'AI, Healthcare, Automation', date: '2023-11-15', adviser: 'Dr. Alice Johnson' },
    { title: 'Sustainable Urban Planning: A Case Study on Green Architecture', author: 'Jane Smith', keywords: 'Sustainability, Urban Planning, Architecture', date: '2023-10-25', adviser: 'Prof. Mark Lee' },
    { title: 'Blockchain Technology in Financial Systems', author: 'David Kim', keywords: 'Blockchain, Finance, Cryptocurrencies', date: '2023-09-12', adviser: 'Dr. Claire Thompson' },
    { title: 'Analyzing Climate Change Impact on Coastal Communities', author: 'Mary Tan', keywords: 'Climate Change, Coastal Communities, Environmental Science', date: '2023-08-05', adviser: 'Dr. George Williams' },
    { title: 'Social Media Influence on Modern Politics', author: 'Emily Li', keywords: 'Social Media, Politics, Influence', date: '2023-07-21', adviser: 'Prof. Samantha Clark' },
    { title: 'Advancements in Renewable Energy: Wind Power Technologies', author: 'Chris Nguyen', keywords: 'Renewable Energy, Wind Power, Technology', date: '2023-06-30', adviser: 'Dr. Kevin Brown' },
    { title: 'Big Data in Healthcare: Privacy and Ethical Concerns', author: 'Rachel Gomez', keywords: 'Big Data, Healthcare, Ethics', date: '2023-05-18', adviser: 'Dr. Sarah Green' },
    { title: 'Artificial Intelligence in Education: Personalized Learning Systems', author: 'Samuel Lee', keywords: 'AI, Education, Personalized Learning', date: '2023-04-10', adviser: 'Prof. Linda Carter' },
    { title: 'The Role of Quantum Computing in Modern Cryptography', author: 'Andrew Harris', keywords: 'Quantum Computing, Cryptography, Security', date: '2023-03-22', adviser: 'Dr. James Robinson' },
    { title: 'Exploring the Effects of Automation on the Labor Market', author: 'Olivia Clark', keywords: 'Automation, Labor Market, Economy', date: '2023-02-11', adviser: 'Dr. David Adams' },
    { title: 'Genetic Engineering in Agriculture: A Sustainable Approach', author: 'Sophia Anderson', keywords: 'Genetic Engineering, Agriculture, Sustainability', date: '2023-01-29', adviser: 'Prof. Richard Scott' },
    { title: 'The Influence of Artificial Intelligence on Modern Art', author: 'Lucas Baker', keywords: 'AI, Art, Creativity', date: '2022-12-15', adviser: 'Prof. Patricia Miller' },
    { title: 'The Economic Impact of Electric Vehicles on Urban Transportation', author: 'Emma Wilson', keywords: 'Electric Vehicles, Economics, Urban Transportation', date: '2022-11-02', adviser: 'Dr. Robert Harris' },
    { title: 'Cybersecurity Challenges in IoT Devices: A Research Survey', author: 'Ethan White', keywords: 'Cybersecurity, IoT, Devices', date: '2022-10-18', adviser: 'Prof. Jessica Moore' },
  ];

  // State to track which row is clicked
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  // Function to handle row click
  const handleRowClick = (index: number) => {

    // Handle any logic you want on row click here
    alert(`Row clicked: ${index}, ${JSON.stringify(rows[index])}`);
    setSelectedRow(index); // Set the clicked row as selected
  };

  // Limit the rows displayed to a maximum of 6
  const rowsToDisplay = rows.slice(0, 6);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value); // Update state when input changes
  };

  const handleSearch = () => {
    alert(`Search string: '${searchString}'`);
  };

  const handleItemClick = () => {
    alert(`You clicked on item.'`);
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


        {/* This container contains TOP FUNCTIONALITIES */}
        <OriginalGrid container xs={12} spacing={0}>
          
          {/* This grid container contains SEARCH AREA */}
          <OriginalGrid item xs={7}>
            <OriginalGrid container spacing={0}>

              {/* "Search" button */}
              <OriginalGrid item xs={0.99} spacing={0}>
                <Box onClick={handleSearch} sx={{ 
                  backgroundColor: '#8e1537', height: '54px', width: '54px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'
                }}>
                  <img src="search_button.png" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)'}}/>
                </Box>
              </OriginalGrid>

              {/* "Search" Text Area */}
              <OriginalGrid item xs={10.7} spacing={0}>
              <TextField variant="outlined" placeholder="Search by using a keyword, author, or title"
                sx={{
                  width: '99%', padding: 0, margin: 0,
                  '& .MuiOutlinedInput-root': { 
                    backgroundColor: 'white', 
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
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch(); // Call your search function here
                    }
                  }}
                />
              </OriginalGrid>
            </OriginalGrid> 
          </OriginalGrid>

          {/* This grid container contains FILTER AND CLASSIFICATION */}
          <OriginalGrid item xs={5}>
            <OriginalGrid container spacing={0}>


              {/* spacer */}
              <OriginalGrid item xs={0.26} spacing={0}>
                  <Typography> &nbsp; </Typography>
              </OriginalGrid>


              {/* FILTER PART */}
              <OriginalGrid item xs={4} spacing={0}>
                <Box sx={{ 
                    backgroundColor: 'transparent', height: '55px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'
                  }}>

                  {/* Label */}
                  <Typography sx={{ fontWeight: 'bold' }}>Filter:&nbsp;&nbsp;&nbsp; </Typography> 

                  {/* Combo box */}
                  <FormControl fullWidth>
                    <Select value={selectedFilterOption1} onChange={handleOption1Change}
                      sx={{
                        background: "rgba(255,255,255,1)",
                        width: '147px', padding: 0, margin: 0, height: '43px',
                        '& .MuiOutlinedInput-root': { 
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
                  <Typography sx={{ fontWeight: 'bold' }}>Classification:&nbsp;&nbsp;&nbsp; </Typography> 

                  {/* Combo box */}
                  <FormControl fullWidth>
                    <Select value={selectedFilterOption2} onChange={handleOption2Change}
                      sx={{
                        width: '138px', padding: 0, margin: 0, height: '43px',
                        background: "rgba(255,255,255,1)",
                        '& .MuiOutlinedInput-root': {  
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

        <Box sx={{
            display: 'flex', flexDirection: 'column', // Stacks children vertically
            justifyContent: 'flex-start', // Align items at the start of the container
            height: '100%', paddingTop: 3
        }}>
          <TableContainer component={Paper} sx={{ padding: '20px', paddingTop: '9px' }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Author</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Keywords</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Date of Publication</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Adviser</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowsToDisplay.map((row, index) => (
                  <TableRow
                    key={index}
                    onClick={() => handleRowClick(index)} // Handle row click
                    sx={{
                      cursor: 'pointer', // Pointer cursor on hover
                      backgroundColor: selectedRow === index ? '#e0e0e0' : 'transparent', // Highlight selected row
                      '&:hover': {
                        backgroundColor: '#f0f0f0', // Highlight on hover
                      },
                    }}
                  >
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.author}</TableCell>
                    <TableCell>{row.keywords}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.adviser}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>


      </Grid>      
    </Grid>
  );
}
