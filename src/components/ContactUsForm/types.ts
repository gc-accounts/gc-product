export interface Country {
    id: number;
    country: string;
    code: string;
  }
  
  export interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    phone: string;
    company: string;
    department: string;
    message: string;
  }
  
  export interface Errors {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    message?: string;
  }
  
  export interface AlertState {
    open: boolean;
    message: string;
    // Note: shadcn/ui's Toast/Alert components use 'default' or 'destructive' for severity/variant.
    // We'll map 'success' to 'default' and 'error' to 'destructive' in SnackbarAlert.
    severity: "success" | "error"; 
  }