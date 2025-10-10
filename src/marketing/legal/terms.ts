import type { LegalDocumentContent } from '../content.ts';

export const termsOfUse: LegalDocumentContent = {
  title: 'Terms and Conditions',
  effectiveDate: 'May 2025',
  lastUpdated: 'May 2025',
  intro: [
    'These Terms and Conditions ("Terms") form an agreement ("Agreement") between you, or, if you are entering into this Agreement on behalf of an entity or an organization, that entity or organization ("you" and "your") and Open Industrial ("Open Industrial," "us," or "we").',
    'The Open Industrial platform ("Platform") includes a variety of services and other offerings ("Offerings"). Open Industrial allows you to become a user of the Platform, including the available Offerings ("User"), if you agree to be bound by this Agreement.',
    'IMPORTANT NOTICE: PLEASE READ THIS AGREEMENT CAREFULLY. BY ACCESSING AND USING THE PLATFORM, YOU AGREE THAT YOU HAVE READ, UNDERSTAND, AND AGREE TO COMPLY WITH AND BE BOUND BY THIS AGREEMENT. THIS AGREEMENT CONTAINS PROVISIONS FOR MANDATORY BINDING ARBITRATION AND WAIVER OF JURY TRIALS, WHICH LIMIT YOUR RIGHTS TO BRING AN ACTION IN COURT.',
  ],
  sections: [
    {
      title: '1. Scope',
      paragraphs: [
        'This Agreement governs your access to and use of the Platform, which includes all Offerings and any Content. Unless otherwise specified in this Agreement, all access to and use of the Platform by you or on your behalf is subject to this Agreement. This Agreement is the complete and exclusive understanding and agreement between the parties.',
      ],
    },
    {
      title: '2. Eligibility',
      paragraphs: [
        'The Platform and all Offerings are for use by individuals 18 years of age and older. By entering into this Agreement and using the Platform, you confirm that you are legally capable of entering into a binding agreement with Open Industrial and that you meet all such eligibility requirements.',
      ],
    },
    {
      title: '3. Your Account',
      paragraphs: [
        'Before you can become a User of the Platform and access the Offerings, you will be required to establish an account on the Platform (your "Account"). All Accounts are issued at the sole discretion of Open Industrial.',
        'Your Account and the user name and password for your Account ("Account ID") are personal in nature. Your Account is for your own use and your Account ID may be used only by you alone. You are solely responsible for your Account and all use of the Platform and any Offerings through your Account.',
      ],
    },
    {
      title: '4. Access to the Platform',
      paragraphs: [
        'Subject to your compliance with this Agreement, during the term of this Agreement, Open Industrial will permit you to access the Platform, including all applicable Offerings, solely for your own use in accordance with the terms of this Agreement. You may not distribute, sell, resell, lend, loan, lease, license, sublicense, or transfer any of your rights to access or use the Platform.',
      ],
    },
    {
      title: '5. User Content',
      paragraphs: [
        'The Platform may permit you to upload, provide, or make available your data, information, and other content ("Content") through the Platform. You are solely responsible for all Content that you may upload, provide, or make available through the Platform ("User Content").',
        'You will obtain all rights, authorizations, consents, and permissions necessary to provide all User Content and to permit the processing and use thereof through the Platform under this Agreement.',
      ],
    },
    {
      title: '6. Restrictions',
      paragraphs: [
        'You may use the Platform, including all Offerings and any Content, only for lawful purposes as expressly provided in this Agreement. Without limiting the foregoing, you will not and will not permit any third party to:',
      ],
      list: {
        items: [
          {
            description: 'Use the Platform to further or promote any criminal or illegal activity.',
          },
          {
            description:
              'Access or use the Platform in a manner that interferes with, disables, disrupts, impairs, or creates an undue burden on the Platform.',
          },
          { description: 'Alter, modify, reproduce, or create derivative works of the Platform.' },
          {
            description:
              'Reverse engineer, disassemble, decompile, or otherwise attempt to derive the method of operation of the Platform.',
          },
          {
            description:
              'Transfer, sell, lease, license, sublicense, distribute, or make available to any third party your right to access or use the Platform.',
          },
          {
            description:
              'Use the Platform in a manner that will infringe the intellectual property rights or other rights of any third party.',
          },
        ],
      },
    },
    {
      title: '7. Fees',
      paragraphs: [
        'General access to Open Industrial is available without a fee. However, third party offerings may require the payment of a fee or charge. In addition, Open Industrial may elect to charge fees for the use of certain Offerings included on the Platform. You are responsible for paying Open Industrial the applicable fees and charges that you may incur through your use of or access to the Platform.',
      ],
    },
    {
      title: '8. Termination',
      paragraphs: [
        "This Agreement may be terminated by either party at any time, in that party's sole discretion, upon notice to the other party as permitted under this Agreement. Upon termination of this Agreement for any reason, all rights and subscriptions granted to you under this Agreement will terminate, and you will immediately cease all use of and access to the Platform and all Offerings.",
      ],
    },
    {
      title: '9. Limitation of Liability',
      paragraphs: [
        'THE PLATFORM AND ALL OFFERINGS AND ANY CONTENT ARE PROVIDED "AS IS" AND ON AN "AS AVAILABLE" BASIS. OPEN INDUSTRIAL AND ITS PROVIDERS DO NOT WARRANT OR GUARANTEE THE ACCURACY, COMPLETENESS, ADEQUACY, OR CURRENCY OF THE OFFERINGS OR ANY CONTENT.',
        'UNDER NO CIRCUMSTANCES WILL OPEN INDUSTRIAL BE LIABLE TO YOU, OR ANY THIRD PARTY CLAIMING THROUGH YOU, FOR ANY LOSSES OR DAMAGES ARISING OUT OF OR IN CONNECTION WITH THE PLATFORM, INCLUDING THE OFFERINGS OR ANY CONTENT, OR YOUR USE OF OR INABILITY TO USE THE PLATFORM.',
      ],
    },
    {
      title: '10. Dispute Resolution',
      paragraphs: [
        'Except as otherwise provided below, the parties will attempt to resolve all disputes, controversies, or claims arising under, out of, or relating to this Agreement through binding arbitration under the arbitration of the Judicial Arbitration and Mediation Services ("JAMS").',
        'The arbitration will be conducted exclusively in the English language at a site specified by Open Industrial in Denver, Colorado. YOU AGREE THAT YOU WILL PURSUE ANY CLAIM OR LAWSUIT AS AN INDIVIDUAL, AND WILL NOT LEAD, JOIN, OR SERVE AS A REPRESENTATIVE OF A CLASS OR GROUP OF PERSONS.',
      ],
    },
    {
      title: '11. Contact Us',
      paragraphs: [
        'If you have any questions or concerns regarding this Agreement, please contact us using the information provided on our contact page. If you need to provide notice of any claims of non-compliance with this Agreement, or complaints of any other kind, please contact us as well.',
      ],
    },
  ],
};
