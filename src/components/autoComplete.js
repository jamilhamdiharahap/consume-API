import { Link } from "react-router-dom";

const AutoComplete = ({name ,key}) => {
  return (
    <li className="flex justify-start bg-white text-black p-1 ml-10" key={key}>
      <Link
        className={
          name === "Data Not Found"
            ? "bg-white text-red text-lg p-1"
            : "bg-white text-black text-lg p-1"
        }
        to={`/country/${name}`}
      >
        {name}
      </Link>
    </li>
  );
};

export default AutoComplete;
