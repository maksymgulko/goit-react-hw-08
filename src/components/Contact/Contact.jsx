import s from "./Contact.module.css";
import { IoIosContact } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { deleteContact } from "../../redux/contacts/operations";
import { useDispatch } from "react-redux";

const Contact = ({ name, number, id }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  return (
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
      <button className={s.delete} type="button" onClick={() => handleDelete()}>
        Delete
      </button>
    </div>
  );
};
export default Contact;
