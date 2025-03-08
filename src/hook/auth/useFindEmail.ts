import { useState } from "react";
import { findEmail } from "../../api/memberApi";

const useFindEmail = () => {
  const [findEmailForm, setFindEmailForm] = useState({ name: "", phone: "" });
  const [foundEmail, setFoundEmail] = useState<string | null>(null);

  // 입력값 변경 핸들러
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setFindEmailForm((prev) => ({ ...prev, [name]: value }));
  };

  // 아이디 찾기 요청
  const handleFindEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, phone } = findEmailForm;
    const email = await findEmail(name, phone);
    setFoundEmail(email);
  };

  return {
    findEmailForm,
    foundEmail,
    handleInputChange,
    handleFindEmail,
  };
};

export default useFindEmail;
