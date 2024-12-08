"use client";
import { useState, useEffect, useRef } from "react";
import { ToggleSideBarButton } from "@/components/shared/Buttons";
import { useGetCategories } from "@/roupi/category";

const CategoryItem = ({ active, onClick, name, subCategories }) => {
  return (
    <li className="p-2">
      <div
        onClick={() => onClick()}
        className={`font-bold px-2 py-1 rounded-md ${
          active && "bg-gray-200"
        } flex items-center justify-start hover:bg-gray-200 cursor-pointer`}
      >
        <input
          onChange={(e) => onClick(e)}
          checked={active}
          type="checkbox"
          className="mr-2 w-4 h-4"
        />
        {name}
      </div>
    </li>
  );
};

export const FiltersSideBar = ({ setFilter }) => {
  const [open, setOpen] = useState(false);
  const sideBarRef = useRef(null);
  const { categories } = useGetCategories({});

  const [categoriesFilter, setCategoriesFilter] = useState([]);
  const [cron, setCron] = useState();

  const handleOnChangeCatgory = (id) => {
    clearTimeout(cron);

    if (categoriesFilter.includes(id)) {
      const cats = categoriesFilter.filter((catID) => catID != id);
      setCategoriesFilter(cats);
      setCron(
        setTimeout(() => {
          setFilter((filter) => ({
            ...filter,
            category_id: cats,
          }));
        }, 2000)
      );
    } else {
      categoriesFilter.push(id);
      setCategoriesFilter(categoriesFilter);
      setCron(
        setTimeout(() => {
          setFilter((filter) => ({
            ...filter,
            category_id: categoriesFilter,
          }));
        }, 2000)
      );
    }
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (sideBarRef.current && sideBarRef.current.contains(event.target)) {
        setOpen(false);
        document.removeEventListener("click", () => "");
      }
    }

    document.addEventListener("click", (e) => handleClickOutside(e));
  }, []);
  return (
    <>
      <div
        id="paper"
        ref={sideBarRef}
        className={`${
          !open && "hidden"
        } absolute z-10 w-[99vw] h-screen bg-gray-900 opacity-40`}
      ></div>
      <div
        id="sidebar"
        className={`transform transition-transform duration-300 flex dur h-screen ${
          !open && " translate-x-[-256px]"
        } border absolute z-10 border-r-slate-300 bg-gray-50 flex-col w-64`}
      >
        <ToggleSideBarButton open={open} setOpen={setOpen} />
        <div className="hover:overflow-y-auto overflow-y-hidden  text-gray-900">
          <div className="p-2 hover:pr-0">
            <ul className="list-none">
              {categories?.map((category) => (
                <CategoryItem
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  active={categoriesFilter.includes(category.id)}
                  onClick={() => handleOnChangeCatgory(category.id)}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
