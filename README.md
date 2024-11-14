# 📄 Chat-PDF: AI-Powered Chat Application with PDF Integration

## 🚀 Overview
**Chat-PDF** is a feature-rich chat application that combines traditional messaging with AI capabilities, enabling users to upload PDFs and receive context-aware responses. Leveraging the power of the OpenAI API, this application delivers intelligent conversations based on the content of uploaded documents. Built with modern technologies like **Next.js**, **React**, **TypeScript**, and **Tailwind CSS**, it provides a seamless and interactive user experience.

## 🛠️ Tech Stack
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Authentication**: Clerk
- **Database**: PostgreSQL (via Drizzle ORM), optimized for serverless with Neon
- **Storage & Services**: AWS S3, AWS SDK
- **AI & Embeddings**: OpenAI API, Pinecone

---

## 📁 Project Structure

```
├── app
│   ├── api
│   │   ├── chat
│   │   │   └── route.ts            # Handles AI-powered chat responses
│   │   ├── create-chat
│   │   │   └── route.ts            # Creates new chat sessions
│   │   ├── delete
│   │   │   └── route.ts            # Deletes chat sessions or messages
│   │   ├── get-messages
│   │   │   └── route.ts            # Retrieves chat messages
│   │   └── razorpay
│   │       └── route.ts            # Manages payment processing with Razorpay
│   ├── chat
│   │   └── [chatId]
│   │       └── page.tsx            # Dynamic chat page based on chat ID
│   ├── sign-in
│   │   └── [[...sign-in]]
│   │       └── page.tsx            # User sign-in page
│   ├── sign-up
│   │   └── [[...sign-up]]
│   │       └── page.tsx            # User sign-up page
│   ├── layout.tsx                  # Global layout configuration
│   ├── page.tsx                    # Landing page
│   ├── favicon.ico
│   └── globals.css                 # Global styles
├── components
│   ├── ChatComponent.tsx           # Main chat interface
│   ├── ChatSideBar.tsx             # Sidebar for chat navigation
│   ├── FileUpload.tsx              # PDF file upload component
│   ├── MessageList.tsx             # Renders list of chat messages
│   ├── PDFViewer.tsx               # In-browser PDF viewing
│   ├── Providers.tsx               # Context providers for the app
│   ├── UserGuide.tsx               # User guide and tips
│   └── ui                          # Custom UI components
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── toaster.tsx
│       ├── toast.tsx
│       └── use-toast.ts
├── lib
│   ├── context.ts                  # Context management for global states
│   ├── db
│   │   ├── index.ts                # Database connection setup
│   │   └── schema.ts               # Database schema definitions
│   ├── embeddings.ts               # Pinecone vector embeddings logic
│   ├── pinecone.ts                 # Pinecone client initialization
│   ├── razorpay.ts                 # Razorpay integration
│   ├── s3.ts                       # AWS S3 file upload & management
│   ├── s3-server.ts                # Server-side S3 operations
│   ├── tokenCleanUp.ts             # Utility for token management
│   ├── tokenVerify.ts              # Token verification logic
│   └── utils.ts                    # Helper functions
└── middleware.ts                   # Middleware for authentication and API validation
```

---

## ✨ Key Features

- **AI-Powered Chat**: Engage in conversations powered by the OpenAI API, tailored to the content of uploaded PDFs.
- **PDF Upload & Analysis**: Seamlessly upload PDF documents and get AI-driven responses based on the document's content.
- **Real-Time Chat Interface**: A dynamic and responsive chat interface built with React and Tailwind CSS.
- **User Authentication & Management**: Secure sign-up and sign-in functionalities powered by Clerk.
- **Serverless Database**: Efficient data management using PostgreSQL with Drizzle ORM, optimized for serverless deployments on Neon.
- **Cloud Storage**: Reliable file storage solutions using AWS S3.
---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Chat-PDF.git
cd Chat-PDF
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api
CLERK_API_KEY=your_clerk_api_key
DATABASE_URL=your_database_url
OPENAI_API_KEY=your_openai_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENV=your_pinecone_env
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### 4. Run the Application

```bash
npm run dev
```

The application will be accessible at **http://localhost:3000**.

---

## 🌐 API Endpoints

| Method | Endpoint                   | Description                        |
|--------|----------------------------|------------------------------------|
| POST   | `/api/chat`               | Get AI-powered chat response       |
| POST   | `/api/create-chat`        | Create a new chat session          |
| DELETE | `/api/delete`             | Delete chat or specific messages   |
| GET    | `/api/get-messages`       | Retrieve chat messages by ID       |
| POST   | `/api/razorpay`           | Handle Razorpay payment processing |

---

## 📖 Usage Guide

1. **Sign Up / Sign In**: Create an account or log in using the Clerk-powered authentication system.
2. **Upload PDF**: Navigate to the chat interface and upload a PDF file.
3. **Chat with AI**: Engage in conversations with the AI that references your uploaded document for contextual responses.
4. **Save and Manage Chats**: Access previous chat sessions from the sidebar for easy navigation.

---

## 🖼️ Screenshots
![Screenshot from 2024-11-14 09-32-00](https://github.com/user-attachments/assets/f6133c17-e868-4172-9f4a-54feb8ee8436)
![Screenshot from 2024-11-14 09-32-31](https://github.com/user-attachments/assets/6888e801-9fcd-4147-bb2e-113ad7093daf)
![Screenshot from 2024-11-14 09-32-51](https://github.com/user-attachments/assets/6198920d-f944-4d3b-acb4-8b35776f199c)
![Screenshot from 2024-11-14 09-34-34](https://github.com/user-attachments/assets/cf5960e9-8825-427c-87bb-b9d3f6d9ff90)
![Screenshot from 2024-11-14 09-35-50](https://github.com/user-attachments/assets/e6efbdde-6772-4ced-b28f-cfda0744998a)

---

## 🤝 Contribution

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

---
