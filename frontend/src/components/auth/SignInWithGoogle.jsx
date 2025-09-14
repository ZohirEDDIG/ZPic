import { useTranslation } from 'react-i18next';

const SignInWithGoogle = () => {
    const { t } = useTranslation();

    return (
        <button type='button' className='text-sm w-fit mx-auto px-4 py-1 border-1 border-gray-600 rounded-sm  flex items-center gap-x-2 cursor-pointer select-none transition-[background-color] duration-300 ease-in-out hover:bg-gray-200'>

            <img src='/google.svg' alt='Google icon' className='w-6' /> 

            <span>{t('sign_in_with_google')}</span>

        </button>
    );
};

export default SignInWithGoogle;