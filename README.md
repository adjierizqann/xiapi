# Xiapi Commerce

A modern, full-stack e-commerce experience featuring a Vite + React frontend styled with Tailwind CSS and a Node.js + Express API backed by MongoDB. The project includes JWT authentication, cart & checkout flows, admin management tools, and tasteful motion design inspired by Apple, Nike, and Shopify.

## Project structure

```
/xiapi
├── frontend/              # React + Vite storefront
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── features/      # Redux slices for cart, products, auth, wishlist
│   │   ├── pages/         # Routed pages (home, shop, product, cart, etc.)
│   │   ├── services/      # Axios API helpers
│   │   └── store/         # Redux store configuration
├── backend/               # Express REST API
│   └── src/
│       ├── controllers/   # Route handlers for products, auth, orders
│       ├── routes/        # API routes
│       ├── models/        # Mongoose schemas
│       ├── data/          # Sample JSON seed data
│       └── utils/         # Helper utilities
└── .env.example           # Environment variable template
```

## Getting started

### Prerequisites

* Node.js 18+
* npm or yarn
* MongoDB (local or hosted Atlas cluster)

### Environment variables

Duplicate `.env.example` to `.env` and adjust for your environment. Remember to set `MONGO_URI`, `JWT_SECRET`, and `STRIPE_KEY`.

### Install dependencies

```bash
cd frontend
npm install

cd ../backend
npm install
```

### Run the development servers

```bash
# Start the API
cd backend
npm run dev

# In a new terminal, start the React app
cd frontend
npm run dev
```

The frontend defaults to http://localhost:5173 and proxies API calls to http://localhost:5000/api (configurable via `VITE_API_URL`).

### Production builds

```bash
# Build the React app
cd frontend
npm run build

# Start the API in production mode
cd ../backend
npm start
```

## Key features

* Responsive Tailwind UI with glassmorphism, gradients, and framer-motion transitions
* Product catalog with search, category filters, sorting, pagination, and ratings
* Cart, wishlist, and checkout flows with live totals and Stripe test prompts
* JWT authentication for login/register plus protected profile and admin views
* Admin dashboard for catalog CRUD mockups, analytics summary, and order management placeholders
* Express REST API with Mongoose models and sample JSON seed data
* Toast notifications, dark mode toggle, and reusable UI primitives

## Deployment

* **Frontend:** Deploy the `frontend` directory to Vercel, Netlify, or GitHub Pages (using `npm run build`).
* **Backend:** Deploy the Express API to Render, Railway, or similar hosting. Set environment variables on the platform and ensure `CLIENT_URL` matches your deployed frontend origin.

## Testing the API quickly

Once the backend is running locally, test endpoints with curl or Postman:

```bash
curl http://localhost:5000/api/products
```


---

### 🤖 Built with AI Assistance

This project, **Xiapi Commerce**, was created as part of a personal learning and development exercise.  
The initial scaffolding and boilerplate were generated with the help of **OpenAI Codex / ChatGPT (GPT-5)** to accelerate setup and code structure.

All subsequent customization, styling, and integration (UI polish, deployment, and logic fixes) were manually implemented and reviewed by **Muhammad Rizqan Nur Adjie Adzani (@adjierizqann)**.

> ⚡ AI was used as a coding assistant — not as an author.  
> The goal was to learn, refine, and adapt AI-assisted code into a fully functional, educational project.

## License

This project is provided as a starter template. Adapt and extend it to fit your brand and business logic.


