import { Viewer } from '@toast-ui/react-editor';
import H1 from 'assets/theme/Typography/H1/H1';
import H2 from 'assets/theme/Typography/H2/H2';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import styles from './DonateContentModal.module.scss';
import { ReactComponent as CloseIcon } from 'assets/images/icon/close.svg';

const cx = classNames.bind(styles);

type modalType = {
  open: boolean;
  onClose: any;
  contents: any;
};
const DonateContentModal = ({ open, onClose, contents }: modalType) => {
  const handleOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log(event.target);
  };

  return (
    <div
      className={cx('modal', { openModal: open === true })}
      onClick={handleOnClick}
      id="modal"
      // onMouseUp={handleOnClick}
    >
      {open ? (
        <section className={cx('modalForm')}>
          <div className={cx('header')}>
            <div className={cx('title')}>
              <H2>신청자의 글</H2>
            </div>
            <div className={cx('close-btn')} onClick={() => onClose()}>
              <CloseIcon />
            </div>
          </div>
          <main className={cx('content')}>
            {contents !== '' ? <Viewer initialValue={contents} /> : null}
          </main>
        </section>
      ) : null}
    </div>
  );
};

export default DonateContentModal;
