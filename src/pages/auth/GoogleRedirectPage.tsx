import {getGoogleAccessToken, getGoogleWithAccessToken} from "../../api/socialApi.ts";
import {useEffect} from "react";
import {useSearchParams} from "react-router-dom";

const GoogleRedirectPage = () => {
    const [searchParams] = useSearchParams()
    const code :string | null = searchParams.get('code')

    useEffect(() => {
        if (code != null) {
            getGoogleAccessToken(code).then((accessToken) => {
                getGoogleWithAccessToken(accessToken).then((result) =>{
                    console.log(result);
                })
            })
        }
    }, [code]);

    return (
        <div>
            <div>Google Login Redirect</div>
            <div>{code}</div>
        </div>
    );
};

export default GoogleRedirectPage;