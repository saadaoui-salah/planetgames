import Logo from "@/public/static/logo.png"
import Image from "next/image"

const isRTL = (text) => {
  // Simple heuristic: Check if the first character is within Arabic Unicode range
  const arabicRegex = /[\u0600-\u06FF]/;
  return arabicRegex.test(text.trim());
};

export const Post = ({image , description, date, is_video}) => {
    return (
<div className="max-w-xl mx-auto p-4 bg-white rounded-lg shadow-md border border-gray-200">
  <div className="flex items-center">
    <Image 
      src={Logo}
      width={100} 
      height={100} 
      alt="Profile" 
      className="w-10 h-10 rounded-full border border-2 border-purple-300"
    />
    <div className="ml-3">
      <h3 className="font-semibold text-gray-800">Planet Games</h3>
      <p className="text-sm text-gray-500">{date}</p>
    </div>
  </div>
  <div className="mt-4">
    <p style={{ whiteSpace: 'pre-line' }} dir='rtl' className="text-gray-700">
          {description.split('\n').map((line, index) => ( line ?
        <div
          key={index}
          dir={isRTL(line) ? 'rtl' : 'ltr'}
          style={{
            textAlign: isRTL(line) ? 'right' : 'left',
            margin: '5px 0',
          }}
        >
          {line}
        </div>: <br/>
      ))}
    </p>
  </div>
    <div className="mt-4">
     {image && !is_video && (<Image 
      src={image}
      width={10000} 
      height={10000} 
      alt="Profile"
      className="w-full max-h-[300px] rounded-lg"
    />)}
    {image && is_video && (<video 
      src={image}
      className="w-full max-h-[300px] rounded-lg"
    />)}
  </div>
</div>
    )
}