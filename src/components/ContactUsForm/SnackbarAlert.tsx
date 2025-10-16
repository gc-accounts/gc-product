import React, { useEffect } from "react";
// Replaced MUI Snackbar and Alert with shadcn/ui Alert
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { X, CheckCircle, AlertTriangle } from "lucide-react"; // Icons for success/error
import { AlertState } from "./types";

interface SnackbarAlertProps {
  alert: AlertState;
  onClose: () => void;
}

const SnackbarAlert: React.FC<SnackbarAlertProps> = ({ alert, onClose }) => {
  const { open, message, severity } = alert;
  
  // Handle auto-hide duration (4000ms as per original logic)
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  if (!open) return null;

  // Determine appearance based on severity
  const isSuccess = severity === "success";
  const Icon = isSuccess ? CheckCircle : AlertTriangle;
  const title = isSuccess ? "Success" : "Error";
  const alertClasses = isSuccess 
    ? "border-green-500 bg-green-50 text-green-800"
    : "border-red-500 bg-red-50 text-red-800";
  const iconClasses = isSuccess ? "text-green-600" : "text-red-600";


  return (
    // Tailwind equivalent of MUI Snackbar position (top-right, fixed)
    <div 
      className="fixed top-20 right-4 z-50 w-full max-w-sm transition-opacity duration-300"
    >
      <Alert className={`${alertClasses} shadow-lg relative`}>
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-opacity-50 transition-colors"
          aria-label="Close alert"
        >
          <X className="h-4 w-4 opacity-50 hover:opacity-100" />
        </button>

        <Icon className={`h-4 w-4 ${iconClasses}`} />
        <AlertTitle className="font-semibold text-base">{title}</AlertTitle>
        <AlertDescription className="text-sm">
          {message}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default SnackbarAlert;