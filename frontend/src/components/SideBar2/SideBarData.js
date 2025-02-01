import React from "react";
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';
import * as FiIcons from 'react-icons/fi';

export const SideBarData = [
    {
        title: 'Dashboard',
        path: '/sidebar',
        icon: <FaIcons.FaHome />,
        iconClosed: < RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />
    },

    {
        title: 'Inquiries',
        path: '/sidebar',
        icon: <FaIcons.FaUserCog />,
        iconClosed: < RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'Add Inquiry',
                path: '/dashboard/inquiries/add-inquiry',
                icon: <FaIcons.FaUserPlus />
            },
            {
                title: 'Pending Inquiries',
                path: '/dashboard/inquiries/pending-inquiries',
                icon: <FaIcons.FaUserClock />
            },
            {
                title: 'Completed Inquiries',
                path: '/dashboard/inquiries/complete-inquiries',
                icon: <FaIcons.FaUserFriends />
            }
        ]
    },
    {
        title: 'Profile',
        path: '/dashboard/profile',
        icon: <FaIcons.FaHome />,
        iconClosed: < RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />
    },
    {
        title: 'Dashboard',
        path: '/dashboard/admin',
        icon: <FaIcons.FaHome />,
        iconClosed: < RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />
    },

    {
        title: 'Inquiries',
        path: '/dashboard/inquiries',
        icon: <FaIcons.FaUserCog />,
        iconClosed: < RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'Add Inquiry',
                path: '/dashboard/inquiries/add-inquiry',
                icon: <FaIcons.FaUserPlus />
            },
            {
                title: 'Pending Inquiries',
                path: '/dashboard/inquiries/pending-inquiries',
                icon: <FaIcons.FaUserClock />
            },
            {
                title: 'Completed Inquiries',
                path: '/dashboard/inquiries/complete-inquiries',
                icon: <FaIcons.FaUserFriends />
            }
        ]
    },
    {
        title: 'Profile',
        path: '/dashboard/profile',
        icon: <FaIcons.FaHome />,
        iconClosed: < RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />
    },
    {
        title: 'Settings',
        path: '/dashboard/profile/settings',
        icon: <FiIcons.FiSettings />,
        iconClosed: < RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />
    }
]
