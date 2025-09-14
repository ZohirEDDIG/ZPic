import toast from 'react-hot-toast';

const customToast = (content, icon, isDarkTheme) => {
    toast(content, { 
        icon: icon, 
        style: { 
            backgroundColor: isDarkTheme ? '#000000' : '#ffffff', 
            color: isDarkTheme ? '#ffffff' : '#000000' ,
            fontSize: 14
        }
    });
};

export default customToast;