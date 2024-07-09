import React, { useEffect } from 'react';
import { Button, notification } from 'antd';
import axios from 'axios';

const Notifications: React.FC = () => {
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('/notifications/notification', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('auth_token'),
                    },
                });

                response.data.forEach((notif: any) => {
                    api.open({
                        message: 'Notification',
                        description: notif.message,
                        duration: 0,
                    });
                });

                await axios.post('/notifications/markAsRead', {}, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('auth_token'),
                    },
                });
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
        const intervalId = setInterval(fetchNotifications, 60000);

        return () => clearInterval(intervalId);
    }, [api]);

    return <>{contextHolder}</>;
};

export default Notifications;
