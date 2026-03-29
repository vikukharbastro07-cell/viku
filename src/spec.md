# Viku Kharb Astro

## Current State
Admin panel at /admin has a login screen (email+password). The Create Account button calls `adminCreateVisitorId` which requires admin credentials passed from the frontend. Visitor account creation has been failing persistently.

## Requested Changes (Diff)

### Add
- New backend functions with no credential check: `openCreateVisitorId`, `openListVisitorIds`, `openDeleteVisitorId`
- Admin panel opens directly with no login screen

### Modify
- AdminPage.tsx: Remove login screen entirely, show dashboard directly at /admin
- Create Account button now calls `openCreateVisitorId` (no credentials needed)
- List and delete also use open functions
- Visitor Accounts tab is shown first (default)

### Remove
- Login screen from AdminPage
- Credential passing from Create Account form

## Implementation Plan
1. Add open functions to main.mo (no auth check)
2. Add type declarations to backend.d.ts
3. Rewrite AdminPage.tsx with no login, direct dashboard
4. Visitor login page unchanged - visitors still log in with email+password
