import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="h-8 w-auto"
                src="https://ai-public.creatie.ai/gen_page/logo_placeholder.png"
                alt="스마트팜"
              />
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/monitoring"
                className="border-custom text-custom border-b-2 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                모니터링
              </Link>
              <Link
                to="/control"
                className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                제어 시스템
              </Link>
              <Link
                to="/analytics"
                className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                데이터 분석
              </Link>
              <Link
                to="/mypage"
                className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                고객지원
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <Link
              to="/login"
              className="!rounded-button bg-custom px-4 py-2 text-white text-sm font-medium hover:bg-custom/90"
            >
              로그인
            </Link>
            <Link
              to="/register"
              className="!rounded-button border border-custom text-custom px-4 py-2 text-sm font-medium hover:bg-custom/10"
            >
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
