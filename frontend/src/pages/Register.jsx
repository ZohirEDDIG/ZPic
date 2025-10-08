import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Eye } from '../icons';
import { useAuth } from '../contexts';
import { Logo } from '../components/common';
import { Nav, Or, SignInWith, Copyright } from '../components/auth';


const Register = () => {
    const { register : RHFRegister, handleSubmit, formState: { errors } } = useForm();

    const { registerMutation } = useAuth();

    const onSubmit = (data) => {
        registerMutation.mutate(data);
    };

    useEffect(() => {
        return () => registerMutation.reset();
    }, []);
    
    const [isTypePassword, setIsTypePassword] = useState(true);
    
    const handleTogglePasswordType = () => {
        setIsTypePassword((prev) => !prev);
    };
    
    const { i18n, t } = useTranslation();

    return (
        <main className='w-screen h-screen p-4 flex flex-col justify-center items-center gap-y-4 sm:gap-y-8 register'>

            <Logo parent='auth' />

            <div className='bg-white  max-w-[320px] sm:w-[400px] sm:max-w-[400px] p-4 rounded-md shadow-md flex flex-col gap-y-4'>

                <Nav parent='register' />

                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>

                    <div className='flex flex-col gap-y-1'>
                        
                        <input type='text' {...RHFRegister('username', { required: { value: true, message: t('username_is_required') }, pattern: { value: /^[a-zA-Z0-9.-_@]{3,}$/, message: t('invalid_username_format') } })}  placeholder={t('username')} className='text-sm w-full px-2 py-1.5 border-1 border-gray-600 rounded-sm focus:outline-none' />
                        
                        { errors?.username && <p className='text-red-500 text-xs'>{errors.username.message}</p> }
                        
                        { !errors?.username && registerMutation.isError && registerMutation.error.response.data.errors.username.message && <p className='text-red-500 text-xs'>{t(registerMutation.error.response.data.errors.username.message)}</p> }
                    
                    </div>

                    <div className='flex flex-col gap-y-1'>
                        
                        <input type='email' { ...RHFRegister('email',  { required: { value: true, message: t('email_is_required') }, pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: t('invalid_email_format') } })} placeholder={t('email')} className='text-sm w-full px-2 py-1.5 border-1 border-gray-600 rounded-sm focus:outline-none' />
                        
                        { errors?.email && <p className='text-red-500 text-xs'>{errors.email.message}</p> }
                        
                        { !errors?.email && registerMutation.isError && registerMutation.error.response.data.errors.email.message && <p className='text-red-500 text-xs'>{t(registerMutation.error.response.data.errors.email.message)}</p> }
                    
                    </div>

                    <div className='flex flex-col gap-y-1 relative'>
                        
                        <input type={isTypePassword ? 'password' : 'text'} {...RHFRegister('password', { required: { value: true, message: t('password_is_required') }, pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$/, message: t('invalid_password_format')}})} placeholder={t('password')} className='text-sm w-full px-2 py-1.5 border-1 border-gray-600 rounded-sm focus:outline-none' />
                        
                        <button type='button' onClick={handleTogglePasswordType} className='text-gray-600 cursor-pointer select-none absolute top-2 right-2 transition-colors duration-300 ease-in-out hover:text-gray-900'><Eye /></button>

                        { errors?.password && <p className='text-red-500 text-xs'>{t(errors.password.message)}</p> }
                        
                        { !errors?.password && registerMutation.isError && registerMutation.error.response.data.errors.password.message && <p className='text-red-500 text-xs'>{t(registerMutation.error.response.data.errors.password.message)}</p> }
                    
                    </div>
            
                    { 
                        registerMutation.isError  && registerMutation.error.response.data.error 

                        ?  <p className='text-red-500 text-xs'>{t(registerMutation.error.response.data.error)}</p> 

                        :  null
                        
                    }  

                    <button type='submit' className={`bg-gold text-sm w-full p-1 rounded-sm ${registerMutation.isPending ? 'opacity-50 pointer-events-none' : 'opacity-100 cursor-pointer'} select-none hover:brightness-90 transition-[filter] duration-300 ease-in-out`}>{registerMutation.isPending ? t('registering') : t('register')}</button>

                    <p className='text-gray-600 text-xs'>

                        {t('private_policy_auth')}

                        {' '}

                        <Link to={`/${i18n.language}/terms`} className='underline transition-[color] duration-300 ease-in-out hover:text-black'>{t('user_agreement')}</Link>

                        {' '}

                        {t('and')}

                        {' '}

                        <Link to={`/${i18n.language}/privacy`} className='underline transition-[color] duration-300 ease-in-out hover:text-black'>{t('privacy_policy')}</Link>

                        .

                    </p>

                </form>

                <Or />

                <SignInWith />

            </div>

            <Copyright />

        </main>

    );
};

export default Register;