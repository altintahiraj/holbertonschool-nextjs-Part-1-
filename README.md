# Holberton School – Full Stack React (Part 1)

A full stack Q&A web application built with Next.js 15, MySQL (Workbench 8.0), and NextAuth v5.

# Overview

This project is a Questions & Answers platform where users can interact by asking questions, sharing answers, and organizing discussions through topics.

It combines both frontend and backend in a single Next.js application, making the project simple to manage while still covering full stack concepts.

Tech Stack
Next.js 15
React
NextAuth v5 (authentication)
MySQL (Workbench 8.0)
Node.js
Features
User registration and login
Create and manage topics
Ask and browse questions
Submit answers
Vote on questions and answers
Structured and easy-to-use interface
Getting Started

# Clone the repository and install dependencies:

git clone <your-repo-link>
cd qa-app
npm install

# Set up your environment variables (example):

DATABASE_URL=your_mysql_connection
NEXTAUTH_SECRET=your_secret_key

Run the development server:

npm run dev

Open http://localhost:3000
 in your browser.

# Project Structure
/app – main application routes (Next.js 15 structure)
/components – reusable UI components
/lib – database and helper functions
/api – backend logic and endpoints
How It Works
Users create an account and log in using NextAuth
Topics are used to organize questions
Users can post questions inside topics
Other users can answer and vote on content
The most useful answers can be identified through voting
QA Notes
Testing

# The application was tested manually by following the main user flows:

Registering and logging in
Creating topics and questions
Posting answers
Voting functionality
Observations
Core features work as expected
Navigation is smooth and intuitive
# Future Improvements
Add search and filtering for questions
Improve UI/UX design
Add notifications for user activity
Implement automated testing
