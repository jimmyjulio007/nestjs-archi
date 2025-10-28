export class Post {
    constructor(
        public readonly id: string,
        public title: string,
        public content: string | null,
        public readonly createdAt: Date,
        public readonly updatedAt: Date
    ) { }

    update(title: string, content: string | null) {
        this.title = title;
        this.content = content;
    }
}
