import { Post } from '../entity/post.entity';

export interface PostRepository {
    create(post: Post): Promise<Post>;
    findAll(): Promise<Post[]>;
    findById(id: string): Promise<Post | null>;
    update(post: Post): Promise<Post>;
    delete(id: string): Promise<void>;
}
