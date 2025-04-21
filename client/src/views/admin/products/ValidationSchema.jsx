import * as Yup from 'yup';

export const validationSchema = Yup.object({
    name: Yup.string().required('Product name is required'),
    price: Yup.string().required('Price is required'),
    category: Yup.string().required('Category is required'),
    subCategory: Yup.string().required('Sub-category is required'),
    description: Yup.string().required('Description is required'),
    stockStatus: Yup.string().required('Stock status is required'),
    discount: Yup.number(),
    offerPrice: Yup.number(),
});