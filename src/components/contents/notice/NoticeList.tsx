import { useEffect, useState } from "react";
import { NoticeListResponse } from "../../../model/contents.ts";
import { getNoticeList } from "../../../api/noticeApi.ts";

import useMove from "../../../hook/useMove.ts";
import PageComponent from "../PageComponent.tsx";

const NoticeList = () => {

    const { moveToRead , moveToList , size, page, refresh} = useMove();


    const [notices, setNotices] = useState<NoticeListResponse | null>(null);


    useEffect(() => {
        const noticeDB = async () => {
            const res = await getNoticeList({ page, size });
            // @ts-ignore
            setNotices(res);
        };
        noticeDB();
    }, [size,page,refresh]);

    console.log(notices);


    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full">
                <thead>
                <tr className="bg-gray-50 text-left">
                    {["번호", "제목", "작성자", "등록일", "조회"].map((header, idx) => (
                        <th key={idx} className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                            {header}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {notices?.dtoList.map((notice) => (
                    <tr key={notice.noticeId} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-500">{notice.noticeId}</td>
                        <td
                            className="px-6 py-4 text-sm font-medium text-blue-600 cursor-pointer"
                            onClick={() => moveToRead(notice.noticeId)}
                        >
                            {notice.title}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{notice.writer}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                            {new Date(notice.createdAt).toLocaleDateString("ko-KR")}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{notice.views}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {
                notices && <PageComponent serverData={notices} movePage={moveToList} />
            }
        </div>
    );
};

export default NoticeList;