import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AxiosError } from 'axios';
import { Eye } from '../icons';
import { register } from '../api/auth';
import { useDarkTheme } from '../contexts';
import { customToast } from '../utils';
import { Logo } from '../components/common';
import { Nav, Or,  SignInWithGoogle, Copyright } from '../components/auth';

export type RegisterFormValues = {
  username: string
  email: string
  password: string
}

const Register = () => {
    const { register : RHFRegister, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>();
    const registerMutation = useMutation({ mutationFn:  (data: RegisterFormValues) => register(data) });

    const navigate = useNavigate();
        

    const { isDarkTheme } = useDarkTheme();

    const { i18n, t } = useTranslation();
      
  
    const onSubmit = (data: RegisterFormValues) => {
        registerMutation.mutate(data);
    }
    
    useEffect(() => {
        if (registerMutation.isSuccess) {
            customToast(t(registerMutation.data.data.message),  '✅', isDarkTheme);
            navigate(`/${i18n.language}/login`, { replace: true });
        } 
    }, [registerMutation.isSuccess]);
    
    const [isTypePassword, setIsTypePassword] = useState<boolean>(true);
  
    const handleTogglePasswordType = () : void => {
        setIsTypePassword((prev) => !prev);
    };

    return (
        <>

            <main className='w-screen h-screen p-4 flex flex-col justify-center items-center gap-y-4 sm:gap-y-8 login'>

                <Logo parent='auth' />

                <div className='bg-white  max-w-[320px] sm:w-[400px] sm:max-w-[400px] p-4 rounded-md shadow-md flex flex-col gap-y-4'>

                    <Nav parent='register' />

                    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' className='flex flex-col gap-y-4'>

                        <div className='flex flex-col gap-y-1'>
                            
                            <input type='text' {...RHFRegister('username', { required: { value: true, message: t('username_is_required') }, pattern: { value: /^[a-zA-Z0-9.-_@]{3,}$/, message: t('invalid_username_format') } })}  placeholder={t('username')}className='text-sm w-full px-2 py-1.5 rounded-sm border-1 border-dark-three focus:outline-none' />
                            
                            { errors?.username && <p className='text-error text-xs'>{ errors.username.message }</p> }
                            
                            { registerMutation.isError && registerMutation.error instanceof AxiosError &&  registerMutation.error?.response?.data?.errors?.username && <p className='text-error text-xs'>{t(registerMutation.error.response.data.errors.username)}</p> }
                        
                        </div>

                        <div className='flex flex-col gap-y-1'>
                          
                          <input type='email' { ...RHFRegister('email',  { required: { value: true, message: t('email_is_required') }, pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: t('invalid_email_format') } })} placeholder={t('email')} className='text-sm w-full px-2 py-1.5 rounded-sm border-1 border-dark-three focus:outline-none' />
                          
                          { errors?.email && <p className='text-error text-xs'>{ errors.email.message }</p> }
                          
                          { registerMutation.isError && registerMutation.error instanceof AxiosError &&  registerMutation.error?.response?.data?.errors?.email && <p className='text-error text-xs'>{t(registerMutation.error.response.data.errors.email)}</p> }
                        
                        </div>

                        <div className='flex flex-col gap-y-1 relative'>
                          
                          <input type={isTypePassword ? 'password' : 'text'} { ...RHFRegister('password', { required: { value: true, message: t('password_is_required') }, pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$/, message: t('invalid_password_format') } })} placeholder={t('password')} className='text-sm w-full px-2 py-1.5 rounded-sm border-1 border-dark-three focus:outline-none' />
                          
                          <button type='button' onClick={handleTogglePasswordType} className='text-dark-three  cursor-pointer select-none absolute top-2 right-2 transition-colors duration-300 ease-in-out hover:text-dark-one'><Eye /></button>

                          { errors?.password && <p className='text-error text-xs'>{ errors.password.message }</p> }
                          
                          { registerMutation.isError && registerMutation.error instanceof AxiosError && registerMutation.error?.response?.data?.errors?.password && <p className='text-error text-xs'>{t(registerMutation.error.response.data.errors.password)}</p> }
                        
                        </div>
              
                        { registerMutation.isError 
                          
                          ?  ( registerMutation.error instanceof AxiosError && registerMutation.error?.response?.data?.message 

                            ?  <p className='text-error text-xs'>{t(registerMutation.error.response.data.message)}</p> 

                            :  <p className='text-error text-xs'>{t('internal_server_error')}</p>  )

                          : null
                          
                        }  

                        <button type='submit' className={`bg-gold text-sm w-full p-1 rounded-sm ${registerMutation.isPending ? 'opacity-50 pointer-events-none' : 'opacity-100 cursor-pointer'} select-none hover:brightness-90 transition-[all] duration-300 ease-in-out`}>{t('register')}</button>

                        <p className='text-dark-three text-xs'>{t('private_policy')}</p>

                    </form>

                    <Or />

                    <SignInWithGoogle />

                </div>

                <Copyright />

            </main>

        </>

    );
};

export default Register;