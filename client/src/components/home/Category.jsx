import { Button } from "@material-tailwind/react";
import { Link, useSearchParams } from "react-router-dom";
// import { categories } from "../../../constants/config";

const categories = [
  { id: 1, type: "Music" },
  { id: 2, type: "Movies" },
  { id: 3, type: "Sports" },
  { id: 4, type: "Tech" },
  { id: 5, type: "Fashion" },
];
const Category = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  return (
    <>
      <Link to={`/create?category=${category || ""}`} className="no-underline">
        <Button className="my-5 w-[85%] bg-[#00373C] text-white">
          Create Blog
        </Button>
      </Link>

      <div className="border border-gray-300 ">
        <table className="table-auto w-full p-2">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2">
                <Link to={"/"} className="no-underline text-black">
                  All Categories
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-t p-2">
                <td className="py-2">
                  <Link
                    to={`/?category=${category.type}`}
                    className="no-underline text-black"
                  >
                    {category.type}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Category;
