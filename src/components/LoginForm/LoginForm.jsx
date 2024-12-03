import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { logIn } from "../../redux/auth/operations";
import s from "./LoginForm.module.css";
import { nanoid } from "nanoid";

const LoginForm = () => {
  const emailId = nanoid(2);
  const passwordId = nanoid(2);

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    console.log(values);
    dispatch(logIn({ email: values.email, password: values.password }));
    actions.resetForm();
  };

  return (
    <Formik initialValues={{ email: "", password: "" }} onSubmit={handleSubmit}>
      <Form className={s.form}>
        <label htmlFor={emailId}>Email</label>
        <Field type="email" name="email" id={emailId} className={s.email} />
        <ErrorMessage name="name" component="span" />
        <label htmlFor={passwordId}>Password</label>
        <Field
          type="password"
          name="password"
          id={passwordId}
          className={s.password}
        />
        <ErrorMessage name="password" component="span" />
        <button className={s.button} type="submit">
          Login
        </button>
      </Form>
    </Formik>
  );
};
export default LoginForm;
