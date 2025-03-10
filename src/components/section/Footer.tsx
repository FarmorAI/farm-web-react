import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    // ✅ 수정된 부분: 배경색을 어두운 색상으로 변경, 패딩 조정
    <footer className="bg-white text-black py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* ✅ 추가된 부분: 푸터 위에 선 추가 (상단 테두리) */}
        <div className="border-t border-gray-400"></div>
        {/* ✅ 수정된 부분: 상단 레이아웃을 flex로 좌우 정렬 */}
        <div className="flex justify-between items-center">
          {/* 좌측: 로고와 회사명 */}
          <div className="flex items-center space-x-4">
            {/* ✅ 수정된 부분: 로고 스타일 조정 */}
            <img
              className="h-8 w-auto"
              src="/public/assets/images/logo/applepick.png"
              alt="Berrypick"
            />
            {/* ✅ 수정된 부분: 회사명 추가 */}
            <div>
              <span className="text-sm font-semibold text-blue-400">FarmorAI</span>
              <p className="text-xs">SMART FARM SOLUTIONS</p>
            </div>
          </div>

          {/* 중앙: 링크들 */}
          {/* ✅ 수정된 부분: 링크를 한 줄로 표시, 구분선(|) 추가 */}
          <div className="text-sm">
            <Link to="/about" className="hover:text-blue-400 transition duration-300">
              FarmorAI소개
            </Link>
            <span className="mx-2">|</span>
            <Link to="/privacy" className="hover:text-blue-400 transition duration-300">
              개인정보처리방침
            </Link>
            <span className="mx-2">|</span>
            <Link to="/terms" className="hover:text-blue-400 transition duration-300">
              이용약관
            </Link>
            <span className="mx-2">|</span>
            <Link to="/sitemap" className="hover:text-blue-400 transition duration-300">
              사이트맵
            </Link>
            <span className="mx-2">|</span>
            <Link to="/careers" className="hover:text-blue-400 transition duration-300">
              채용안내(인재채용)
            </Link>
          </div>
        </div>
        {/* 소셜 미디어 아이콘 섹션 */}
        <div className="flex space-x-4 mt-4">
          <a href="#" className="text-gray-500 hover:text-green-600 text-xl transition duration-300">
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://www.youtube.com/results?search_query=%EC%8A%A4%EB%A7%88%ED%8A%B8%ED%8C%9C"
            className="text-gray-500 hover:text-green-600 text-xl transition duration-300"
          >
            <i className="fab fa-youtube"></i>
          </a>
          <a href="https://github.com/FarmorAI" className="text-gray-500 hover:text-green-600 text-xl transition duration-300">
            <i className="fab fa-github"></i>
          </a>
        </div>

        {/* ✅ 수정된 부분: 연락처 정보와 저작권 정보 분리 */}
        <div className="mt-3 text-xs text-gray-700 flex justify-between">
          {/* 좌측: 연락처 정보 */}
          <div>
            <span>
              본원 : 서울시 금천구 가산디지털2로 101, 한라원앤원타워 B동 3층
            </span>
            <span className="ml-4">
              Tel: 02-1234-5678 | Fax: 02-1234-5679 | Email: info@farmorai.co.kr
            </span>
          </div>
          {/* 우측: 저작권 정보 */}
          <div>
            COPYRIGHT(C) 2025 FarmorAI. ALL RIGHTS RESERVED
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;