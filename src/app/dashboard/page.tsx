"use client";

import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import OriginalGrid from '@mui/material/Grid';
import { Select, MenuItem, FormControl, SelectChangeEvent } from '@mui/material';
import { Box, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, Collapse } from '@mui/material';

export default function Page(): React.JSX.Element {

  const [searchString, setSearchString] = useState(''); // State to store text
  const [selectedFilterOption1, setSelectedFilterOption1] = useState<string>('oldest');
  const [selectedFilterOption2, setSelectedFilterOption2] = useState<string>('both');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

  // Sample data with 13 believable rows of SP/Thesis research publications
  const rows = [
    { title: 'RRMT-Software: A Management System for Ricman Roofing Materials Trading', author: 'John Kenneth F. Manalang', keywords: 'software web application file management inventory management project dashboard data visualization', date: '2024-06-01', adviser: 'Lei Kristoffer R. Lactuan', abstract: 'Embracing digitalization has become crucial for businesses aiming to stay competitive. However, some companies remain hesitant to adopt this change due to limited digital proficiency and concerns about the benefits. This study focused on Ricman Roofing Materials Trading, a business in the industry for over a decade that has a minimal technological advance- ments. To address their challenges, the study developed RRMT- Software, a web-based application tailored to the company’s daily operations. The technologies used to develop the software include React, Express, Supabase, and Node. Its features—file management, inventory management, a project dashboard, and data visualization—were developed in close collaboration with employees to ensure a seamless transition and alignment with current practices, thereby boosting efficiency without disrupting workflows. The usability of the application was evaluated using the System Usability Scale (SUS) questionnaire, achieving an average SUS score of 82, indicating a high level of usability.' },
    { title: 'Sustainable Urban Planning: A Case Study on Green Architecture', author: 'Jane Smith', keywords: 'Sustainability, Urban Planning, Architecture', date: '2023-10-25', adviser: 'Prof. Mark Lee', abstract: 'The study explores sustainable urban planning through the lens of green architecture, highlighting innovative design strategies that integrate energy efficiency, green spaces, and eco-friendly materials. A case study of a city that adopted green architecture principles is presented, demonstrating how these practices contribute to environmental conservation and urban resilience.' },
    { title: 'Blockchain Technology in Financial Systems', author: 'David Kim', keywords: 'Blockchain, Finance, Cryptocurrencies', date: '2023-09-12', adviser: 'Dr. Claire Thompson', abstract: 'This paper explores the transformative potential of blockchain technology within financial systems, emphasizing its role in enhancing transparency, reducing fraud, and decentralizing financial services. The research examines the current state of blockchain adoption, its implications for cryptocurrencies, and the regulatory challenges that may arise as blockchain technology becomes more mainstream in the financial industry.' },
    { title: 'Analyzing Climate Change Impact on Coastal Communities', author: 'Mary Tan', keywords: 'Climate Change, Coastal Communities, Environmental Science', date: '2023-08-05', adviser: 'Dr. George Williams', abstract: 'The study assesses the impact of climate change on coastal communities, focusing on rising sea levels, more frequent extreme weather events, and the resulting socio-economic challenges. The paper also evaluates current mitigation strategies and emphasizes the need for adaptive policies to safeguard these vulnerable populations against the worsening climate crisis.' },
    { title: 'Social Media Influence on Modern Politics', author: 'Emily Li', keywords: 'Social Media, Politics, Influence', date: '2023-07-21', adviser: 'Prof. Samantha Clark', abstract: 'This research examines the significant influence of social media on political campaigns, voter behavior, and public policy decisions. It analyzes how platforms like Twitter, Facebook, and Instagram shape public opinion, particularly during elections, and discusses the positive and negative consequences of this shift in political communication, including issues of misinformation and polarization.' },
    { title: 'Advancements in Renewable Energy: Wind Power Technologies', author: 'Chris Nguyen', keywords: 'Renewable Energy, Wind Power, Technology', date: '2023-06-30', adviser: 'Dr. Kevin Brown', abstract: 'This paper reviews the latest advancements in wind power technologies, including innovations in turbine design, efficiency improvements, and the integration of offshore wind farms. The study also explores the economic and environmental benefits of wind energy, as well as the challenges involved in expanding its capacity to meet global energy demands.' },
    { title: 'Big Data in Healthcare: Privacy and Ethical Concerns', author: 'Rachel Gomez', keywords: 'Big Data, Healthcare, Ethics', date: '2023-05-18', adviser: 'Dr. Sarah Green', abstract: 'The research addresses the growing role of big data in healthcare and its ethical implications, particularly in relation to patient privacy, data security, and consent. It examines how large-scale data analytics can enhance treatment outcomes and improve healthcare delivery while raising important questions about data ownership and the risk of breaches.' },
    { title: 'Artificial Intelligence in Education: Personalized Learning Systems', author: 'Samuel Lee', keywords: 'AI, Education, Personalized Learning', date: '2023-04-10', adviser: 'Prof. Linda Carter', abstract: 'This study investigates the integration of AI into education, specifically in creating personalized learning environments. The research focuses on adaptive learning systems that tailor educational content to individual students’ needs, enhancing engagement and academic performance. The paper also discusses the challenges and future potential of AI-driven educational technologies in transforming traditional classroom settings.' },
    { title: 'The Role of Quantum Computing in Modern Cryptography', author: 'Andrew Harris', keywords: 'Quantum Computing, Cryptography, Security', date: '2023-03-22', adviser: 'Dr. James Robinson', abstract: 'This research delves into the impact of quantum computing on cryptography, specifically how quantum algorithms could potentially break existing encryption systems. The study provides an overview of quantum-resistant cryptography solutions and explores how the field of cybersecurity must evolve to stay ahead of quantum computing advancements in securing sensitive data.' },
    { title: 'Exploring the Effects of Automation on the Labor Market', author: 'Olivia Clark', keywords: 'Automation, Labor Market, Economy', date: '2023-02-11', adviser: 'Dr. David Adams', abstract: 'This paper explores the economic and social effects of automation on the labor market. It discusses the displacement of workers by automated systems, the creation of new job categories, and the impact of automation on wage inequality. The study also examines potential policy responses to mitigate negative effects and ensure a just transition for workers.' },
    { title: 'Genetic Engineering in Agriculture: A Sustainable Approach', author: 'Sophia Anderson', keywords: 'Genetic Engineering, Agriculture, Sustainability', date: '2023-01-29', adviser: 'Prof. Richard Scott', abstract: 'This research focuses on the role of genetic engineering in agriculture as a solution to global food security challenges. The study looks at genetically modified crops designed to withstand pests, drought, and diseases, contributing to sustainable agricultural practices. It also considers the ethical debates surrounding genetically engineered organisms and their impact on biodiversity.' },
    { title: 'The Influence of Artificial Intelligence on Modern Art', author: 'Lucas Baker', keywords: 'AI, Art, Creativity', date: '2022-12-15', adviser: 'Prof. Patricia Miller', abstract: 'This study examines the intersection of artificial intelligence and modern art, focusing on how machine learning algorithms are being used to create new forms of artistic expression. The research explores the philosophical implications of AI-generated art, questioning the role of creativity and authorship in an era of artificial intelligence.' },
    { title: 'The Economic Impact of Electric Vehicles on Urban Transportation', author: 'Emma Wilson', keywords: 'Electric Vehicles, Economics, Urban Transportation', date: '2022-11-02', adviser: 'Dr. Robert Harris', abstract: 'This paper explores the economic impact of electric vehicles (EVs) on urban transportation systems, focusing on their potential to reduce carbon emissions, lower operating costs, and promote sustainability. The study analyzes the costs and benefits of EV adoption, including the required infrastructure investments and potential effects on local economies and employment.' },
    { title: 'Cybersecurity Challenges in IoT Devices: A Research Survey', author: 'Ethan White', keywords: 'Cybersecurity, IoT, Devices', date: '2022-10-18', adviser: 'Prof. Jessica Moore', abstract: 'This survey examines the cybersecurity vulnerabilities of Internet of Things (IoT) devices, which are increasingly used in homes, healthcare, and industry. The research identifies common security flaws, such as weak encryption and poor device management, and proposes solutions to address these risks in order to protect consumers and organizations from cyber threats.' }
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

  const toggleRowExpansion = (index: number) => {
  setExpandedRow(expandedRow === index ? null : index);
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
                  <React.Fragment key={index}>
                    {/* Main row */}
                    <TableRow
                      onClick={() => toggleRowExpansion(index)}
                      sx={{
                        cursor: 'pointer',
                        backgroundColor: expandedRow === index ? '#e0e0e0' : 'transparent',
                        '&:hover': { backgroundColor: '#f0f0f0' },
                      }}
                    >
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.author}</TableCell>
                      <TableCell>{row.keywords}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.adviser}</TableCell>
                    </TableRow>

                    {/* Expanded content */}
                    {expandedRow === index && (
                      <TableRow>
                        <TableCell colSpan={5} sx={{ backgroundColor: '#F0F0F0', padding: '16px' }}>
                          <Typography variant="subtitle1" fontWeight="bold">Abstract:</Typography>
                          <Typography variant="body2">{row.abstract}</Typography>
                          <br />
                          <Typography variant="subtitle1" fontWeight="bold">Keywords:</Typography>
                          <Typography variant="body2">{row.keywords.split(" ").join(", ")}</Typography>
                          </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>      
    </Grid>
  );
}
