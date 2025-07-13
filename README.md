# Daily Health Supplement

A Next.js-based web application for health supplement information and reviews.

## System Requirements

- [Node.js](https://nodejs.org/) 18.x or higher
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)

## Tech Stack

- [Next.js](https://nextjs.org/) v15.2.3
- [React](https://reactjs.org/) v19.0.0
- [TypeScript](https://www.typescriptlang.org/) v5.x
- [Tailwind CSS](https://tailwindcss.com/) v4.x
- [Prisma](https://www.prisma.io/) v6.5.0
- [Lucide React](https://lucide.dev/) v0.483.0

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/khadka27/daily-health-suppliment.git
   cd daily-health-suppliment
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

4. **Set up Prisma**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Starts development server using Turbopack
- `npm run build` - Creates production build
- `npm run start` - Runs production server
- `npm run lint` - Runs ESLint for code quality

## Project Structure

```
.
├── src/
│   ├── app/         # Next.js app directory
│   ├── Components/  # React components
│   └── ...         # Other source files
├── prisma/         # Prisma schema and migrations
├── public/         # Static assets
└── ...            # Config files
```

## Dependencies

### Production Dependencies

```json
{
  "@prisma/extension-accelerate": "^1.3.0",
  "lucide-react": "^0.483.0",
  "next": "15.2.3",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-icon": "^1.0.0",
  "react-icons": "^5.5.0"
}
```

### Development Dependencies

```json
{
  "@eslint/eslintrc": "^3",
  "@tailwindcss/postcss": "^4",
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "eslint": "^9",
  "eslint-config-next": "15.2.3",
  "prisma": "^6.5.0",
  "tailwindcss": "^4",
  "tsx": "^4.19.3",
  "typescript": "^5"
}
```

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
