# Email Sender Backend API

Backend service for handling contact form submissions and sending emails.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file with your email configuration:
   ```env
   EMAIL_USER=your-email@domain.com
   EMAIL_PASS=your-password-or-app-password
   SMTP_HOST=your-smtp-host
   SMTP_PORT=587
   SMTP_SECURE=false
   FRONTEND_URL=https://your-frontend-domain.com
   PORT=3000
   ```

3. Start the server:
   ```bash
   npm start
   ```

## Deployment Options

### 1. Heroku
```bash
git init
git add .
git commit -m "Initial commit"
heroku create your-app-name
git push heroku main
```

### 2. Vercel
```bash
npm install -g vercel
vercel --prod
```

### 3. Railway
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

## Environment Variables

Set these environment variables in your hosting platform:
- `EMAIL_USER`: Your email address
- `EMAIL_PASS`: Your email password or app password
- `SMTP_HOST`: Your SMTP server
- `SMTP_PORT`: SMTP port (usually 587)
- `SMTP_SECURE`: true for 465, false for other ports
- `FRONTEND_URL`: Your frontend domain for CORS

## API Endpoints

### POST /send-email
Send a contact form email.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com", 
  "subject": "Contact Form",
  "message": "Hello, this is a test message"
}
```

**Response:**
```json
{
  "message": "Message sent successfully!"
}
```