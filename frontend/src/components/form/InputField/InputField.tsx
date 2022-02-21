import { ErrorMessage, useField } from 'formik';
import React, { FunctionComponent } from 'react';
import { Input } from '../../Input/Input';
import { Error } from '../Error';
import { Label, Wrapper } from './InputField.style';

interface Props {
  fieldName: string;
  label: string;
  type: string;
  disabled?: boolean;
  placeholder?: string;
}

export const InputField: FunctionComponent<Props> = props => {
  const { fieldName, label, disabled, type, placeholder } = props;
  const [field, meta] = useField(fieldName);
  const inputId = `input-${fieldName}`;

  return (
    <Wrapper>
      <Label htmlFor={inputId}>{label}</Label>
      <Input
        id={inputId}
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        hasError={meta.error !== undefined}
        {...field}
      />
      <ErrorMessage name={fieldName} component={Error} />
    </Wrapper>
  );
};
