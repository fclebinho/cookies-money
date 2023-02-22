import styles from '@/styles/components/Avatar.module.css';

import Image from 'next/image';


const Avatar = ({ src = '', alt = '' }) => (
  <div className={styles.avatar}>
    {src ? <Image src={src} width={40} height={40} alt={alt} /> : null}
  </div>
);

export default Avatar;
