// Document Manager functionality
function loadDocuments(userId) {
    const documentsList = document.getElementById('documentsList');
    documentsList.innerHTML = '<li>Loading documents...</li>';
    
    // Get documents for current user
    documentsRef.where('userId', '==', userId).get()
        .then(querySnapshot => {
            if (querySnapshot.empty) {
                documentsList.innerHTML = '<li>No documents found. Upload your first document!</li>';
                return;
            }
            
            documentsList.innerHTML = '';
            querySnapshot.forEach(doc => {
                const documentData = doc.data();
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${documentData.name}</span>
                    <div>
                        <button class="btn btn-sm" onclick="viewDocument('${documentData.url}')">View</button>
                        <button class="btn btn-sm" onclick="downloadDocument('${documentData.url}', '${documentData.name}')">Download</button>
                        <button class="btn btn-sm btn-outline" onclick="deleteDocument('${doc.id}')">Delete</button>
                    </div>
                `;
                documentsList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error loading documents:', error);
            documentsList.innerHTML = '<li>Error loading documents. Please try again.</li>';
        });
}

// Set up file upload
document.addEventListener('DOMContentLoaded', () => {
    const fileUpload = document.getElementById('fileUpload');
    const uploadBtn = document.getElementById('uploadBtn');
    const uploadProgress = document.getElementById('uploadProgress');
    
    uploadBtn.addEventListener('click', () => {
        const user = auth.currentUser;
        
        if (!user) {
            alert('Please sign in to upload documents');
            return;
        }
        
        const file = fileUpload.files[0];
        if (!file) {
            alert('Please select a file to upload');
            return;
        }
        
        // Create progress bar
        uploadProgress.innerHTML = '<div class="progress" style="width: 0%"></div>';
        const progressBar = uploadProgress.querySelector('.progress');
        
        // Create a storage reference
        const storageRef = storage.ref(`documents/${user.uid}/${file.name}`);
        
        // Upload file
        const uploadTask = storageRef.put(file);
        
        // Update progress bar
        uploadTask.on('state_changed', 
            snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                progressBar.style.width = progress + '%';
            },
            error => {
                console.error('Upload Error:', error);
                alert(`Upload failed: ${error.message}`);
            },
            () => {
                // Upload completed successfully
                uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                    // Save document reference to Firestore
                    documentsRef.add({
                        name: file.name,
                        type: file.type,
                        size: file.size,
                        url: downloadURL,
                        userId: user.uid,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp()
                    })
                    .then(() => {
                        alert('File uploaded successfully!');
                        fileUpload.value = '';
                        uploadProgress.innerHTML = '';
                        loadDocuments(user.uid);
                    })
                    .catch(error => {
                        console.error('Firestore Error:', error);
                        alert(`Error saving document reference: ${error.message}`);
                    });
                });
            }
        );
    });
});

// View document
function viewDocument(url) {
    window.open(url, '_blank');
}

// Download document
function downloadDocument(url, filename) {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Delete document
function deleteDocument(docId) {
    if (!confirm('Are you sure you want to delete this document?')) {
        return;
    }
    
    const user = auth.currentUser;
    if (!user) {
        alert('Please sign in to delete documents');
        return;
    }
    
    documentsRef.doc(docId).get()
        .then(doc => {
            if (!doc.exists) {
                alert('Document not found');
                return;
            }
            
            const data = doc.data();
            if (data.userId !== user.uid) {
                alert('You do not have permission to delete this document');
                return;
            }
            
            // Delete from Storage
            const fileRef = storage.refFromURL(data.url);
            fileRef.delete()
                .then(() => {
                    // Delete from Firestore
                    documentsRef.doc(docId).delete()
                        .then(() => {
                            alert('Document deleted successfully');
                            loadDocuments(user.uid);
                        })
                        .catch(error => {
                            console.error('Error deleting document reference:', error);
                            alert(`Error deleting document reference: ${error.message}`);
                        });
                })
                .catch(error => {
                    console.error('Error deleting file:', error);
                    alert(`Error deleting file: ${error.message}`);
                });
        })
        .catch(error => {
            console.error('Error getting document:', error);
            alert(`Error getting document: ${error.message}`);
        });
}
