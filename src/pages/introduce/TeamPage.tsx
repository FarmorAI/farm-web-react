import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "오준명",
    role: "풀스택 엔지니어",
    description: "농업 기술 혁신과 지속 가능한 발전을 위한 비전을 제시합니다.",
    img: "/public/assets/images/member/준명.png",
  },
  {
    name: "김도훈",
    role: "풀스택 엔지니어",
    description: "프론트 1등공신",
    img: "/public/assets/images/member/도훈.png",
  },
  {
    name: "김종범",
    role: "풀스택 엔지니어",
    description: "스마트팜 시스템 개발과 데이터 분석을 담당합니다.",
    img: "/public/assets/images/member/종범.png",
  },
  {
    name: "이다혜",
    role: "풀스택 엔지니어",
    description: "사용자 중심의 직관적인 인터페이스를 디자인합니다.",
    img: "/public/assets/images/member/다혜.png",
  },
];

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
            <img src={tech.img} alt={tech.name} className="w-20 h-20 mx-auto mb-4 object-contain" />
            <h3 className="text-lg font-semibold text-gray-900">{tech.name}</h3>
            <p className="text-sm text-gray-600">{tech.description}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const Team = () => {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          FarmorAI 팀을 소개합니다
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          FarmSmarter는 혁신적인 농업 기술을 통해 더 나은 미래를 만들어가는
          팀입니다.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member) => (
          <div
            key={member.name}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
          >
            <div className="p-6 text-center">
              <img
                src={member.img}
                alt={member.name}
                className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900">
                {member.name}
              </h3>
              <p className="text-custom text-center mb-2">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.description}</p>
            </div>
          </div>
        ))}
      </div>
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
