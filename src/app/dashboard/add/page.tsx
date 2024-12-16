"use client";
import {
    Box,
    Button,
    Grid,
    Typography,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Card,
    CardContent,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dayjs } from 'dayjs';

const AddForm = () => {
    const [selectedYear, setSelectedYear] = useState<Dayjs | null>(null);
    const [classification, setClassification] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        adviser: '',
        abstract: '',
        keyword: '',
    });

    const router = useRouter();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('SP/Thesis Submitted');
        console.log({
            ...formData,
            year: selectedYear ? selectedYear.format('YYYY') : null,
            classification,
        });
        router.push('/dashboard');
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    px: 2, // padding for smaller screens
                    minHeight: '90vh', // viewport height
                }}
            >
                <Card sx={{ width: '100%', maxWidth: '1500px', boxShadow: 3, opacity: 0.95 }}>
                    <CardContent>
                        <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
                            Add SP/Thesis
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    {/* Title Field */}
                                    <TextField
                                        fullWidth
                                        label="Title"
                                        name="title"
                                        variant="outlined"
                                        required
                                        value={formData.title}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    {/* Author Field */}
                                    <TextField
                                        fullWidth
                                        label="Author/s"
                                        name="author"
                                        type="text"
                                        variant="outlined"
                                        required
                                        value={formData.author}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    {/* Adviser Field */}
                                    <TextField
                                        fullWidth
                                        label="Adviser"
                                        name="adviser"
                                        type="text"
                                        variant="outlined"
                                        required
                                        value={formData.adviser}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    {/* Abstract Field */}
                                    <TextField
                                        fullWidth
                                        label="Abstract"
                                        name="abstract"
                                        multiline
                                        rows={10}
                                        variant="outlined"
                                        required
                                        value={formData.abstract}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid container item xs={12} spacing={3}>
                                    {/* Year Field */}
                                    <Grid item xs={12} sm={4}>
                                        <DatePicker
                                            views={['year']} // only show year picker
                                            label="Year"
                                            value={selectedYear}
                                            onChange={(newValue) => setSelectedYear(newValue)}
                                            slots={{ textField: TextField }}
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true,
                                                    required: true,
                                                },
                                            }}
                                        />
                                    </Grid>
                                    {/* Keyword Field */}
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            fullWidth
                                            label="Keyword"
                                            name="keyword"
                                            type="text"
                                            variant="outlined"
                                            required
                                            value={formData.keyword}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    {/* Classification Dropdown */}
                                    <Grid item xs={12} sm={4}>
                                        <FormControl fullWidth required>
                                            <InputLabel id="classification-label">
                                                Classification
                                            </InputLabel>
                                            <Select
                                                labelId="classification-label"
                                                value={classification}
                                                onChange={(e) => setClassification(e.target.value)}
                                                label="Classification"
                                            >
                                                <MenuItem value="Special Problem">
                                                    Special Problem
                                                </MenuItem>
                                                <MenuItem value="Thesis">Thesis</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        sx={{
                                            px: 5,
                                            py: 1,
                                            textTransform: 'none',
                                        }}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </LocalizationProvider>
    );
};

export default AddForm;
