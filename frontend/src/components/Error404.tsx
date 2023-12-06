import { Link } from "react-router-dom";

export default function Error404() {
    return (
        <div className="min-h-screen w-full p-8 flex flex-col bg-black gap-12 justify-center items-center">
            <h1 className="text-9xl text-gray-300 font-thin">404</h1>
            <p className="text-xl text-center text-white w-[40%]">The entered URL is invalid, 
                please type the correct shorturl. 
                If you havent created this shorturl yet, create it <Link to="/"><span className="underline text-indigo-400">here</span></Link>
            </p>
        </div>
    )
}