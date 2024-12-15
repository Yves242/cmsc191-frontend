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
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import { Dayjs } from 'dayjs';

const AddForm = () => {
    const [selectedYear, setSelectedYear] = useState<Dayjs | null>(null);
    const [classification, setClassification] = useState('');

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    px: 2, // Add padding for smaller screens
                }}
            >
                <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
                    Add SP/Thesis
                </Typography>
                <form>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Title"
                                name="title"
                                variant="outlined"
                                required
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
                            />
                        </Grid>
                        <Grid container item xs={12} spacing={3}>
                            {/* Year Field */}
                            <Grid item xs={12} sm={4}>
                                <DatePicker
                                    views={['year']} // Allow year selection only
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
            </Box>
        </LocalizationProvider>
    );
};

export default AddForm;
