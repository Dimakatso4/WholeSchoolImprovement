
import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    username: '',
    isLabel: true,
    isTitle: false,
    role: 'DCES,Line Function Director,ADMIN, SGB, PRINCIPAL,School Governing Body Chairperson, DEPUTY DIRECTOR,CES Admin' +
      'DBUM, DBUO, IDSO, CM, DD, BM, BO, LFD, CD, DDG , CES, CES_MEMBER, Director, Director_MEMBER, SES, DCES,Circuit Manager,Director Admin' +
      'System Administrator, Senior Admin Officer, School Principal, Deputy Director, Admin D,' +
      ''
    // role: 'ADMIN, SEOS, DEO,DBUM,DBUM, PARENT, PRINCIPAL,DEPUTY, ASSISTANCE, SGB, DISTRICT BU MANAGER, IDSO, PEO, PEM, MONITOR, OBSERVER, HO, DO'
  },
  {
    label: 'Dashboard',
    icon: 'home',
    link: '/dashboard',
    role: ''
  },
  {
    label: 'ADMIN',
    icon: 'home',
    role: 'ADMIN',
    subItems: [
      {
        label: 'Users',
        link: '/users/new-user',
        role: 'ADMIN'
      },
      {
        label: 'Management Document',
        link: '/sse/district',
        role: 'ADMIN',
      },
      {
        label: 'SIP',
        link: 'sip/list-sip',
        role: 'ADMIN'
      },
      {
        label: 'Document Library',
        link: '/library',
        role: 'ADMIN'
      },
      {
        label: 'News Feeds',
        link: '/newsfeed',
        role: 'ADMIN'
      },




    ]
  },
  {
    label: '',
    icon: 'globe',
    role: 'n',
    subItems: [
      {
        label: 'PIP',
        link: 'management-plan/pip-reports-review',
        role: '',
      },
      {
        label: 'Document Library',
        link: '/library',
        role: 'ADMIN'
      },
      {
        label: 'News Feeds',
        link: '/newsfeed',
        role: 'ADMIN'
      },
      {
        label: 'Users',
        link: '/users/new-user',
        role: ''
      },
      {
        label: 'Management Plan',
        link: '/management-plan/review-management',
        role: 'ADMIN'
      },
      {
        label: 'Annual Calender',
        link: '/management-plan/calender',
        role: 'ADMIN'
      }


    ]
  },
  {
    label: '',
    icon: 'globe',
    role: '',
    subItems: [
      {
        label: 'PIP',
        link: 'management-plan/pip-reports-review',
        role: ''
      },
      {
        label: 'View Annual Calender',
        link: '/Management-wsi/calender',
        role: ''
      },
      {
        label: 'Management Plan',
        link: '/Management-wsi/calender',
        role: ''
      },
      {
        label: 'SSE',
        link: '/Management-wsi/calender',
        role: ''
      },
      {
        label: 'SIP',
        link: '/Management-wsi/calender',
        role: ''
      }
    ]
  },
  // {
  //   label: 'Dashboard',
  //   icon: 'home',
  //   link: '/dashboard',
  //   role: 'ADMIN'
  // },
  {
    label: '',
    icon: 'user-check',
    role: '',
    subItems: [
      {
        label: 'Management Plan',
        link: 'management-plan/District-Management',
        role: ''
      },
      {
        label: 'Annual Terms',
        link: 'management-plan/term-list',
        role: ''
      },
      {
        label: 'DIP',
        link: '/management-plan/DIP',
        role: ''
      },
      {
        label: 'Management Document',
        link: '/sse/district',
        role: '',
      },
      {
        label: 'SIP',
        link: 'sip/list-sip',
        role: 'ADMIN'
      },
      {
        label: 'Profiling',
        link: '/schoolprofiling/profiling',
        role: 'ADMIN'
      },
      {
        label: 'Reprofiling',
        link: '/newsfeed',
        role: 'ADMIN'
      },
      {
        label: 'News Feed',
        link: '/newsfeed',
        role: 'ADMIN'
      },
      {
        label: 'Document Library',
        link: '/document-library',
        role: ''
      },
      {
        label: 'Reporting',
        link: '/reports/dashboard',
        role: ''

      }


    ]
  },

  {
    label: 'Senior Admin Officer',
    icon: 'user-check',
    role: 'Senior Admin Officer',
    subItems: [
      // {
      //   label: 'User Management',
      //   link: '/users/new-user',
      //   role: ''
      // }, 
      {
        label: 'Management Plan',
        link: '../../../management',
        role: ''
      },
      {
        label: 'Annual Terms',
        link: '/calender',
        role: ''
      },
      {
        label: 'Management Document',
        link: '/sse/district',
        role: '',
      },
      {
        label: 'Profiling',
        link: '/newsfeed',
        role: 'ADMIN'
      },
      {
        label: 'Reprofiling',
        link: '/newsfeed',
        role: 'ADMIN'
      },
      {
        label: 'News Feed',
        link: '/newsfeed',
        role: 'ADMIN'
      },
      {
        label: 'Document Library',
        link: '/library',
        role: ''
      },
      {
        label: 'Reporting',
        link: '/reports/dashboard',
        role: ''

      }


    ]
  },
  {
    label: 'Circuit Manager',
    icon: 'user-check',
    role: 'Circuit Manager',
    subItems: [
      {
        link: 'Management Plan',
        role: '/management-plan/review-management'
      },
      {
        label: 'Annual Terms',
        link: '/management-plan/calender',
        role: ''
      },
      {
        label: 'DIP',
        link: '/management-plan/review-dip',
        role: ''
      },
      {
        label: 'SSE',
        link: '/sse/district',
        role: '',
      },
      {
        label: 'SIP',
        link: 'sip/list-sip',
        role: 'ADMIN'
      },
      {
        label: 'Profiling',
        link: '/schoolprofiling/profiling',
        role: 'ADMIN'
      },
      {
        label: 'Reprofiling',
        link: '/newsfeed',
        role: 'ADMIN'
      },
      {
        label: 'News Feed',
        link: '/newsfeed',
        role: 'ADMIN'
      },
      {
        label: 'Document Library',
        link: '/document-library',
        role: ''
      },
      {
        label: 'Reporting',
        link: '/reports/dashboard',
        role: ''

      }

    ]
  },

  {
    label: 'SGB Chairperson',
    icon: 'user-check',
    role: 'School Governing Body Chairperson',

    subItems: [
      {
        label: 'Management Plan',
        link: '/management-plan/end-user',
        role: ''
      },
      {
        label: 'Annual Terms',
        link: 'management-plan/term-list',
        role: ''
      },
      {
        label: 'Annual Calendar',
        link: '/management-plan/calender',
        role: ''
      }
      // ,
      // {
      //   label: 'View Schools',
      //   link: '/management-plan',
      //   role: ''
      // }
      ,
      {
        label: 'DIP',
        link: 'management-plan/review-dip',
        role: ''
      },
      {
        label: 'SSE',
        link: '/sse/district',
        role: ''
      },
      {
        label: 'SIP',
        link: 'sip/list-sip',
        role: ''
      },
      {
        label: 'Document Library',
        link: '/library',
        role: ''
      },
      /* {
         label: 'Postnews ',
         link: 'postnews',
         role: ''
       },*/
      {
        label: 'Newsfeed ',
        link: 'newsfeed',
        role: ''
      },

      {
        label: 'School Profile',
        link: '/schoolprofiling/profiling',
        role: ''
      },
    ]
  },
  {
    label: 'Line Function Director',
    icon: 'user-check',
    role: 'Line Function Director',
    // role: 'DEO',

    subItems: [
      {
        label: 'Management Plan',
        link: '/Management-wsi/HO',
        role: ''
      },
      {
        label: 'Annual Calendar',
        link: '/Management-wsi/calender',
        role: ''
      },
      {
        label: 'View Schools',
        link: '/management-plan',
        role: ''
      },
      {
        label: 'Complete DIP',
        link: 'management-plan/review-dip',
        role: ''
      },
      {
        label: 'Review SSE',
        link: '/sse/sse-list',
        role: ''
      },
      {
        label: 'Review SIP',
        link: '/action-plan/school-list',
        role: ''
      },
      {
        label: 'Document Library',
        link: '/library',
        role: ''
      },
       {
         label: 'PIP',
         link: '/management-plan/pip-reports-review',
         role: ''
       },
      {
        label: 'Newsfeed ',
        link: 'newsfeed',
        role: ''
      },

      {
        label: 'School Profile',
        link: '/schoolprofile',
        role: ''
      },
    ]
  },
  {
    label: 'Director',
    icon: 'globe',
    role: 'Director_MEMBER',
    subItems: [
      {
        label: 'Annual Calendar',
        link: '/management-plan/calender',
        role: ''
      },
      {
        label: 'Annual Terms',
        link: 'management-plan/term-list',
        role: ''
      },
      {
        label: 'Management Plan',
        link: '/management-plan/review-management',
        role: ''
      },
      // {
      //   label: 'View Schools',
      //   link: 'sse/school',
      //   role: ''
      // },
      {
        label: 'DIP',
        link: 'management-plan/Dip-Plan',
        role: ''
      },
      {
        label: 'PIP',
        link: '/management-plan/pip-reports-review',
        role: ''
      },
      {
        label: 'Document Library',
        link: '/library',
        role: ''
      },
      {
        label: 'News Feed',
        link: '/newsfeed',
        role: ''
      },
      {
        label: 'Users',
        link: '/users/new-user',
        role: ''
      },
      {
        label: 'Management Document',
        link: '/sse/district',
        role: ''
      },
    ]
  },
  {
    label: 'DCES',
    icon: 'globe',
    role: 'DCES',
    subItems: [
      {
        label: 'Annual Calendar',
        link: '/management-plan/calender',
        role: 'DCES'
      },
      {
        label: 'Annual Terms',
        link: 'management-plan/term-list',
        role: 'DCES'
      },
      {
        label: 'Management Plan',
        link: '/management-plan/review-management',
        role: ''
      },
      // {
      //   label: 'View Schools',
      //   link: 'sse/school',
      //   role: ''
      // },
      {
        label: 'DIP',
        link: '/management-plan/Dip-Plan',
        role: ''
      },
      {
        label: 'Document Library',
        link: '/library',
        role: ''
      },
      {
        label: 'News Feed',
        link: '/newsfeed',
        role: ''
      },
      {
        label: 'Users',
        link: '/users/new-user',
        role: ''
      },
      {
        label: 'Management Document',
        link: '/sse/district',
        role: ''
      },
    ]
  },
  {
    label: 'CES',
    icon: 'globe',
    role: 'CES_MEMBER',
    subItems: [
      {
        label: 'Management Plan ',
        link: 'management-plan/HO',
        role: ''
      },
      {
        label: 'Annual Terms',
        link: 'management-plan/term-list',
        role: ''
      },
      {
        label: 'Annual Calendar',
        link: 'management-plan/calender',
        role: ''
      },

      {
        label: 'Management Document',
        link: '/sse/district',
        role: '',
      },

      {
        label: 'Profiling',
        link: '/schoolprofiling/profiling',
        role: ''
      },

      {
        label: 'News Feed',
        link: '/newsfeed',
        role: ''
      },
      {
        label: 'Document Library',
        link: '/document-library',
        role: ''
      },
      {
        label: 'Reporting',
        link: '/reports/dashboard',
        role: ''

      },

      // {
      //   label: 'SSE',
      //   link: '/sse/Sse-Review',
      //   role: ''
      // },
      // {
      //   label: 'SIP',
      //   link: '/sip/list-sip',
      //   role: ''
      // },
      {
        label: 'DIP',
        link: 'management-plan/DIP',
        role: ''
      },
      {
        label: 'PIP',
        link: 'management-plan/pip-reports',
        role: ''
      },
      {
        label: 'Document Library',
        link: '/library',
        role: ''
      },
      {
        label: 'Users',
        link: '/users/new-user',
        role: ''
      },
      {
        label: 'Management Document',
        link: '/sse/district',
        role: ''
      },
    ]
  },
  {
    label: 'Circuit Manager',
    icon: 'globe',
    role: 'CM',
    subItems: [
      {
        label: 'Management Plan',
        link: '/management-plan/review-management',
        role: ''
      },
      {
        label: 'Annual Calendar',
        link: '/management-plan/calender',
        role: ''
      },
      // {
      //   label: 'View Schools',
      //   link: '/management-plan',
      //   role: ''
      // },
      {
        label: 'Review DIP',
        link: 'management-plan/review-dip',
        role: ''
      },
      {
        label: 'Document Library',
        link: '/library',
        role: ''
      }
    ]
  },
  {
    label: 'District Director',
    icon: 'globe',
    role: 'DD',
    subItems: [
      {
        label: 'Management Plan',
        link: '/Management-wsi/review-management',
        role: ''
      },
      {
        label: 'Annual Calendar',
        link: '/Management-wsi/calender',
        role: ''
      },
      {
        label: 'View Schools',
        link: '/management-plan',
        role: ''
      },
      {
        label: 'Review DIP',
        link: 'management-plan/review-dip',
        role: ''
      },
      {
        label: 'Document Library',
        link: '/library',
        role: ''
      }
    ]
  },
  {
    label: 'HO BU Manager',
    icon: 'users',
    role: 'HO',
    subItems: [
      {
        label: 'Management Plan',
        link: '/Management-wsi/director',
        role: ''
      },
      {
        label: 'Annual Calendar',
        link: '/Management-wsi/calender',
        role: ''
      },
      // {
      //  label: 'Manage News Feeds',
      //  link: '',
      //   role: ''
      //   },
      {
        label: 'View Schools',
        link: '/legislative-framework',
        role: ''
      },
      {
        label: 'Complete PIP',
        link: '/management-plan/pip-reports',
        role: ''
      },
      {
        label: 'SSE Instrument',
        link: '/sse/sse-list',
        role: '',
        subItems: [
          {
            label: 'Create SSE',
            link: '/sse/sse-list',
            role: ''
          },
          {
            label: 'Create KPI',
            link: '/sse/add-kpi',
            role: ''
          }
        ]
      },

      {
        label: 'Schedule SSE',
        link: '../../../ScheduleSSE',
        role: ''
      },
      {
        label: 'Manage Document Library',
        link: '/course/training',
        role: ''
      },
      {
        label: 'Newsfeed ',
        link: 'newsfeed',
        role: ''
      },
      {
        label: 'Document Library',
        link: '/library',
        role: ''
      },
    ]
  },
  {
    label: 'HO BU Official',
    icon: 'book-open',
    role: 'BO',
    subItems: [
      {
        label: 'Management Plan',
        link: '../../../management',
        role: ''
      },
      {
        label: 'Annual Calender',
        link: '../../../calender',
        role: ''
      },
      {
        label: 'View Schools',
        link: 'calender',
        role: ''
      },
      {
        label: 'Complete PIP',
        link: '/management-plan/pip-reports',
        role: ''
      },
      {
        label: 'Review SSE',
        link: '/sse/Review-sse',
        role: ''
      },
      {
        label: 'Review SIP',
        link: '#',
        role: ''
      },
      //
      {
        label: 'Document Library',
        link: '/library',
        role: ''
      }
    ]
  },
  {
    label: 'Line Functional Director',
    icon: 'briefcase',
    role: 'LFD',
    subItems: [
      {
        label: 'Management Plan',
        link: '../../../management',
        role: ''
      },
      {
        label: 'Annual Calendar',
        link: '../../../calendar',
        role: ''
      },
      {
        label: 'View Schools',
        link: '/',
        role: ''
      },
      {
        label: 'View Districts',
        link: '/',
        role: ''
      },
      {
        label: 'Review PIP',
        link: '/management-plan/pip-reports',
        role: ''
      },
      {
        label: 'Document Library',
        link: '/library',
        role: ''
      },
    ]
  },
  {
    label: 'Chief Director',
    icon: 'briefcase',
    role: 'CD',
    subItems: [
      {
        label: 'Management Plan',
        link: '/management-plan/review-management',
        role: ''
      },
      {
        label: 'Annual Calendar',
        link: '/management-plan/calender',
        role: ''
      },
      {
        label: 'PIP',
        link: '/management-plan/pip-reports-review',
        role: ''
      },
      {
        label: 'Document Library',
        link: '/document-library',
        role: ''
      },
      {
        label: 'News Feed',
        link: '/newsfeed',
        role: ''
      }
    ]
  },
  {
    label: 'Deputy Director General',
    icon: 'briefcase',
    role: 'DDG',
    subItems: [
      {
        label: 'Management Plan',
        link: '../../../end-user',
        role: ''
      },
      {
        label: 'Annual Calendar',
        link: '../../../calendar',
        role: ''
      },
      {
        label: 'View Schools',
        link: '/',
        role: ''
      },
      {
        label: 'View Districts',
        link: '/',
        role: ''
      },
      {
        label: 'Review PIP',
        link: '/management-plan/pip-reports-review',
        role: ''
      },
      {
        label: 'Document Library',
        link: '/library',
        role: ''
      },
    ]
  },
  {
    label: 'School',
    icon: 'flag',
    role: 'School Principal',
    subItems: [
      {
        label: 'Annual Calendar',
        link: '/management-plan/calender',
        role: ''
      },
      {
        label: 'Annual Terms',
        link: 'management-plan/term-list',
        role: ''
      },
      {

        label: 'SSE',
        link: 'sse/capture-sse',
        role: ''
      },
      {
        label: 'School Profile',
        link: 'schoolprofiling/profiling',
        role: ''
      },
      {
        label: 'SIP',
        link: 'sip/list-sip',
        role: ''
      },
      {
        label: 'SIP Action Plan',
        link: 'sip/capture-sip-action-plan',
        role: ''
      },
      {
        label: 'DIP',
        link: '/management-plan/DIP',
        role: ''
      },
      {
        label: 'Document Library',
        link: '/document-library',
        role: '',
      },
      {
        label: 'Download Management Plan',
        link: '/management-plan/end-user',
        role: ''
      },
      {
        label: 'News Feed',
        link: '/newsfeed',
        role: ''
      },
      {
        label: 'Reports',
        link: '/reports/dashboard',
        role: ''
      }
    ]
  },

  //
  //    {
  //  label: 'Newsfeed ',
  // link: 'newsfeed',
  // role: ''
  // },
  //  {
  //  label: 'Schedule SSE',
  // link: ' ScheduleSSE',
  // role: ''

  //  },
  //


  //    {
  //     label: 'Review DIP',
  //   link: 'management-plan/review-dip',
  //   role: ''
  // },
  // {
  // label: 'Management Document',
  //link: '/sse/district',
  //role: ''
  //},
  // {
  // label: 'SIP',
  //link: 'sip/list-sip',
  //role: ''
  //},
  {
    label: 'PIP',
    link: 'management-plan/pip-reports',
    role: ''
  },
  {
    label: 'Document Library',
    link: '/library',
    role: ''
  },
  {
    label: 'Users',
    link: '/users/new-user',
    role: ''
    //}
    //]
  },

  {
    label: 'IDSO',
    icon: 'home',
    role: 'IDSO',
    subItems: [
      // {
      //   label: 'Users',
      //   link: '/users/new-user',
      //   role: 'ADMIN'
      // },
      {
        label: 'Management Document',
        link: '/sse/district',
        role: '',
      },
      // {
      //   label: 'SIP',
      //   link: 'sip/list-sip',
      //   role: 'ADMIN'
      // },
      {
        label: 'Document Library',
        link: '/library',
        role: ''
      },
      {
        label: 'News Feeds',
        link: '/newsfeed',
        role: ''
      }




    ]
  },

  // {
  //   label: 'SGB Chairperson',
  //   icon: 'user-check',
  //   role: 'School Governing Body Chairperson',
  //   // role: 'DEO',

  //   subItems: [
  //     {
  //       label: 'Management Plan',
  //       link: '/Management-wsi/HO',
  //       role: ''
  //     },
  //     {
  //       label: 'Annual Calendar',
  //       link: '/Management-wsi/calender',
  //       role: ''
  //     },
  //     {
  //       label: 'View Schools',
  //       link: '/management-plan',
  //       role: ''
  //     },
  //     {
  //       label: 'Complete DIP',
  //       link: '',
  //       role: ''
  //     },
  //     {
  //       label: 'Review SSE',
  //       link: '/sse/sse-list',
  //       role: ''
  //     },
  //     {
  //       label: 'Review SIP',
  //       link: '/action-plan/school-list',
  //       role: ''
  //     },
  //     {
  //       label: 'Document Library',
  //       link: '/library',
  //       role: ''
  //     },
  //     /* {
  //        label: 'Postnews ',
  //        link: 'postnews',
  //        role: ''
  //      },*/
  //     {
  //       label: 'Newsfeed ',
  //       link: 'newsfeed',
  //       role: ''
  //     },

  //     {
  //       label: 'School Profile',
  //       link: '/schoolprofile',
  //       role: ''
  //     },
  //   ]
  // },

  {
    label: 'CFO',
    icon: 'globe',
    role: 'CFO',
    subItems: [
      // {
      //   label: 'View Management Activity',
      //   link: 'Management-wsi/director',
      //   role: ''
      // },
      {
        // label: 'View Annual Calender',
        // link: '/Management-wsi/calender',
        // role: 'ADMIN'
      }
    ]
  },
  {
    label: 'CEO',
    icon: 'globe',
    role: 'CEO',
    subItems: [
      // {
      //   label: 'View Management Activity',
      //   link: 'Management-wsi/director',
      //   role: ''
      // },
      {
        // label: 'View Annual Calender',
        // link: '/Management-wsi/calender',
        // role: 'ADMIN'
      }
    ]
  },
  // {
  //   label: 'District BU Official',
  //   icon: 'book-open',
  //   role: 'SEO',
  //   subItems: [
  //     {
  //       label: 'Management Plan',
  //       link: '/management-plan',
  //       role: ''
  //     },
  //     {
  //       label: 'Annual Calender',
  //       link: 'calender',
  //       role: ''
  //     },
  //     {
  //       label: 'Complete DIP',
  //       link: 'management',
  //       role: ''
  //     },
  //     //
  //     {
  //       label: 'Review SSE',
  //       link: '/sse/Review-sse',
  //       role: ''
  //     },
  //     {
  //       label: 'Review SIP',
  //       link: '#',
  //       role: ''
  //     },
  //     {
  //       label: 'Document Library',
  //       link: '/election-overview',
  //       role: ''
  //     }
  //   ]
  // },
  // {
  //   label: 'Disputes',
  //   icon: 'thumbs-down',
  //   role: '',
  //   subItems: [
  //     {
  //       label: 'New',
  //       link: '/disputes/new',
  //       role: ''
  //     },
  //     {
  //       label: 'View',
  //       link: '/disputes/view',
  //       role: ''
  //     },
  //   ]
  // },
  // {
  //   label: 'Handover',
  //   icon: 'send',
  //   link: '/handover',
  //   role: '',
  // },
  // {
  //   label: 'PEO',
  //   icon: 'users',
  //   role: 'PEO',
  //   subItems: [
  //     {
  //       label: 'Handover Reports',
  //       link: '/handover/list',
  //       role: ''
  //     },
  //     {
  //       label: 'Legislative Framework',
  //       link: '/legislative-framework',
  //       role: ''
  //     },
  //     {
  //       label: 'Management Plan',
  //       link: '/management-plan',
  //       role: ''
  //     },
  //     {
  //       label: 'Meeting',
  //       link: '/meeting/meeting-invitation',
  //       role: ''
  //     },
  //     {
  //       label: 'Training',
  //       link: '/course/training',
  //       role: 'PEO'
  //     },
  //     {
  //       label: 'Users',
  //       link: '/users/new-user',
  //       role: ''
  //     },
  //     {
  //       label: 'View District Disputes',
  //       link: '/disputes/districts',
  //       role: ''
  //     },
  //     {
  //       label: 'View Election Monitory Tool',
  //       link: '/election/districts',
  //       role: 'SEO,PEO '
  //     },
  //     {
  //       label: 'View Election Results',
  //       link: '/election/results',
  //       role: 'SEO,PEO '
  //     }
  //   ]
  // },
  // {
  //   label: 'Provincial Electoral Monitor',
  //   icon: 'users',
  //   role: 'PEM',
  //   subItems: [
  //     {
  //       label: 'Handover Reports',
  //       link: '/handover/list',
  //       role: ''
  //     },
  //     {
  //       label: 'Legislative Framework',
  //       link: '/legislative-framework',
  //       role: ''
  //     },
  //     {
  //       label: 'Log a Election Monitoring Tool',
  //       link: '/election/monitoring-tool',
  //       role: ''
  //     },
  //     {
  //       label: 'Management Plan',
  //       link: '/management-plan',
  //       role: ''
  //     },
  //     {
  //       label: 'View Election Monitoring Tools',
  //       link: '/election/monitor-view',
  //       role: ''
  //     }
  //   ]
  // },
  // {
  //   label: 'System Admin',
  //   icon: 'users',
  //   role: 'ADMIN',
  //   subItems: [
  //     {
  //       label: 'Legislative Framework',
  //       link: '/legislative-framework',
  //       role: ''
  //     },
  //     {
  //       label: 'Management Plan',
  //       link: '/management-plan',
  //       role: ''
  //     },
  //     {
  //       label: 'Users',
  //       link: '/users/new-user',
  //       role: ''
  //     }
  //   ]
  // },
  // {
  //   label: 'Parent',
  //   icon: 'user',
  //   role: 'PARENT',
  //   subItems: [
  //     {
  //       label: 'Nomination',
  //       link: '/nominations/countdown',
  //       role: ''
  //     },
  //     {
  //       label: 'Disputes',
  //       link: '/disputes/list',
  //       role: ''
  //     },
  //     {
  //       label: 'FAQ',
  //       link: '/general/faq',
  //       role: ''
  //     },
  //     {
  //       label: 'Legislative Framework',
  //       link: '/legislative-framework',
  //       role: 'ADMIN, SEO, DEO, PARENT, PRINCIPAL, PEO, PEM, MONITOR, OBSERVER, SGB, HO'
  //     },
  //     {
  //       label: 'Management Plan',
  //       link: '/management-plan',
  //       role: 'ADMIN, SEO, DEO, PARENT, PRINCIPAL, PEO, PEM, MONITOR, OBSERVER, SGB, HO'
  //     },
  //     {
  //       label: 'Queries',
  //       link: '/queries/governing-body',
  //       role: ''
  //     }

  //   ]
  // },
  // {
  //   label: 'District Officer',
  //   icon: 'users',
  //   role: 'DO',
  //   subItems: [
  //     {
  //       label: 'Meeting',
  //       link: '/meeting/meeting-invitation',
  //       role: 'DO'
  //     },
  //     {
  //       label: 'Training',
  //       link: '/course/training',
  //       role: 'DO'
  //     }

  //   ]
  // },



  // {
  //   label: 'Legislative Framework',
  //   icon: 'book',
  //   link: '/legislative-framework',
  //   role: 'ADMIN, SEO, DEO, PARENT, PRINCIPAL, PEO, PEM, MONITOR, OBSERVER, SGB, HO'
  // },
  // {
  //   label: 'Management Plan',
  //   icon: 'book',
  //   link: '/management-plan',
  //   role: 'ADMIN, SEO, DEO, PARENT, PRINCIPAL, PEO, PEM, MONITOR, OBSERVER, SGB, HO'
  // },
  /* {
    label: 'DEO Query',ADMIN, DEO, SEO, PARENT, PEO, PEM
    link: '/queries/district-electoral-officer',
    role: '',
  },
 
  {
    label: 'Email',
    icon: 'mail',
    subItems: [
      {
        label: 'Inbox',
        link: '/apps/email/inbox',
      },
      {
        label: 'Read',
        link: '/apps/email/read'
      },
      {
        label: 'Compose',
        link: '/apps/email/compose'
      },
    ]
  },
  {
    label: 'Chat',
    icon: 'message-square',
    link: '/apps/chat',
  },
  {
    label: 'Calendar',
    icon: 'calendar',
    link: '/apps/calendar',
    badge: {
      variant: 'primary',
      text: 'New',
    }
  },
  {
    label: 'Components',
    isTitle: true
  },
  {
    label: 'UI Kit',
    icon: 'feather',
    subItems: [
      {
        label: 'Alerts',
        link: '/ui-components/alerts',
      },
      {
        label: 'Badges',
        link: '/ui-components/badges',
      },
      {
        label: 'Breadcrumbs',
        link: '/ui-components/breadcrumbs',
      },
      {
        label: 'Buttons',
        link: '/ui-components/buttons',
      },
      {
        label: 'Button group',
        link: '/ui-components/button-group',
      },
      {
        label: 'Cards',
        link: '/ui-components/cards',
      },
      {
        label: 'Carousel',
        link: '/ui-components/carousel',
      },
      {
        label: 'Collapse',
        link: '/ui-components/collapse',
      },
      {
        label: 'Datepicker',
        link: '/ui-components/datepicker',
      },
      {
        label: 'Dropdowns',
        link: '/ui-components/dropdowns',
      },
      {
        label: 'List group',
        link: '/ui-components/list-group',
      },
      {
        label: 'Media object',
        link: '/ui-components/media-object',
      },
      {
        label: 'Modal',
        link: '/ui-components/modal',
      },
      {
        label: 'Navs',
        link: '/ui-components/navs',
      },
      {
        label: 'Navbar',
        link: '/ui-components/navbar',
      },
      {
        label: 'Pagination',
        link: '/ui-components/pagination',
      },
      {
        label: 'Popovers',
        link: '/ui-components/popovers',
      },
      {
        label: 'Progress',
        link: '/ui-components/progress',
      },
      {
        label: 'Rating',
        link: '/ui-components/rating',
      },
      {
        label: 'Scrollbar',
        link: '/ui-components/scrollbar',
      },
      {
        label: 'Spinners',
        link: '/ui-components/spinners',
      },
      {
        label: 'Timepicker',
        link: '/ui-components/timepicker',
      },
      {
        label: 'Tooltips',
        link: '/ui-components/tooltips',
      },
      {
        label: 'Typeadhed',
        link: '/ui-components/typeahead',
      },
    ]
  },
  {
    label: 'Advanced UI',
    icon: 'anchor',
    subItems: [
      {
        label: 'Cropper',
        link: '/advanced-ui/cropper',
      },
      {
        label: 'Owl carousel',
        link: '/advanced-ui/owl-carousel',
      },
      {
        label: 'Sweet alert',
        link: '/advanced-ui/sweet-alert',
      },
    ]
  },
  {
    label: 'Forms',
    icon: 'file-text',
    subItems: [
      {
        label: 'Basic elements',
        link: '/form-elements/basic-elements'
      },
      {
        label: 'Advanced elements',
        subItems: [
          {
            label: 'Form validation',
            link: '/advanced-form-elements/form-validation'
          },
          {
            label: 'Input mask',
            link: '/advanced-form-elements/input-mask'
          },
          {
            label: 'Ng-select',
            link: '/advanced-form-elements/ng-select'
          },
          {
            label: 'Ngx-chips',
            link: '/advanced-form-elements/ngx-chips'
          },
          {
            label: 'Ngx-color-picker',
            link: '/advanced-form-elements/ngx-color-picker'
          },
          {
            label: 'Ngx-dropzone',
            link: '/advanced-form-elements/ngx-dropzone-wrapper'
          },
        ]
      },
      {
        label: 'Editors',
        link: '/form-elements/editors'
      },
      {
        label: 'Wizard',
        link: '/form-elements/wizard'
      },
    ]
  },
  {
    label: 'Charts & graphs',
    icon: 'pie-chart',
    subItems: [
      {
        label: 'ApexCharts',
        link: '/charts-graphs/apexcharts',
      },
      {
        label: 'ChartJs',
        link: '/charts-graphs/chartjs',
      },
    ]
  },
  {
    label: 'Tables',
    icon: 'layout',
    subItems: [
      {
        label: 'Basic tables',
        link: '/tables/basic-table',
      },
      {
        label: 'Data table',
        link: '/tables/data-table',
      },
      {
        label: 'Ngx-datatable',
        link: '/tables/ngx-datatable'
      }
    ]
  },
  {
    label: 'Icons',
    icon: 'smile',
    subItems: [
      {
        label: 'Feather icons',
        link: '/icons/feather-icons',
      },
      {
        label: 'Flag icons',
        link: '/icons/flag-icons',
      },
      {
        label: 'Mdi icons',
        link: '/icons/mdi-icons',
      }
    ]
  },
  {
    label: 'Pages',
    isTitle: true
  },
  {
    label: 'Special pages',
    icon: 'book',
    subItems: [
      {
        label: 'Blank page',
        link: '/general/blank-page',
      },
      {
        label: 'Faq',
        link: '/general/faq',
      },
      {
        label: 'Invoice',
        link: '/general/invoice',
      },
      {
        label: 'Profile',
        link: '/general/profile',
      },
      {
        label: 'Pricing',
        link: '/general/pricing',
      },
      {
        label: 'Timeline',
        link: '/general/timeline',
      }
    ]
  },
  {
    label: 'Authentication',
    icon: 'unlock',
    subItems: [
      {
        label: 'Login',
        link: '/auth/login',
      },
      {
        label: 'Register',
        link: '/auth/register',
      },
    ]
  },
  {
    label: 'Error',
    icon: 'cloud-off',
    subItems: [
      {
        label: '404',
        link: '/error/404',
      },
      {
        label: '500',
        link: '/error/500',
      },
    ]
  },*/
];






