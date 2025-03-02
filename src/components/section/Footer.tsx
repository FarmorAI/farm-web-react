import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-gray-800 py-12 shadow-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img className="h-10 w-auto mb-4" src="/public/assets/images/logo/headerlogo.png" alt="Berrypick" />
            <p className="text-sm text-gray-600">AI 기반 스마트팜 기술로 농업의 미래를 선도합니다.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">서비스</h4>
            <ul className="space-y-2 text-gray-600">
            <li><Link to="/monitoring" className="hover:text-green-600 transition duration-300">모니터링 시스템</Link></li>
              <li><Link to="/control" className="hover:text-green-600 transition duration-300">제어 시스템</Link></li>
              <li><Link to="/analytics" className="hover:text-green-600 transition duration-300">데이터 분석</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">고객지원</h4>
            <ul className="space-y-2 text-gray-600">
            <li><Link to="/contact" className="hover:text-green-600 transition duration-300">문의하기</Link></li>
              <li><Link to="/faq" className="hover:text-green-600 transition duration-300">FAQ</Link></li>
              <li><Link to="/support" className="hover:text-green-600 transition duration-300">기술지원</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">연락처</h4>
            <p className="text-sm text-gray-600">콜센터 : 02-1234-5678</p>
            <p className="text-sm text-gray-600">이메일: info@smartfarm.co.kr</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-500 hover:text-green-600 text-xl transition duration-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://www.youtube.com/results?search_query=%EC%8A%A4%EB%A7%88%ED%8A%B8%ED%8C%9C" className="text-gray-500 hover:text-green-600 text-xl transition duration-300">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="https://github.com/FarmorAI" className="text-gray-500 hover:text-green-600 text-xl transition duration-300">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
          © 2025 FarmorAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;