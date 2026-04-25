require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Service = require('../models/Service');
const Portfolio = require('../models/Portfolio');
const Blog = require('../models/Blog');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const adminName = process.env.ADMIN_NAME || 'Platform Admin';
    const adminUsername = (process.env.ADMIN_USERNAME || 'admin').toLowerCase().trim();
    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@example.com').toLowerCase().trim();
    const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeMeNow123!';

    const existingAdmin = await User.findOne({ username: adminUsername });
    if (!existingAdmin) {
      await User.create({
        name: adminName,
        username: adminUsername,
        email: adminEmail,
        password: adminPassword,
        role: 'admin'
      });
      console.log('Admin user created from environment configuration.');
    } else {
      console.log('Admin already exists');
    }

    await Service.deleteMany({});
    await Service.insertMany([
      { title: 'Frontend Development', shortDescription: 'Modern responsive web interfaces', description: 'Pixel-perfect and high-performance interfaces using modern frontend stacks.', icon: 'globe', features: ['React / Next.js', 'Tailwind CSS', 'Performance Optimization'], order: 1 },
      { title: 'Backend API Development', shortDescription: 'Secure and scalable backend systems', description: 'Production-ready APIs, authentication, and business logic built for scale.', icon: 'code', features: ['Node.js / Express', 'JWT Auth', 'REST API Architecture'], order: 2 },
      { title: 'Database Design', shortDescription: 'Well-structured data architecture', description: 'Schema design, query optimization, and secure data modeling for reliable products.', icon: 'settings', features: ['MongoDB', 'PostgreSQL', 'Index & Query Optimization'], order: 3 },
      { title: 'Full-Stack MERN Projects', shortDescription: 'Complete product development', description: 'End-to-end development from UI to deployment for startups and businesses.', icon: 'smartphone', features: ['React + Node + MongoDB', 'Admin Dashboards', 'Cloud Deployment'], order: 4 },
      { title: 'Cloud & DevOps', shortDescription: 'Deploy and scale with confidence', description: 'CI/CD and cloud operations to keep your product stable and fast.', icon: 'cloud', features: ['AWS / Render / Vercel', 'Docker', 'Automated Deployment Pipelines'], order: 5 },
      { title: 'Maintenance & Support', shortDescription: 'Long-term product stability', description: 'Continuous updates, bug fixes, and feature improvements for growth.', icon: 'shield', features: ['Monitoring', 'Bug Fixing', 'Feature Roadmaps'], order: 6 },
    ]);
    console.log('Services seeded');

    await Portfolio.deleteMany({});
    await Portfolio.insertMany([
      { title: 'FreeCodeCamp', description: 'Open-source learning platform with full-stack JavaScript projects and curriculum.', techStack: ['Node.js', 'React', 'MongoDB'], category: 'Full Stack', githubUrl: 'https://github.com/freeCodeCamp/freeCodeCamp', imageUrl: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1200&q=80', order: 1 },
      { title: 'React', description: 'Widely-used frontend library powering modern web applications.', techStack: ['JavaScript', 'TypeScript', 'Frontend'], category: 'Frontend', githubUrl: 'https://github.com/facebook/react', imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80', order: 2 },
      { title: 'Node.js', description: 'Backend runtime for scalable APIs, services, and real-time applications.', techStack: ['Node.js', 'V8', 'Backend'], category: 'Backend', githubUrl: 'https://github.com/nodejs/node', imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=80', order: 3 },
      { title: 'Next.js', description: 'Production framework for full-stack React applications and server rendering.', techStack: ['Next.js', 'React', 'SSR'], category: 'Full Stack', githubUrl: 'https://github.com/vercel/next.js', imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80', order: 4 },
    ]);
    console.log('Portfolio seeded');

    try { await mongoose.connection.collection('blogs').drop(); } catch (e) {}
    await Blog.createIndexes();
    await Blog.insertMany([
      { title: 'How to Plan a Full-Stack Project from Idea to Deployment', slug: 'fullstack-project-plan-' + Date.now(), excerpt: 'A practical roadmap for taking a project from concept to production using a full-stack workflow.', content: 'A strong full-stack project starts with a clear problem statement, user stories, and a lean MVP scope. Begin by defining the frontend experience, map each user flow to backend endpoints, design data models early, and keep API contracts documented. Use modular architecture so features can scale without rewrites. In deployment, automate linting, tests, and build checks to keep quality high and delivery predictable.', tags: ['Full Stack', 'Architecture', 'Planning'], author: 'Muhammad Ali', isPublished: true, publishedAt: new Date() },
      { title: 'Building Secure Node.js APIs for Real Clients', slug: 'secure-nodejs-apis-' + (Date.now() + 1), excerpt: 'Security essentials every production backend should implement before launch.', content: 'Production APIs must include proper authentication, role-based authorization, rate limiting, and strict input validation. Always hash passwords with bcrypt, store secrets in environment variables, and validate all request payloads. Add logging and error monitoring so incidents are traceable. Security is not a one-time task; build it into your development lifecycle from day one.', tags: ['Node.js', 'API Security', 'Backend'], author: 'Muhammad Ali', isPublished: true, publishedAt: new Date() },
      { title: 'MERN Performance Optimization Checklist', slug: 'mern-performance-checklist-' + (Date.now() + 2), excerpt: 'High-impact steps to improve speed across React frontend and Node backend.', content: 'For React, reduce bundle size, split routes, memoize expensive UI blocks, and optimize images. For backend performance, cache expensive queries, index frequently filtered fields, and paginate large results. Use a CDN and efficient hosting configuration for static assets. Measure everything with real metrics and optimize iteratively based on bottlenecks, not assumptions.', tags: ['MERN', 'Performance', 'Optimization'], author: 'Muhammad Ali', isPublished: true, publishedAt: new Date() },
    ]);
    console.log('Blog posts seeded');

    console.log('\n✅ Seed complete!');
    console.log('Admin login: use ADMIN_USERNAME/ADMIN_EMAIL and ADMIN_PASSWORD from your environment.');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seed();