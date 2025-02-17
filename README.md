# Next.js Starter

This project is a comprehensive Next.js starter, meticulously crafted with an opinionated tech stack to provide a solid foundation for building modern, scalable, and maintainable web applications. It combines the power of Next.js with essential tools and libraries, streamlining your development workflow and enabling you to focus on building features that matter.

## Tech Stack

- **Next.js**: A React framework for production.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **Drizzle ORM**: TypeScript-first ORM with PostgreSQL support
- **PostgreSQL**: Robust relational database system
- **Zod**: Type-safe environment validation and schema definition
- **ESLint**: A tool for identifying and fixing problems in JavaScript code.
- **shadcn/ui**: A component library for building user interfaces with consistent design and functionality.
- **better-auth**: A library for simplified and secure authentication.

## Features

- **Rapid Development:** Leverages Next.js's features like Fast Refresh and Turbopack for an optimized development experience.
- **Database Integration:** Preconfigured with Drizzle ORM for seamless database interactions, including schema management and migrations.
- **Type Safety:** Utilizes TypeScript and Zod for enhanced type safety throughout the application, reducing runtime errors.
- **Styling:** Integrates Tailwind CSS and PostCSS for efficient and customizable styling.
- **Linting:** Includes ESLint for code quality and consistency.
- **UI Components:** Comes with `shadcn/ui` for readily available, well-designed UI components.
- **Environment Variable Management:** Uses dotenv, dotenv-expand, and Zod for type-safe environment variable validation.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (LTS version recommended)
- Bun (for package management)
- PostgreSQL (database)

## Installation

1.  **Clone the repository:**

    ```bash
    git clone [repository-url]
    cd next-starter
    ```

2.  **Install dependencies:**

    ```bash
    bun install
    ```

## Database Setup

1.  **Create a `.env` file:**

    Copy the `.env.example` file to a new file named `.env`:

    ```bash
    cp .env.example .env
    ```

2.  **Configure environment variables:**

    Edit the `.env` file, setting your database connection details. You can either set the `DATABASE_URL` directly, or use the individual environment variables:

    ```
    DB_HOST=localhost
    DB_USER=postgres
    DB_PASSWORD=postgres
    DB_NAME=blog
    DB_PORT=5432
    DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}
    ```

    Replace the placeholder values with your actual database credentials. The `DATABASE_URL` is constructed from the other variables.

3.  **Define your database schema:**

    Modify `src/server/db/schema/index.ts` to define your database schema using Drizzle ORM.

4.  **Generate migrations:**

    ```bash
    bun run generate
    ```

5.  **Run migrations:**

    ```bash
    bun run db:migrate
    ```

## Authentication

This project uses the `better-auth` library for authentication, providing both client-side and server-side utilities.

1.  **Environment Variables:** Set `BETTER_AUTH_URL` (your app's base URL) and `BETTER_AUTH_SECRET` (a secret key) in your `.env` file.

2.  **Database Schema:** The authentication schema is in `src/server/db/schema/auth-schema.ts`. Run migrations after setting up your database.

3.  **Client-Side:** `src/lib/auth-client.ts` exports `signIn`, `signUp`, and `useSession` from `better-auth/react` for use in your components.

4.  **Server-Side:** `src/server/auth.ts` configures server-side authentication with `better-auth` and `drizzleAdapter`, connecting to the PostgreSQL database.

5.  **API Routes:** `src/app/api/auth/[...all]/route.ts` handles authentication API requests using `better-auth/next-js`.

## Usage

### Development Server

To start the development server with Turbopack enabled for faster builds, run:

```bash
bun run dev
```

### Building for Production

To build the project for production, use:

```bash
bun run build
```

### Starting the Production Server

To start the production server, execute:

```bash
bun run start
```

### Linting

To lint the codebase, run:

```bash
bun run lint
```

## License

This project is licensed under the MIT License.
