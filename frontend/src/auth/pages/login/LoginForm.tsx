import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Form, Formik, FormikErrors } from 'formik';

import { getSpacing } from '../../../stylesheet';
import { loginUser } from '../../redux/actions';
import { getLoginError } from '../../redux/selectors';

import { InputField } from '../../../components/form/InputField/InputField';
import { Button } from '../../../components/Button/Button.style';
import { Error } from '../../../components/form/Error';

export const FormWrapper = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: ${getSpacing(70)};
  > * + * {
    margin-top: ${getSpacing(1)};
  }
`;

export const LoginButton = styled(Button)`
  align-self: center;
  margin-top: ${getSpacing(8)};
`;

interface FormValues {
  email: string;
  password: string;
}
const initialValues: FormValues = {
  email: '',
  password: '',
};

export const validateForm = (values: FormValues): FormikErrors<FormValues> => {
  const errors: FormikErrors<FormValues> = {};
  if (values.email === '') {
    errors.email = 'Email required';
  }

  return errors;
};

export const LoginForm: FunctionComponent = () => {
  const intl = useIntl();
  const loginError = useSelector(getLoginError);
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        dispatch(loginUser.request(values));
      }}
      validate={validateForm}
    >
      <FormWrapper translate="yes">
        <InputField
          type="text"
          fieldName="email"
          label={intl.formatMessage({ id: 'login.email' })}
          placeholder={intl.formatMessage({ id: 'login.email-placeholder' })}
        />

        <InputField
          type="password"
          fieldName="password"
          label={intl.formatMessage({ id: 'login.password' })}
          placeholder={intl.formatMessage({ id: 'login.password-placeholder' })}
        />

        <Error>{loginError}</Error>

        <LoginButton type="submit" data-testid="form-submit">
          <FormattedMessage id="login.login-button" />
        </LoginButton>
      </FormWrapper>
    </Formik>
  );
};
