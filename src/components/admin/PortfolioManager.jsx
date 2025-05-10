import React, { useState, useEffect } from "react";
import { db, storage } from "./firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const PortfolioManager = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    category: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  
  const fetchProjects = async () => {
    try {
      const snapshot = await getDocs(collection(db, "portfolio"));
      const projectData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(projectData);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  
  const uploadImage = async (imageFile) => {
    const imageRef = ref(storage, `portfolio/${uuidv4()}-${imageFile.name}`);
    try {
      const snapshot = await uploadBytes(imageRef, imageFile);
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log("Image uploaded successfully, URL:", downloadURL);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      setMessage("❌ Error uploading image: " + error.message);
      throw error;
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, image, category } = formData;

    if (!title || !image || !category) {
      setMessage("❗ Please fill in all fields.");
      return;
    }

    try {
      setUploading(true);
      console.log("Form data:", formData);

      let imageUrl = typeof image === "string" ? image : await uploadImage(image);

      const projectData = {
        title,
        image: imageUrl,
        category,
      };

      if (editingId) {
        await updateDoc(doc(db, "portfolio", editingId), projectData);
        setMessage("✅ Project updated.");
      } else {
        await addDoc(collection(db, "portfolio"), projectData);
        setMessage("✅ Project added.");
      }

      setFormData({ title: "", image: null, category: "" });
      setEditingId(null);
      fetchProjects();
    } catch (error) {
      setMessage("❌ Error: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title,
      image: project.image,
      category: project.category,
    });
    setEditingId(project.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "portfolio", id));
      setMessage("🗑️ Project deleted.");
      fetchProjects();
    } catch (error) {
      setMessage("❌ Error deleting: " + error.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4 border-gray-200">
        <span className="text-blue-700">Portfolio</span> Manager
      </h1>

     
      <div className="bg-white rounded-xl shadow-lg mb-10 overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="bg-blue-500 px-6 py-4">
          <h2 className="text-xl font-semibold text-white">
            {editingId ? "Update Project" : "Add New Project"}
          </h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6"
        >
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Project Title</label>
            <input
              type="text"
              placeholder="Enter project title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-blue-500 transition-colors duration-200"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              placeholder="e.g. Bucket, Parts"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-blue-500 transition-colors duration-200"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-medium text-gray-700">Project Image</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={(e) => {
                    console.log("Selected file:", e.target.files[0]);
                    setFormData({ ...formData, image: e.target.files[0] });
                  }}
                />
              </label>
            </div>
            {typeof formData.image === "string" && (
              <div className="mt-2 flex items-center">
                <img src={formData.image} alt="Preview" className="h-16 w-16 object-cover rounded" />
                <span className="ml-2 text-sm text-gray-600">Current image will be replaced upon submission</span>
              </div>
            )}
          </div>

          <div className="md:col-span-2 flex justify-end mt-4">
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setFormData({ title: "", image: null, category: "" });
                  setEditingId(null);
                }}
                className="mr-4 px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className={`px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-6700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors duration-200 ${
                uploading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={uploading}
            >
              {uploading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </span>
              ) : editingId ? (
                "Update Project"
              ) : (
                "Add Project"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Message */}
      {message && (
        <div className={`mb-8 p-4 rounded-lg text-center transition-all duration-300 transform ${
          message.includes("✅") 
            ? "bg-green-100 text-green-800" 
            : message.includes("❗") 
            ? "bg-yellow-100 text-yellow-800"
            : "bg-red-100 text-red-800"
        } animate-fadeIn`}>
          <p className="font-medium">{message}</p>
        </div>
      )}

      
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Projects ({projects.length})</h2>
      </div>

      
      {projects.length === 0 ? (
        <div className="bg-white p-12 rounded-xl shadow text-center">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
          <p className="text-gray-500 text-lg">No projects found. Add your first project!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
              <div className="relative h-48 overflow-hidden group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-5 flex-grow">
                <div className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full mb-3">
                  {project.category}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{project.title}</h3>
              </div>
              <div className="border-t border-gray-100 p-4 bg-gray-50 flex justify-between">
                <button
                  onClick={() => handleEdit(project)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PortfolioManager;