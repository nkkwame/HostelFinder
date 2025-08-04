# 🔒 Security Guidelines

## ⚠️ Important Security Notice

This repository contains template files with placeholder credentials. **Never commit actual credentials to version control.**

## 🚨 Protected Files

The following files contain sensitive information and are ignored by Git:

- `backend/.env` - Production environment variables
- `backend/.env.local` - Local development overrides
- `backend/.env.production` - Production-specific variables
- `backend/.env.test` - Test environment variables

## 📝 Environment Variables Setup

### 1. For Development

1. Copy `backend/.env.example` to `backend/.env`
2. Update with your local MongoDB connection:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/hostel_finder
   JWT_SECRET=your-secure-local-secret
   ```

### 2. For Production

1. Copy `backend/.env.template` to `backend/.env`
2. Replace ALL placeholder values:
   ```env
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/YOUR_DATABASE?retryWrites=true&w=majority
   JWT_SECRET=your-super-secure-production-secret
   ```

## 🔑 MongoDB Atlas Security

### Create Secure Credentials
1. Use strong, unique passwords
2. Create database-specific users
3. Grant minimal required permissions
4. Enable IP whitelisting

### Connection String Format
```
mongodb+srv://<username>:<password>@<cluster>.<region>.mongodb.net/<database>?retryWrites=true&w=majority
```

**Replace:**
- `<username>` - Your MongoDB Atlas username
- `<password>` - Your MongoDB Atlas password  
- `<cluster>` - Your cluster name
- `<region>` - Your cluster region
- `<database>` - Your database name

## 🛡️ Best Practices

### 1. Environment Variables
- ✅ Use environment variables for all secrets
- ✅ Keep `.env` files out of version control
- ✅ Use different credentials for dev/staging/production
- ❌ Never hardcode credentials in source code

### 2. Database Security
- ✅ Use strong, unique passwords
- ✅ Enable IP whitelisting
- ✅ Use database-specific users
- ✅ Regularly rotate credentials
- ❌ Don't use default usernames/passwords

### 3. JWT Secrets
- ✅ Use long, random strings (32+ characters)
- ✅ Use different secrets for each environment
- ✅ Store securely in environment variables
- ❌ Don't reuse secrets across projects

## 🚀 Deployment Security

### Vercel
1. Add environment variables in Vercel dashboard
2. Never commit `.env` files
3. Use Vercel's environment variable encryption

### Netlify
1. Set environment variables in site settings
2. Use different values for preview/production
3. Enable deploy previews with limited access

### Other Platforms
- Always use the platform's environment variable system
- Never include credentials in build commands
- Use secure file upload for certificates

## 🔍 Security Checklist

Before deploying:

- [ ] All `.env` files are in `.gitignore`
- [ ] No hardcoded credentials in source code
- [ ] Strong, unique passwords for all services
- [ ] Database IP whitelisting configured
- [ ] Environment variables set in hosting platform
- [ ] Different credentials for dev/staging/production
- [ ] JWT secrets are random and secure

## 📞 Security Issues

If you discover a security vulnerability:

1. **Do NOT** open a public issue
2. Contact the repository maintainer privately
3. Include details about the vulnerability
4. Allow time for fix before public disclosure

## 🔄 Credential Rotation

Regularly rotate:
- Database passwords (monthly)
- JWT secrets (quarterly)
- API keys (as needed)
- Service account credentials (quarterly)

Remember: Security is everyone's responsibility! 🛡️
