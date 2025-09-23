import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Eye } from '../icons';
import { useAuth } from '../contexts';
import { Logo } from '../components/common';
import { Nav, Or, SignInWith, Copyright } from '../components/auth';


const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { loginMutation } = useAuth();
    
    const onSubmit = (data) => {
        loginMutation.mutate(data);
    };

    useEffect(() => {
        return () => loginMutation.reset();
    }, []);
    
    const [isTypePassword, setIsTypePassword] = useState(true);
    
    const handleTogglePasswordType = () => {
        setIsTypePassword((prev) => !prev);
    };

    const { i18n, t } = useTranslation();

    return (
        <main className='w-screen h-screen p-4 flex flex-col justify-center items-center gap-y-8 login'>

            <Logo parent='auth' />

            <div className='bg-white max-w-[320px] sm:w-[400px] sm:max-w-[400px] p-4 rounded-md shadow-md flex flex-col gap-y-4'>

                <Nav parent='login' />

                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>

                    <div className='flex flex-col gap-y-1'>
                      
                        <input type='email' { ...register('email', { required: { value: true, message: t('email_is_required') }})} placeholder={t('email')} className=' w-full text-sm px-2 py-1.5 rounded-md border-1 border-gray-600 focus:outline-none' />
                      
                        { errors?.email && <p className='text-red-500 text-xs'>{errors.email.message}</p> }
                      
                        { !errors?.email && loginMutation.isError && loginMutation.error.response.data.errors && loginMutation.error.response.data.errors.email.message && <p className='text-red-500 text-xs'>{t(loginMutation.error.response.data.errors.email.message)}</p> }
                    
                    </div>
                  
                    <div className='flex flex-col gap-y-1 relative'>
                        
                        <input type={isTypePassword ? 'password' : 'text'} { ...register('password', { required: { value: true, message: t('password_is_required') }})} placeholder={t('password')} className='w-full text-sm pl-2 pr-8 py-1.5 rounded-sm border-1 border-gray-600 focus:outline-none' />
                        
                        <button type='button' onClick={handleTogglePasswordType} className='text-gray-600 cursor-pointer select-none absolute top-2 right-2 transition-colors duration-300 ease-in-out hover:text-gray-900'><Eye /></button>

                        { errors?.password && <p className='text-red-500 text-xs'>{errors.password.message}</p> }
                        
                        { !errors?.password && loginMutation.isError && loginMutation.error.response.data.errors &&  loginMutation.error.response.data.errors.password.message && <p className='text-red-500 text-xs'>{t(loginMutation.error.response.data.errors.password)}</p> }
                    
                    </div>

                    <Link to={`/${i18n.language}/account/recover`} className='text-gray-600 text-sm underline transition-[color] duration-300 ease-in-out hover:text-black'>{t('forgot_your_password')}</Link>


                    {
                        loginMutation.isError  && loginMutation.error?.response?.data?.error 

                        ?   <p className='text-red-500 text-xs'>{t(loginMutation.error.response.data.error)}</p> 

                        :   null
                    } 

                    <button type='submit' disabled={loginMutation.isPending} className={`bg-gold text-sm w-full p-1 rounded-sm ${loginMutation.isPending ? 'opacity-50 pointer-events-none' : 'opacity-100 cursor-pointer'} select-none  transition-[filter] duration-300 ease-in-out hover:brightness-90 `}>{loginMutation.isPending ? t('logging_in') : t('login')}</button>

                </form>

                <Or />

                <SignInWith />

            </div>

            <Copyright />

        </main>
    );
};

export default Login;