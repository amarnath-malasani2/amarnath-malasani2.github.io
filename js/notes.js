// Notes functionality
function loadNotes(userId) {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '<p>Loading notes...</p>';
    
    // Get notes for current user
    notesRef.where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .get()
        .then(querySnapshot => {
            if (querySnapshot.empty) {
                notesList.innerHTML = '<p>No notes found. Create your first note!</p>';
                return;
            }
            
            notesList.innerHTML = '';
            querySnapshot.forEach(doc => {
                const noteData = doc.data();
                const noteDiv = document.createElement('div');
                noteDiv.className = 'note-card';
                noteDiv.innerHTML = `
                    <h3>${noteData.title}</h3>
                    <p>${noteData.content}</p>
                    <small>Created: ${noteData.createdAt ? new Date(noteData.createdAt.toDate()).toLocaleString() : 'Just now'}</small>
                    <div class="note-actions">
                        <button onclick="editNote('${doc.id}', '${noteData.title}', '${noteData.content}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteNote('${doc.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                notesList.appendChild(noteDiv);
            });
        })
        .catch(error => {
            console.error('Error loading notes:', error);
            notesList.innerHTML = '<p>Error loading notes. Please try again.</p>';
        });
}

// Set up note creation
document.addEventListener('DOMContentLoaded', () => {
    const noteTitle = document.getElementById('noteTitle');
    const noteContent = document.getElementById('noteContent');
    const saveNote = document.getElementById('saveNote');
    
    let currentNoteId = null;
    
    saveNote.addEventListener('click', () => {
        const user = auth.currentUser;
        
        if (!user) {
            alert('Please sign in to save notes');
            return;
        }
        
        const title = noteTitle.value.trim();
        const content = noteContent.value.trim();
        
        if (!title || !content) {
            alert('Please enter both title and content');
            return;
        }
        
        if (currentNoteId) {
            // Update existing note
            notesRef.doc(currentNoteId).update({
                title: title,
                content: content,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                alert('Note updated successfully!');
                noteTitle.value = '';
                noteContent.value = '';
                currentNoteId = null;
                saveNote.textContent = 'Save Note';
                loadNotes(user.uid);
            })
            .catch(error => {
                console.error('Error updating note:', error);
                alert(`Error updating note: ${error.message}`);
            });
        } else {
            // Create new note
            notesRef.add({
                title: title,
                content: content,
                userId: user.uid,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                alert('Note saved successfully!');
                noteTitle.value = '';
                noteContent.value = '';
                loadNotes(user.uid);
            })
            .catch(error => {
                console.error('Error saving note:', error);
                alert(`Error saving note: ${error.message}`);
            });
        }
    });
    
    // Edit note
    window.editNote = function(id, title, content) {
        currentNoteId = id;
        noteTitle.value = title;
        noteContent.value = content;
        saveNote.textContent = 'Update Note';
        // Scroll to the note form
        document.querySelector('.new-note').scrollIntoView({ behavior: 'smooth' });
    };
    
    // Delete note
    window.deleteNote = function(id) {
        if (!confirm('Are you sure you want to delete this note?')) {
            return;
        }
        
        const user = auth.currentUser;
        if (!user) {
            alert('Please sign in to delete notes');
            return;
        }
        
        notesRef.doc(id).get()
            .then(doc => {
                if (!doc.exists) {
                    alert('Note not found');
                    return;
                }
                
                const data = doc.data();
                if (data.userId !== user.uid) {
                    alert('You do not have permission to delete this note');
                    return;
                }
                
                notesRef.doc(id).delete()
                    .then(() => {
                        alert('Note deleted successfully');
                        
                        // If currently editing this note, clear the form
                        if (currentNoteId === id) {
                            noteTitle.value = '';
                            noteContent.value = '';
                            currentNoteId = null;
                            saveNote.textContent = 'Save Note';
                        }
                        
                        loadNotes(user.uid);
                    })
                    .catch(error => {
                        console.error('Error deleting note:', error);
                        alert(`Error deleting note: ${error.message}`);
                    });
            })
            .catch(error => {
                console.error('Error getting note:', error);
                alert(`Error getting note: ${error.message}`);
            });
    };
});
