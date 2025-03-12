export const menuData = [
  {
    name: "소개",
    path: "/introduce",
    links: [
      { to: "/introduce/project", label: "프로젝트 소개" },
      { to: "/introduce/team", label: "팀소개" },
    ],
  },
  {
    name: "데이터 분석",
    path: "/ai",
    links: [
      { to: "/ai/uploadform", label: "이미지 업로드" },
      { to: "/ai/uploadresult", label: "분석결과 현황" },
      { to: "/ai/aiuploadlist", label: "분석결과 목록" },
    ],
  },
  {
    name: "알림소식",
    path: "/contents",
    links: [
      { to: "/contents/notice", label: "공지사항" },
      { to: "/contents/board", label: "게시판" },
    ],
  },
  {
    name: "고객문의",
    path: "/support",
    links: [
      { to: "/support", label: "1:1 문의" },
      { to: "/support/list", label: "고객문의 목록" },
    ],
  },
  {
    name: "구독",
    path: "/payment",
    links: [
      { to: "/payment", label: "구독상품" },
      { to: "/payment/result", label: "결제확인" },
    ],
  },
  {
    name : "사과 마켓",
    path : "/product",
    links : [
      { to : "/product/list", label : "상품 목록" },
      { to : "/product/register", label : "상품 등록" }
    ]
  },
];