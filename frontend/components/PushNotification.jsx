import { ErrorIcon, SuccessIcon, XIcon } from "./shared/Icons";

export const PushNotification = ({ type, message, onClick }) => {
  return (
    <div
      className={`fixed bottom-4 right-2 z-50 ${
        (type === "error" && "bg-red-500") ||
        (type === "success" && "bg-green-500")
      } text-white font-bold rounded-lg border shadow-lg px-6 py-3`}
    >
      <div className="flex items-center">
        {type === "success" && <SuccessIcon />}
        {type === "error" && <ErrorIcon />}
        <span>{message}</span>
        <button
          onClick={() => onClick()}
          className={`float-right ml-2 p-2 ${
            (type === "error" && "text-red-600") ||
            (type === "success" && "text-green-600")
          } ${
            (type === "error" && "bg-red-100") ||
            (type === "success" && "bg-green-100")
          } rounded-full`}
        >
          <XIcon />
        </button>
      </div>
    </div>
  );
};
