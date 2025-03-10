import React, { useState, useEffect } from "react";
import "./projects.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Projects() {
    const [projects, setProjects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [newProject, setNewProject] = useState({ title: "", description: "", file: null });
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [uploadFile, setUploadFile] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [showRenameModal, setShowRenameModal] = useState(false);
    const [renameTitle, setRenameTitle] = useState("");

    const userId = 1; // Replace with dynamic user ID if needed

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:5004/api/projects");
            setProjects(res.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 5 * 1024 * 1024) {
            alert("File size must be under 5MB!");
        } else {
            setNewProject({ ...newProject, file });
        }
    };

    const handleCreateProject = async () => {
        if (!newProject.title.trim() || !newProject.description.trim()) {
            alert("Title and description cannot be empty!");
            return;
        }

        const formData = new FormData();
        formData.append("Project_name", newProject.title);
        formData.append("Project_desc", newProject.description);
        formData.append("User_ID", userId);
        formData.append("file", newProject.file);

        try {
            await axios.post("http://localhost:5004/api/projects", formData);
            setShowModal(false);
            setNewProject({ title: "", description: "", file: null });
            fetchProjects();
        } catch (error) {
            console.error("Error creating project:", error);
        }
    };

    const handleDeleteProject = async (id) => {
        try {
            await axios.delete(`http://localhost:5004/api/projects/${id}`);
            fetchProjects();
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    const handleUploadFile = async () => {
        if (!uploadFile) {
            alert("Please select a file to upload!");
            return;
        }
        const formData = new FormData();
        formData.append("file", uploadFile);
        // No need to append Project_ID here since it's in the URL

        try {
            await axios.post(`http://localhost:5004/api/projects/${selectedProject}/files`, formData);
            setShowUploadModal(false);
            setUploadFile(null);
            setSelectedProject(null);
            fetchProjects();
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const handleRenameProject = async () => {
        if (!renameTitle.trim()) {
            alert("Project name cannot be empty!");
            return;
        }

        try {
            await axios.put(`http://localhost:5004/api/projects/${selectedProject}`, {
                Project_name: renameTitle,
            });
            setShowRenameModal(false);
            setRenameTitle("");
            fetchProjects();
        } catch (error) {
            console.error("Error renaming project:", error);
        }
    };

    return (
        <div className="project-container">
            <section id="projects">
                <input className="search-bar" type="text" placeholder="Search projects..." />
                <button className="add-project" onClick={() => setShowModal(true)}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </section>

            {loading ? (
                <p>Loading projects...</p>
            ) : (
                <div className="projects-container">
                    {projects.map((project) => (
                        <div className="project-card" key={project.Project_ID}>
                            <span>{project.Project_name}</span>
                            <div className="icon-group">
                                <button
                                    className="icon-btn"
                                    onClick={() => {
                                        setSelectedProject(project.Project_ID);
                                        setShowRenameModal(true);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faEdit} title="Rename" />
                                </button>
                                <button className="icon-btn" onClick={() => handleDeleteProject(project.Project_ID)}>
                                    <FontAwesomeIcon icon={faTrash} title="Delete" />
                                </button>
                                <button
                                    className="icon-btn"
                                    onClick={() => {
                                        setSelectedProject(project.Project_ID);
                                        setShowUploadModal(true);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faUpload} title="Upload File" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <div className="modal-overlay show">
                    <div className="modal-container">
                        <button className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
                        <h3 className="modal-header">Create New Project</h3>
                        <input
                            type="text"
                            placeholder="Project Title"
                            className="modal-input"
                            value={newProject.title}
                            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                        />
                        <textarea
                            placeholder="Project Description"
                            className="modal-input"
                            value={newProject.description}
                            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                        ></textarea>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="modal-input"
                        />
                        <button className="modal-btn save" onClick={handleCreateProject}>
                            Create
                        </button>
                        <button className="modal-btn cancel" onClick={() => setShowModal(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}

{showUploadModal && (
  <div className="modal-overlay show">
    <div className="modal-container">
      <button className="close-btn" onClick={() => setShowUploadModal(false)}>&times;</button>
      <h3 className="modal-header">Upload File</h3>
      <form onSubmit={(e) => { e.preventDefault(); handleUploadFile(); }} encType="multipart/form-data">
          <input type="file" name="file" onChange={handleFileChange} className="modal-input" />
          <button type="submit" className="modal-btn save">Upload</button>
          <button type="button" className="modal-btn cancel" onClick={() => setShowUploadModal(false)}>Cancel</button>
      </form>
    </div>
  </div>
)}


            {showRenameModal && (
                <div className="modal-overlay show">
                    <div className="modal-container">
                        <button className="close-btn" onClick={() => setShowRenameModal(false)}>&times;</button>
                        <h3 className="modal-header">Rename Project</h3>
                        <input
                            className="modal-input"
                            type="text"
                            placeholder="New Project Name"
                            value={renameTitle}
                            onChange={(e) => setRenameTitle(e.target.value)}
                        />
                        <button className="modal-btn save" onClick={handleRenameProject}>
                            Save
                        </button>
                        <button className="modal-btn cancel" onClick={() => setShowRenameModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Projects;
