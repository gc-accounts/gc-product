// checkoutFormFields.ts
import { FieldConfig } from "../DynamicForm";

const checkoutFormFields: FieldConfig[] = [
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
    label: 'Email Address',
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
    required: true,
    options: [
      'Before 2018',
      '2018',
      '2019',
      '2020',
      '2021',
      '2022',
      '2023',
      '2024',
      '2025',
      'After 2025'
    ],
    rules: { required: 'Please select year of graduation' },
  },
];

export default checkoutFormFields;