import Image from "next/image";
import { Stars } from "./Stars";
import { MEDIA_URL } from "@/roupi/utils";

export const HomeReviewCard = ({ name , review, stars, date }) => {
  return (
    <div className="overflow-hidden py-10">
      <div className="w-[20rem] rounded-lg border relative border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center pt-2">

        <p className="font-bold text-md px-4">{name}Salah</p>
        <Stars num={stars}/>
          </div>
        <p className="px-4 text-sm font-bold text-gray-400">{date}</p>
        </div>
        <p className="text-black text-ms mt-4 text-start px-4 pb-4 ">
          {review}
        </p>
      </div>
    </div>
  );
};

const StarBar = ({ value, starNum }) => {
  return (
    <div className="flex items-center mb-2">
      <span className="w-14 font-medium text-gray-900 mr-2">
        {starNum} stars
      </span>
      <div className="flex-1 h-2 relative">
        <div className="absolute w-[100%] py-1 h-full bg-gray-200 rounded-full"></div>
        <div
          className={`absolute h-full w-[${value}%] bg-yellow-300 rounded-full`}
        ></div>
      </div>
      <span className="ml-2 font-medium text-gray-900 text-center w-[50px]">
        {value} %
      </span>
    </div>
  );
};

const CustomerReview = ({ image, stars, review, date, fulllName }) => {
  function formatDate(str) {
    const date = new Date(str);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "UTC",
    };
    const formattedDate = date.toLocaleString("en-US", options);
    return formattedDate;
  }
  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4">
      <div className="flex items-center mb-2">
        <Image
          className="w-12 h-12 border border-gray-200 rounded-full mr-4"
          width={40}
          height={40}
          src={MEDIA_URL + image?.replace("/media/", "")}
          alt="User Avatar"
        />
        <div>
          <h3 className="text-base font-medium text-gray-900">{fulllName}</h3>
          <div className="flex items-center">
            <Stars num={stars} />
          </div>
        </div>
      </div>
      <p className="text-gray-700 px-2 py-2 text-sm mb-2">{review}</p>
      <div className="text-gray-500 text-xs mb-2">
        Reviewed on {formatDate(date)}
      </div>
    </div>
  );
};

export const ReviewCard = ({ reviews: { reviews, stats } }) => {
  return (
    <div className="flex flex-wrap gap-4 w-full justify-center">
      <div className="border border-gray-200 rounded-lg w-80 p-4 h-56">
        <h2 className="text-lg font-medium text-gray-900 mb-2">
          Product Ratings
        </h2>
        <StarBar starNum={5} value={stats[5]} />
        <StarBar starNum={4} value={stats[4]} />
        <StarBar starNum={3} value={stats[3]} />
        <StarBar starNum={2} value={stats[2]} />
        <StarBar starNum={1} value={stats[1]} />
      </div>
      <div className="md:w-1/2">
        {reviews?.map((review) => (
          <CustomerReview
            image={review?.image}
            review={review?.review}
            stars={review?.stars}
            fulllName={review?.first_name + " " + review.last_name}
            date={review?.created_at}
          />
        ))}
      </div>
    </div>
  );
};
