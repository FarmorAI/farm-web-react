import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/pagelayout/Sidebar";

const menuData = [
  {
    name: "KPX소개",
    links: [
      { to: "/about", label: "전력거래소?" },
      { to: "/ceo", label: "CEO 소개" },
      { to: "/structure", label: "조직구성" },
      { to: "/members", label: "회원사 현황" },
      { to: "/careers", label: "채용안내" },
    ],
  },
  {
    name: "열린경영",
    links: [
      { to: "/opinions", label: "국민의 의견을 듣습니다" },
      { to: "/transparency", label: "적극행정" },
      { to: "/growth", label: "기업성장응답센터" },
      { to: "/ethics", label: "행동강령·부패신고센터" },
      { to: "/rights", label: "인권침해신고센터" },
    ],
  },
  {
    name: "정보공개",
    links: [
      { to: "/info-policy", label: "정보공개제도" },
      { to: "/public-data", label: "공공데이터 제공" },
      { to: "/management", label: "경영공시" },
      { to: "/pre-info", label: "사전정보공표" },
    ],
  },
  {
    name: "주요사업",
    links: [
      { to: "/market", label: "시장운영" },
      { to: "/grid", label: "전력계통운영" },
      { to: "/supply", label: "전력수급" },
      { to: "/power-info", label: "전력관련정보" },
    ],
  },
  {
    name: "통합계약정보",
    links: [
      { to: "/bids", label: "입찰공고" },
      { to: "/contract", label: "계약절차안내" },
      { to: "/resources", label: "통합자료실" },
      { to: "/clean-contract", label: "청렴계약안내" },
    ],
  },
];

const Header: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-white shadow relative">
      <Sidebar />
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between h-[100%] items-center font-bold text-lg w-[91.5%]">
          {menuData.map(({ name }) => (
            <div
              key={name}
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="py-2 text-gray-700 hover:text-blue-500">
                {name}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 드롭다운 메뉴 */}
      {isDropdownOpen && (
        <div
          className="absolute left-0 right-0 bg-white shadow-md z-50 p-6 flex justify-center"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <div className="grid grid-cols-5 gap-8 w-full max-w-6xl">
            {menuData.map(({ name, links }) => (
              <div key={name}>
                {/* <h3 className="text-lg font-semibold text-gray-900 mb-3">{name}</h3> */}
                <ul>
                  {links.map(({ to, label }) => (
                    <li key={to}>
                      <Link
                        to={to}
                        className="block py-1 text-gray-700 hover:text-blue-500 bg-green-200"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
