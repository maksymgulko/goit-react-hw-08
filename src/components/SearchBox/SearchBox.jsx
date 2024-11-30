import s from "./SearchBox.module.css";
import { changeFilter } from "../../redux/filtersSlice";
import { useDispatch } from "react-redux";

const SearchBox = () => {
  const dispatch = useDispatch();
  const onFilter = (value) => {
    dispatch(changeFilter(value));
  };

  return (
    <div className={s.search}>
      <p>Find contacts by name</p>
      <input
        className={s.input}
        type="text"
        onChange={(e) => onFilter(e.target.value)}
      />
    </div>
  );
};
export default SearchBox;
