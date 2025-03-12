import { createSearchParams, useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useState } from "react";


// 문자열 형태의 쿼리 파라미터 값을 정수로 변환하는 함수
const getNum = (param: string | null, defaultValue: number): number => {
    return param ? parseInt(param, 10) : defaultValue;
};


const useMove = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [queryParam] = useSearchParams();
    const [refresh, setRefresh] = useState(false);

    const page = getNum(queryParam.get("page"), 1);
    const size = getNum(queryParam.get("size"), 10);

    const queryDefault = createSearchParams({
        page: page.toString(),
        size: size.toString(),
    }).toString();

    const basePath =  location.pathname.includes("/board") ? "board"
        : location.pathname.includes("/notice") ? "notice" : "support";

    const moveToList = (pageParam?: { page?: number; size?: number }) => {
        const pageNum = pageParam?.page !== undefined ? pageParam.page : page;  // 기본값을 현재 페이지로 유지
        const sizeNum = pageParam?.size !== undefined ? pageParam.size : size;

        const queryStr = createSearchParams({
            page: pageNum.toString(),
            size: sizeNum.toString(),
        }).toString();

        setRefresh((prev) => !prev);
        navigate(`/${basePath !== "support" ? 
            `contents/${basePath}`:`${basePath}/list`}?${queryStr}`
        );
    };

    const moveToListSupport = (pageParam?: { page?: number; size?: number }) => {
        const pageNum = pageParam?.page !== undefined ? pageParam.page : page;  // 기본값을 현재 페이지로 유지
        const sizeNum = pageParam?.size !== undefined ? pageParam.size : size;

        const queryStr = createSearchParams({
            page: pageNum.toString(),
            size: sizeNum.toString(),
        }).toString();

        setRefresh((prev) => !prev);
        navigate(`/support/list?${queryStr}`);
    };


    const moveToModify = (num: number) => {
        navigate(`/contents/${basePath}/modify/${num}?${queryDefault}`);
    };

    const moveToRead = (num: number, type: string) => {
        if (type !== "support") {
            navigate(`/contents/${basePath}/${num}?${queryDefault}`);
        } else {
            navigate(`/${basePath}/${num}?${queryDefault}`);
        }
    };

    // ✅ 글쓰기 이동 함수 추가
    const moveToWrite = () => {
        navigate(`/contents/${basePath}/write?${queryDefault}`);
    };

    return { moveToList, moveToListSupport, moveToModify, moveToRead, moveToWrite, page, size, refresh };
};

export default useMove;