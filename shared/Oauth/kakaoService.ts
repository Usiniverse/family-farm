import axios from "axios";

interface KakaoUserInfo {
    id: number;
    connected_at: string;
    properties: {
        nickname: string;
        profile_image: string;
        thumbnail_image: string;
    };
    kakao_account: {
        profile_needs_agreement: boolean;
        profile: {
            nickname: string;
            thumbnail_image_url: string;
            profile_image_url: string;
            is_default_image: boolean;
        };
        email: string
    };
}

class KakaoLoginService {
    private KAKAO_APP_KEY = process.env.KAKAO_ADMIN_KEY;
    private KAKAO_REDIRECT_URI = "http://localhost:3000/auth/kakao/callback";

    getLoginPageURL(): string {
        return `https://kauth.kakao.com/oauth/authorize?client_id=${this.KAKAO_APP_KEY}&redirect_uri=${this.KAKAO_REDIRECT_URI}&response_type=code`;
    }

    async handleKakaoLogin(code: string): Promise<KakaoUserInfo> {
        try {
            const response = await axios.post("https://kauth.kakao.com/oauth/token", null, {
                params: {
                    grant_type: "authorization_code",
                    client_id: this.KAKAO_APP_KEY,
                    redirect_uri: this.KAKAO_REDIRECT_URI,
                    code: code,
                },
            });

            const accessToken = response.data.access_token;

            const userInfo = await axios.get("https://kapi.kakao.com/v2/user/me", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            return userInfo.data as KakaoUserInfo;
        } catch (error) {
            console.error(error);
            throw new Error("Kakao login failed");
        }
    }
}

export default KakaoLoginService;
