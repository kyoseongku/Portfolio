export default [
  {
    name: 'Monitoring Application v1-v3',
    role: 'Author',
    info: 'Full-stack watchdog monitoring in-house web applications across multiple servers',
    points: [
      'Runs on 26 servers (on-premise/AWS/GCP) monitoring 300+ objects implementing a "monitorable" interface',
      'Detects crashed and frozen processes, and monitors servers\' RAM and disk usage',
      'Web dashboard to view live status of the monitored objects and for users to submit issue reports',
      'Ability to restart processes remotely through the dashboard',
      'Real-time streaming of applications\' log files via WebSockets',
      'Alerts IT in case of error state through the Notification Service (v2)',
      'Also designed and developed the second version, which was my first application using Go. Version 3 is a significant rewrite.',
      'Also designed and developed the first version, which was written using Node.js on Express'
    ],
    tags: [
      'go',
      'rrr',
      'ws',
      'aws_ec2',
      'sg',
      'tw_sms'
    ]
  },
  {
    name: 'Digital Signatures v1-v2',
    role: 'Author',
    info: 'Back-end service to provide electronic signing functionalities for the in-house delivery management mobile app, along with a framework that allows creation of signable documents',
    points: [
      'Uses Pug/Jade for design and templating of signable documents. Allows embedding of dynamic text and data (such as custom QR codes) at render time.',
      'Renders document templates to images in PNG format via PhantomJS on AWS Lambda, which provides scalability and reduces load on the main server',
      'Ability to render multi-page documents when provided with lengthy data, such as a delivery ticket with dozens of items',
      'Ability to apply user input received from the mobile app onto the images (checkboxes, signatures, etc.)',
      'Provided CLI scripts to assist templating, such as rendering previews overlayed with color-coded bounding rectangles representing different user input fields',
      'Periodic background job that merges all images of a work order into a single PDF on Lambda and emails it to the customer as an attachment through the Notification Service (v1)',
      'Mitigated connection timeouts and load spikes in the API server by using periodic background tasks to process queued batches of rendering requests in parallel',
      'Developed an automated test suite with 120+ test cases using Mocha and Chai, plus interactive CLI scripts to test cases requiring human interaction',
      'Automated the update and deployment of the Lambda functions with shell scripts and AWS CLI',
      'Each API endpoint and each document are versioned',
      'Secured resources with JWT-based authentication middleware'
    ],
    tags: [
      'njs',
      'pj',
      'sh',
      'mac',
      'mdb',
      'aws_ec2',
      'aws_s3',
      'aws_ddb',
      'aws_l',
      'phjs'
    ]
  },
  {
    name: 'Notification Service v1-v2',
    role: 'Author',
    info: 'Internal and customer-facing service that sends emails, SMS, and faxes for various events',
    points: [
      'The second iteration is rebuilt on a serverless architecture using Golang',
      'The endpoints are a collection of AWS Lambda functions with API Gateway serving as the router',
      'Each endpoint has a production and a development version',
      'Used SendGrid to email notifications with their dynamic Handlebar-based templating feature',
      'Used Twilio to send SMS notifications via REST API',
      'Used Concord, and Sfax as fallback, to send faxes of PDF files residing in AWS S3',
      'Automated the update and deployment of the Lambda functions with shell scripts and AWS CLI',
      'Receives information about errors from various internal applications and alerts IT',
      'Receives information about new orders/faxes and notifies the appropriate sales representative',
      'HTML emails with the ability to include attachments and respond/interact through buttons',
      'Ability to send mass emails based on email/user groups'
    ],
    tags: [
      'go',
      'njs',
      'sh',
      'mdb',
      'aws_l',
      'aws_ddb',
      'aws_ec2',
      'sg',
      'cf',
      'sf',
      'tw_sms',
      'gapi_gm',
      'xmlsoap'
    ]
  },
  {
    name: 'Call Center',
    role: 'Author',
    info: 'Amazon Connect integration with various features and Interactive Voice Recordings as an internal microservice',
    points: [
      'Created contact flows for IVRs that collect information from patients, with the option to transfer to an agent',
      'Integrated a custom contact panel into the in-house document management system, which displays information about the patient on the call (name, phone number, and any inputs the patient entered during the IVR), as well as an option to directly access the patient\'s files.',
      'Modified contact flows in Connect and provided a Lambda function to send email/SMS alerts via Notification Service (v2) if a customer has been on hold for longer than specified amounts of time. There are 20+ queues/departments, and the alert is escalated to the department\'s supervisor, manager, then director based on wait duration.',
      'Created a web page for non-technical testers to trigger IVR calls and view their status',
      'Used Lambda for the ability to place mass outbound IVR calls and for processing patient inputs during the IVR'
    ],
    tags: [
      'rrr',
      'njs',
      'aws_l',
      'aws_c',
      'aws_ddb'
    ]
  },
  {
    name: 'Delivery Driver Tracking Map',
    role: 'Author',
    info: 'Web dashboard with a basic back-end that displays live locations of the company\'s delivery drivers on a map',
    points: [
      'Toggle-able traffic layer so dispatchers are more cognizant of drivers\' driving conditions',
      'Draws drivers\' path on the map for any specified day',
      'View the driver\'s stops for the day on the map, as well as their work order information such as items being delivered',
      'View the driver\'s current status and status history--the timestamps and positions on the map where status changes occurred (en route, arrived, etc.)',
      'Blinking markers for drivers who are currently busy at a patient stop',
      'Filter drivers by branch and branch region'
    ],
    tags: [
      'njs',
      'rjs',
      'mdb',
      'gapi_m'
    ]
  },
  {
    name: 'Web Portal',
    role: 'Author',
    info: 'Full-stack patient-facing web app on a serverless architecture',
    points: [
      'The React front-end resides in AWS S3 and is served by AWS CloudFront',
      'The Go back-end is a collection of AWS Lambda functions with AWS API Gateway serving as the router',
      'Each endpoint has a production and a development version',
      'Practiced test-driven development and implemented a test suite',
      'Automated the update and deployment of front and back-ends with shell scripts and AWS CLI',
      'Created lightweight, responsive pages using just MaterializeCSS and validator.js libraries'
    ],
    tags: [
      'go',
      'rrr',
      'sh',
      'aws_l',
      'aws_ddb',
      'aws_s3'
    ]
  },
  {
    name: 'Centralized Authentication',
    role: 'Author',
    info: 'Centralized authentication front-end module and back-end server for internal applications',
    points: [
      'Minified front-end module with functions implementing async/await and Promises (callback support is on TODO list)',
      'Server-side middleware module for other developers\' to authenticate/restrict access in their back-ends',
      'Log in using company\'s G Suite account via Google Login button, with back-end verification through Google',
      'Ability to detect and invalidate user if the user has logged out of his/her Google account',
      'Security is implemented with a long-lived refresh token and short-lived JWT access token',
      'JWT contains public payload for front-end usage and encrypted payload for usage in other developers\' back-ends'
    ],
    tags: [
      'njs',
      'jest',
      'mdb',
      'aws_ec2',
      'gapi_id'
    ]
  },
  {
    name: 'Document Management Application v1-v2',
    role: 'Contributor',
    info: 'Developed auxiliary full-stack services providing various functionalities for the in-house document management application and currently assisting with migrating the front-end to React',
    points: [
      'Dynamic PDF builder which takes user input and displays the preview both with React components, then generates the PDF for download and/or email/fax via Notification Service (v2)',
      'Created a shopping cart React+Redux component that allows users to select specific pages across multiple fax documents and reorder them before sending them off for merging into a single PDF',
      'Automated crawling of a 3rd party web portal using Selenium WebDriver (log in, navigate, retrieve data, and log out)',
      'Built a basic document recognition service using Google Vision API with the ability to recognize 9 different documents',
      'Provided a service that generates PDF files with embedded QR code and custom data, along with a web page where users can specify the custom data (user, date, etc.) to render',
      'Periodic task that converts files from TIFF to PDF format, places copies in network shared folders, uploads to appropriate folders in Google Drive, then uses the Notification Service (v1) to email the PDF to appropriate recipients',
      'Periodic task to retrieve and parse emails, sent by a specified sender within a specified time range, using Gmail API',
      'Periodic task to clean up aged files in specified directories',
      'Mitigated connection timeouts and spikes in server load by using periodic tasks to process queued requests',
      'Set up a development instance of the main application and wrote scripts to automate the setup and update processes',
      'Authored documention on the architecture and support, including common errors and their solutions',
      'Made bug fixes and modifications'
    ],
    tags: [
      'njs',
      'rrr',
      'mdb',
      'aws_s3',
      'gapi_d',
      'gapi_gm',
      'gapi_v',
      'swd'
    ]
  },
  {
    name: 'Delivery Management Application',
    role: 'Contributor',
    info: 'Made code changes to the in-house delivery management application',
    points: [
      'Provided an address validation microservice using USPS API',
      'Integrated calls to the Notification Service (v1) in the app\'s error handling module, which discovered previously unknown errors',
      'Set up the back-end on a new AWS EC2 instance and modified it to run on HTTPS',
      'Developed 6 new endpoints allowing for batch update operations',
      'Replaced a PHP-based MSSQL wrapper with one based on Node.js'
    ],
    tags: [
      'njs',
      'aws_ec2',
      'mdb',
      'usps',
      'xmlsoap'
    ]
  },
  {
    name: 'iOS Back-end',
    role: 'Co-author',
    info: 'Developed the back-end for the in-house iOS app and integrated into it an existing API that contains other core business logic',
    points: [
      'Designed a lightweight prescription management model based on templates',
      'Medication and prescription management',
      'User and session management',
      'User account creation via Google Login or standard email-password combo',
      'Wrote an automated test suite using Mocha and Chai'
    ],
    tags: [
      'njs',
      'mac',
      'mdb',
      'aws_ec2',
      'gapi_gm',
      'gapi_id'
    ]
  }
]
