import { motion } from "framer-motion";

// ✅ 팀원 정보 (이름, 역할, 설명, 이미지)
const teamMembers = [
  {
    name: "오준명",
    role: "풀스택 엔지니어",
    description: "농업 기술 혁신과 지속 가능한 발전을 위한 비전을 제시합니다.",
    img: "/assets/images/member/준명.png",
  },
  {
    name: "김도훈",
    role: "풀스택 엔지니어",
    description: "프론트 1등공신",
    img: "/assets/images/member/도훈.png",
  },
  {
    name: "김종범",
    role: "풀스택 엔지니어",
    description: "스마트팜 시스템 개발과 데이터 분석을 담당합니다.",
    img: "/assets/images/member/종범.png",
  },
  {
    name: "이다혜",
    role: "풀스택 엔지니어",
    description: "사용자 중심의 직관적인 인터페이스를 디자인합니다.",
    img: "/assets/images/member/다혜.png",
  },
];

// ✅ 기술 스택 데이터
const techStack = [
  { name: "React", img: "/assets/images/React.png", description: "프론트 개발" },
  { name: "Python", img: "/assets/images/python.png", description: "백엔드 개발" },
  { name: "AWS", img: "/assets/images/aws.png", description: "클라우드" },
  { name: "Docker", img: "/assets/images/docker.png", description: "컨테이너" },
  { name: "GitHub", img: "/assets/images/github.png", description: "버전 관리" },
  { name: "MySQL", img: "/assets/images/mysql.png", description: "데이터베이스" },
  { name: "TensorFlow", img: "/assets/images/tensorflow.png", description: "딥러닝" },
  { name: "TypeScript", img: "/assets/images/typescript.png", description: "프론트 개발" },
  { name: "Spring", img: "/assets/images/Spring.png", description: "백엔드 개발" },
  { name: "FastAPI", img: "/assets/images/FastAPI.png", description: "백엔드 개발" },
  { name: "Jupyter", img: "/assets/images/Jupyterlogo.png", description: "데이터 분석" },
];

// ✅ 기술 스택 슬라이드 (Framer Motion 사용)
const TechCarousel = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        className="flex space-x-8"
        animate={{ x: ["0%", "-50%"] }} // 50% 이동 후 다시 시작
        transition={{ ease: "linear", duration: 20, repeat: Infinity }}
      >
        {[...techStack, ...techStack].map((tech, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm p-6 text-center min-w-[150px]"
          >
            <img
              src={tech.img}
              alt={tech.name}
              className="w-20 h-20 mx-auto mb-4 object-contain"
            />
            <h3 className="text-lg font-semibold text-gray-900">{tech.name}</h3>
            <p className="text-sm text-gray-600">{tech.description}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// ✅ 팀원 카드 섹션
const Team = () => {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* 🔹 팀 소개 타이틀 */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          FarmorAI 팀을 소개합니다
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          FarmorAI는 사과를 좋아하는 사람들이 모여 더 나은 미래를 만들어가는 팀입니다.
        </p>
      </div>

      {/* 🔹 팀원 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMembers.map((member) => (
          <div
            key={member.name}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-xl"
          >
            <div className="p-6 text-center">
              {/* 프로필 사진 */}
              <img
                src={member.img}
                alt={member.name}
                className="w-28 h-28 mx-auto rounded-full mb-4 object-cover"
              />
              {/* 이름 & GitHub 링크 */}
              <div className="flex items-center justify-center gap-2">
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <a
                  href="https://github.com/FarmorAI"
                  className="text-gray-500 hover:text-green-600 text-xl transition duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-github"></i>
                </a>
              </div>
              {/* 역할 */}
              <p className="text-sm text-custom text-center mb-2">
                {member.role}
              </p>
              {/* 설명 */}
              <p className="text-xs sm:text-sm text-gray-600">
                {member.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 기술 스택 */}
      <div className="mt-24">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          기술 스택
        </h2>
        <div className="overflow-hidden">
          <TechCarousel />
        </div>
      </div>
    </div>
  );
};

export default Team;
