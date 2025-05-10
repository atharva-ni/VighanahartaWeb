// components/admin/CaseStudyManager.jsx
import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const CaseStudyManager = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [client, setClient] = useState("");
  const [resultsText, setResultsText] = useState(""); // comma-separated
  const [message, setMessage] = useState("");
  const [editingCase, setEditingCase] = useState(null);

  const fetchCaseStudies = async () => {
    try {
      const snapshot = await getDocs(collection(db, "case_studies"));
      const studies = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCaseStudies(studies);
    } catch (error) {
      console.error("Error fetching case studies:", error);
    }
  };

  const handleAddOrUpdateCase = async (e) => {
    e.preventDefault();
    if (!title || !description || !client || !resultsText) {
      setMessage("Please fill in all fields.");
      return;
    }

    const resultsArray = resultsText.split(",").map((r) => r.trim());

    try {
      if (editingCase) {
        await updateDoc(doc(db, "case_studies", editingCase.id), {
          title,
          description,
          client,
          results: resultsArray,
        });
        setMessage("✅ Case study updated.");
      } else {
        await addDoc(collection(db, "case_studies"), {
          title,
          description,
          client,
          results: resultsArray,
        });
        setMessage("✅ Case study added.");
      }

      // Clear form
      setTitle("");
      setDescription("");
      setClient("");
      setResultsText("");
      setEditingCase(null);
      fetchCaseStudies();
    } catch (error) {
      setMessage("❌ Error: " + error.message);
    }
  };

  const handleEdit = (id) => {
    const caseToEdit = caseStudies.find((cs) => cs.id === id);
    setTitle(caseToEdit.title);
    setDescription(caseToEdit.description);
    setClient(caseToEdit.client);
    setResultsText(caseToEdit.results?.join(", "));
    setEditingCase(caseToEdit);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "case_studies", id));
      setMessage("🗑️ Case study deleted.");
      fetchCaseStudies();
    } catch (error) {
      setMessage("❌ Error deleting: " + error.message);
    }
  };

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Manage Case Studies
        </h1>
        <div className="text-sm text-gray-500">
          {caseStudies.length} case studies
        </div>
      </div>

      <form
        onSubmit={handleAddOrUpdateCase}
        className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          {editingCase ? "Edit Case Study" : "Add New Case Study"}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              placeholder="Case study title"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Client</label>
            <input
              type="text"
              placeholder="Client name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              value={client}
              onChange={(e) => setClient(e.target.value)}
            />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Results (comma-separated)</label>
            <input
              type="text"
              placeholder="e.g. 50% increase in sales, 30% reduction in costs"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              value={resultsText}
              onChange={(e) => setResultsText(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">Separate each result with a comma</p>
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              placeholder="Detailed description of the case study"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 min-h-[120px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          {editingCase && (
            <button
              type="button"
              onClick={() => {
                setTitle("");
                setDescription("");
                setClient("");
                setResultsText("");
                setEditingCase(null);
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
            {editingCase ? "Update" : "Add"} Case Study
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

      <div className="space-y-6">
        {caseStudies.length === 0 ? (
          <div className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-md border border-dashed border-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p>No case studies found. Add your first one above!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {caseStudies.map((study) => (
              <div
                key={study.id}
                className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold mb-1 text-gray-800">{study.title}</h2>
                    <p className="text-sm text-blue-600 font-medium mb-3">
                      <span className="inline-flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {study.client}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(study.id)}
                      className="bg-yellow-500 text-white p-1.5 rounded-md hover:bg-yellow-600 transition-colors"
                      title="Edit"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(study.id)}
                      className="bg-red-600 text-white p-1.5 rounded-md hover:bg-red-700 transition-colors"
                      title="Delete"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="mt-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <p className="text-gray-700 mb-4">{study.description}</p>
                  
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Key Results
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {study.results?.map((result, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-700">
                          <span className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
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

export default CaseStudyManager;