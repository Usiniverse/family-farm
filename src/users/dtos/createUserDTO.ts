export interface CreateUserDTO {
    email?: string
    phone?: string
    password: string
    // access_token: string

    request_params?: object
    response_params?: object
}

export type Provider = 'kakao' | 'naver' | 'google'
