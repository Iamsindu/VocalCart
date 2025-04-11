import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextField, MenuItem, Button, FormControl, InputLabel, Select, FormHelperText, Container, Stack, Box, Typography } from '@mui/material';

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phone: Yup.string().matches(/^\d{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
    role: Yup.string().required('Role is required'),
    status: Yup.string().required('Status is required')
});

const roles = ['Super Admin', 'Product Manager', 'Content Manager'];
const statuses = ['Active', 'Inactive'];

const UserForm = () => {
    const initialValues = {
        name: '',
        email: '',
        phone: '',
        role: '',
        status: ''
    };

    const handleSubmit = (values) => {
        console.log('User Created:', values);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched, handleChange, handleBlur, values }) => (
                <Box sx={{ backgroundColor: '#F9FAFB', minHeight: '100vh', py: 5 }}>
                    <Container maxWidth="sm">
                        <Typography variant="h4" gutterBottom>
                            Create New User
                        </Typography>
                        <Form>
                            <Stack spacing={2}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.name && Boolean(errors.name)}
                                    helperText={touched.name && errors.name}
                                />

                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                />

                                <TextField
                                    fullWidth
                                    label="Phone"
                                    name="phone"
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.phone && Boolean(errors.phone)}
                                    helperText={touched.phone && errors.phone}
                                />

                                <FormControl fullWidth error={touched.role && Boolean(errors.role)}>
                                    <InputLabel>Role</InputLabel>
                                    <Select
                                        name="role"
                                        value={values.role}
                                        label="Role"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        {roles.map((role) => (
                                            <MenuItem key={role} value={role}>
                                                {role}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {touched.role && errors.role && <FormHelperText>{errors.role}</FormHelperText>}
                                </FormControl>

                                <FormControl fullWidth error={touched.status && Boolean(errors.status)}>
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        name="status"
                                        value={values.status}
                                        label="Status"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        {statuses.map((status) => (
                                            <MenuItem key={status} value={status}>
                                                {status}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {touched.status && errors.status && <FormHelperText>{errors.status}</FormHelperText>}
                                </FormControl>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    type="submit"
                                >
                                    Create User
                                </Button>
                            </Stack>
                        </Form>
                    </Container>
                </Box>
            )}
        </Formik>
    );
};

export default UserForm;
