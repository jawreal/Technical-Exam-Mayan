# Task Management App

A fullstack task management application built as a take-home technical exam. It supports creating, tracking, and organizing tasks through a clean, card-based interface backed by a type-safe REST API.

**Live demo:** [https://technical-exam-mayan.onrender.com]

> **Note:** The demo is hosted on Render's free tier. The initial request may take 2–3 minutes to load as the server spins up from an idle state, and subsequent responses may feel slightly delayed due to free-tier resource limits.

---

## Tech Stack

**Client**
- Vite
- React
- TypeScript
- Tailwind CSS
- TanStack Query
- shadcn/ui

**Server**
- Node.js
- Express.js
- TypeScript
- Drizzle ORM
- PostgreSQL

---

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- A PostgreSQL database (local or hosted)

### Installation

Clone the repository, then install dependencies from the project root. This installs dependencies for both the client and server:

```bash
npm install
```

Alternatively, each workspace can be installed independently:

```bash
# Client
cd client
npm install

# Server
cd server
npm install
```

> **Note:** Some client dependencies (Vite, React, TypeScript, Tailwind CSS) are on slightly older versions. You may see peer dependency warnings during installation — these are expected and do not affect functionality.

---

## Environment Variables

Create a `.env` file inside the `server` directory with the following variables:

```env
PORT=your_server_port
DATABASE_URL=your_postgresql_connection_string
```

| Variable       | Description                                      |
|----------------|---------------------------------------------------|
| `PORT`         | Port the Express server will run on               |
| `DATABASE_URL` | Connection string for your PostgreSQL database     |

---

## Database Setup (Drizzle ORM)

Ensure `DATABASE_URL` is set in your `.env` file before running any of the commands below. All commands should be run from the `server` directory.

1. Generate migration files:

   ```bash
   npx drizzle-kit generate --name initial_setup
   ```

   The `--name` flag is optional. If omitted, Drizzle will assign a default name. Spaces are not allowed in migration names — use underscores instead.

2. Apply the migration to your database:

   ```bash
   npx drizzle-kit migrate
   ```

---

## Running the Project

### From the Project Root (recommended)

The root `package.json` provides convenience scripts that orchestrate both the client and server:

| Command          | Description                                                                 |
|-------------------|-------------------------------------------------------------------------------|
| `npm run client`  | Start the client in development mode                                          |
| `npm run server`  | Start the server in development mode                                          |
| `npm run preview` | Run the client and server dev servers concurrently (via `concurrently`)       |
| `npm run build`   | Install dependencies and build both the client and server for production     |
| `npm start`       | Start the server in production mode                                          |

> **Note:** `npm run preview` here runs both dev servers side by side for local development — it is not a production preview of the built client (that's handled separately via Vite, see below).

For day-to-day development, running `npm run client` and `npm run server` in two separate terminals (or `npm run preview` in one) is usually the fastest workflow.

### Manual / Per-Workspace Commands

If you'd rather run each workspace independently:

**Server** (from the `server` directory):

| Command              | Description                                  |
|----------------------|-----------------------------------------------|
| `npm run dev`        | Start the server in development mode          |
| `npm run type-check` | Run TypeScript type checking                   |
| `npm run build`      | Compile TypeScript to JavaScript               |
| `npm run start`      | Run the compiled production build              |

**Client** (from the `client` directory):

| Command           | Description                                 |
|-------------------|-----------------------------------------------|
| `npm run dev`     | Start the client in development mode           |
| `npm run build`   | Build the client for production                |
| `npm run preview` | Preview the production build locally (Vite's built-in preview server) |

### Connecting Client and Server (Development)

The client proxies API requests to the server during development. In `client/vite.config.ts`, update the proxy target to match your server's port:

```ts
server: {
  proxy: {
    "/api": {
      // Update this to match your server's PORT
      target: "http://localhost:3000",
      changeOrigin: true,
    },
  },
},
```

For example, if your server runs on `localhost:5000`, update the `target` accordingly so API requests resolve correctly.

---

## Deployment

From the project root, build both the client and server for production:

```bash
npm run build
```

This installs dependencies and produces production builds for both workspaces.

Then start the server:

```bash
npm start
```

The Express server runs in production mode and also serves the client's static production build.

---

## Development Notes

This project was originally developed on an Android device using Termux, which is why a few client dependencies are pinned to slightly older versions (see the note in the Installation section above).

## License

This project was developed for evaluation purposes as part of a technical assessment.