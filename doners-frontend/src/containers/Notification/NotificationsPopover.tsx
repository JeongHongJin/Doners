import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import {
  getNotificationList,
  readNotification,
} from 'services/api/NotificationApi';
import { NotificationItemType } from 'types/NotificationTypes';
import { ReactComponent as NotificationIcon } from 'assets/images/icon/bell.svg';

import styles from './NotificationsPopover.module.scss';
import Popover from 'assets/theme/Popover/Popover';
import H4 from 'assets/theme/Typography/H4/H4';
import NotificationItem from 'components/Notification/NotificationItem/NotificationItem';

const cx = classNames.bind(styles);

const NotificationsPopover = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NotificationItemType[]>(
    []
  );
  const totalUnReadCnt = notifications.filter(
    (item) => !item.notificationIsRead
  ).length;

  const handleOpen = () => {
    console.log('연다');
    setOpen(true);
  };

  const handleClose = () => {
    console.log('닫닫');
    setOpen(false);
  };

  const handleMarkAllAsRead = async () => {
    // 읽을 알림의 id 리스트
    // TODO 리스트로 읽음 처리하는 api (리팩토링 요청)
    notifications
      .slice(0, totalUnReadCnt)
      .forEach(async (item) => await readNotification(item.notificationId));

    // 알림 목록 갱신(새로고침)
    getUserNotificationList();
  };

  const getUserNotificationList = async () => {
    const { data } = await getNotificationList();
    console.log(data);

    // TODO
    // setNotifications(data);

    // 전처리 후 저장) 알림 목록을 읽음 -> 안읽음 기준으로 정렬
    // setNotifications(
    //   data.notificationList.sort(function (
    //     a: NotificationItemType,
    //     b: NotificationItemType
    //   ) {
    //     return a.notificationIsRead - b.notificationIsRead;
    //   })
    // );
  };

  useEffect(() => {
    getUserNotificationList();
  }, []);

  return (
    <>
      <div>
        <div onClick={handleOpen}>
          <NotificationIcon />
        </div>
        {open ? (
          <div className={cx('popover', { open: open })}>
            <div className={cx('blocker')} onClick={handleClose}></div>
            <div className={cx('contents')}>
              <H4>Notifications</H4>
              <div>
                <div>
                  <div>총{totalUnReadCnt} 개의 새로운 알림이 있습니다</div>
                </div>

                {totalUnReadCnt > 0 && (
                  <div title=" 전체읽음 처리">
                    <button color="secondary" onClick={handleMarkAllAsRead}>
                      {/* <Icon icon={doneAllFill} width={20} height={20} /> */}
                    </button>
                  </div>
                )}
              </div>

              <hr />
              <div>
                {/* <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}> */}
                {/* <List
                  disablePadding
                  subheader={
                    <ListSubheader
                      disableSticky
                      sx={{ py: 1, px: 2.5, typography: 'overline' }}
                    >
                      New
                    </ListSubheader>
                  }
                > */}
                {notifications.slice(0, totalUnReadCnt).map((notification) => (
                  <NotificationItem
                    key={notification.notificationId}
                    item={notification}
                  />
                ))}
                {/* </List> */}

                {/* <list
                  disablePadding
                  subheader={
                    <ListSubheader
                      disableSticky
                      sx={{ py: 1, px: 2.5, typography: 'overline' }}
                    >
                      Previous Notifications
                    </ListSubheader>
                  }
                > */}
                {notifications
                  .slice(totalUnReadCnt, notifications.length)
                  .map((notification) => (
                    <NotificationItem
                      key={notification.notificationId}
                      item={notification}
                    />
                  ))}
                {/* </List> */}
                {/* </Scrollbar> */}

                <hr />
              </div>
              <div>
                <button onClick={getUserNotificationList}>새로고침</button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default NotificationsPopover;