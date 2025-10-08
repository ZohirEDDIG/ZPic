import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { IonIcon } from '@ionic/react';
import { logoApple, logoAndroid, desktopOutline, chevronDownOutline} from 'ionicons/icons';

import { useClickOutside } from '../../../hooks';

import OtherResolutionsDownloadDropDown from './OtherResolutionsDownloadDropDown';

const OtherResolutionsDownload = () => {
    const [deviceDropdown, setDeviceDropdown] = useState('');

    const handleChangeDropdown = (e, device) => {
        deviceDropdownRef.current = e.target;
        deviceDropdownButtonRef.current = e.target;
        
        setDeviceDropdown(device);
    };

    const { t } = useTranslation();

    const deviceDropdownRef = useRef(null);
    const deviceDropdownButtonRef = useRef(null);

    const handleCloseDeviceDropdown = () => {
        setDeviceDropdown('');
    };

    useClickOutside(deviceDropdownRef, deviceDropdownButtonRef, handleCloseDeviceDropdown);


    return (
        <div className='flex flex-col md:flex-row md:justify-center md:items-center gap-x-10 gap-y-5'>

            <h2 className='text-gray-500'>{t('download_in_other_resolutions')}</h2>

            <div className='flex flex-col sm:flex-row gap-x-5 gap-y-2.5'>

                <button type='button' onClick={(e) => handleChangeDropdown(e, 'apple')} className='dark:text-white w-fit flex items-center gap-x-2 cursor-pointer select-none relative'>

                    <IonIcon icon={logoApple} />                    
                    
                    Apple

                    <IonIcon icon={chevronDownOutline} />   

                    { deviceDropdown === 'apple' && <OtherResolutionsDownloadDropDown device='apple' /> }

                </button>
                
                <button type='button' onClick={(e) => handleChangeDropdown(e, 'android')} className='dark:text-white w-fit flex items-center gap-x-2 cursor-pointer select-none relative'>

                    <IonIcon icon={logoAndroid} />   

                    Android

                    <IonIcon icon={chevronDownOutline} />   

                    { deviceDropdown === 'android' && <OtherResolutionsDownloadDropDown device='android' /> }

                </button>

                <button type='button' onClick={(e) => handleChangeDropdown(e, 'widescreen')} className='dark:text-white w-fit flex items-center gap-x-2 cursor-pointer select-none relative'>

                    <IonIcon icon={desktopOutline} />   

                    {t('widescreen')}

                    <IonIcon icon={chevronDownOutline} />   

                    { deviceDropdown === 'widescreen' && <OtherResolutionsDownloadDropDown device='widescreen' /> }

                </button>

            </div>

        </div>
    );
};

export default OtherResolutionsDownload;