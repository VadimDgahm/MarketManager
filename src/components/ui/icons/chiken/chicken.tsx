import {FC} from 'react';

import {determineVersion} from '@/components/ui/icons/settingsIcons';
import {IconProps} from '@/components/ui/icons/typeIcons';

import s from '../Icons.module.scss';

type ChickenIconProps = { isReady?: boolean } & IconProps
export const ChickenIcon: FC<ChickenIconProps> = ({
                                                      isReady = true,
                                                      width = 18,
                                                      color = '',
                                                      version = 'dark',
                                                      ...rest
                                                  }) => {
    return (
        <svg  {...rest}
              className={`${s.svg} ${rest.className} `}
              fill={'none'}
              height={width}
              viewBox={'0 0 24 24'}
              width={width}
              xmlns={'http://www.w3.org/2000/svg'}>
            <g clipPath="url(#clip0_1222_44334)">
                {isReady &&
                    <>
                        <path d="M2.24341 2.24561V3.80811" stroke={color ? color : determineVersion(version)}
                              strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6.80591 2.24561V3.80811" stroke={color ? color : determineVersion(version)}
                              strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4.52466 1.08252V2.64502" stroke={color ? color : determineVersion(version)}
                              strokeLinecap="round" strokeLinejoin="round"/>
                    </>
                }

                <path
                    d="M12.464 5.55697C12.9914 5.55697 13.419 5.1294 13.419 4.60197C13.419 4.07454 12.9914 3.64697 12.464 3.64697C11.9365 3.64697 11.509 4.07454 11.509 4.60197C11.509 5.1294 11.9365 5.55697 12.464 5.55697Z"
                    stroke={color ? color : determineVersion(version)} strokeLinecap="round"/>
                <path
                    d="M10.8414 8.67691L11.0534 8.76972C12.5324 9.4708 12.9419 10.3756 12.9419 11.6207V11.9175C12.9419 12.4698 12.4942 12.9175 11.9419 12.9175H1.63988C1.31327 12.9175 1.00551 12.757 0.880421 12.4553C0.602891 11.786 0.281224 10.4417 1.11837 8.76979C2.32807 6.35374 5.30542 5.82312 7.21167 6.82353L7.30248 6.86931"
                    stroke={color ? color : determineVersion(version)} strokeLinecap="round" strokeLinejoin="round"/>
                <path
                    d="M10.1584 10.006C11.0858 8.98752 11.1339 7.52119 10.2659 6.73089C9.39797 5.94059 7.94257 6.12559 7.01521 7.14409C6.17332 8.06872 6.05605 9.36241 6.69098 10.1844C6.75545 10.2678 6.82767 10.3464 6.90767 10.4192"
                    stroke={color ? color : determineVersion(version)} strokeLinecap="round"/>
                <path d="M11.8059 5.29639L10.3212 6.78113" stroke={color ? color : determineVersion(version)}
                      strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
                <clipPath id="clip0_1222_44334">
                    <rect width="14" height="14" fill={color ? color : determineVersion(version)}/>
                </clipPath>
            </defs>
        </svg>
    );
};
