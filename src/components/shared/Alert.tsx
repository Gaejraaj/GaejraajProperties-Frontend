import React from "react";
import { AlertType } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AlertProps {
  show: boolean;
  title: string;
  message: string;
  type?: AlertType;
  onClose?: () => void;
  showCancel?: boolean;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

const Alert: React.FC<AlertProps> = ({
  show,
  title,
  message,
  type = "info",
  onClose,
  showCancel = false,
  onConfirm,
  confirmText = "Yes",
  cancelText = "No",
}) => {
  const icons = {
    success: "fas fa-check-circle",
    error: "fas fa-exclamation-circle",
    warning: "fas fa-exclamation-triangle",
    info: "fas fa-info-circle",
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Alert Box */}
      <div
        className={cn(
          "relative bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform transition-all duration-300",
          "animate-in fade-in zoom-in-95",
        )}
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center text-3xl",
              {
                "bg-green-100 text-green-600": type === "success",
                "bg-red-100 text-red-600": type === "error",
                "bg-yellow-100 text-yellow-600": type === "warning",
                "bg-blue-100 text-blue-600": type === "info",
              },
            )}
          >
            <i className={icons[type]}></i>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-center text-gray-900 mb-3">
          {title}
        </h3>

        {/* Message */}
        <p className="text-gray-600 text-center mb-8 leading-relaxed whitespace-pre-line">
          {message}
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          {showCancel && (
            <Button
              variant="outline"
              onClick={onClose}
              className="min-w-[120px]"
            >
              {cancelText}
            </Button>
          )}
          {onConfirm && (
            <Button
              onClick={onConfirm}
              className={cn(
                "min-w-[120px]",
                type === "error"
                  ? "bg-red-600 hover:bg-red-700"
                  : type === "warning"
                    ? "bg-yellow-600 hover:bg-yellow-700"
                    : type === "success"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-blue-600 hover:bg-blue-700",
              )}
            >
              {confirmText}
            </Button>
          )}
          {!showCancel && !onConfirm && (
            <Button onClick={onClose} className="min-w-[120px]">
              OK
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alert;
