import { useState } from "react";
import s from "./Contact.module.css";
import { IoIosContact } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { deleteContact, editContact } from "../../redux/contacts/operations";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const EditContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .matches(/^\d+$/, "Must be a number")
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const Contact = ({ name, number, id }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    dispatch(deleteContact(id));
    toast.success("Successfully deleted.");
  };

  const handleEditSubmit = (values, actions) => {
    dispatch(
      editContact({
        contactId: id,
        name: values.name,
        number: values.number,
      })
    );
    toast.success("Successfully updated.");
    setIsEditing(false);
    actions.resetForm();
  };

  return isEditing ? (
    <Formik
      initialValues={{ name, number }}
      validationSchema={EditContactSchema}
      onSubmit={handleEditSubmit}
    >
      {(props) => (
        <Form className={s.editForm}>
          <Field type="text" name="name" placeholder="Name" />
          <ErrorMessage name="name" component="span" />

          <Field type="text" name="number" placeholder="Number" />
          <ErrorMessage name="number" component="span" />

          <div>
            <button disabled={!props.dirty} type="submit">
              Save
            </button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  ) : (
    <div className={s.listItem}>
      <div className={s.info}>
        <p className={s.text}>
          <IoIosContact />
          {name}
        </p>
        <p className={s.text}>
          <FaPhoneAlt />
          {number}
        </p>
      </div>
      <button className={s.delete} type="button" onClick={handleDelete}>
        Delete
      </button>
      <Toaster />
      <button onClick={() => setIsEditing(true)} type="button">
        <CiEdit />
      </button>
    </div>
  );
};

export default Contact;
