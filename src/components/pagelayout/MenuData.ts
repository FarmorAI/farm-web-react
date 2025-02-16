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
    path: "/upload",
    links: [
      { to: "ai/uploadform", label: "이미지 업로드" },
      { to: "ai/uploadlist", label: "분석결과 현황" },
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
    name: "고객지원",
    path: "/support",
    links: [
      { to: "/support/email", label: "이메일 문의" },
      { to: "/support/list", label: "문의 목록" },
    ],
  },
  {
    name: "구독 및 결제",
    path: "/support",
    links: [
      { to: "/pract", label: "연습" },
    ],
  },
];