import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AxiosError } from 'axios';
import { Eye } from '../icons';
import { login } from '../api/auth';
import { useAuth, useDarkTheme } from '../contexts';
import { customToast } from '../utils';
import { Logo } from '../components/common';
import { Nav, Or, SignInWithGoogle, Copyright } from '../components/auth';

export type LoginFormValues = {
  email: string
  password: string
};

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();
    const loginMutation = useMutation({ mutationFn:  (data: LoginFormValues) => login(data) });

    const navigate = useNavigate();
    
    const { setToken } = useAuth();

    const { isDarkTheme } = useDarkTheme();

    const { i18n, t } = useTranslation();
    
    const onSubmit = (data: LoginFormValues) => {
      loginMutation.mutate(data);
    };

    useEffect(() => {
      if (loginMutation.isSuccess) {
        customToast(t(loginMutation.data.data.message), '✅', isDarkTheme)
        const token = loginMutation.data.data.token;
        setToken(token);
        window.localStorage.setItem('token', token);
        navigate(`/${i18n.language}`, { replace: true });
      } 
    }, [loginMutation.isSuccess]);

    const [isTypePassword, setIsTypePassword] = useState<boolean>(true);

    const handleTogglePasswordType = () : void => {
        setIsTypePassword((prev) => !prev);
    };

    return (
        <>
            <main className='w-screen h-screen p-4 flex flex-col justify-center items-center gap-y-8 login'>

                <Logo parent='auth' />

                <div className='bg-white max-w-[320px] sm:w-[400px] sm:max-w-[400px] p-4 rounded-md shadow-md flex flex-col gap-y-4'>

                    <Nav parent='login' />

                    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' className='flex flex-col gap-y-4'>

                        <div className='flex flex-col gap-y-1'>
                          
                            <input type='email' { ...register('email', { required: { value: true, message: t('email_is_required') }})} placeholder={t('email')} className='text-sm w-full px-2 py-1.5 rounded-sm border-1 border-dark-three focus:outline-none' />
                          
                            { errors?.email && <p className='text-error text-xs'>{errors.email.message}</p> }
                          
                            { loginMutation.isError && loginMutation.error instanceof AxiosError && loginMutation.error?.response?.data?.errors?.email && <p className='text-error text-xs'>{t(loginMutation.error.response.data.errors.email)}</p> }
                        
                        </div>
                      
                      <div className='flex flex-col gap-y-1 relative'>
                        
                          <input type={isTypePassword ? 'password' : 'text'} { ...register('password', { required: { value: true, message: t('password_is_required') }})} placeholder={t('password')} className='text-sm w-full pl-2 pr-8 py-1.5 rounded-sm border-1 border-dark-three focus:outline-none' />
                          
                          <button type='button' onClick={handleTogglePasswordType} className='text-dark-three  cursor-pointer select-none absolute top-2 right-2 transition-colors duration-300 ease-in-out hover:text-dark-one'><Eye /></button>

                          { errors?.password && <p className='text-error text-xs'>{errors.password.message}</p> }
                        
                          { loginMutation.isError  && loginMutation.error instanceof AxiosError && loginMutation.error?.response?.data?.errors?.password && <p className='text-error text-xs'>{t(loginMutation.error.response.data.errors.password)}</p> }
                      
                      </div>

                      <Link to={`/${i18n.language}/account/recover`} className='text-dark-three text-sm underline transition-[color] duration-300 ease-in-out hover:text-black'>Forgot your password?</Link>


                      { loginMutation.isError 
                      
                      ?  ( loginMutation.error instanceof AxiosError && loginMutation.error?.response?.data?.error 

                        ?   <p className='text-error text-xs'>{t(loginMutation.error.response.data.error)}</p> 

                        :   <p className='text-error text-xs'>{t('internal_server_error')}</p>  )

                      : null
                      
                      } 

                        <button type='submit' disabled={loginMutation.isPending} className={`bg-gold text-sm w-full p-1 rounded-sm ${loginMutation.isPending ? 'opacity-50 pointer-events-none' : 'opacity-100 cursor-pointer'} select-none  hover:brightness-90 transition-[all] duration-300 ease-in-out`}>{t('login')}</button>

                    </form>

                    <Or />

                    <SignInWithGoogle />

                </div>

                <Copyright />

            </main>
          
        </>
    );
};

export default Login;