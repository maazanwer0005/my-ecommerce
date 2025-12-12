"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  buttonText?: string;
}

export function SuccessModal({
  isOpen,
  onClose,
  title,
  message,
  buttonText = "OK",
}: SuccessModalProps) {
  if (!isOpen) return null;

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
                  <div className="p-2 rounded-full bg-green-500/20 text-green-500">
                    <CheckCircle className="w-5 h-5" />
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

              <div className="flex justify-end ml-12">
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  {buttonText}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

