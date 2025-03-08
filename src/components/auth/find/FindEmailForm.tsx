import React from "react";

interface FindEmailFormProps {
  findEmailForm: { name: string; phone: string };
  foundEmail: string | null;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFindEmail: (e: React.FormEvent) => void;
}

const FindEmailForm: React.FC<FindEmailFormProps> = ({
  findEmailForm,
  foundEmail,
  handleInputChange,
  handleFindEmail,
}) => {
  return (
    <form onSubmit={handleFindEmail} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          이름
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="block w-full border-gray-300 focus:border-custom focus:ring-custom sm:text-sm rounded-lg"
          value={findEmailForm.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          전화번호
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          required
          className="block w-full border-gray-300 focus:border-custom focus:ring-custom sm:text-sm rounded-lg"
          value={findEmailForm.phone}
          onChange={handleInputChange}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-custom text-white py-3 px-4 rounded-lg hover:bg-custom/90"
      >
        아이디 찾기
      </button>
      {foundEmail && (
        <p
          className={`text-center font-medium mt-4 ${
            foundEmail === "회원 정보가 없습니다." ? "text-red-500" : "text-green-600"
          }`}
        >
          찾은 아이디: {foundEmail}
        </p>
      )}
    </form>
  );
};

export default FindEmailForm;
