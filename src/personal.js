export default [
  {
    name: 'Crypto trading bot',
    role: 'Author',
    info: 'Automated trading bot for cryptocurrencies',
    points: [
      'Developed a program that makes trading decisions based on various technical indicators',
      'Ability to execute modularized trading strategies for flexibility and adaptability to market cycles and trends',
      'React-based UI that charts coin prices, overlaid with technical indicator graphs and trade points'
    ],
    tags: [
      'njs',
      'rjs',
      'ftx'
    ]
  },
  {
    name: 'AirBuddy',
    role: 'Author',
    info: 'A virtual rent-a-friend platform',
    points: [
      'Developed a full-stack web application, similar to the Dylect project',
      'Added payment handling, scheduling, and video broadcasting'
    ],
    tags: [
      'njs',
      'mat',
      'rrr',
      'sg',
      'tw_sms',
      'tw_vid',
      'aws_doc',
      'aws_s3'
    ]
  },
  {
    name: 'WebVR Fiddle',
    role: 'Author',
    info: 'Places media (image, video, or 3D object) onto the user\'s video feed where a mapped color appears',
    media: {
      type: 'video',
      src: '/static/webAR.mp4'
    },
    points: [
      'Holding up a red object to the camera will render Harambe over the object',
      'Holding up a green object will render Pen Pineapple Apple Pen',
      'Holding up a blue object will render My Little Pony',
      'Code is available in archive/2016.zip. I may update and migrate the code, but prolly not.'
    ],
    tags: [
      'njs',
      'rjs',
      'wrtc',
      't3js',
      'tjs'
    ]
  },
  {
    name: 'Dylect',
    role: 'Co-author',
    info: 'My educational technology startup effort. Dylect (dynamic + lectures) allows educators to expand their services beyond brick walls through video chat built into the browser along with scheduling functionality and more',
    points: [
      'Developed a peer-to-peer, one-on-one video chat web app using WebRTC, which reduced server costs since the media data is transferred directly between the two participants',
      'Built a collaborative whiteboard with the ability to share images onto the whiteboard and draw on them, along with undo functionality',
      'Integrated text chat with translation and speech recognition features',
      'Cron jobs via AWS Lambda, in order to guarantee single execution across multiple AWS EC2 instances',
      'Timed notification emails on Lambda, triggered by AWS CloudWatch',
      'Implmented a cookie-based session management',
      'CRUD functionality on user accounts'
    ],
    tags: [
      'njs',
      'pj',
      'ws',
      'wrtc',
      'aws_ddb',
      'aws_ec2',
      'aws_l',
      'aws_s3',
      'gapi_gm',
      'gapi_tr'
    ]
  },
  {
    name: 'Desktop Helicopter Game',
    role: 'Author',
    info: 'Simple game where the player can maneuver a helicopter and fire missiles to shoot down giant bees while avoiding their stingers, sort of like a 3D Asteroid Blaster',
    media: {
      type: 'video',
      src: '/static/heli.mp4'
    },
    points: [
      'Expansion of my assignment for UCLA\'s Intro to Computer Graphics course (174A), which was a coded animation',
      'There are no sound effects, and only the original animation video and my initial commit are available because my laptop crashed and I didn\'t back up my files',
      'The additional code I wrote allowed the user to maneuver the helicopter along the x and y axes and fire missiles'
    ],
    tags: [
      'cpp',
      'ogl'
    ]
  },
  {
    name: 'Desktop Scheduling Application',
    role: 'Author',
    info: 'Allows users to set their availabilities for a work week and exports the data as a Microsoft Excel file',
    media: {
      type: 'video',
      src: '/static/scheduling.mp4'
    },
    points: [
      'Every week, the employees at the UCLA Computer Store filled out a paper form that indicated their availability for the following week, and the manager scheduled the employees manually. This was my attempt to automate this process.',
      'The video has no sound, and only my initial commit is available because my laptop crashed and I didn\'t back up my files',
    ],
    tags: [
      'jv'
    ]
  }
]
