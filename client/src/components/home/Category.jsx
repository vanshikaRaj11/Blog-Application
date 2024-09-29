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
    <div className="space-y-6">
      <Link to={`/create?category=${category || ""}`} className="no-underline">
        <Button className="my-5 w-[85%] bg-[#00373C] text-white py-3 px-5 text-lg rounded-lg hover:bg-[#005957]">
          Create Blog
        </Button>
      </Link>

      <div className="border border-gray-300  rounded-lg shadow-md p-4 bg-white ">
        <table className="table-auto w-full p-2">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 text-left font-medium text-lg text-gray-700">
                <Link to={"/"} className="no-underline text-black">
                  All Categories
                </Link>
              </th>
            </tr>
          </thead>
          <tbody className="space-y-2">
            {categories.map((category) => (
              <tr key={category.id} className="border-t p-2">
                <td className="py-2 text-gray-600 hover:text-[#00373C] transition-colors">
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
    </div>
  );
};

export default Category;
