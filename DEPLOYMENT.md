# Quick Deployment Checklist

## Before pushing to GitHub
- [ ] `.env` files are NOT present (only `.env.example`)
- [ ] `node_modules/` is not committed
- [ ] `dist/` is not committed
- [ ] Changed MongoDB Atlas password (old one was exposed)
- [ ] Generated new strong JWT secret

## Generate a strong JWT secret
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## Deployment order
1. MongoDB Atlas → create cluster, get connection string
2. Render → deploy backend, set env vars, run seed
3. Vercel → deploy frontend, set VITE_API_URL
4. Update FRONTEND_URL in Render with your Vercel URL
5. Test: health check, admin login, contact form

## Admin login
Default credentials are set via environment variables in Render.
Login URL: `https://your-vercel-app.vercel.app/admin/login`
