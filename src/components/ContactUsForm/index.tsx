import React, { useState } from "react";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react"; 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; 

// Custom Components/Data
import { CountryCodeData } from "../data/CountryCodeData"; 
import FormInput from "./FormInput";
import SnackbarAlert from "./SnackbarAlert"; 
import { FormData, Errors, AlertState } from "./types";

// Find default country (Ensure fallback)
const defaultCountry = CountryCodeData.find((c) => c.country === "India") || { id: 0, country: "India", code: "91" };

const ContactUsForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    country: defaultCountry.country,
    phone: `+${defaultCountry.code} `,
    company: "",
    department: "",
    message: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertState>({ open: false, message: "", severity: "success" });

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (loading) return;

    const { name, value } = e.target;

    if (name === "phone") {
      const countryCode = formData.phone.split(" ")[0];
      // Only allow changes that maintain the country code prefix or are deletions
      if (value.startsWith(countryCode) || value.length < formData.phone.length) {
         setFormData((prev) => ({
             ...prev,
             [name]: value,
         }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle Country Change (Adapted for shadcn/ui Select)
  const handleCountryChange = (value: string) => {
    if (loading) return;

    const selectedCountry = CountryCodeData.find((c) => c.country === value);
    if (selectedCountry) {
      setFormData((prev) => ({
        ...prev,
        country: selectedCountry.country,
        phone: `+${selectedCountry.code} `,
      }));
    }
  };

  // Form Validation (Same logic)
  const validate = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    // Added better check for phone number length after stripping code for better validation
    const phoneBase = formData.phone.split(" ").slice(1).join("");
    if (!phoneBase.trim() || phoneBase.length < 5) newErrors.phone = "Phone number is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submit (Same logic)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setAlert({ ...alert, open: false }); // Close previous alert before attempting submission

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Check for non-2xx status codes (e.g., 500)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setAlert({ open: true, message: "Email sent successfully!", severity: "success" });
        // Reset form data on successful submission
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          country: defaultCountry.country,
          phone: `+${defaultCountry.code} `,
          company: "",
          department: "",
          message: "",
        });
      } else {
        // This path handles API non-success responses that are still 200 OK (if any)
        setAlert({ open: true, message: data.message || "Something went wrong. Please try again later.", severity: "error" });
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to send email. Please check your internet connection.";
      setAlert({ open: true, message: errorMessage, severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SnackbarAlert  alert={alert} onClose={() => setAlert({ ...alert, open: false })} />

      <form onSubmit={handleSubmit} className="md:p-6 p-4 bg-white rounded-xl shadow-lg transition-all duration-300">
        <div className="grid grid-cols-12 gap-x-4 gap-y-6">
          
          {/* First Name & Last Name */}
          {["firstName", "lastName"].map((name) => (
            <div className="col-span-12 md:col-span-6" key={name}>
              <FormInput 
                // Reverting to 'label' prop to satisfy FormInputProps type definition
                label={name === "firstName" ? "First Name*" : "Last Name*"} 
                name={name as keyof FormData} 
                // Removed 'id' prop which caused the latest error
                value={formData[name as keyof FormData]} 
                onChange={handleChange} 
                error={errors[name as keyof Errors]} 
                disabled={loading} 
                required
              />
            </div>
          ))}

          {/* Email */}
          <div className="col-span-12 md:col-span-6">
            <FormInput 
              // Reverting to 'label' prop to satisfy FormInputProps type definition
              label="Email*" 
              name="email" 
              // Removed 'id' prop which caused the latest error
              type="email"
              value={formData.email} 
              onChange={handleChange} 
              error={errors.email} 
              disabled={loading} 
              required
            />
          </div>

          {/* Country Dropdown */}
          {/* Note: Select does not require a label/placeholder style for the input itself, only in the trigger */}
          <div className="col-span-4 md:col-span-2">
            <div className="flex flex-col space-y-2">
              <Select 
                name="country" 
                value={formData.country} 
                onValueChange={handleCountryChange} 
                disabled={loading}
              >
                <SelectTrigger id="country-select" className="w-full">
                  <SelectValue placeholder="Country*" />
                </SelectTrigger>
                <SelectContent>
                  {CountryCodeData.map((country) => (
                    <SelectItem key={country.id} value={country.country}>
                      {country.country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Phone Number */}
          <div className="col-span-8 md:col-span-4">
            <FormInput 
              // Reverting to 'label' prop to satisfy FormInputProps type definition
              label="Phone Number*" 
              name="phone" 
              // Removed 'id' prop which caused the latest error
              type="tel"
              value={formData.phone} 
              onChange={handleChange} 
              error={errors.phone} 
              disabled={loading} 
              required
            />
          </div>

          {/* Company & Department */}
          <div className="col-span-12 md:col-span-6">
            <FormInput 
              // Reverting to 'label' prop to satisfy FormInputProps type definition
              label="Company (Optional)" 
              name="company" 
              // Removed 'id' prop which caused the latest error
              value={formData.company} 
              onChange={handleChange} 
              disabled={loading} 
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <FormInput 
              // Reverting to 'label' prop to satisfy FormInputProps type definition
              label="Department (Optional)" 
              name="department" 
              // Removed 'id' prop which caused the latest error
              value={formData.department} 
              onChange={handleChange} 
              disabled={loading} 
            />
          </div>

          {/* Message */}
          <div className="col-span-12">
            <FormInput 
              // Reverting to 'label' prop to satisfy FormInputProps type definition
              label="Message*" 
              name="message" 
              // Removed 'id' prop which caused the latest error
              value={formData.message} 
              onChange={handleChange} 
              error={errors.message} 
              disabled={loading} 
              multiline 
              rows={5} // Set desired height
              required
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-12 md:col-span-4">
            <Button 
              type="submit" 
              disabled={loading} 
              className="w-full h-10 bg-primary-green hover:bg-secondary-green text-white transition-colors" 
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Contact Us"
              )}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ContactUsForm;
