# 🧱 NestJS + DDD + Prisma Architecture Explained

## 🧠 1. Vision générale

Le module `post` suit les principes **DDD** et **Onion Architecture** :

```
📁 post
 ├── application      → Cas d’usage (services applicatifs)
 ├── domain           → Noyau métier (entités, règles, interfaces)
 ├── infrastructure   → Détails techniques (implémentations)
 └── presentation     → Interface d’entrée (controllers, DTOs)
```

---

## 🧩 2. Domain Layer

**Chemin :** `src/modules/post/domain`

### Structure

```
domain/
 ├── entity/
 │    └── post.entity.ts
 └── repository/
      └── post.repo.interface.ts
```

### Exemple d’entité

```ts
export class Post {
  constructor(
    public readonly id: string,
    public title: string,
    public content: string,
  ) {}

  publish() {
    if (!this.title) throw new Error('Title required');
  }
}
```

### Exemple de repository interface

```ts
export interface IPostRepository {
  create(post: Post): Promise<Post>;
  findById(id: string): Promise<Post | null>;
  findAll(): Promise<Post[]>;
  update(post: Post): Promise<Post>;
  delete(id: string): Promise<void>;
}
```

---

## ⚙️ 3. Application Layer

**Chemin :** `src/modules/post/application`

### Exemple de service

```ts
@Injectable()
export class CreatePostService {
  constructor(
    @Inject('IPostRepository')
    private readonly postRepository: IPostRepository,
  ) {}

  async execute(title: string, content: string): Promise<Post> {
    const post = new Post(crypto.randomUUID(), title, content);
    post.publish();
    return this.postRepository.create(post);
  }
}
```

---

## 🏗️ 4. Infrastructure Layer

**Chemin :** `src/modules/post/infrastructure/post`

### Exemple

```ts
@Injectable()
export class PrismaPostRepository implements IPostRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(post: Post): Promise<Post> {
    const data = await this.prisma.post.create({
      data: { id: post.id, title: post.title, content: post.content },
    });
    return new Post(data.id, data.title, data.content);
  }
}
```

---

## 🌐 5. Presentation Layer

**Chemin :** `src/modules/post/presentation/controller`

### Exemple

```ts
@Controller("posts")
export class PostController {
  constructor(private readonly createPost: CreatePostService) {}

  @Post()
  async create(@Body() body: { title: string; content: string }) {
    return this.createPost.execute(body.title, body.content);
  }
}
```

---

## 🌀 6. Onion Architecture (vue en couches)

```
          ┌───────────────────────────────┐
          │        Presentation           │
          │ (Controllers, DTO, Routes)    │
          └───────────────▲───────────────┘
                          │
          ┌───────────────┴───────────────┐
          │        Application            │
          │ (UseCases / Services)         │
          └───────────────▲───────────────┘
                          │
          ┌───────────────┴───────────────┐
          │           Domain              │
          │ (Entities, Repositories)      │
          └───────────────▲───────────────┘
                          │
          ┌───────────────┴───────────────┐
          │       Infrastructure          │
          │ (Prisma, Database, External)  │
          └───────────────────────────────┘
```

---

## 🔁 7. Inversion des dépendances

> Les modules de haut niveau ne dépendent pas des modules bas niveau, mais tous dépendent d’abstractions.

### Exemple dans `post.module.ts`

```ts
@Module({
  controllers: [PostController],
  providers: [
    CreatePostService,
    {
      provide: 'IPostRepository',
      useClass: PrismaPostRepository,
    },
  ],
})
export class PostModule {}
```

Ainsi :  

- `CreatePostService` dépend de `IPostRepository`  
- Nest injecte `PrismaPostRepository` (implémentation concrète)

---

## ✅ Résumé

| Couche | Rôle | Dépend de |
|--------|------|-----------|
| **Domain** | Logique métier pure | aucune |
| **Application** | Cas d’usage métier | Domain (interfaces) |
| **Infrastructure** | Implémentation technique | Domain (contrats) |
| **Presentation** | Exposition API / UI | Application |
