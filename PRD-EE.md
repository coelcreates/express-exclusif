# Product Requirements Document (PRD)

## 1. Product Overview
An e-commerce platform for customizable, hand-made press-on nails. Users can design their own sets, subscribe for exclusive styles, and participate in an artistic beauty experience.

## 2. Goals
- Allow users to browse and purchase reusable nail sets
- Offer custom design submissions and drag-and-drop set builder
- Provide tiered memberships for recurring revenue and exclusive benefits

## 3. Target Users
- Beauty-forward individuals, femmes aged 18–40
- Beauty professionals and stylists
- People with small/wide fingers, short/extra-long nail preferences
- Users who value self-expression and convenience

## 4. Features

### Must-Have
- Product catalog (nails by shape, style, length)
- User authentication and dashboard
- Purchase flow with Stripe checkout
- Size kit for first-time buyers
- Custom nail designer (drag-and-drop UI)
- Subscription tiers: Basic, Club, Exclusif

### Nice-to-Have
- User reviews and community gallery
- Wishlists and design sharing
- AR/3D preview of nail sets

## 5. User Flows
- Guest → Trial kit → Signup → Member-only access
- Member → Drag and drop set → Submit → Purchase
- Pro user → Bulk buy curated designs → Invoice

## 6. Success Metrics
- Conversion rate from guest to member
- Subscription retention and MRR
- Custom set submissions per user
- Average order value (AOV)

## 7. Constraints
- Budget-conscious stack (Supabase, Railway, Vercel)
- North America only (for now)
- No native mobile app at MVP stage
