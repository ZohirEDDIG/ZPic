import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import UploadContext from './UploadContext';
import { useAuth, useDarkTheme } from '../index';
import { uploadWallpaper } from '../../api/wallpaper';
import { customToast } from '../../utils';


const UploadProvider = ({ children }) => {
    const [wallpaper, setWallpaper] = useState({ file: null, preview: '' });
    const [wallpaperDetails, setWallpaperDetails] = useState({ name: '', resolution: '', size: '' });
    const [category, setCategory] = useState('');
    const [tag, setTag] = useState('')
    const [tags, setTags] = useState([]);
    const [uploaodWallpaperErrors, setUploaodWallpaperErrors] = useState({ category: '', tags: '' });
    
    const { token, user }  = useAuth();
    const { isDarkTheme } = useDarkTheme();

    const uploadWallpaperMutation = useMutation({ mutationFn: uploadWallpaper });

    const handleDrop = (e) => {
        const file = e.target.files[0];
        const preview = URL.createObjectURL(file);
        setWallpaper({ file, preview });

        const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
            
        const img = new Image();
        img.onload = () => {
            const resolution = `${img.width}x${img.height}`;
            setWallpaperDetails({ name: file.name, size: `${sizeInMB} MB`, resolution: resolution });
        };

        img.src = preview;
    };

    const handleChangeCategory = (e) => {
        if (uploaodWallpaperErrors.category) setUploaodWallpaperErrors((prev) => ({ ...prev, category: '' }));
        const category = e.target.value.replaceAll('_', ' ');
        setCategory(category);
    };

    const handleAddTag = (e) => {
        if (e.key === 'Enter') {
            setTags((prev) => [...prev, tag]);
            setTag('');
            if (uploaodWallpaperErrors.tags) setUploaodWallpaperErrors((prev) => ({ ...prev, tags: '' }));
        } else {
            if (e.target.value.startsWith(' ')) return;
            setTag(e.target.value);
        }
    };

    const handleRemoveTag = (e) => {
        const tag = e.target.textContent;
        setTags((prev) => prev.filter((t) => t !== tag));
    };

    const handleClear = () => {
        setWallpaper({ file: null, preview: '' });
        setWallpaperDetails({ name: '', resolution: '', size: '' });
        setCategory('');
        setTag('')
        setTags([]);
        setUploaodWallpaperErrors({ category: '', tags: '' });
    };

    const handleUploadWallpaper = () => {
        setUploaodWallpaperErrors({ category: '', tags: '' });

        if (!category) {
            setUploaodWallpaperErrors((prev) => ({ ...prev, category: 'please_select_a_category' }));
        }

        if (tags.length === 0) {
            setUploaodWallpaperErrors((prev) => ({ ...prev, tags: 'please_specify_at_least_one_tag' }));
        }

        if (tags.length > 3) {
            setUploaodWallpaperErrors((prev) => ({ ...prev, tags: 'you_can_only_specify_up_to_3_tags' }));
        }

        if (!category || tags.length === 0 || tags.length > 3) return;

        const formData = new FormData();

        formData.append('wallpaper', wallpaper.file);
        formData.append('name', wallpaperDetails.name);
        formData.append('resolution', wallpaperDetails.resolution);
        formData.append('size', wallpaperDetails.size);
        formData.append('category', category);

        tags.forEach((tag) => {
            formData.append('tags[]', tag);  
        });

        uploadWallpaperMutation.mutate({ data: formData, token });
    };

    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        if (uploadWallpaperMutation.isSuccess) {
            customToast(t(uploadWallpaperMutation.data.data.message), '✅', isDarkTheme);
            handleClear();
            navigate(`/${i18n.language}/profile/${user.username}`);
        }

        if (uploadWallpaperMutation.isError) {
            customToast(t(uploadWallpaperMutation.error.response.data.error), '❌', isDarkTheme);
        }
    }, [uploadWallpaperMutation.isSuccess, uploadWallpaperMutation.isError]);

   
    const value = {
        wallpaper,
        setWallpaper,
        wallpaperDetails,
        setWallpaperDetails,
        category,
        setCategory,
        tag, setTag, tags, setTags,
        handleDrop,
        handleChangeCategory,
        handleAddTag,
        handleRemoveTag,
        handleClear,
        handleUploadWallpaper,
        uploadWallpaperMutation,
        uploaodWallpaperErrors
    };
    
    return (
        <UploadContext.Provider value={value}>
            {children}
        </UploadContext.Provider>
    );
};

export default UploadProvider;