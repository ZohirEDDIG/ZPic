const SignInWith = () => {
    return (
        <div className='flex gap-x-[5%]'>

            <button type='button' className='text-sm w-[47.5%] mx-auto px-4 py-1 border-1 border-gray-600 rounded-sm flex justify-center items-center gap-x-2 cursor-pointer select-none transition-opacity duration-300 ease-in-out hover:opacity-90'>

                <img src='/google.svg' alt='Google icon' className='w-6' /> 

                <span>Google</span>

            </button>

            <button type='button' className='bg-facebook text-white text-sm w-[47.5%]  mx-auto px-4 py-1 border-1 border-gray-600 rounded-sm flex justify-center items-center gap-x-2 cursor-pointer select-none transition-opacity duration-300 ease-in-out hover:opacity-90'>

                <img src='/facebook.svg' alt='Facebook icon' className='w-6' /> 

                <span>Facebook</span>

            </button>
        
        </div>
    );
};

export default SignInWith;