import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContactList from "../../components/ContactList/ContactList";
import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import { selectIsLoading, selectError } from "../../redux/contacts/selectors";
import { fetchContacts } from "../../redux/contacts/operations";

const ContactsPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <div>{isLoading && !error && "Request in progress..."}</div>
      <ContactForm />
      <SearchBox />
      <ContactList />
    </>
  );
};
export default ContactsPage;
