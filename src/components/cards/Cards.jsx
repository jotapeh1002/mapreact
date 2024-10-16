
export function Cards({cardImages, title, result ,imgW = "70px" , width = 'w-72'}){
    return(
        <div className={`flex flex-col justify-center border-l-8 my-3 border-blue-500 rounded-xl p-3 ${width} bg-neutral-300`}>
            <div className="flex items-center  pr-3 justify-between">
                <div className=" overflow-hidden"> <img className="" src={cardImages} width={imgW} alt=""/></div>
                <div className="flex flex-col items-end">
                    <span className="text-gray-500">{title}</span>
                    <span id="ubs" className=" text-2xl font-bold">{result}</span>
                </div>
            </div>
        </div>
    )
}