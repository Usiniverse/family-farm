export interface CreatePostDTO {
    title: string
    content: string
    posting_password: string
    sns_id?: string
    images?: {
        img_url: string
    }
    options?: object
    created_at?: string
    updated_at?: string
}