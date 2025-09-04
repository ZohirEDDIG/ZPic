import toast from 'react-hot-toast';

const customToast = (content: string, icon: string, isDarkTheme: boolean) => {
    toast(content, { 
        icon: icon, 
        style: { 
            backgroundColor: isDarkTheme ? '#373737' : '#ffffff', 
            color: isDarkTheme ? 'white' : 'black' 
        }
    });
};

export default customToast;