export interface Post {
    id: number
    title: string
    content: string
    user_id: number
    posting_password: string
    images: {
        img_url: string
    }
    options: object
    created_at: string
    updated_at: string
}