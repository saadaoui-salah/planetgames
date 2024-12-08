export const Star = ({ active, onClick, w="17px", h="17px" }) => {
  const handleOnClick = () => {
    if (onClick) onClick();
    else return;
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      onClick={() => handleOnClick()}
      className={`${active ? "text-yellow-300" : "text-gray-400"} ${
        onClick && "cursor-pointer"
      } w-[${w}] h-[${h}] fill-current mr-1 `}
    >
      <path
        fillRule="evenodd"
        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export const StarsInput = ({ stars, setStars }) => {
  return (
    <div className="flex items-center">
      <Star w={"20px"} h={"20px"} onClick={() => setStars(stars == 1 ? 0 : 1)} active={stars >= 1} />
      <Star w={"20px"} h={"20px"} onClick={() => setStars(stars == 2 ? 0 : 2)} active={stars >= 2} />
      <Star w={"20px"} h={"20px"} onClick={() => setStars(stars == 3 ? 0 : 3)} active={stars >= 3} />
      <Star w={"20px"} h={"20px"} onClick={() => setStars(stars == 4 ? 0 : 4)} active={stars >= 4} />
      <Star w={"20px"} h={"20px"} onClick={() => setStars(stars == 5 ? 0 : 5)} active={stars >= 5} />
    </div>
  );
};

export const Stars = ({ num }) => {
  return (
    <div className="flex items-center">
      <Star active={num >= 1} />
      <Star active={num >= 2} />
      <Star active={num >= 3} />
      <Star active={num >= 4} />
      <Star active={num == 5} />
    </div>
  );
};
