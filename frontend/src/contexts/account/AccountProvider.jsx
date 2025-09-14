import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import AccounContext from './AccountContext';
import { useAuth, useDarkTheme } from '../index';
import { editCurrentUser } from '../../api/user';
import { customToast } from '../../utils';

const AccounProvider = ({ children }) => {
    const { token, user, getCurrentUserQuery } = useAuth();
    const [userData, setUserData] = useState({ username: '', website: '', about: '', avatarPreview: { avatarPreviewFile: null, avatarPreview: '' }});
    const [userDataErrors, setUserDataErrors] = useState({ username: { message: '' }, website: { message: '' }, about: { message: '' }});

    useEffect(() => {
        if (token && user?._id) {
            setUserData({ username: user.username, avatarPreview: { avatarPreviewFile: null, avatarPreview: user?.avatar }, website: user.website, about: user.about });
        } else {
            setUserData({ username: '', website: '', about: '', avatarPreview: { avatarPreviewFile: null, avatarPreview: '' }});
        }
    }, [token, user?._id]);

    const editCurrentUserMutation = useMutation({ mutationFn: editCurrentUser });

    const handleSaveChanges = () => { 
        setUserDataErrors({ username: { message: '' }, website: { message: '' }, about: { message: '' }, avatarPreview: { message: '' }});

        if (!userData.username.trim()) {
            setUserDataErrors({ ...userDataErrors, username: { message: 'username_is_required' }});
        } else {
            const usernameRegExp = /^[a-zA-Z0-9.-_@]{3,}$/;
            if (!usernameRegExp.test(userData.username)) {
                setUserDataErrors({ ...userDataErrors, username: { message: 'invalid_username_format' }});
            }
        }

        if(userData.website.trim()) {
            const websiteRegExp = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
            if (!websiteRegExp.test(userData.website)) {
                setUserDataErrors({ ...userDataErrors, website: { message: 'invalid_website_format' }});
            }
        }

        if(userData.about.trim()) {
            if (userData.about.length > 120) {
                setUserDataErrors({ ...userDataErrors, about: { message: 'about_is_too_long' }});
            }
        }

        if (userDataErrors.username.message || userDataErrors.website.message || userDataErrors.about.message) {
            return;
        }

        const formData = new FormData();

        if (userData.username.trim() && userData.username !== user.username) {
            formData.append('username', userData.username.trim());
        };

        if (userData.avatarPreview.avatarPreviewFile) {
            formData.append('avatar', userData.avatarPreview.avatarPreviewFile);
        };

        if (userData.website.trim() && userData.website !== user.website) {
            formData.append('website', userData.website.trim());
        };

        if (userData.about.trim() && userData.about !== user.about) {
            formData.append('about', userData.about.trim());
        };

        editCurrentUserMutation.mutate({ token,  data: formData });
    };

    const { t } = useTranslation();
    const { isDarkTheme } = useDarkTheme();

    useEffect(() => {
        if (editCurrentUserMutation.isSuccess) {
            customToast(t(editCurrentUserMutation.data.data.message), '✅', isDarkTheme);
            getCurrentUserQuery.refetch();
        }

        if (editCurrentUserMutation.isError) {
            customToast(t(editCurrentUserMutation.error.response.data.error), '❌', isDarkTheme);
        }
    }, [editCurrentUserMutation.isSuccess, editCurrentUserMutation.isError]);

    const value = {
        user,
        userData, setUserData, 
        userDataErrors, 
        handleSaveChanges, 
        editCurrentUserMutation
    };

    return (
        <AccounContext.Provider value={value}>
            {children}
        </AccounContext.Provider>
    );
};

export default AccounProvider;