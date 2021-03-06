import { ReactComponent as SearchIcon } from 'assets/images/icon/search.svg';
import Input from 'assets/theme/Input/Input';

import classNames from 'classnames/bind';
import { useRef } from 'react';
import styles from './DonateSearchBar.module.scss';
const cx = classNames.bind(styles);

const DonateSearchBar = ({ onClick }: any) => {
  const inputRef: any = useRef();

  const handleEnterClick = (e: any) => {
    if (e.key === 'Enter') {
      onClick(inputRef.current.value);
    }
  };
  return (
    <div className={cx('search-bar')} onKeyDown={handleEnterClick}>
      <SearchIcon />
      <input
        placeholder="검색어를 입력해주세요."
        ref={inputRef}
        className={cx('input')}
      />
    </div>
  );
};

export default DonateSearchBar;
