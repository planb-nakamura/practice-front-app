import { render } from "@testing-library/react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";

type Input = {
  required: string;
  maxLength: string;
};

const Input = styled.input`
  width: 100%;
  padding: 20px;
  font-size: 120%;
  border: 3px solid #dcdcdc;
  box-sizing: border-box;
`;

const Validation = (props: {
  placeholder?: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>({
    mode: 'onSubmit',
    criteriaMode: "all",
    shouldFocusError: false,
  });

  const onSubmit: SubmitHandler<Input> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("required", { required: true })}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.onChange(e)}
      />
      {errors.required && "文字が入力されていません"}
      <br />
      5文字以上の文字列
      <br />
      <input {...register("maxLength", { maxLength: 120 })} />
      {errors.maxLength && "5文字以上が入力されています"}
      <br />
      10以内ならOK
      <br />
    </form>
  );
};
export default Validation;
