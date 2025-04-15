# Blogify Next.js  

Blogify is a modern blogging platform built with Next.js, designed to provide a seamless experience for creating, managing, and sharing blog posts.  

## Live Demo  

The project is live and accessible at [Blogify Pro](https://blogify-pro.vercel.app).  

## Routes  

- `/` - The homepage displaying a list of all published blogs.  
- `/login` - The login page for user authentication.  
- `/register` - The registration page for new users.  
- `/profile` - The user profile page to view and manage personal information.  
- `/blog/create` - The page for creating new blog posts.  
- `/blog/read/[slug]` - The dynamic route to view individual blog posts.
- `/blog/liked` - The route to view liked blogs.
- `/blog/myblog` - The route to view own blogs.

- `/edit/[id]` - The dynamic route for editing a user's blog post (future development).  
- `/share/[id]` - The dynamic route for sharing a blog post (future development). 

## Current Features  

- **User Authentication**: Secure login and registration system.  
- **Create Blog Posts**: Users can create and publish their own blog posts.  
- **View Blogs**: Browse and read blogs created by other users.
- **Like Blogs**: User will able to like any blog.   
- **Responsive Design**: Fully responsive UI for a great experience on all devices.  

## Features Under Development  

### 1. Share Feature  
The share feature will allow users to share blog posts directly to social media platforms or via a shareable link.  
- **Implementation Plan**:  
    - Integrate social media APIs (e.g., Facebook, Twitter, etc.).  
    - Add a share button to each blog post.  
    - Generate unique shareable links for each post.  

### 2. Profile Editing  
Users will be able to edit their profile information, such as username, bio, and profile picture.  
- **Implementation Plan**:  
    - Create a profile editing page.  
    - Implement file upload functionality for profile pictures.  
    - Update the backend to handle profile updates securely.  

### 3. Blog Edit Feature (Future Development)  
Users will have the ability to edit their previously published blog posts.  
- **Implementation Plan**:  
    - Add an "Edit" button to each user's blog posts.  
    - Create a blog editing interface pre-filled with the existing content.  
    - Update the backend to handle blog post updates.  

## Getting Started  

To run this project locally:  

1. Clone the repository:  
     ```bash  
     git clone https://github.com/sayamghosh/blogify-nextjs.git 
     ```  

2. Install dependencies:  
     ```bash  
     npm install  
     ```  

3. Start the development server:  
     ```bash  
     npm run dev  
     ```  

4. Open your browser and navigate to `http://localhost:3000`.  

## Contributing  

Contributions are welcome! Feel free to open issues or submit pull requests to improve the project.  

## License  

This project is licensed under the MIT License.   
