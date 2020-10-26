import * as yup from 'yup';

export const initialValues: any = {
  organizationName: '',
  accessCode: '',
};

export const validationSchema = yup.object({
  organizationName: yup.string().required('Organization name is required'),
  accessCode: yup
    .number()
    .typeError('Access code can only contain numbers')
    .min(4, 'Access code must be exactly 4 digits')
    .required('Access code  is required'),
});
