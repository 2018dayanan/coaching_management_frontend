# Shubha Margha Admin Panel

A comprehensive coaching and education management system built with React, TypeScript, and Vite. This platform provides a robust administrative interface for managing students, teachers, classes, batches, and academic performance.

## Features

### Multi-Role Support
- **Admin Dashboard**: Full control over users, teachers, classes, and system settings.
- **Teacher Portal**: Manage batches, schedule classes, and track student progress.
- **Student Portal**: Access courses, academic details, tasks, and notifications.

### Management Modules
- **User Management**: Comprehensive CRUD operations for all platform users.
- **Class Scheduling**: Plan and coordinate live instructional sessions.
- **Batch Management**: Organize students into specific learning groups.
- **Academic Tracking**: Detailed monitoring of student performance and attendance.
- **Profile & Security**: Personalized profiles with robust security and settings management.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS 4, Framer Motion (Animations), Lucide React (Icons)
- **State Management**: Zustand, React Query (TanStack Query)
- **Forms**: React Hook Form, Zod/Hookform Resolvers
- **UI Components**: Radix UI (Primitives), Shadcn UI components
- **API Handling**: Axios with custom interceptors
- **Notifications**: Sonner

## Project Structure

```text
src/
├── api/            # API service definitions (Axios)
├── components/     # Reusable UI components & DataTables
├── hooks/          # Custom React hooks (Data fetching, Modals)
├── layouts/        # Page layout structures
├── pages/          # Role-based page views (Admin, Teacher, Student)
├── providers/      # Context providers (Auth, Theme)
├── lib/            # Utility functions
└── types/          # TypeScript definitions
```

## Getting Started

### Prerequisites
- Node.js >= 22.12.0
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Development
Run the development server:
```bash
npm run dev
```

### Build
Generate a production-ready build:
```bash
npm run build
```

## Deployment
This project is configured for deployment via **Coolify/Nixpacks**.
- **Required Node Version**: 22.12.0 or higher.
- Ensure `NIXPACKS_NODE_VERSION` environment variable is set correctly in your deployment settings.

## License
Private project. All rights reserved.
