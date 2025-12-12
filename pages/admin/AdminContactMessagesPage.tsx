"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { ConfirmationModal } from "../../components/admin/ConfirmationModal";
import { SuccessModal } from "../../components/admin/SuccessModal";
import { Mail, User, Calendar, X } from "lucide-react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

const initialMessages: ContactMessage[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    subject: "Product Inquiry",
    message: "I'm interested in the MacBook Pro M3. Can you provide more details about the warranty and shipping options?",
    date: "2025-12-05",
    read: false
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    subject: "Order Issue",
    message: "My order #ORD-002 hasn't arrived yet. It's been 10 days since I placed the order. Can you help me track it?",
    date: "2025-12-04",
    read: true
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    subject: "Partnership Opportunity",
    message: "We are a technology distributor interested in partnering with your company. Would you be open to discussing potential collaboration?",
    date: "2025-12-03",
    read: false
  },
  {
    id: "4",
    name: "Alice Williams",
    email: "alice@example.com",
    subject: "Technical Support",
    message: "I'm having trouble with the Sony headphones I purchased. The noise cancelling feature doesn't seem to be working properly.",
    date: "2025-12-02",
    read: true
  }
];

export function AdminContactMessagesPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [archivedMessages, setArchivedMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [replyText, setReplyText] = useState("");
  const [activeTab, setActiveTab] = useState<"active" | "archived">("active");

  const handleMessageClick = (message: ContactMessage) => {
    setSelectedMessage(message);
    if (activeTab === "active") {
      setMessages(messages.map(m =>
        m.id === message.id ? { ...m, read: true } : m
      ));
    }
  };

  const handleReply = () => {
    if (selectedMessage) {
      setShowReplyModal(true);
      setReplyText("");
    }
  };

  const handleSendReply = () => {
    if (replyText.trim()) {
      setSuccessMessage(`Reply sent to: ${selectedMessage?.email}\n\nMessage: ${replyText}`);
      setShowSuccessModal(true);
      setShowReplyModal(false);
      setReplyText("");
    } else {
      setErrorMessage("Please enter a reply message!");
      setShowErrorModal(true);
    }
  };

  const handleArchive = () => {
    if (selectedMessage) {
      // Move to archived
      setArchivedMessages([...archivedMessages, { ...selectedMessage, read: true }]);
      setMessages(messages.filter(m => m.id !== selectedMessage.id));
      setSelectedMessage(null);
      setSuccessMessage("Message archived successfully!");
      setShowSuccessModal(true);
    }
  };

  const handleRestore = () => {
    if (selectedMessage) {
      // Move back to active
      setMessages([...messages, selectedMessage]);
      setArchivedMessages(archivedMessages.filter(m => m.id !== selectedMessage.id));
      setSelectedMessage(null);
      setSuccessMessage("Message restored successfully!");
      setShowSuccessModal(true);
    }
  };

  const handleDeletePermanently = () => {
    if (selectedMessage) {
      setShowDeleteModal(true);
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedMessage) {
      setArchivedMessages(archivedMessages.filter(m => m.id !== selectedMessage.id));
      setSelectedMessage(null);
      setSuccessMessage("Message deleted permanently!");
      setShowSuccessModal(true);
    }
  };

  const unreadCount = messages.filter(m => !m.read).length;
  const currentMessages = activeTab === "active" ? messages : archivedMessages;

  return (
    <AdminLayout>
      <div>
        <div className="mb-6 sm:mb-8">
          <h1 className="text-white text-2xl sm:text-3xl mb-2">Contact Messages</h1>
          <p className="text-slate-400 text-sm sm:text-base">
            {unreadCount > 0 ? `${unreadCount} unread message${unreadCount > 1 ? 's' : ''}` : 'All messages read'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 sm:gap-4 mb-4 sm:mb-6">
          <button
            onClick={() => {
              setActiveTab("active");
              setSelectedMessage(null);
            }}
            className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg transition-all text-sm sm:text-base flex-1 sm:flex-initial ${activeTab === "active"
                ? "bg-cyan-500 text-white"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
          >
            Active ({messages.length})
          </button>
          <button
            onClick={() => {
              setActiveTab("archived");
              setSelectedMessage(null);
            }}
            className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg transition-all text-sm sm:text-base flex-1 sm:flex-initial ${activeTab === "archived"
                ? "bg-cyan-500 text-white"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
          >
            Archived ({archivedMessages.length})
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Messages List */}
          <div className="space-y-3 sm:space-y-4">
            {currentMessages.length === 0 ? (
              <div className="bg-slate-800 rounded-xl p-8 sm:p-12 text-center border border-slate-700">
                <Mail className="w-12 h-12 sm:w-16 sm:h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 text-sm sm:text-base">
                  {activeTab === "active" ? "No active messages" : "No archived messages"}
                </p>
              </div>
            ) : (
              currentMessages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => handleMessageClick(message)}
                  className={`bg-slate-800 rounded-xl p-4 sm:p-5 cursor-pointer hover:bg-slate-700 transition-all border ${!message.read ? 'border-l-4 border-l-cyan-500 border-t-slate-700 border-r-slate-700 border-b-slate-700' : 'border-slate-700'
                    } ${selectedMessage?.id === message.id ? 'ring-2 ring-cyan-500' : ''}`}
                >
                  <div className="flex items-start justify-between mb-3 gap-2">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-white text-sm sm:text-base truncate">{message.name}</h3>
                        <p className="text-slate-400 text-xs sm:text-sm truncate">{message.email}</p>
                      </div>
                    </div>
                    {!message.read && (
                      <span className="bg-cyan-500 text-white text-xs px-2 py-1 rounded-full flex-shrink-0">
                        New
                      </span>
                    )}
                  </div>

                  <h4 className="text-white mb-2 text-sm sm:text-base line-clamp-1">{message.subject}</h4>
                  <p className="text-slate-400 text-xs sm:text-sm line-clamp-2">{message.message}</p>

                  <div className="flex items-center gap-2 mt-3 text-slate-500 text-xs sm:text-sm">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    {message.date}
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Message Detail */}
          <div className="lg:sticky lg:top-24 h-fit">
            {selectedMessage ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-800 rounded-xl p-4 sm:p-6 border border-slate-700"
              >
                <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-white text-base sm:text-lg truncate">{selectedMessage.name}</h3>
                      <p className="text-slate-400 text-xs sm:text-sm flex items-center gap-1 truncate">
                        <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="truncate">{selectedMessage.email}</span>
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="text-slate-400 hover:text-white transition-colors lg:hidden flex-shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Subject:</p>
                    <h2 className="text-white text-xl">{selectedMessage.subject}</h2>
                  </div>

                  <div>
                    <p className="text-slate-400 text-sm mb-2">Message:</p>
                    <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                      <p className="text-slate-200 leading-relaxed">{selectedMessage.message}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400 text-sm pt-4 border-t border-slate-700">
                    <Calendar className="w-4 h-4" />
                    Received on {selectedMessage.date}
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
                  {activeTab === "active" ? (
                    <>
                      <button
                        onClick={handleReply}
                        className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white py-2 sm:py-3 rounded-lg transition-all text-sm sm:text-base"
                      >
                        Reply
                      </button>
                      <button
                        onClick={handleArchive}
                        className="px-4 sm:px-6 bg-slate-700 hover:bg-slate-600 text-slate-300 py-2 sm:py-3 rounded-lg transition-all text-sm sm:text-base"
                      >
                        Archive
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleRestore}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 sm:py-3 rounded-lg transition-all text-sm sm:text-base"
                      >
                        Restore
                      </button>
                      <button
                        onClick={handleDeletePermanently}
                        className="px-4 sm:px-6 bg-red-500 hover:bg-red-600 text-white py-2 sm:py-3 rounded-lg transition-all text-sm sm:text-base"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="bg-slate-800 rounded-xl p-8 sm:p-12 text-center border border-slate-700">
                <Mail className="w-12 h-12 sm:w-16 sm:h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 text-sm sm:text-base">Select a message to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reply Modal */}
      {showReplyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl p-4 sm:p-6 lg:p-8 w-full max-w-md">
            <h2 className="text-white text-lg sm:text-xl mb-4">Reply to {selectedMessage?.name}</h2>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full h-32 bg-slate-700/50 rounded-lg p-4 border border-slate-600 text-slate-200 leading-relaxed"
              placeholder="Type your reply here..."
            />
            <div className="mt-4 flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
              <button
                onClick={handleSendReply}
                className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-all text-sm sm:text-base"
              >
                Send
              </button>
              <button
                onClick={() => setShowReplyModal(false)}
                className="bg-slate-700 hover:bg-slate-600 text-slate-300 py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-all text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Message"
        message="Are you sure you want to permanently delete this message? This action cannot be undone."
        type="danger"
        confirmText="Yes, Delete"
        cancelText="Cancel"
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Success"
        message={successMessage}
      />

      {/* Error Modal */}
      <ConfirmationModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        onConfirm={() => setShowErrorModal(false)}
        title="Error"
        message={errorMessage}
        type="warning"
        confirmText="OK"
        cancelText="Close"
      />
    </AdminLayout>
  );
}

export default AdminContactMessagesPage;