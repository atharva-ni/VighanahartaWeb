
import React, { useState, useEffect } from "react";
import { db } from "./firebase"; 

import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const TestimonialManager = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [editingFeedback, setEditingFeedback] = useState(null);

  const fetchFeedback = async () => {
    const querySnapshot = await getDocs(collection(db, "testimonials"));
    const feedbackList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setFeedbackData(feedbackList);
  };

  const handleAddOrUpdateFeedback = async (e) => {
    e.preventDefault();
    if (!quote || !author || !position || !company) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      if (editingFeedback) {
        await updateDoc(doc(db, "testimonials", editingFeedback.id), {
          quote,
          author,
          position,
          company,
        });
        setMessage("✅ Feedback updated.");
      } else {
        await addDoc(collection(db, "testimonials"), {
          quote,
          author,
          position,
          company,
        });
        setMessage("✅ Feedback added.");
      }

      setQuote("");
      setAuthor("");
      setPosition("");
      setCompany("");
      setEditingFeedback(null);
      fetchFeedback();
    } catch (error) {
      setMessage("❌ Error: " + error.message);
    }
  };

  const handleDeleteFeedback = async (id) => {
    try {
      await deleteDoc(doc(db, "testimonials", id));
      setMessage("🗑️ Feedback deleted.");
      fetchFeedback();
    } catch (error) {
      setMessage("❌ Error deleting: " + error.message);
    }
  };

  const handleEditFeedback = (id) => {
    const feedbackToEdit = feedbackData.find((f) => f.id === id);
    setQuote(feedbackToEdit.quote);
    setAuthor(feedbackToEdit.author);
    setPosition(feedbackToEdit.position);
    setCompany(feedbackToEdit.company);
    setEditingFeedback(feedbackToEdit);
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          Manage Testimonials
        </h1>
        <div className="text-sm text-gray-500">
          {feedbackData.length} testimonials
        </div>
      </div>

      <form
        onSubmit={handleAddOrUpdateFeedback}
        className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          {editingFeedback ? "Edit Testimonial" : "Add New Testimonial"}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Quote</label>
            <textarea
              placeholder="Enter the testimonial quote"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 min-h-[100px]"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
            />
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Author</label>
              <input
                type="text"
                placeholder="Author name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Position</label>
                <input
                  type="text"
                  placeholder="Job title"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Company</label>
                <input
                  type="text"
                  placeholder="Company name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          {editingFeedback && (
            <button
              type="button"
              onClick={() => {
                setQuote("");
                setAuthor("");
                setPosition("");
                setCompany("");
                setEditingFeedback(null);
              }}
              className="mr-2 px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200"
            >
              Cancel
            </button>
          )}
          
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center gap-2 shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {editingFeedback ? "Update" : "Add"} Testimonial
          </button>
        </div>
      </form>

      {message && (
        <div className={`p-4 rounded-lg ${message.includes("❌") ? "bg-red-50 text-red-700" : "bg-blue-50 text-blue-700"} flex items-center gap-2 animate-fade-in transition-all duration-300`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {message}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          All Testimonials
        </h2>
        
        {feedbackData.length === 0 ? (
          <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <p>No testimonials yet. Add your first one above!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {feedbackData.map((fb) => (
              <div
                key={fb.id}
                className="p-5 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 bg-gray-50 hover:bg-white relative group"
              >
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
                  <button
                    onClick={() => handleEditFeedback(fb.id)}
                    className="bg-yellow-500 text-white p-1.5 rounded-md hover:bg-yellow-600 transition-colors"
                    title="Edit"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteFeedback(fb.id)}
                    className="bg-red-600 text-white p-1.5 rounded-md hover:bg-red-700 transition-colors"
                    title="Delete"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                
                <blockquote className="italic text-gray-700 font-medium mb-3">
                  "{fb.quote}"
                </blockquote>
                
                <div className="flex items-center mt-4">
                  
                  <div className="ml-3">
                    <p className="text-sm font-semibold text-gray-800">{fb.author}</p>
                    <p className="text-xs text-gray-500">{fb.position} at {fb.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialManager;