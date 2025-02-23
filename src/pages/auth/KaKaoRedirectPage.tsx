import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {getAccessToken, getMemberWithAccessToken} from "../../api/socialApi.ts";

const KaKaoRedirectPage = () => {

    const [searchParmas] = useSearchParams()

    const code :string | null = searchParmas.get('code')

    useEffect(() => {
        if (code != null) {
            getAccessToken(code).then((accessToken) => {
                getMemberWithAccessToken(accessToken).then((result) =>{
                    console.log(result);
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