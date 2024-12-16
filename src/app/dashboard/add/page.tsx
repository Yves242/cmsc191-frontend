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
    const [isSubmitting, setIsSubmitting] = useState(false);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const currentTimestamp = new Date().toISOString();

        const elasticSearchData = {
            abstract: formData.abstract,
            adviser_keyword: formData.adviser,
            adviser_text: formData.adviser,
            author: formData.author,
            classification: classification.toLowerCase() === 'thesis' ? 'thesis' : 'sp',
            keyword: formData.keyword,
            timestamp: currentTimestamp,
            title: formData.title,
            year: selectedYear ? selectedYear.format('YYYY') : null
        };

        try {
            const response = await fetch('https://293cc130e8a4402a9917c77722058e3e.us-central1.gcp.cloud.es.io:443/orbit/_doc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'ApiKey NjlCSXhKTUJ3MF9HR1E2eUxMTlc6QzRiWUltLVlUQU9NV1J6WHhpamtZUQ=='
                },
                body: JSON.stringify(elasticSearchData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            alert('SP/Thesis Successfully Added!');
            console.log('Elasticsearch response:', data);
            router.push('/dashboard');
        } catch (error) {
            console.error('Error submitting to Elasticsearch:', error);
            alert('Error submitting SP/Thesis. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    px: 2,
                    minHeight: '90vh',
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
                                    <Grid item xs={12} sm={4}>
                                        <DatePicker
                                            views={['year']}
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
                                        disabled={isSubmitting}
                                        sx={{
                                            px: 5,
                                            py: 1,
                                            textTransform: 'none',
                                        }}
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Submit'}
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