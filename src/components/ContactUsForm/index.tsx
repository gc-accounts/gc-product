import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CountryCodeData } from "../data/CountryCodeData";
import FormInput from "./FormInput";
import SnackbarAlert from "./SnackbarAlert";
import { FormData, Errors, AlertState } from "./types";

const ContactUsForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    phone: "",
    company: "",
    department: "",
    message: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertState>({ open: false, message: "", severity: "success" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (loading) return;
    const { name, value } = e.target;
    if (name === "phone") {
      const countryCode = formData.phone.split(" ")[0];
      if (value.startsWith(countryCode) || value.length < formData.phone.length) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

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

  const validate = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    const phoneBase = formData.phone.split(" ").slice(1).join("");
    if (!phoneBase.trim() || phoneBase.length < 5) newErrors.phone = "Phone number is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setAlert({ ...alert, open: false });

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setAlert({ open: true, message: "Email sent successfully!", severity: "success" });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          country: "",
          phone: "",
          company: "",
          department: "",
          message: "",
        });
      } else {
        setAlert({
          open: true,
          message: data.message || "Something went wrong. Please try again later.",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to send email. Please check your internet connection.";
      setAlert({ open: true, message: errorMessage, severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SnackbarAlert alert={alert} onClose={() => setAlert({ ...alert, open: false })} />

      <form
        onSubmit={handleSubmit}
        className="md:p-6 p-4 bg-white rounded-xl shadow-lg transition-all duration-300"
      >
        <div className="grid grid-cols-12 gap-x-4 gap-y-6">
          <div className="col-span-12 md:col-span-6">
            <FormInput name="firstName" placeholder="First Name*" value={formData.firstName} onChange={handleChange} error={errors.firstName} disabled={loading} required />
          </div>
          <div className="col-span-12 md:col-span-6">
            <FormInput name="lastName" placeholder="Last Name*" value={formData.lastName} onChange={handleChange} error={errors.lastName} disabled={loading} required />
          </div>
          <div className="col-span-12 md:col-span-6">
            <FormInput name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} error={errors.email} disabled={loading} required />
          </div>

          {/* Country Dropdown */}
          <div className="col-span-4 md:col-span-2 relative">
            <Select name="country" value={formData.country} onValueChange={handleCountryChange} disabled={loading}>
              <SelectTrigger id="country-select" className="w-full border-gray-300">
                <SelectValue placeholder="Country*" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 max-h-56 overflow-y-auto shadow-lg rounded-md z-[9999]">
                {CountryCodeData.map((country) => (
                  <SelectItem key={country.id} value={country.country}>
                    {country.country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-8 md:col-span-4">
            <FormInput name="phone" type="tel" placeholder="+91 99999 99999" value={formData.phone} onChange={handleChange} error={errors.phone} disabled={loading} required />
          </div>

          <div className="col-span-12 md:col-span-6">
            <FormInput name="company" placeholder="Company (Optional)" value={formData.company} onChange={handleChange} disabled={loading} />
          </div>
          <div className="col-span-12 md:col-span-6">
            <FormInput name="department" placeholder="Department (Optional)" value={formData.department} onChange={handleChange} disabled={loading} />
          </div>

          <div className="col-span-12">
            <FormInput name="message" placeholder="Your Message*" value={formData.message} onChange={handleChange} error={errors.message} disabled={loading} multiline rows={5} required />
          </div>

          <div className="col-span-12 md:col-span-4">
            <Button type="submit" disabled={loading} className="w-full h-10 bg-primary-green hover:bg-secondary-green text-white transition-colors">
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
