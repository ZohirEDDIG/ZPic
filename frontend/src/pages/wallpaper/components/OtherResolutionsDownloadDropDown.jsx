import { Link } from 'react-router-dom';

const OtherResolutionsDownloadDropDown = ({ device }) => {
    const appleResolutions = [
        {
            name: '1242X2688',
            devices: 'iPhone XS Max'
        },
        {
            name: '1125x2436',
            devices: 'iPhone X / XS'
        },
        {
            name: '1080x1920',
            devices: 'iPhone 6S+/7+/8+'
        },
        {
            name: '750x1334',
            devices: 'iPhone 6, 6S+, 7, 8'
        }
    ];

    const androidResolutions = [
        {
            name: '1440x2960',
            devices: 'Samsung Galaxy S8/S8+/S9/S9+/Note 8/Note 9 QHD'
        },
        {
            name: '1440x2560',
            devices: 'Google Pixel XL, Meizu Pro 7, Nokia 8, HTC U, Huawei P10, Quad HD'
        },
        {
            name: '1080x1920',
            devices: 'Android Phone Sony Xperia XA2/X/Z, Samsung Galaxy S4/S5/J7/A5, Meizu M5/M6 Note, Xiaomi Redmi Note 3 Full HD'
        },
        {
            name: '720x1280',
            devices: 'Android Phone HD Samsung Galaxy S3/J3/J4/J5, Meizu M5, Sony Xperia L1/L2'
        }
    ];

    const widescreenResolutions = [
        {
            name: '2560x1440',
            devices: 'WQHD, QHD, 16:9'
        },
        {
            name: '1920x1080',
            devices: 'Full HD, HDTV, 1080p, 16:9'
        },
        {
            name: '1366x768',
            devices: 'Laptop'
        },
        {
            name: '1280x720',
            devices: 'HD, HDV, 720p, 16:9'
        },
    ]

    const deviceDropdown = device === 'apple' ? appleResolutions : device === 'android' ? androidResolutions : widescreenResolutions;

    return (
        <div className={`bg-gray-800 ${device === 'android' ? 'max-[450px]:w-[250px] w-[350px]' : 'max-[450px]:w-[250px] w-[280px]'} p-4 flex flex-col gap-y-2 rounded-md shadow-lg absolute top-8 md:right-0 z-10`}>

            {

                deviceDropdown.map((item, index) => (

                    <div key={index} className='grid grid-cols-2 gap-x-4'>

                        <Link to='/' className='text-white text-sm text-left'>{item.name}</Link>

                        <span className={`text-gray-600 text-xs text-left cursor-auto select-text`}>{item.devices}</span>

                    </div>

                ))

            }
        
        </div>
    );
};

export default OtherResolutionsDownloadDropDown;