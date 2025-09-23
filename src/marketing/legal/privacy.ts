import type { LegalDocumentContent } from '../content.ts';

export const privacyPolicy: LegalDocumentContent = {
  title: 'Privacy Policy',
  effectiveDate: 'May 2025',
  lastUpdated: 'May 2025',
  intro: [
    'Open Industrial, and our affiliates (collectively "Open Industrial", "we", "us") care deeply about privacy, security, and online safety. This Privacy Policy explains how we collect, use, and disclose your Personal Information (as defined below) and our commitment to handling that information in a transparent and respectful manner.',
    'This Privacy Policy applies to Personal Information we obtain from individuals ("you") through our website (collectively, our "Site"), products, and services (collectively, the "Services"), and from third party and publicly available sources. Please read this Privacy Policy carefully before you start to use our Services, whether online or offline.',
  ],
  sections: [
    {
      title: 'Categories of Personal Information We May Collect',
      paragraphs: [
        'The types of Personal Information we collect about you depends on how you interact with us. Depending on the Services you use, the following are the categories and specific types of Personal Information that we may collect, or have collected in the preceding twelve months:',
      ],
      list: {
        items: [
          {
            title: 'Contact Information / Identifiers',
            description:
              'Includes name, email address, postal address, phone number, username, business contact information, or other similar identifiers and account information.',
          },
          {
            title: 'Information Specific to the Services',
            description:
              'In certain instances, such as invoices, business and commercial communications, order status, and history.',
          },
          {
            title: 'Device Information and Other Unique Identifiers',
            description:
              'Device identifier, internet protocol (IP) address, or similar unique identifiers.',
          },
          {
            title: 'Internet or Other Network Activity',
            description:
              'Includes browsing or search history and information regarding your interactions with our websites, mobile applications, emails, or advertisements.',
          },
          {
            title: 'Payment Information',
            description: 'Includes credit or debit card number, or other financial information.',
          },
          {
            title: 'Sensitive Personal Information',
            description:
              'Where permitted and in accordance with applicable law: we do not collect Sensitive Personal Information.',
          },
        ],
      },
    },
    {
      title: 'Sources of Personal Information',
      paragraphs: [
        'We collect your Personal Information in the following ways, pursuant to applicable law:',
      ],
      list: {
        items: [
          {
            title: 'Directly from you',
            description:
              'When you use our Services, create an account and profile with us, sign up to receive marketing communications, or otherwise reach out to us.',
          },
          {
            title: 'Other sources',
            description: 'Including vendors and affiliates.',
          },
        ],
      },
    },
    {
      title: 'Use and Processing of Your Personal Information',
      paragraphs: [
        'We use your Personal Information for the following business purposes associated with our general business operations:',
      ],
      list: {
        items: [
          { description: 'To provide you the Services.' },
          { description: 'To enable you to access and use our websites.' },
          {
            description:
              'To communicate with you and to respond to your requests, questions, comments, and other inquiries.',
          },
          {
            description:
              'To understand what partner resources you use, if any, and to connect you to additional resources at your request.',
          },
          {
            description:
              'To send marketing and promotional materials, including information relating to our products, Services, sales, or promotions or those of a third party.',
          },
          {
            description:
              'To administer, maintain, evaluate, and improve our websites and Services, and to develop new products and services.',
          },
          {
            description: 'To conduct research and analytics related to our websites and Services.',
          },
          {
            description:
              'To manage our business operations, perform our obligations, and exercise our rights under any agreement that you or your organization has with us.',
          },
          {
            description:
              'For other purposes with your consent, or as otherwise permitted or required by applicable law.',
          },
        ],
      },
    },
    {
      title: 'Disclosure of Your Personal Information',
      paragraphs: [
        'We respect the importance of privacy. Other than as provided in this Privacy Policy, we do not sell your Personal Information, nor do we share it with unaffiliated third parties for their own marketing use, unless we have your consent, or we are required by law to do so.',
        'We may disclose each category of Personal Information listed above to third parties including service providers, affiliated companies, in corporate transactions, to other parties as required by law, and with your consent.',
      ],
    },
    {
      title: 'Security and Retention',
      paragraphs: [
        'We have implemented generally accepted standards of technical and organizational security to protect Personal Information from loss, misuse, alteration, or destruction. All employees are required to keep Personal Information confidential and only authorized personnel have access to this information.',
        'We will keep your Personal Information for as long as we have a relationship with you. Once our relationship with you has come to an end, we will retain your Personal Information for a period of time that enables us to maintain business records, comply with record retention requirements, defend legal claims, and comply with applicable laws and regulations.',
      ],
    },
    {
      title: 'Your Rights',
      paragraphs: [
        'You may have certain rights regarding your Personal Information. The rights available to you depend on our reason for processing your Personal Information and the requirements of applicable law. Specifically, you may have the following rights:',
      ],
      list: {
        items: [
          {
            title: 'Right to access',
            description:
              'You may have the right to obtain confirmation as to whether Personal Information concerning you is being processed.',
          },
          {
            title: 'Right to rectification',
            description:
              'You may have the right to request that we correct any Personal Information about you that is inaccurate.',
          },
          {
            title: 'Right to erasure',
            description:
              'You may have the right to request that we erase your Personal Information, under certain conditions.',
          },
          {
            title: 'Right to restrict processing',
            description:
              'You may have the right to request that we restrict the processing of your Personal Information, under certain conditions.',
          },
          {
            title: 'Right to object to processing',
            description:
              'You may have the right to object to our processing of your Personal Information, under certain conditions.',
          },
          {
            title: 'Right to data portability',
            description:
              'You may have the right to request that we transfer the Personal Information we have collected about you to another organization.',
          },
          {
            title: 'Right to withdraw consent',
            description:
              'Where we rely on your consent to process your Personal Information, you have the right to withdraw that consent at any time.',
          },
        ],
      },
    },
    {
      title: 'Contact Us',
      paragraphs: [
        'If you have questions or comments regarding this Privacy Policy or our privacy practices, please contact us using the information provided on our contact page. You may also have a right to lodge a complaint with a data protection supervisory authority.',
      ],
    },
  ],
};
