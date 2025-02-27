import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {getKakaoAccessToken, getKakaoWithAccessToken} from "../../api/socialApi.ts";

const KaKaoRedirectPage = () => {

    const [searchParmas] = useSearchParams()
    const navigate = useNavigate();
    const code :string | null = searchParmas.get('code')

    useEffect(() => {
        if (code != null) {
            getKakaoAccessToken(code).then((accessToken) => {
                getKakaoWithAccessToken(accessToken).then((result) =>{
                    console.log(result);
                    if(result && result.social){
                        navigate("/"); //사용자 정보를 수정하게 마이페이지로 강제로 가게 해줍니다.
                    }
                })
            })
        }
    }, [code]);

    return (
        <div>
            <div>Kakao Login Redirect</div>
            <div>{code}</div>
        </div>
    );
};

export default KaKaoRedirectPage;