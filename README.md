# Custom Press-On Nail E-commerce Platform

This repository contains the codebase for a user-focused e-commerce platform for selling hand-made, reusable press-on nails. The project enables customers to purchase pre-made sets, subscribe to exclusive collections, and design custom sets using a drag-and-drop interface.

## Project Structure

Project folder layout:

- `frontend` — Next.js app for the user interface and nail designer  
- `backend` — Node.js API for orders, designs, subscriptions, and auth  
- `README.md` — This file  

## Features (Planned)

- Artistic and reusable nail designs  
- Public product catalog with sizing kit available to guests  
- Member-exclusive designs and customizable sets  
- Drag-and-drop interface to mix and match nail designs  
- Subscription tiers with exclusive benefits and discounts  
- Size-inclusive, length-diverse, and gender-neutral support  

## Tech Stack

- **Frontend**: Next.js, TailwindCSS, React DnD  
- **Backend**: Node.js with Express or tRPC, Supabase (DB + Storage)  
- **Authentication**: Clerk.dev or Supabase Auth  
- **Payments**: Stripe  
- **Hosting**: Vercel (frontend), Railway (backend)  

## Setup Instructions

1. Clone the repository and initialize each part of the monorepo:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO

# Frontend setup
cd frontend
npm install

# Backend setup
cd ../backend
npm install
```

2. Configure `.env` files for both frontend and backend using sample templates (to be added).  

## Documentation

Refer to the `SPEC-1-nail-platform.adoc` file for system architecture, requirements, database schema, implementation plan, and milestones.

## License

This project is licensed under proprietary licensing.
