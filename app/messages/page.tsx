"use client";

import { motion } from "motion/react";
import { MessageSquare, Mail, Search, Filter } from "lucide-react";
import { useState } from "react";

// Mock data for messages
const initialMessages = [
    {
        id: 1,
        sender: "Admin Support",
        subject: "Re: Bulk Order Inquiry",
        text: "Hello! We've received your inquiry about the bulk order. Someone from our sales team will contact you shortly to discuss the details and pricing.",
        time: "10 mins ago",
        fullDate: "Oct 26, 2025, 10:30 AM",
        unread: true,
        avatar: "S"
    },
    {
        id: 2,
        sender: "System Notification",
        subject: "Order Delivered",
        text: "Your order #8821 has been successfully delivered. We hope you enjoy your purchase! Please let us know if you have any feedback.",
        time: "2 hours ago",
        fullDate: "Oct 26, 2025, 08:15 AM",
        unread: false,
        avatar: "Sys"
    },
    {
        id: 3,
        sender: "Admin",
        subject: "Re: Return Policy Question",
        text: "Regarding your question about returns: Yes, you can return items within 30 days of purchase as long as they are in original condition. I've attached the return label to this message.",
        time: "1 day ago",
        fullDate: "Oct 25, 2025, 02:45 PM",
        unread: false,
        avatar: "A"
    },
    {
        id: 4,
        sender: "Tech Support",
        subject: "Ticket #10234 Resolved",
        text: "We wanted to let you know that the issue you reported regarding the login page has been resolved. Please try clearing your cache if you still see any issues.",
        time: "3 days ago",
        fullDate: "Oct 23, 2025, 09:12 AM",
        unread: true,
        avatar: "T"
    },
];

export default function MessagesPage() {
    const [messages, setMessages] = useState(initialMessages);
    const [selectedMessage, setSelectedMessage] = useState<typeof initialMessages[0] | null>(null);

    const handleMessageClick = (msg: typeof initialMessages[0]) => {
        setSelectedMessage(msg);
        // Mark as read
        setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, unread: false } : m));
    };

    return (
        <div className="min-h-screen bg-slate-950 pt-8 pb-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <MessageSquare className="w-8 h-8 text-cyan-400" />
                        Messages
                    </h1>
                    <p className="text-slate-400">View and manage your communications with support and admins.</p>
                </div>

                <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl flex flex-col md:flex-row h-[700px]">

                    {/* Sidebar / Message List */}
                    <div className={`${selectedMessage ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-1/3 border-r border-slate-800`}>
                        {/* Search */}
                        <div className="p-4 border-b border-slate-800">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search messages..."
                                    className="w-full bg-slate-800 text-white pl-10 pr-4 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-cyan-500 transition-colors"
                                />
                                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            </div>
                        </div>

                        {/* List */}
                        <div className="flex-1 overflow-y-auto">
                            {messages.map((msg) => (
                                <button
                                    key={msg.id}
                                    onClick={() => handleMessageClick(msg)}
                                    className={`w-full text-left p-4 border-b border-slate-800 hover:bg-slate-800/50 transition-colors flex gap-4 ${selectedMessage?.id === msg.id ? 'bg-slate-800/80 border-l-4 border-l-cyan-500' : 'border-l-4 border-l-transparent'} ${msg.unread ? 'bg-slate-800/30' : ''}`}
                                >
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex-shrink-0 flex items-center justify-center text-white font-bold">
                                        {msg.avatar}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className={`font-semibold truncate ${msg.unread ? 'text-white' : 'text-slate-300'}`}>
                                                {msg.sender}
                                            </h3>
                                            <span className="text-xs text-slate-500 whitespace-nowrap ml-2">{msg.time}</span>
                                        </div>
                                        <p className={`text-sm truncate mb-1 ${msg.unread ? 'text-slate-200 font-medium' : 'text-slate-400'}`}>
                                            {msg.subject}
                                        </p>
                                        <p className="text-xs text-slate-500 truncate">
                                            {msg.text}
                                        </p>
                                    </div>
                                    {msg.unread && (
                                        <div className="self-center">
                                            <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Message Content */}
                    <div className={`${selectedMessage ? 'flex' : 'hidden md:flex'} flex-col flex-1 bg-slate-900/50`}>
                        {selectedMessage ? (
                            <>
                                {/* Message Header */}
                                <div className="p-6 border-b border-slate-800 flex justify-between items-start">
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => setSelectedMessage(null)}
                                            className="md:hidden text-slate-400 hover:text-white mr-2"
                                        >
                                            ←
                                        </button>
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                                            {selectedMessage.avatar}
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-white">{selectedMessage.subject}</h2>
                                            <p className="text-cyan-400">{selectedMessage.sender}</p>
                                        </div>
                                    </div>
                                    <span className="text-sm text-slate-500">{selectedMessage.fullDate}</span>
                                </div>

                                {/* Message Body */}
                                <div className="p-6 flex-1 overflow-y-auto">
                                    <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                                        {selectedMessage.text}
                                    </div>
                                </div>

                                {/* Reply Box (Mock) */}
                                <div className="p-6 border-t border-slate-800 bg-slate-900">
                                    <div className="flex gap-4">
                                        <textarea
                                            placeholder="Type a reply..."
                                            className="flex-1 bg-slate-800 text-white rounded-xl p-4 border border-slate-700 focus:outline-none focus:border-cyan-500 transition-colors resize-none h-24"
                                        ></textarea>
                                        <button className="self-end bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                                            Send
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-slate-500 p-8">
                                <Mail className="w-16 h-16 mb-4 opacity-20" />
                                <h3 className="text-xl font-medium mb-2">Select a message</h3>
                                <p>Choose a message from the list to view details.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
