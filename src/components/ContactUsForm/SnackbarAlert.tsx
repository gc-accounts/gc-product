import React, { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, AlertTriangle, X } from "lucide-react"
import { AlertState } from "./types"

interface SnackbarAlertProps {
  alert: AlertState
  onClose: () => void
}

const SnackbarAlert: React.FC<SnackbarAlertProps> = ({ alert, onClose }) => {
  const { open, message, severity } = alert
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (open) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
        setTimeout(onClose, 300)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [open, onClose])

  if (!open && !visible) return null

  const isSuccess = severity === "success"
  const Icon = isSuccess ? CheckCircle : AlertTriangle
  const variant = isSuccess ? "default" : "destructive"

  return (
    <div
      className={`fixed bottom-8 right-9 z-[9999] max-w-4xl transition-all duration-300 transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
      }`}
    >
      <Alert
        variant={variant}
        className={`relative shadow-xl border rounded-xl p-4 flex items-start gap-3 ${
          isSuccess ? "bg-green-50 border-green-300 text-green-800" : "bg-red-50 border-red-300 text-red-800"
        }`}
      >
        <Icon
          className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
            isSuccess ? "text-green-600" : "text-red-600"
          }`}
        />
        <div className="flex-1">
          <AlertTitle className="font-semibold text-base">
            {isSuccess ? "Success" : "Error"}
          </AlertTitle>
          <AlertDescription className="text-sm leading-snug">
            {message}
          </AlertDescription>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
          aria-label="Close alert"
        >
          <X className="h-4 w-4" />
        </button>
      </Alert>
    </div>
  )
}

export default SnackbarAlert
