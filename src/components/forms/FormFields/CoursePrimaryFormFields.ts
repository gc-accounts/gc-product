import { FieldConfig } from "../DynamicForm";
const CoursePrimaryFormFields: FieldConfig[] = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    required: true,
    rules: { required: 'First Name is required' },
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    required: true,
    rules: { required: 'Last Name is required' },
  },
  {
    name: 'email',
    label: 'Email',
    type: 'text',
    required: true,
    rules: {
      required: 'Email is required',
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Invalid email format',
      },
    },
  },
  {
    name: 'countryCode',
    label: 'Country',
    type: 'text',
    required: true,
    defaultValue: 'India',
    rules: { required: 'Country is required' },
  },
  { 
    name: 'countryCodeValue', 
    type: 'hidden',
    defaultValue: '+91' 
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'text',
    required: true,
    rules: {
      required: 'Phone number is required',
      pattern: {
        value: /^[0-9]+$/,
        message: 'Phone number must contain only digits',
      },
      minLength: {
        value: 8,
        message: 'Phone number must be at least 8 digits',
      },
      maxLength: {
        value: 15,
        message: 'Phone number cannot exceed 15 digits',
      },
    },
  },
  {
    name: 'year',
    label: 'Year of Graduation',
    type: 'select',
    options: ['Before 2018', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', 'After 2025'],
    rules: { required: 'Please select your graduation year' },
  },
  {
    name: 'experience',
    label: 'Work Experience Level',
    type: 'select',
    options: ['No Experience', '0-1 Years', '1-3 Years', '3+ Years'],
    rules: { required: 'Please select your experience level' },
  },
  { name: 'program', type: 'hidden' },
  { name: 'ga_client_id', type: 'hidden' },
  { name: 'business_unit', type: 'hidden' },
];

export default CoursePrimaryFormFields;