import styled from "styled-components";

const Textarea = styled.textarea`
  width: 100%;
  margin-top: 50px;
  padding: 20px;
  font-size: 120%;
  min-height: 400px;
  resize: none;
  border: 3px solid #dcdcdc;
  box-sizing: border-box;
`;

const ContentForm = (props: {
  placeholder?: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return (
    <Textarea
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => props.onChange(e)}
    ></Textarea>
  );
};

export default ContentForm;
