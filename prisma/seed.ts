import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Start clean for local/dev environments
    await prisma.post.deleteMany();

    const posts = [
        {
            title: 'Getting Started with NestJS: Project Structure and Best Practices',
            content:
                'Learn how to organize a scalable NestJS application with modules, controllers, and providers. We cover environment handling, configuration, and how to structure features for growth.',
        },
        {
            title: 'Dependency Injection in NestJS Explained',
            content:
                'A deep dive into DI tokens, providers, and scopes in NestJS. Understand when to use classes vs. value providers and how to test dependencies effectively.',
        },
        {
            title: 'Prisma + NestJS: Database Setup and Migrations',
            content:
                'Hook up Prisma to your NestJS app, generate the client, and manage migrations across environments. We also discuss seeding strategies and environment variables.',
        },
        {
            title: 'Domain-Driven Design (DDD) for Node.js Developers',
            content:
                'Explore ubiquitous language, aggregates, and repositories. See how to model your domain and keep your application layer clean with DDD patterns in TypeScript.',
        },
        {
            title: 'Repository Pattern with Prisma',
            content:
                'Implement a repository layer that maps Prisma models to domain entities. Learn how to isolate your domain from persistence details and improve testability.',
        },
        {
            title: 'Error Handling in NestJS: Filters, Interceptors, and Pipes',
            content:
                'Centralize error handling using exception filters, transform inputs with pipes, and shape responses with interceptors. Practical patterns for production apps.',
        },
        {
            title: 'Validation with class-validator and class-transformer',
            content:
                'Add DTO validation with decorators, whitelist unknown fields, and enable transformation for clean, predictable request handling in your controllers.',
        },
        {
            title: 'Docker Compose for Local Postgres in Development',
            content:
                'Spin up a local Postgres with Docker Compose, manage volumes, and configure Prisma to connect via DATABASE_URL. Tips for a smooth local DX.',
        },
        {
            title: 'Seeding Databases with Prisma Like a Pro',
            content:
                'Design idempotent seeds, split test and dev data, and understand when to use createMany vs. upserts. Keep your environments reproducible.',
        },
        {
            title: 'Writing Unit Tests in NestJS with Jest',
            content:
                'Mock providers, test controllers and services, and set up fast-running unit tests. Learn patterns that keep tests isolated and maintainable.',
        },
        {
            title: 'Understanding the NestJS Request Lifecycle',
            content:
                'From incoming request to response, see how Nest resolves dependencies, applies guards, interceptors, and pipes, and executes controllers.',
        },
        {
            title: 'Logging Strategies for Production NestJS Apps',
            content:
                'Configure structured logging, correlate requests, and capture errors with context. We cover Logger, interceptors, and transport integrations.',
        },
        {
            title: 'Clean Architecture Boundaries in TypeScript',
            content:
                'Separate domain, application, and infrastructure layers. Keep frameworks at the edges and protect your core domain logic from technical concerns.',
        },
        {
            title: 'PostgreSQL Indexing 101: Performance that Matters',
            content:
                'Understand B-Tree vs. GIN indexes, partial indexes, and how to analyze slow queries. Practical indexing tips for common workloads.',
        },
        {
            title: 'API Pagination and Filtering with Prisma',
            content:
                'Implement cursor-based pagination, sorting, and filters. Avoid pitfalls with large offsets and keep your endpoints fast and consistent.',
        },
        {
            title: 'Prisma Transactions and Error Handling',
            content:
                'Use interactive transactions for multi-step operations. Handle rollbacks, partial failures, and surface meaningful errors to API consumers.',
        },
        {
            title: 'Managing Migrations Across Environments',
            content:
                'Adopt a workflow for dev, staging, and prod. Learn when to squash migrations, how to handle conflicts, and automate deploys safely.',
        },
        {
            title: 'CI/CD for NestJS with GitHub Actions',
            content:
                'Set up build, test, lint, and deploy pipelines. Cache dependencies, run Prisma migrations, and ship confidently with environment gates.',
        },
        {
            title: 'Caching HTTP Responses with Redis',
            content:
                'Add a cache layer to speed up reads and reduce database load. Discuss invalidation strategies, TTLs, and cache keys that scale.',
        },
        {
            title: 'Building a Robust REST API with NestJS',
            content:
                'Combine controllers, services, DTOs, and guards into a cohesive API. Secure endpoints, document with OpenAPI, and deliver a solid developer experience.',
        },
    ];

    const result = await prisma.post.createMany({ data: posts });

    console.log(`Seed completed: inserted ${result.count} posts`);
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
