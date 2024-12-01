import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { register } from "../../redux/auth/operations";
import s from "./RegisterForm.module.css";
import { nanoid } from "nanoid";

const RegisterForm = () => {
  const nameId = nanoid(2);
  const emailId = nanoid(2);
  const passwordId = nanoid(2);

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    console.log(values);
    dispatch(
      register({
        name: values.name,
        email: values.email,
        password: values.password,
      })
    );
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      onSubmit={handleSubmit}
    >
      <Form className={s.form}>
        <label htmlFor={nameId}>Name</label>
        <Field type="text" name="name" id={nameId} className={s.name} />
        <ErrorMessage name="name" component="span" />
        <label htmlFor={emailId}>Email</label>
        <Field type="email" name="email" id={emailId} className={s.name} />
        <ErrorMessage name="name" component="span" />
        <label htmlFor={passwordId}>Password</label>
        <Field
          type="password"
          name="password"
          id={passwordId}
          className={s.number}
        />
        <ErrorMessage name="password" component="span" />
        <button className={s.button} type="submit">
          Register
        </button>
      </Form>
    </Formik>
  );
};
export default RegisterForm;
