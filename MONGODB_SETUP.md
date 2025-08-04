# MongoDB Atlas Setup Guide for UCC HostelFinder

## 🚀 Quick Setup Steps

### 1. Create MongoDB Atlas Account
1. Go to https://cloud.mongodb.com/
2. Click "Start Free" or "Sign Up"
3. Use your email to create account
4. Verify your email address

### 2. Create New Project
1. Click "New Project" 
2. Name: "UCC-HostelFinder"
3. Click "Next" → "Create Project"

### 3. Build Database Cluster
1. Click "Build a Database"
2. Choose "M0 Sandbox" (FREE)
3. Cloud Provider: AWS
4. Region: "Ireland (eu-west-1)" (closest to Ghana)
5. Cluster Name: "HostelFinder-Cluster"
6. Click "Create Cluster"

### 4. Create Database User
1. Go to "Security" → "Database Access"
2. Click "Add New Database User"
3. Authentication Method: Password
4. Username: `your_username` (choose a secure username)
5. Password: Generate secure password (save this!)
6. Database User Privileges: "Atlas admin"
7. Click "Add User"

### 5. Configure Network Access
1. Go to "Security" → "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Comment: "Development Access"
5. Click "Confirm"

### 6. Get Connection String
1. Go to "Deployment" → "Database"
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Driver: Node.js, Version: 5.5 or later
5. Copy the connection string
6. Replace `<password>` with your database user password

Your connection string will look like:
```
mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/?retryWrites=true&w=majority
```

## 🔧 Next Steps
1. Update backend/.env with your connection string
2. Seed the database with sample hostel data
3. Test the connection
