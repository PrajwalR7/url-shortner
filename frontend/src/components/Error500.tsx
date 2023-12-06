export default function Error500() {
    return (
        <div className="min-h-screen w-full p-8 flex flex-col bg-black gap-12 justify-center items-center">
            <h1 className="text-9xl text-gray-300 font-thin">500</h1>
            <p className="text-xl text-center text-white w-[40%]">Sorry for the inconvience. This one is on us, the requested url cannot be visited now, please try again after sometime.</p>
        </div>
    )
}