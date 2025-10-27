'use client';

import { useForm, useWatch } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '../ui/select';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Loader2 } from 'lucide-react';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { CountryCodeData } from '../data/CountryCodeData';
import { Portal } from '@radix-ui/react-select';

export interface FieldConfig {
  name: string;
  label?: string;
  type: 'text' | 'select' | 'hidden' | 'textarea' | 'checkbox' | 'file';
  required?: boolean;
  options?: string[];
  rules?: {
    required?: boolean | string;
    minLength?: { value: number; message: string };
    maxLength?: number | { value: number; message: string };   // ✅ fixed type
    pattern?: { value: RegExp; message: string };
    validate?: (value: string) => boolean | string;
  };
  defaultValue?: string | boolean;
  accept?: string;
}

interface DynamicFormProps {
  fields: FieldConfig[];
  initialValues?: { [key: string]: any };
  buttonText: string;
  onSubmit: (data: any, reset: () => void) => Promise<void>;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  fields,
  initialValues = {},
  buttonText,
  onSubmit,
}) => {
  // ✅ Build default field values
  const extendedDefaults = fields.reduce((acc, field) => {
    if (field.type === 'checkbox') {
      acc[field.name] = initialValues[field.name] ?? (field.defaultValue as boolean) ?? false;
    } else {
      acc[field.name] = initialValues[field.name] ?? field.defaultValue ?? '';
    }
    return acc;
  }, {} as Record<string, any>);

  // ✅ Initialize React Hook Form
  const form = useForm({ defaultValues: extendedDefaults });
  const {
    reset,
    control,
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
    getValues,
  } = form;

  // ✅ NEW EFFECT: Reapply prefill data when initialValues change
  useEffect(() => {
    if (initialValues && Object.keys(initialValues).length > 0) {
      reset({
        ...extendedDefaults,
        ...initialValues,
      });
      console.log('🧩 DynamicForm reset with new initialValues:', initialValues);
    }
  }, [initialValues, reset]);

  const [countrySearch, setCountrySearch] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const phoneInputRef = React.useRef<HTMLInputElement>(null);

  // ✅ Filter countries dynamically
  const filteredCountries = useMemo(() => {
    if (countrySearch.trim() === '') return [];
    const searchTerm = countrySearch.toLowerCase();
    return CountryCodeData.filter((country) =>
      country.country.toLowerCase().includes(searchTerm)
    ).slice(0, 5);
  }, [countrySearch]);

  const handleCountrySelect = useCallback(
    (country: typeof CountryCodeData[0]) => {
      setValue('countryCode', country.country);
      setValue('countryCodeValue', `+${country.code}`);
      setCountrySearch('');
      setShowCountryDropdown(false);
    },
    [setValue]
  );

  // ✅ Form submission handler
  const handleFormSubmit = async (data: any) => {
    await onSubmit(data, () => reset(extendedDefaults));
  };

  const handleCountryInputFocus = useCallback(() => {
    setShowCountryDropdown(true);
    const countryValue = getValues('countryCode');
    setCountrySearch(countryValue || '');
  }, [getValues]);

  const handleCountryInputBlur = useCallback(() => {
    setTimeout(() => setShowCountryDropdown(false), 200);
  }, []);

  const countryField = useMemo(() => fields.find((f) => f.name === 'countryCode'), [fields]);
  const phoneField = useMemo(() => fields.find((f) => f.name === 'phone'), [fields]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* First Name + Last Name */}
        <div className="flex gap-4">
          {fields
            .filter((f) => f.name === 'firstName' || f.name === 'lastName')
            .map((field) => (
              <FormField
                key={field.name}
                control={control}
                name={field.name}
                rules={field.rules}
                render={({ field: f }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        {...f}
                        placeholder={field.label}
                        className="focus:outline-none focus:border-primary-500 rounded-md"
                      />
                    </FormControl>
                    <FormMessage className="font-medium text-xs" />
                  </FormItem>
                )}
              />
            ))}
        </div>

        {/* Email Field */}
        {fields
          .filter((f) => f.name === 'email')
          .map((field) => (
            <FormField
              key={field.name}
              control={control}
              name={field.name}
              rules={field.rules}
              render={({ field: f }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...f}
                      placeholder={field.label}
                      className="focus:outline-none focus:border-primary-500 rounded-md"
                    />
                  </FormControl>
                  <FormMessage className="font-medium text-xs" />
                </FormItem>
              )}
            />
          ))}

        {/* Country + Phone */}
        <div className="flex gap-4">
          {countryField && (
            <FormField
              key={countryField.name}
              control={control}
              name={countryField.name}
              rules={countryField.rules}
              render={({ field: f }) => (
                <FormItem className="w-1/3 relative">
                  <FormControl>
                    <div>
                      <Input
                        {...f}
                        value={countrySearch || getValues('countryCode') || ''}
                        onChange={(e) => {
                          const value = e.target.value;
                          setCountrySearch(value);
                          setShowCountryDropdown(true);
                          if (value === '') {
                            setValue('countryCode', '');
                            setValue('countryCodeValue', '');
                          }
                        }}
                        onFocus={handleCountryInputFocus}
                        onBlur={handleCountryInputBlur}
                        placeholder="Search country"
                        className="focus:outline-none focus:border-primary-500 rounded-md"
                      />
                      {showCountryDropdown && (
                        <div className="absolute z-[9999] mt-1 w-max bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                          {filteredCountries.length > 0 ? (
                            filteredCountries.map((country) => (
                              <div
                                key={country.id}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onMouseDown={() => handleCountrySelect(country)}
                              >
                                {country.country}
                              </div>
                            ))
                          ) : countrySearch ? (
                            <div className="px-4 py-2 text-gray-500">
                              No matching countries found
                            </div>
                          ) : null}
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage className="font-medium text-xs" />
                </FormItem>
              )}
            />
          )}

          {phoneField && (
            <FormField
              key={phoneField.name}
              control={control}
              name={phoneField.name}
              rules={phoneField.rules}
              render={({ field: f }) => (
                <FormItem className="w-2/3">
                  <FormControl>
                    <Input
                      {...f}
                      ref={phoneInputRef}
                      value={f.value || ''}
                      onChange={(e) => {
                        const cleanValue = e.target.value.replace(/[^0-9]/g, '');
                        f.onChange(cleanValue);
                      }}
                      placeholder={phoneField.label}
                      className="focus:outline-none focus:border-primary-500 rounded-md"
                    />
                  </FormControl>
                  <FormMessage className="font-medium text-xs" />
                </FormItem>
              )}
            />
          )}
        </div>

        {/* Other Fields */}
        {fields
          .filter((f) => !['firstName', 'lastName', 'email', 'countryCode', 'phone'].includes(f.name))
          .map((field) => {
            if (field.type === 'hidden') {
              return <input key={field.name} type="hidden" {...register(field.name)} />;
            }

            if (field.type === 'select') {
              const value = useWatch({ control, name: field.name });
              return (
                <FormField
                  key={field.name}
                  control={control}
                  name={field.name}
                  rules={field.rules}
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <Select
                          value={value}
                          onValueChange={(val) => setValue(field.name, val)}
                        >
                          <SelectTrigger className="focus:outline-none focus:border-primary-500 rounded-md">
                            <SelectValue
                              placeholder={
                                field.label ? `Select ${field.label}` : ''
                              }
                            />
                          </SelectTrigger>

                          <Portal>
                            <SelectContent className="z-[9999] bg-white border border-gray-200 rounded-md shadow-lg">
                              {field.options?.map((opt) => (
                                <SelectItem key={opt} value={opt}>
                                  {opt}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Portal>
                        </Select>
                      </FormControl>
                      <FormMessage className="font-medium text-xs" />
                    </FormItem>
                  )}
                />
              );
            }

            if (field.type === 'textarea') {
              return (
                <FormField
                  key={field.name}
                  control={control}
                  name={field.name}
                  rules={field.rules}
                  render={({ field: f }) => (
                    <FormItem>
                      <FormControl>
                        <textarea
                          {...f}
                          placeholder={field.label}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary-500 text-sm"
                          rows={4}
                        />
                      </FormControl>
                      <FormMessage className="font-medium text-xs" />
                    </FormItem>
                  )}
                />
              );
            }

            if (field.type === 'checkbox') {
              return (
                <FormField
                  key={field.name}
                  control={control}
                  name={field.name}
                  rules={field.rules}
                  render={({ field: f }) => (
                    <>
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <input
                            type="checkbox"
                            id={field.name}
                            checked={f.value}
                            onChange={f.onChange}
                            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          {field.label && (
                            <label
                              htmlFor={field.name}
                              className="text-sm leading peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {field.label}
                            </label>
                          )}
                        </div>
                      </FormItem>
                      <FormMessage className="font-medium text-xs" />
                    </>
                  )}
                />
              );
            }

            if (field.type === 'file') {
              return (
                <FormField
                  key={field.name}
                  control={control}
                  name={field.name}
                  rules={field.rules}
                  render={({ field: f }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex flex-col gap-2">
                          <label className="block text-sm font-medium text-gray-700">
                            {field.label}
                            {field.required && <span className="text-red-500">*</span>}
                          </label>
                          <input
                            type="file"
                            id={field.name}
                            accept={field.accept}
                            onChange={(e) => {
                              f.onChange(e.target.files?.[0] || null);
                            }}
                            className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-primary-50 file:text-primary-700
                            hover:file:bg-primary-100"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="font-medium text-xs" />
                    </FormItem>
                  )}
                />
              );
            }

            return (
              <FormField
                key={field.name}
                control={control}
                name={field.name}
                rules={field.rules}
                render={({ field: f }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...f}
                        placeholder={field.label}
                        className="focus:outline-none focus:border-primary-500 rounded-md"
                      />
                    </FormControl>
                    <FormMessage className="font-medium text-xs" />
                  </FormItem>
                )}
              />
            );
          })}

        {/* Footer */}
        <p className="text-xs text-gray-600 px-2">
          By providing your contact details, you agree to our{' '}
          <a
            href="/privacy-policy"
            className="text-primary-600"
            target="_blank"
          >
            Privacy Policy
          </a>
        </p>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-6 flex items-center justify-center rounded-md bg-green-500 cursor-pointer"
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? 'Submitting...' : buttonText}
        </Button>
      </form>
    </Form>
  );
};

export default DynamicForm;
