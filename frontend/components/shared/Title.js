export const Title = ({ text, emoji }) => {
  return (
    <h1
      className="
        text-center
        text-3xl 
        font-bold 
        underline 
        underline-offset-[16px]
         text-gray-900 py-5"
    >
      {text} {emoji}
    </h1>
  );
};
