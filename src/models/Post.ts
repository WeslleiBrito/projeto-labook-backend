
export class Post {
    constructor(
        private id: string,
        private creatorId: string,
        private content: string,
        private likes: number,
        private dislikes: number,
        private createdAt: string,
        private updatedAt: string
    ) { }

    public getId = (): string => {
        return this.id
    }
    public getCreatorId = (): string => {
        return this.creatorId
    }
    public getContent = (): string => {
        return this.content
    }
    public getLikes = (): number => {
        return this.likes
    }
    public getDislikes = (): number => {
        return this.dislikes
    }

    public getCreatedAt = (): string => {
        return this.createdAt
    }

    public getUpdatedAt = (): string => {
        return this.updatedAt
    }

    public setContent = (newContent: string): void => {
        this.content = newContent
    }
    public setLikes = (newLike: number): void => {
        this.likes = newLike
    }
    public setDislikes = (newDislike: number): void => {
        this.dislikes = newDislike
    }

    public setUpdatedAt = (newUpdatedAt: string): void => {
        this.updatedAt = newUpdatedAt
    }
}