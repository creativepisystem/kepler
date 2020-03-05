/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
import React, {
  ChangeEvent,
  useRef,
  useEffect,
  useCallback,
  useState
} from "react";

import { useField } from "@unform/core";

import { Container, Error, Label } from "../styles";

interface Props {
  name: string;
  label?: string;
}

type InputProps = JSX.IntrinsicElements["input"] & Props;

const FileInput: React.FC<InputProps> = ({ name, label, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [preview, setPreview] = useState(defaultValue);
  const handlePreview = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setPreview(null);
    }
    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);
  }, []);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "files[0]",
      clearValue(ref: HTMLInputElement) {
        // eslint-disable-next-line no-param-reassign
        ref.value = "";
        setPreview(null);
      },
      setValue(_: HTMLInputElement, value: string) {
        setPreview(value);
      }
    });
  }, [fieldName, registerField]);
  return (
    <Container>
      <Label>{label}</Label>
      {preview && <img src={preview} alt="Preview" width="100" />}
      <input
        type="file"
        className="form-control-file"
        ref={inputRef}
        onChange={handlePreview}
        {...rest}
      />
      {error && <Error className="error">{error}</Error>}
    </Container>
  );
};
export default FileInput;
