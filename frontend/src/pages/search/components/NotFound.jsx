import { FaSearch, FaCheck, FaTag } from "react-icons/fa";
import { FaArrowsRotate } from 'react-icons/fa6'

const NotFound = () => {
    return (
        <div className='screen-minus-header flex flex-col justify-center items-center gap-y-20'>

            <div className="flex flex-col items-center gap-y-5">
                <FaSearch  className="text-gray-600 text-4xl" />
                
                <h1 className="text-white text-xl">No results were found for your search</h1>

            </div>

            <div className="flex items-center gap-x-20">

                <div className="flex flex-col items-center gap-y-5">

                   <FaCheck  className="text-gray-600 text-2xl"/> 
                   
                   <h1 className="text-white text-xl">Check your spelling</h1>
                
                </div>

                <div className="flex flex-col items-center gap-y-5">
                    
                    <FaTag className="text-gray-600 text-2xl" />

                    <h1 className="text-white text-xl">Use other keywords</h1>
                
                </div>

                <div className="flex flex-col items-center gap-y-5">
                    
                    <FaArrowsRotate className="text-gray-600 text-2xl"/>

                    <h1 className="text-white text-xl">Try to simplify your search</h1>
                
                </div>

            </div>

        </div>
    );
}

export default NotFound;