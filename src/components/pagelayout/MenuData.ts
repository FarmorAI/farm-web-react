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
    name: "AI",
    path: "/upload",
    links: [
      { to: "/upload/form", label: "이미지 업로드" },
      { to: "/upload/list", label: "분석결과 현황" },
    ],
  },
  {
    name: "알림소식",
    path: "/board",
    links: [
      { to: "/board/notice", label: "공지사항" },
      { to: "/board/list", label: "게시판" },
    ],
  },
  {
    name: "고객지원",
    path: "/support",
    links: [
      { to: "/pract", label: "연습" },
      { to: "/practice", label: "연습2" },
      { to: "/prac", label: "연습3" },
      { to: "/supportmenu", label: "사이드바" },
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