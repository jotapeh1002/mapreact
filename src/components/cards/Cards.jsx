
export function Cards({cardImages, title, result}){
    return(
        <div className="flex flex-col justify-center border-l-8 m-5 border-blue-500 rounded-xl p-3 w-72 bg-neutral-300">
            <div className="flex items-center  pr-3 justify-between">
                <div> <img className="" src={cardImages} width="70px" alt=""/></div>
                <div className="flex flex-col items-end">
                    <span className="text-gray-500">{title}</span>
                    <span id="ubs" className=" text-2xl font-bold">{result}</span>
                </div>
            </div>
        </div>
    )
}