"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, AlertTriangle, Check, Info } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  type?: "danger" | "warning" | "info" | "success";
  confirmText?: string;
  cancelText?: string;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = "info",
  confirmText = "Yes",
  cancelText = "Cancel",
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const getTypeStyles = () => {
    switch (type) {
      case "danger":
        return {
          icon: AlertTriangle,
          iconColor: "text-red-500",
          buttonColor: "bg-red-500 hover:bg-red-600",
        };
      case "warning":
        return {
          icon: AlertTriangle,
          iconColor: "text-orange-500",
          buttonColor: "bg-orange-500 hover:bg-orange-600",
        };
      case "success":
        return {
          icon: Check,
          iconColor: "text-green-500",
          buttonColor: "bg-green-500 hover:bg-green-600",
        };
      default:
        return {
          icon: Info,
          iconColor: "text-cyan-500",
          buttonColor: "bg-cyan-500 hover:bg-cyan-600",
        };
    }
  };

  const { icon: Icon, iconColor, buttonColor } = getTypeStyles();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full bg-slate-700 ${iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{title}</h3>
                </div>
                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-slate-300 mb-6 ml-12">{message}</p>

              <div className="flex gap-3 ml-12">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                >
                  {cancelText}
                </button>
                <button
                  onClick={handleConfirm}
                  className={`flex-1 px-4 py-2 ${buttonColor} text-white rounded-lg transition-colors flex items-center justify-center gap-2`}
                >
                  {type === "danger" && <AlertTriangle className="w-4 h-4" />}
                  {type === "success" && <Check className="w-4 h-4" />}
                  {confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

