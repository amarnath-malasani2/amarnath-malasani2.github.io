// Authentication functionality
document.addEventListener('DOMContentLoaded', () => {
    const authSection = document.getElementById('auth-section');
    const signInBtn = document.getElementById('signInBtn');
    const signUpBtn = document.getElementById('signUpBtn');
    const authForm = document.getElementById('auth-form');
    const authSubmitBtn = document.getElementById('authSubmitBtn');
    const documentManager = document.getElementById('document-manager');
    const notesContainer = document.getElementById('notes-container');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    let authMode = 'signin'; // 'signin' or 'signup'
    
    // Check if user is already signed in
    auth.onAuthStateChanged(user => {
        if (user) {
            // User is signed in
            authSection.innerHTML = `<h3>Welcome ${user.email}</h3>
                                    <button id="signOutBtn" class="btn">Sign Out</button>`;
            documentManager.classList.remove('hidden');
            notesContainer.classList.remove('hidden');
            
            // Add sign out functionality
            document.getElementById('signOutBtn').addEventListener('click', () => {
                auth.signOut().then(() => {
                    window.location.reload();
                }).catch(error => {
                    console.error('Sign Out Error:', error);
                });
            });
            
            // Load user's documents and notes
            loadDocuments(user.uid);
            loadNotes(user.uid);
        }
    });
    
    signInBtn.addEventListener('click', () => {
        authMode = 'signin';
        authForm.classList.remove('hidden');
        authSubmitBtn.textContent = 'Sign In';
    });
    
    signUpBtn.addEventListener('click', () => {
        authMode = 'signup';
        authForm.classList.remove('hidden');
        authSubmitBtn.textContent = 'Sign Up';
    });
    
    authSubmitBtn.addEventListener('click', () => {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        if (!email || !password) {
            alert('Please enter both email and password');
            return;
        }
        
        if (authMode === 'signin') {
            // Sign in with email and password
            auth.signInWithEmailAndPassword(email, password)
                .catch(error => {
                    console.error('Sign In Error:', error);
                    alert(`Sign in failed: ${error.message}`);
                });
        } else {
            // Create user with email and password
            auth.createUserWithEmailAndPassword(email, password)
                .catch(error => {
                    console.error('Sign Up Error:', error);
                    alert(`Sign up failed: ${error.message}`);
                });
        }
    });
});
