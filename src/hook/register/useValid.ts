import { useEffect, useState } from "react";
import { FormType } from "../../components/register/RegisterForm";

export const useValid = (
  form: FormType,
  isEmailChecked: boolean,
  isNicknameChecked: boolean,
  isEmailAvailable: boolean | null,
  isNicknameAvailable: boolean | null
) => {
  const [validMessage, setValidMessage] = useState({
    emailMessage: "",
    passwordMessage: "",
    confirmPasswordMessage: "",
    nicknameMessage: "",
  });

  const [isValid, setIsValid] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    nickname: false,
  });

  // 이메일 유효성 검사 (형식 검사만 수행)
  useEffect(() => {
    const email = form.email.trim();
    if (email === "") {
      setValidMessage((prev) => ({ ...prev, emailMessage: "" }));
      setIsValid((prev) => ({ ...prev, email: false }));
      return;
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setValidMessage((prev) => ({
        ...prev,
      }));
      setIsValid((prev) => ({ ...prev, email: false }));
    } else {
      // 형식이 올바르면 유효성 true
      setIsValid((prev) => ({ ...prev, email: true }));

      // 중복 확인 완료 전이면 "중복 확인 해주세요." 메시지 출력
      if (!isEmailChecked) {
        setValidMessage((prev) => ({
          ...prev,
        }));
      } else {
        // 중복 확인 완료 후 결과 반영
        if (isEmailAvailable === true) {
          setValidMessage((prev) => ({
            ...prev,
            emailMessage: "사용 가능한 이메일입니다.",
          }));
        } else if (isEmailAvailable === false) {
          setValidMessage((prev) => ({
            ...prev,
            emailMessage: "이미 사용중인 이메일입니다.",
          }));
          setIsValid((prev) => ({ ...prev, email: false }));
        }
      }
    }
  }, [form.email, isEmailChecked, isEmailAvailable]);

  // 비밀번호 유효성 검사
  useEffect(() => {
    if (form.password === "") {
      setValidMessage((prev) => ({ ...prev, passwordMessage: "" }));
      setIsValid((prev) => ({ ...prev, password: false }));
      return;
    }
    const regex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,15}$/;
    if (!regex.test(form.password)) {
      setValidMessage((prev) => ({
        ...prev,
        passwordMessage:
          "숫자, 영문, 특수문자를 포함하여 최소 8자를 입력해주세요",
      }));
      setIsValid((prev) => ({ ...prev, password: false }));
    } else {
      setValidMessage((prev) => ({ ...prev, passwordMessage: "" }));
      setIsValid((prev) => ({ ...prev, password: true }));
    }
  }, [form.password]);

  // 비밀번호 확인 유효성 검사
  useEffect(() => {
    if (form.confirmPassword === "") {
      setValidMessage((prev) => ({ ...prev, confirmPasswordMessage: "" }));
      setIsValid((prev) => ({ ...prev, confirmPassword: false }));
      return;
    }
    if (form.password !== form.confirmPassword) {
      setValidMessage((prev) => ({
        ...prev,
        confirmPasswordMessage: "비밀번호가 일치하지 않습니다.",
      }));
      setIsValid((prev) => ({ ...prev, confirmPassword: false }));
    } else {
      setValidMessage((prev) => ({ ...prev, confirmPasswordMessage: "" }));
      setIsValid((prev) => ({ ...prev, confirmPassword: true }));
    }
  }, [form.password, form.confirmPassword]);

  // 닉네임 유효성 검사 (중복 체크 포함)
  useEffect(() => {
    if (form.nickname === "") {
      setValidMessage((prev) => ({ ...prev, nicknameMessage: "" }));
      setIsValid((prev) => ({ ...prev, nickname: false }));
      return;
    }
    const regex = /^[a-zA-Z0-9가-힣]{2,10}$/;
    if (!regex.test(form.nickname)) {
      setValidMessage(prev => ({
        ...prev,
      }));
      setIsValid(prev => ({ ...prev, nickname: false }));
    } else {
      // 🚀 닉네임 형식이 맞다면 기본적으로 유효성 true
      setIsValid(prev => ({ ...prev, nickname: true }));
  
      if (!isNicknameChecked) {
        setValidMessage(prev => ({
          ...prev,
        }));
      } else {
        if (isNicknameAvailable === false) {
          setValidMessage(prev => ({
            ...prev,
            nicknameMessage: "중복된 닉네임입니다.",
          }));
          setIsValid(prev => ({ ...prev, nickname: false }));
        } else if (isNicknameAvailable === true) {
          setValidMessage(prev => ({ ...prev, nicknameMessage: "사용 가능한 닉네임입니다." }));
          setIsValid(prev => ({ ...prev, nickname: true })); // ✅ 사용 가능하면 true 유지
        }
      }
    }
  }, [form.nickname, isNicknameChecked, isNicknameAvailable]);

  return { validMessage, isValid };
};
