import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TodoPopup.css';
import Frame from './Frame.png';

function TodoPopup({ onClose,onSave, initialName,initialImage}) {
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileName, setFileName] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const [image, setImage] = useState(initialImage || '');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setFileName(file.name);
    }
  };
 
  const handleChangeImage = () => {
    document.getElementById("file-upload").click();
  };

  const handleCreateTodoList = () => {
    if (!selectedImage) {
      alert("Please upload an image for the To-do list.");
      return;
    }
    if (!name) {
      alert("Please enter a name for the To-do list.");
      return;
    }
    onSave(name,selectedImage || image); 
    onClose();
    navigate('/todo-list', {
      state: { image: selectedImage, name: name, fileName: fileName },
    });
   console.log(selectedImage,name,fileName,"data")
  // navigate("/todo-list") 
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Create New To-do-list</h2>
        <div className="upload-section">
          {selectedImage ? (
            <div className="change">
              <div className="pp">
                <img src={selectedImage} alt="Uploaded" className="uploaded-image" />
              </div>
              <div className="ppp">
                <p className="file">{fileName}</p>
                <button onClick={handleChangeImage} className="change-link">
                  Change
                </button>
              </div>
            </div>
          ) : (
            <label htmlFor="file-upload" className="custom-file-upload">
              <img src={Frame} alt="Placeholder"  />
              <p>Upload an image or a logo</p>
            </label>
          )}
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
        </div>

        <div className="for">
          <label htmlFor="fname">Name</label>
          <input
            className="in"
            type="text"
            id="fname"
            name="fname"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="buttons">
          <button className="create-button" onClick={handleCreateTodoList}>
            Create New To-do-list
          </button>
          <button className="discard-button" onClick={onClose}>
            Discard
          </button>
        </div>   
      </div>
    </div>
  );
}

export default TodoPopup;