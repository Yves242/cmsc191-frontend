"use client";

import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import OriginalGrid from '@mui/material/Grid';
import { Select, MenuItem, FormControl, SelectChangeEvent, Button } from '@mui/material';
import { Box, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@mui/material';
import axios from 'axios';

export default function Page(): React.JSX.Element {
  // State for search and results
  const [searchString, setSearchString] = useState('');
  const [selectedFilterOption1, setSelectedFilterOption1] = useState<string>('relevance');
  const [selectedFilterOption2, setSelectedFilterOption2] = useState<string>('both');
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState<string>('');
  const [results, setResults] = useState<any[]>([]);
  const itemsPerPage = 6;

  // Elasticsearch configuration
  const apiKey = process.env.NEXT_PUBLIC_ELASTIC_API_KEY;
  const elasticUrl = "https://293cc130e8a4402a9917c77722058e3e.us-central1.gcp.cloud.es.io:443";

  // // Function to get sort order based on filter option
  // const getSortOrder = () => {
  //   return selectedFilterOption1 === 'newest' ? 'desc' : 'asc';
  // };

  //relevance first
  const getSortOrder = () => {
    switch (selectedFilterOption1) {
      case 'newest':
        return { year: { order: 'desc' } };
      case 'oldest':
        return { year: { order: 'asc' } };
      default:
        return null;  // for 'relevance' and 'last5Years'
    }
  };

  // Function to get classification filter
  const getClassificationFilter = () => {
    // Only add classification filter if sp or thesis is specifically selected
    if (selectedFilterOption2 === 'sp' || selectedFilterOption2 === 'thesis') {
      return {
        match: {
          classification: selectedFilterOption2
        }
      };
    }
    return null; // Return null for 'both' to show all results
  };

  // Fetch initial results on component mount or when filters change
  useEffect(() => {
    fetchLatestPublications();
  }, [selectedFilterOption1, selectedFilterOption2]);

  // Function to fetch latest publications
  const fetchLatestPublications = async () => {
    try {
      const query: any = {
        bool: {
          must: [{ match_all: {} }],
          filter: [] // Add filter array
        }
      };
  
      // Add classification filter if specified
      const classificationFilter = getClassificationFilter();
      if (classificationFilter) {
        query.bool.must.push(classificationFilter);
      }
  
      // Add date range filter for last 5 years if selected
      if (selectedFilterOption1 === 'last5Years') {
        const fiveYearsAgo = new Date(); // Get current date
        fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
        query.bool.filter.push({
          range: { // Add range filter for year
            year: {
              gte: fiveYearsAgo.getFullYear().toString() // Get year from date
            }
          }
        });
      }
  
      const searchBody: any = {
        size: 50,
        query: query
      };
  
      // Only add sort if it's not relevance
      const sortOrder = getSortOrder();
      if (sortOrder) {
        searchBody.sort = [sortOrder];
      }
  
      const response = await axios.post(
        `${elasticUrl}/orbit/_search`,
        searchBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `ApiKey ${apiKey}`,
          },
        }
      );
  
      setResults(response.data.hits.hits);
      setError('');
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || err.message);
    }
  };

  // Calculate pagination values
  const startItem = (currentPage * itemsPerPage) + 1;
  const endItem = Math.min((currentPage + 1) * itemsPerPage, results.length);

  // Get current page items
  const currentItems = results.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

// Function to handle search
const handleSearch = async () => {
  setError('');
  try {
    // Check connection to Elasticsearch
    await axios.get(
      `${elasticUrl}/_cluster/health`,
      {
        headers: {
          Authorization: `ApiKey ${apiKey}`,
        },
      }
    );

    const query: any = {
      bool: {
        should: [],
        filter: [], // Add filter array
        minimum_should_match: searchString ? 1 : 0 // At least one should match if there's a search string
      }
    };

    // Add search query if there's a search term
    if (searchString) {
      query.bool.should.push({
        semantic: {
          field: "semantic_abstract",
          query: searchString,
        }
      });

      query.bool.should.push(
        { 
          match: { 
            title: {
              query: searchString,
              boost: 2 // Give title matches higher relevance
            } 
          } 
        },
        { match: { author: searchString } },
        { match: { keywords: searchString } },
        { match: { adviser_text: searchString } },
        { match: { year: searchString } }
      );
    } else {
      query.bool.should.push({ match_all: {} });
    }

    // Add classification filter if specified
    const classificationFilter = getClassificationFilter();
    if (classificationFilter) {
      query.bool.filter.push(classificationFilter);
    }

    // Add date range filter for last 5 years if selected
    if (selectedFilterOption1 === 'last5Years') {
      const currentYear = new Date().getFullYear();
      const fiveYearsAgo = currentYear - 5;
      query.bool.filter.push({
        range: {
          year: {
            gte: fiveYearsAgo.toString(),
            lte: currentYear.toString()
          }
        }
      });
    }

    const searchBody: any = {
      size: 50,
      query: query
    };

    // Only add sort if it's not relevance-based
    const sortOrder = getSortOrder();
    if (sortOrder) {
      searchBody.sort = [
        sortOrder,
        "_score" // Include score as secondary sort
      ];
    }

    // Perform search
    const response = await axios.post(
      `${elasticUrl}/orbit/_search`,
      searchBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `ApiKey ${apiKey}`,
        },
      }
    );

    // Update results and reset to first page
    setResults(response.data.hits.hits);
    setCurrentPage(0);

  } catch (err: any) {
    console.error(err);
    if (err.response?.status === 404) {
      setError("Elasticsearch not found or the index is missing.");
    } else if (err.response?.status === 401) {
      setError("Authentication failed. Please check your API key.");
    } else {
      setError(err.response?.data?.message || err.message);
    }
  }
};

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  const handlePageChange = (direction: string) => {
    if (direction === 'next' && (currentPage + 1) * itemsPerPage < results.length) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleOption1Change = (event: SelectChangeEvent<string>) => {
    setSelectedFilterOption1(event.target.value);
  };
  
  const handleOption2Change = (event: SelectChangeEvent<string>) => {
    setSelectedFilterOption2(event.target.value);
  };

  // Function to handle row click
  const handleRowClick = (index: number) => {
    const item = currentItems[index];
    alert(`Title: ${item._source.title}\nAuthors: ${item._source.authors}\nYear: ${item._source.year_range}`);
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
                      border: 'none',
                    },
                    '&:hover fieldset': {
                      border: 'none',
                    },
                    '&.Mui-focused fieldset': {
                      border: 'none',
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: "black",
                      opacity: 0.5,
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
                      handleSearch();
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
                        backgroundColor: '#8e1537', color: "white",
                        width: '147px', padding: 0, margin: 0, height: '43px',
                        '& .MuiOutlinedInput-root': { 
                          borderRadius: 0, 
                          '& fieldset': {
                            border: 'none',
                          },
                          '&:hover fieldset': {
                            border: 'none',
                          },
                          '&.Mui-focused fieldset': {
                            border: 'none',
                          },
                          '& .MuiInputBase-input': {
                            padding: '12px 14px', 
                            fontSize: '20px', 
                          },
                        },
                    }}>
                      <MenuItem value="relevance">Relevance</MenuItem>
                      <MenuItem value="newest">Newest First</MenuItem>
                      <MenuItem value="oldest">Oldest First</MenuItem>
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
                        backgroundColor: '#8e1537', color: "white",
                        '& .MuiOutlinedInput-root': {  
                          borderRadius: 0, 
                          '& fieldset': {
                            border: 'none',
                          },
                          '&:hover fieldset': {
                            border: 'none',
                          },
                          '&.Mui-focused fieldset': {
                            border: 'none',
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
            display: 'flex', flexDirection: 'column',
            justifyContent: 'flex-start',
            height: '100%', paddingTop: 2
        }}>
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow sx={{ "& .MuiTableCell-head": { color: "white", backgroundColor: '#8e1537'}}}>
                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Title</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Author</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Keywords</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Date of Publication</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Adviser</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentItems.map((item, index) => (
                    <TableRow
                      key={index}
                      onClick={() => handleRowClick(index)}
                      sx={{
                        cursor: 'pointer',
                        backgroundColor: 'transparent',
                        paddingBottom: 11,
                        '&:hover': {
                          backgroundColor: '#f0f0f0',
                        },
                      }}
                    >
                      <TableCell>{item._source.title}</TableCell>
                      <TableCell>{item._source.author}</TableCell>
                      <TableCell>{item._source.keyword || 'N/A'}</TableCell>
                      <TableCell>{item._source.year}</TableCell>
                      <TableCell>{item._source.adviser_keyword || 'N/A'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination Controls */}
            <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '10px', paddingBottom: '0px'}}>
              {/* Previous Page Button */}
              <Button          
                onClick={() => handlePageChange('prev')}
                disabled={currentPage === 0}
                sx={{ 
                  marginRight: '10px', width: '40px', height: '40px', 
                  backgroundColor: currentPage === 0 ? '#d1d1d1' : 'white', 
                  color: 'black', borderRadius: '6px', boxShadow: 'none', 
                  '&:hover': { backgroundColor: '#8e1537', color: "white"},
                }}
              >
                {'<'}
              </Button>
              <Box width={400} sx={{justifyContent: 'center', alignContent: 'center'}}>
                <Typography variant="body1" sx={{ color: 'white', fontWeight: '420'}}>
                  Showing <b>{results.length > 0 ? startItem : 0}</b> - <b>{results.length > 0 ? endItem : 0}</b> of <b>{results.length}</b> items
                </Typography>
              </Box>

              {/* spacer */}
              <Box sx={{display: 'flex', height: '100%', width: '100%'}}/>

              {/* Next Page Button */}
              <Button 
                onClick={() => handlePageChange('next')}
                disabled={(currentPage + 1) * itemsPerPage >= results.length}
                sx={{ 
                  width: '40px', height: '40px', 
                  backgroundColor: (currentPage + 1) * itemsPerPage >= results.length ? '#d1d1d1' : 'white', 
                  color: 'black', borderRadius: '6px', boxShadow: 'none', 
                  '&:hover': { backgroundColor: '#8e1537', color: "white"},
                }}
              >
                {'>'}
              </Button>
            </Box>
          </div>
        </Box>
      </Grid>      
    </Grid>
  );
}
