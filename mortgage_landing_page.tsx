'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BookOpenText,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileCheck2,
  Home,
  Languages,
  MapPin,
  Newspaper,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Timer,
  TrendingUp,
} from 'lucide-react';

type Locale = 'en';
type PageKey = 'home' | 'loanOptions' | 'marketNews' | 'aboutMe' | 'blueprint';
type LoanFilterKey = 'all' | 'purchase' | 'refinance' | 'investment' | 'firstTime';
type CompareKey = 'down' | 'flexibility' | 'monthly' | 'best';
type IconKey = 'timer' | 'file' | 'building';

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  loanGoal: string;
  timeline: string;
  zipCode: string;
  details: string;
  consent: boolean;
};

type LoanCard = {
  title: string;
  description: string;
  bestForLabel: string;
  bestFor: string;
  noteLabel: string;
  note: string;
  requirementLabel: string;
  requirements: string[];
  filters: LoanFilterKey[];
};

type CompareRow = {
  loan: string;
  down: string;
  flexibility: string;
  monthly: string;
  best: string;
};

type BlogPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  imageAlt: string;
  body: string[];
};

type CopyShape = {
  seo: {
    homeTitle: string;
    homeDescription: string;
    loanTitle: string;
    loanDescription: string;
    newsTitle: string;
    newsDescription: string;
    aboutTitle: string;
    aboutDescription: string;
  };
  brand: {
    name: string;
    tagline: string;
  };
  nav: {
    home: string;
    loanOptions: string;
    marketNews: string;
    aboutMe: string;
    checkOptions: string;
    callLaura: string;
  };
  aboutMe: {
    heroEyebrow: string;
    title: string;
    subtitle: string;
    bioTitle: string;
    paragraphs: string[];
    expectTitle: string;
    expectations: { title: string; description: string }[];
    beyondTitle: string;
    beyondBody: string;
    ctaTitle: string;
    ctaBody: string;
    primaryCta: string;
    secondaryCta: string;
  };
  home: {
    heroBadge: string;
    fastCloseBadge: string;
    volumeBadge: string;
    title: string;
    subtitleLine: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    stats: { title: string; description: string }[];
    fastCard: {
      eyebrow: string;
      title: string;
      description: string;
      footnote: string;
    };
    volumeCard: {
      eyebrow: string;
      title: string;
      description: string;
    };
    meetLaura: {
      eyebrow: string;
      title: string;
      description: string;
      bullets: string[];
    };
    trustStrip: string[];
    featured: {
      eyebrow: string;
      title: string;
      subtitle: string;
      cards: { iconKey: IconKey; title: string; description: string }[];
    };
    fastSection: {
      eyebrow: string;
      title: string;
      subtitle: string;
      steps: { step: string; title: string; description: string }[];
      spotlightEyebrow: string;
      spotlightTitle: string;
      spotlightDescription: string;
    };
    service: {
      eyebrow: string;
      title: string;
      subtitle: string;
      cities: string[];
      loanCards: { title: string; description: string; points: string[] }[];
    };
    why: {
      eyebrow: string;
      title: string;
      subtitle: string;
      cards: string[];
    };
    proof: {
      eyebrow: string;
      title: string;
      subtitle: string;
      testimonials: { name: string; quote: string }[];
    };
    areas: {
      eyebrow: string;
      title: string;
      subtitle: string;
      cards: { title: string; items: string }[];
    };
    faq: {
      eyebrow: string;
      title: string;
      subtitle: string;
      items: { question: string; answer: string }[];
    };
    nextStep: {
      eyebrow: string;
      title: string;
      description: string;
      bullets: string[];
    };
    form: {
      eyebrow: string;
      title: string;
      description: string;
      labels: {
        fullName: string;
        email: string;
        phone: string;
        loanGoal: string;
        timeline: string;
        zipCode: string;
        details: string;
        consent: string;
      };
      placeholders: {
        fullName: string;
        email: string;
        phone: string;
        timeline: string;
        zipCode: string;
        details: string;
      };
      loanGoals: string[];
      submit: string;
      submitting: string;
    };
  };
  loanPage: {
    heroEyebrow: string;
    title: string;
    subtitle: string;
    quickTipsTitle: string;
    quickTips: { title: string; description: string }[];
    compareTitle: string;
    compareSubtitle: string;
    compareMobileHint: string;
    compareHeaders: {
      loan: string;
      down: string;
      flexibility: string;
      monthly: string;
      best: string;
    };
    compareRows: CompareRow[];
    filterTitle: string;
    filterLabels: Record<LoanFilterKey, string>;
    resultCount: {
      singular: string;
      plural: string;
    };
    cards: LoanCard[];
    disclaimer: string;
    ctaTitle: string;
    ctaDescription: string;
    primaryCta: string;
    secondaryCta: string;
  };
  marketNews: {
    heroEyebrow: string;
    title: string;
    subtitle: string;
    featuredLabel: string;
    featuredTitle: string;
    featuredDescription: string;
    latestLabel: string;
    categoriesLabel: string;
    readMore: string;
    backToNews: string;
    posts: BlogPost[];
    topics: string[];
    ctaTitle: string;
    ctaDescription: string;
    primaryCta: string;
    secondaryCta: string;
  };
  thankYou: {
    eyebrow: string;
    title: string;
    description: string;
    stepsTitle: string;
    steps: string[];
    back: string;
  };
  footer: {
    brand: string;
    equalHousing: string;
    licensing: string;
    nmls: string;
    consumerAccess: string;
    privacy: string;
    terms: string;
    disclosures: string;
    legalNote: string;
    attribution: string;
  };
  mobile: {
    call: string;
    primaryHome: string;
    primaryOther: string;
  };
  validation: {
    fullNameRequired: string;
    emailRequired: string;
    emailInvalid: string;
    phoneRequired: string;
    timelineRequired: string;
    zipRequired: string;
    consentRequired: string;
    submitError: string;
  };
};

const copy: Record<Locale, CopyShape> = {
  en: {
    seo: {
      homeTitle: 'Laura Bui Home Loans | California Mortgage Loan Officer',
      homeDescription:
        'Personal mortgage guidance across California with a Bay Area focus, including San Jose, Milpitas, Fremont, Mountain View, and Palo Alto.',
      loanTitle: 'Loan Options | Laura Bui Home Loans',
      loanDescription:
        'Simple explanations of common mortgage options including Conventional, FHA, VA, Jumbo, Refinance, and Investment Property loans.',
      newsTitle: 'Market News | Laura Bui Home Loans',
      newsDescription:
        'Mortgage market updates, Bay Area housing insights, and simple home loan education articles from Laura Bui.',
      aboutTitle: 'About Me | Laura Bui Home Loans',
      aboutDescription:
        'Learn more about Laura Bui’s data-driven mortgage approach for Bay Area buyers, refinancers, and investors.',
      blueprintTitle: 'First-Time Homebuyer Blueprint | Laura Bui Home Loans',
      blueprintDescription:
        'Get your free First-Time Homebuyer Blueprint PDF with essential steps and checklists for buying your first home in the Bay Area.'
    },
    brand: {
      name: 'Laura Bui Home Loans',
      tagline: 'Personal Loan Officer | Serving all of California, with a Bay Area focus',
    },
    nav: {
      home: 'Home',
      loanOptions: 'Loan Options',
      marketNews: 'Market News',
      aboutMe: 'About Me',
      resources: 'Resources',
      blueprint: 'The First-Time Homebuyer Blueprint',
      checkOptions: 'Check your options',
      callLaura: 'Call Laura',
    },
    aboutMe: {
      heroEyebrow: 'About Me',
      title: 'Your Edge in the Bay Area Housing Market.',
      subtitle: 'I combine data-driven analysis with local market expertise to get you the right loan, faster.',
      bioTitle: 'The Core Bio',
      paragraphs: [
        "Buying a home in San Jose or the surrounding Bay Area isn't just a standard transaction—it’s a high-stakes financial puzzle. The market moves fast, and generic advice simply doesn't cut it here.",
        "As a senior Loan Officer, my approach is different. I don't use outdated sales scripts; I use data. My job is to analyze the market variables, run the numbers, and structure a mortgage strategy that perfectly aligns with your long-term financial goals.",
        'Whether you are a first-time buyer trying to break into the market or an investor expanding your portfolio, I remove the friction from the process.',
      ],
      expectTitle: 'What You Can Expect From Me',
      expectations: [
        {
          title: 'Radical Transparency',
          description: 'No hidden fees, no jargon, and no guesswork. Just clear math and straightforward advice.',
        },
        {
          title: 'Tech-Driven Speed',
          description: 'I leverage modern, secure tech tools to streamline your application, turning a historically clunky process into a seamless digital experience.',
        },
        {
          title: 'Local Precision',
          description: 'I live and work in San Jose. I know the nuances of our local neighborhoods and exactly what it takes to get an offer accepted here.',
        },
      ],
      beyondTitle: 'Beyond the Numbers',
      beyondBody: 'When I’m not structuring loans, my interests remain closely tied to the housing market. I spend time analyzing broader economic trends to stay sharp on market movements, and I have a strong appreciation for modern interior design—which helps me share my clients vision for the homes they are working so hard to secure.',
      ctaTitle: 'Ready to look at the math?',
      ctaBody: 'The best way to eliminate the stress of buying a home is to know exactly what you can afford. Let\'s look at the numbers together.',
      primaryCta: 'Schedule a 15-Minute Strategy Call',
      secondaryCta: 'Apply Securely Online',
    },
    blueprint: {
      heroEyebrow: 'Free Resource',
      title: 'The First-Time Homebuyer Blueprint',
      subtitle: 'Your complete guide to buying a home in the Bay Area',
      description: 'Get instant access to our comprehensive First-Time Homebuyer Blueprint PDF. This 25-page guide covers everything you need to know about buying your first home, from pre-approval to closing.',
      benefits: [
        'Step-by-step homebuying checklist',
        'Understanding your credit and pre-approval',
        'Budgeting for down payments and closing costs',
        'Timeline and key milestones',
        'Common first-time buyer mistakes to avoid',
        'Bay Area market insights and tips'
      ],
      form: {
        eyebrow: 'Get Your Free Blueprint',
        title: 'Enter your details below',
        description: 'We\'ll immediately download the First-Time Homebuyer Blueprint PDF to your device.',
        labels: {
          fullName: 'Full name',
          email: 'Email address',
        },
        placeholders: {
          fullName: 'Jane Smith',
          email: 'jane@email.com',
        },
        submit: 'Download Blueprint',
        submitting: 'Downloading...',
      },
      success: {
        eyebrow: 'Download Started!',
        title: 'Your blueprint is downloading',
        description: 'The First-Time Homebuyer Blueprint PDF has been downloaded to your device. Check your Downloads folder if you don\'t see it.',
        back: 'Back to Home',
      },
    },
    home: {
      heroBadge: 'Serving California with a strong Bay Area focus',
      fastCloseBadge: 'Eligible files may close in as little as 14 days',
      volumeBadge: 'Over 615 successful loans processed',
      title: 'Bay Area mortgage guidance with a polished, personal touch.',
      subtitleLine: 'Serving all of California. Especially active in the Bay Area.',
      description:
        'With 6 years of experience, Laura helps clients across California understand major loan options clearly, with special focus on Bay Area buyers, refinancers, and investors.',
      primaryCta: 'Book a 15-minute call',
      secondaryCta: 'Call or text Laura',
      stats: [
        { title: '6 years of experience', description: 'A steady, personal approach built on years of mortgage guidance.' },
        { title: 'All major loan types', description: 'Help clients compare options without confusion or pressure.' },
        { title: 'Bay Area focus', description: 'Serving all cities in California, with special focus on San Jose, Milpitas, Fremont, Mountain View, Palo Alto, and nearby Bay Area communities.' },
        { title: 'Over 615 successful loans processed', description: 'A strong track record across purchase, refinance, and Bay Area loan scenarios.' },
      ],
      fastCard: {
        eyebrow: 'Fast-close feature',
        title: 'Close in as little as 14 days*',
        description: 'A strong feature for buyers who need speed on eligible files.',
        footnote: '* Fast-close timeline depends on file quality, documentation readiness, and transaction conditions.',
      },
      volumeCard: {
        eyebrow: 'Track record',
        title: 'Over 615 successful loans processed',
        description: 'A strong record across purchase, refinance, and Bay Area loan scenarios.',
      },
      meetLaura: {
        eyebrow: 'Meet Laura',
        title: 'Personal guidance designed to feel calm and premium.',
        description: 'Add Laura’s real headshot here later. For now, this visual layout gives the page a stronger personal brand and more trust.',
        bullets: ['Bay Area buyers, refinancers, and investors', 'Clear process and faster response expectations', 'Support for eligible fast-close files'],
      },
      trustStrip: ['Personal brand with trust-first presentation', 'Testimonial-ready trust section', 'Purchase, refinance, and jumbo scenarios', 'Highlighted 14-day close feature'],
      featured: {
        eyebrow: 'Featured advantages',
        title: 'Add stronger conversion features beyond the basic lead form.',
        subtitle: 'This section adds persuasive depth through speed, process clarity, and local positioning.',
        cards: [
          { iconKey: 'timer', title: 'Close in as little as 14 days', description: 'Eligible files with complete documentation may be able to close in as little as 14 days.' },
          { iconKey: 'file', title: 'Clear document guidance', description: 'Borrowers know what to prepare, what matters, and what can slow things down.' },
          { iconKey: 'building', title: 'Bay Area market focus', description: 'Serving buyers, refinancers, and investors across California, with deeper focus on the Bay Area market.' },
        ],
      },
      fastSection: {
        eyebrow: 'Fast-close feature',
        title: 'Need a quicker path to closing?',
        subtitle: 'Use this section to market speed. It adds urgency and helps attract buyers who are in active purchase mode.',
        steps: [
          { step: '01', title: 'Quick consultation', description: 'Review goals, timeline, and loan scenario so the next step feels clear right away.' },
          { step: '02', title: 'Loan strategy', description: 'Compare major loan paths, monthly payment ranges, and documentation needs.' },
          { step: '03', title: 'Fast execution', description: 'For eligible files, move quickly with organized communication and a focused close timeline.' },
        ],
        spotlightEyebrow: 'Feature spotlight',
        spotlightTitle: '14-day closing',
        spotlightDescription: 'Frame this as a speed advantage for eligible files, not as a blanket promise for every borrower.',
      },
      service: {
        eyebrow: 'Where Laura serves',
        title: 'Serving all of California, with deeper focus on Bay Area borrowers.',
        subtitle: 'Laura serves clients throughout California, while focusing especially on Bay Area borrowers in cities like San Jose, Milpitas, Fremont, Mountain View, Palo Alto, and surrounding communities.',
        cities: ['San Jose', 'Milpitas', 'Fremont', 'Mountain View', 'Palo Alto', 'Santa Clara', 'Sunnyvale', 'Cupertino', 'San Mateo', 'Redwood City', 'and more across California'],
        loanCards: [
          { title: 'Home Purchase Loans', description: 'Support for first-time buyers, repeat buyers, and move-up buyers across the Bay Area.', points: ['Pre-approval guidance', 'Budget planning', 'Closing roadmap'] },
          { title: 'Refinance and Cash-Out', description: 'Review rate, payment, cash-out, and timing scenarios with a clear explanation of tradeoffs.', points: ['Rate review', 'Cash-out options', 'Cost-benefit clarity'] },
          { title: 'All Major Loan Types', description: 'Conventional, FHA, VA, Jumbo, investment-property, and other common scenarios explained clearly.', points: ['Loan comparison', 'Eligibility review', 'Document checklist'] },
        ],
      },
      why: {
        eyebrow: 'Why Laura Bui',
        title: 'Trust-first messaging usually outperforms flashy mortgage marketing.',
        subtitle: 'Mortgage clients want clarity, responsiveness, and someone who can explain tradeoffs without pressure.',
        cards: ['Clear explanations for all major loan types', 'Personal guidance from first call to closing', 'A calm, no-pressure consultation style', 'Bay Area focus with broad California support'],
      },
      proof: {
        eyebrow: 'Proof',
        title: 'Add real social proof close to the CTA.',
        subtitle: 'Testimonials work best when they sound specific and believable. The photo treatment here helps the page feel more complete and premium.',
        testimonials: [
          { name: 'Bay Area Buyer', quote: 'Laura made the process feel much less intimidating. Everything was explained clearly and we always knew what to do next.' },
          { name: 'Refinance Client', quote: 'Responsive, calm, and easy to work with. We understood our refinance options much better after one conversation.' },
          { name: 'Homebuyer Client', quote: 'The communication was strong from start to finish, and the advice felt honest instead of salesy.' },
        ],
      },
      areas: {
        eyebrow: 'Areas served',
        title: 'Serving California statewide, with the strongest focus on the Bay Area.',
        subtitle: 'Laura works with borrowers across California while staying especially active in Bay Area markets like San Jose, Milpitas, Fremont, Mountain View, Palo Alto, and surrounding communities.',
        cards: [
          { title: 'South Bay', items: 'San Jose, Milpitas, Santa Clara, Sunnyvale, Cupertino' },
          { title: 'Peninsula', items: 'Mountain View, Palo Alto, San Mateo, Redwood City' },
          { title: 'East Bay', items: 'Fremont and nearby East Bay communities' },
          { title: 'Broader California', items: 'Available to support clients across cities throughout California' },
        ],
      },
      faq: {
        eyebrow: 'California and Bay Area mortgage questions',
        title: 'Answer objections before the client has to ask.',
        subtitle: 'Use FAQs to reduce friction, improve clarity, and support conversion. Keep answers simple and avoid compliance-sensitive claims unless they are approved.',
        items: [
          { question: 'What types of loans do you help with?', answer: 'Laura works across major loan scenarios including purchase loans, refinance, Conventional, FHA, VA, Jumbo, and investment-property discussions.' },
          { question: 'Do you work with first-time buyers in the Bay Area?', answer: 'Yes. First-time buyers often need more education, budgeting clarity, and step-by-step support.' },
          { question: 'What does close in 14 days mean?', answer: 'It means some eligible files with strong readiness, complete paperwork, and the right transaction conditions may be able to close in as little as 14 days. It is not a guarantee for every file.' },
          { question: 'How do I know which loan type fits me best?', answer: 'That depends on your goals, cash available, timeline, property type, and monthly payment comfort. A good consultation should help narrow the right fit clearly.' },
        ],
      },
      nextStep: {
        eyebrow: 'Next step',
        title: 'Ready to talk through your loan options?',
        description: 'Use this page to introduce Laura Bui, capture qualified leads across California, and guide clients into a call or consultation.',
        bullets: ['One clean CTA path for consultation requests', 'Premium visual treatment with strong photo placement', 'Added feature for eligible 14-day close files'],
      },
      form: {
        eyebrow: 'Start here',
        title: 'Tell Laura what you need',
        description: 'Start with a quick conversation about your goals, timeline, and loan scenario.',
        labels: {
          fullName: 'Full name',
          email: 'Email',
          phone: 'Phone',
          loanGoal: 'Loan goal',
          timeline: 'Timeline',
          zipCode: 'ZIP code',
          details: 'Anything important to know?',
          consent: 'I agree to be contacted about my request. Replace this with your California-approved privacy, SMS, and consent language before going live.',
        },
        placeholders: {
          fullName: 'Jane Smith',
          email: 'jane@email.com',
          phone: '(555) 555-5555',
          timeline: '0-3 months',
          zipCode: '94105',
          details: 'Example: first-time buyer, self-employed, current mortgage balance, target budget, or property type',
        },
        loanGoals: ['Buy a home', 'Refinance', 'Investment property', 'Jumbo loan', 'VA loan', 'FHA loan', 'Conventional loan'],
        submit: 'Request a consultation',
        submitting: 'Submitting...',
      },
    },
    loanPage: {
      heroEyebrow: 'Loan Options',
      title: 'A simple guide to common loan types',
      subtitle: 'Short, easy-to-understand explanations to help borrowers see which option may fit them best. Final fit always depends on credit, income, cash available, property type, and overall goals.',
      quickTipsTitle: 'What usually matters most',
      quickTips: [
        { title: 'Down payment', description: 'How much cash you can comfortably bring to closing can shape your best loan path.' },
        { title: 'Credit profile', description: 'Stronger credit often opens more options and better pricing.' },
        { title: 'Property type', description: 'Primary home, second home, and investment property can qualify differently.' },
        { title: 'Income style', description: 'W-2, self-employed, commission, or variable income can affect documentation and fit.' },
      ],
      compareTitle: 'Compare loan options at a glance',
      compareSubtitle: 'This is a simple side-by-side guide for common loan paths. Exact fit still depends on your full financial profile.',
      compareMobileHint: 'Swipe sideways on mobile to compare all loan types.',
      compareHeaders: {
        loan: 'Loan type',
        down: 'Down payment',
        flexibility: 'Credit flexibility',
        monthly: 'Monthly cost',
        best: 'Best for',
      },
      compareRows: [
        { loan: 'Conventional', down: 'As low as 3% down', flexibility: 'Often ~620+ credit', monthly: 'PMI usually until 20% equity', best: 'Strong-credit buyers wanting flexibility' },
        { loan: 'FHA', down: '3.5% down at 580+ FICO', flexibility: '500–579 may need 10% down', monthly: 'Mortgage insurance applies', best: 'First-time buyers or buyers needing more flexibility' },
        { loan: 'VA', down: 'As low as 0% down', flexibility: 'Lender credit/income review still applies', monthly: 'No monthly PMI', best: 'Eligible military-connected borrowers' },
        { loan: 'Jumbo', down: 'Often 10–20% down', flexibility: 'Many lenders prefer 700+ credit', monthly: 'Higher reserves often needed', best: 'Buyers in higher-priced markets' },
        { loan: 'Investment Property', down: 'Often 15–25% down', flexibility: 'Many lenders prefer 680–700+ credit', monthly: 'Usually higher rate and reserves', best: 'Real-estate investors and rental-property buyers' },
      ],
      filterTitle: 'Filter by situation',
      filterLabels: { all: 'All', purchase: 'Purchase', refinance: 'Refinance', investment: 'Investment', firstTime: 'First-time buyer' },
      resultCount: { singular: 'Showing 1 loan option', plural: 'Showing {count} loan options' },
      cards: [
        { title: 'Conventional Loan', description: 'A common mortgage option with flexible terms and competitive pricing.', bestForLabel: 'Best for', bestFor: 'Borrowers with solid credit, stable income, and some money available for down payment.', noteLabel: 'Good to know', note: 'Often a strong fit when you want flexibility and do not need a government-backed program.', requirementLabel: 'Typical requirements', requirements: ['As low as 3% down for eligible buyers', 'Many lenders look for ~620+ credit', 'Stable income and employment', 'Standard income and asset documents'], filters: ['all', 'purchase'] },
        { title: 'FHA Loan', description: 'A government-backed option designed to make homeownership more accessible.', bestForLabel: 'Best for', bestFor: 'First-time buyers or borrowers who need a lower down payment or more flexible credit path.', noteLabel: 'Good to know', note: 'Mortgage insurance costs can be higher, so compare the full monthly payment.', requirementLabel: 'Typical requirements', requirements: ['3.5% down at 580+ FICO', '500–579 may require 10% down', 'Must be a primary residence', 'Income and asset documentation required'], filters: ['all', 'purchase', 'firstTime'] },
        { title: 'VA Loan', description: 'A government-backed mortgage for eligible veterans, active-duty service members, and some surviving spouses.', bestForLabel: 'Best for', bestFor: 'Eligible military-connected borrowers who want strong benefits and low down payment options.', noteLabel: 'Good to know', note: 'If you qualify, this can be one of the strongest options available.', requirementLabel: 'Typical requirements', requirements: ['As low as 0% down for eligible borrowers', 'Certificate of Eligibility required', 'Lender income and credit review', 'Primary residence occupancy rules'], filters: ['all', 'purchase'] },
        { title: 'Jumbo Loan', description: 'A loan for higher-priced homes that go above standard conforming loan limits.', bestForLabel: 'Best for', bestFor: 'Buyers in expensive markets like many parts of the Bay Area.', noteLabel: 'Good to know', note: 'Usually needs stronger income, reserves, and credit than smaller loan amounts.', requirementLabel: 'Typical requirements', requirements: ['Often 10–20% down', 'Many lenders prefer 700+ credit', 'Often 6–12 months reserves', 'Used for homes above conforming limits'], filters: ['all', 'purchase'] },
        { title: 'Refinance', description: 'A way to replace your current mortgage with a new one.', bestForLabel: 'Best for', bestFor: 'Homeowners looking to lower payment, change loan term, or improve the structure of their mortgage.', noteLabel: 'Good to know', note: 'A refinance only makes sense when the numbers work after fees and savings are considered.', requirementLabel: 'Typical requirements', requirements: ['Many lenders look for ~620+ credit', 'Enough equity to qualify', 'Income verification required', 'Closing costs still apply'], filters: ['all', 'refinance'] },
        { title: 'Cash-Out Refinance', description: 'A refinance that lets you take equity out of your home as cash.', bestForLabel: 'Best for', bestFor: 'Homeowners who want funds for renovation, debt consolidation, or major expenses.', noteLabel: 'Good to know', note: 'This can increase your loan balance, so payment and long-term cost should be reviewed carefully.', requirementLabel: 'Typical requirements', requirements: ['Often capped around 80% loan-to-value', 'Sufficient home equity required', 'Income and credit review', 'New payment must still qualify'], filters: ['all', 'refinance'] },
        { title: 'Investment Property Loan', description: 'A loan for a property you plan to rent out or hold as an investment.', bestForLabel: 'Best for', bestFor: 'Borrowers building wealth through real estate or buying a non-owner-occupied property.', noteLabel: 'Good to know', note: 'These loans often need stronger reserves, larger down payments, and different pricing.', requirementLabel: 'Typical requirements', requirements: ['Often 15–25% down', 'Many lenders prefer 680–700+ credit', 'Stronger reserves are common', 'Non-owner-occupied pricing applies'], filters: ['all', 'investment'] },
        { title: 'First-Time Buyer Programs', description: 'Not one single loan type, but a group of programs that can help make buying easier.', bestForLabel: 'Best for', bestFor: 'First-time buyers who want affordability support, lower down payment options, or program guidance.', noteLabel: 'Good to know', note: 'Program rules vary by location and borrower profile, so eligibility should be checked case by case.', requirementLabel: 'Typical requirements', requirements: ['Often as low as 3% down depending on program', 'Must meet first-time buyer rules', 'Some programs have income limits', 'Location and program eligibility vary'], filters: ['all', 'purchase', 'firstTime'] },
      ],
      disclaimer: 'This page is designed to keep things simple. The best loan choice still depends on your full financial picture and the property you want to buy or refinance.',
      ctaTitle: 'Not sure which option fits you best?',
      ctaDescription: 'Laura can help narrow the right path based on your budget, timeline, credit profile, and home goals.',
      primaryCta: 'Talk to Laura',
      secondaryCta: 'Back to home',
    },
    marketNews: {
      heroEyebrow: 'Market News',
      title: 'Mortgage updates and simple housing insights',
      subtitle: 'This page is designed to showcase the blog posts Laura writes, so clients can learn from her and build trust before they reach out.',
      featuredLabel: 'Featured article',
      featuredTitle: 'Use this page to turn your market knowledge into trust',
      featuredDescription: 'Helpful blog content can answer common client questions about rates, affordability, refinance timing, Bay Area competition, and what buyers should watch next.',
      latestLabel: 'Latest posts',
      categoriesLabel: 'Topics you can write about',
      readMore: 'Read article',
      backToNews: 'Back to Market News',
      posts: [
        {
          slug: 'bay-area-rates',
          title: 'How do current mortgage rates affect home buyers in the Bay Area?',
          category: 'Rates',
          excerpt: 'Simple explanation of how interest rate changes affect monthly payments, affordability, and home buying strategy.',
          date: 'April 2026',
          readTime: '6 min read',
          image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=80',
          imageAlt: 'Beautiful Bay Area style home',
          body: [
            'Lãi suất mortgage không chỉ thay đổi một con số trên tiêu đề tin tức. Nó thay đổi số tiền người mua phải trả hàng tháng, và điều đó ảnh hưởng trực tiếp đến cảm giác tự tin khi bắt đầu tìm nhà.',
            'Với người mua nhà tại Bay Area, chỉ một thay đổi nhỏ về lãi suất cũng có thể tạo ra tác động rõ rệt vì giá nhà vốn đã cao. Khi lãi suất tăng, người mua có thể phải điều chỉnh ngân sách, số tiền down payment hoặc khu vực mục tiêu. Khi lãi suất giảm, khả năng chi trả có thể tốt hơn nhưng cạnh tranh cũng thường tăng lên.',
            'Câu hỏi quan trọng không chỉ là lãi suất cao hay thấp. Điều quan trọng hơn là khoản thanh toán đó có còn phù hợp với mục tiêu, dòng tiền và mức thoải mái của bạn hay không. Một khoản vay nhìn có vẻ ổn trên giấy vẫn có thể tạo áp lực thật ngoài đời nếu cộng thêm thuế nhà, bảo hiểm, HOA và các chi phí sinh hoạt khác.',
            'Vì vậy, người mua thường có lợi hơn khi xem vài kịch bản thực tế thay vì chỉ chờ một mức lãi suất hoàn hảo. Chỉ nhìn một mức giá nhà, một mức down payment và một khoản thanh toán mục tiêu thường là quá hẹp. Cách tốt hơn là so sánh nhiều kịch bản song song để thấy rõ độ linh hoạt.',
            'Tại Bay Area, chiến lược quan trọng không kém gì lãi suất. Có người chọn giữ lại nhiều reserves để an toàn hơn. Có người lại muốn down payment mạnh hơn để giảm áp lực thanh toán hàng tháng. Có người dịch chuyển nhẹ khu vực tìm nhà để giữ khoản thanh toán ở mức dễ chịu hơn.',
            'Nếu bạn dự định mua trong thời gian gần, điều đáng tập trung là mức độ sẵn sàng thay vì cố dự đoán thị trường hoàn hảo. Không ai kiểm soát chính xác được lãi suất sắp tới, nhưng bạn có thể kiểm soát hồ sơ, ngân sách và tốc độ phản ứng khi căn nhà phù hợp xuất hiện.',
            'Một buổi tư vấn hữu ích thường trả lời ba câu hỏi: khoản thanh toán nào là an toàn, mức giá nào hỗ trợ khoản thanh toán đó và cấu trúc khoản vay nào giúp bạn linh hoạt hơn sau khi hoàn tất. Cuộc trao đổi đó thường giá trị hơn nhiều so với việc chỉ hỏi liệu bây giờ có phải thời điểm tốt để mua hay không.',
            'Lãi suất đúng rất quan trọng. Nhưng kế hoạch đúng còn quan trọng hơn. Người mua hiểu rõ con số của mình thường đưa ra quyết định bình tĩnh và chắc chắn hơn trong thị trường cạnh tranh.'
          ],
        },
        {
          slug: 'when-refinance-makes-sense',
          title: 'When does refinance really make sense?',
          category: 'Refinance',
          excerpt: 'A practical way to think about monthly savings, closing costs, and how long you plan to keep the loan.',
          date: 'April 2026',
          readTime: '6 min read',
          image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=80',
          imageAlt: 'Calculator and refinance paperwork on desk',
          body: [
            "Refinance không chỉ là chuyện lãi suất thấp hơn. Điều quan trọng là khoản vay mới có cải thiện tình hình của bạn một cách rõ ràng hay không.",
            "Refinance có thể hợp lý khi nó giúp giảm khoản thanh toán hàng tháng, rút ngắn thời hạn vay, chuyển từ lãi suất thả nổi sang cố định hoặc hỗ trợ mục tiêu lớn hơn như cash-out để sửa nhà, sắp xếp lại nợ hoặc cải thiện dòng tiền.",
            "Nhiều chủ nhà nhìn vào lãi suất đầu tiên, điều đó hoàn toàn dễ hiểu. Nhưng trong thực tế, khoản thanh toán và tổng chi phí thường quan trọng hơn. Một mức lãi suất thấp hơn vẫn có thể cho kết quả kém hấp dẫn nếu closing costs cao, nếu thời hạn vay bị kéo lại quá dài hoặc nếu phần tiết kiệm thật sự không nhiều như kỳ vọng.",
            "Một cách rất thực tế để nhìn refinance là theo góc độ hoàn vốn. Nói đơn giản, bạn cần bao lâu để phần tiết kiệm hàng tháng bù lại chi phí làm khoản vay mới? Nếu bạn định bán nhà, chuyển nhà hoặc refinance lần nữa trước mốc đó thì giao dịch có thể không hấp dẫn như ban đầu tưởng tượng.",
            "Ngoài câu chuyện thanh toán, refinance còn có những lý do khác. Có người muốn sự ổn định. Có người muốn giảm rủi ro từ adjustable rate. Có người muốn cấu trúc khoản vay dễ quản lý hơn. Trong những trường hợp đó, lựa chọn đúng không phải lúc nào cũng là lựa chọn có mức lãi suất thấp nhất trên tiêu đề. Đó là lựa chọn hỗ trợ tốt nhất cho mục tiêu tổng thể của bạn.",
            "Cash-out refinance còn cần xem kỹ hơn. Nó có thể hữu ích khi số tiền rút ra phục vụ mục đích rõ ràng như cải tạo nhà, nâng cấp tài sản hoặc thay thế những khoản nợ đắt đỏ hơn. Nhưng nó cũng làm tăng dư nợ, nên chi phí dài hạn cần được nhìn đầy đủ chứ không chỉ nhìn vào khoản tiền mặt nhận được.",
            "Một buổi review refinance tốt nên so sánh khoản thanh toán hiện tại, khoản thanh toán mới, closing costs, thời gian bạn dự định còn giữ căn nhà và lý do thật sự của việc thay đổi. Nếu thiếu bức tranh đầy đủ đó, rất dễ phản ứng theo một rate quote mà chưa hiểu rõ toàn bộ đánh đổi.",
            "Những quyết định refinance tốt nhất thường đến từ sự rõ ràng chứ không phải sự vội vàng. Khi con số phù hợp và thời điểm ăn khớp với mục tiêu, refinance có thể là một công cụ rất mạnh. Khi chưa phù hợp, chờ thêm lại có thể là lựa chọn tốt hơn."
          ],
        },
        {
          slug: 'compete-without-rushing',
          title: 'Buying a home in the competitive Bay Area market',
          category: 'Home buying',
          excerpt: 'Practical strategies to compete successfully in an expensive and highly competitive housing market.',
          date: 'April 2026',
          readTime: '6 min read',
          image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80',
          imageAlt: 'Modern bright home space for Bay Area home buyers',
          body: [
            'Thị trường cạnh tranh tạo áp lực, nhưng quyết định vội thường dẫn đến kết quả không tốt. Sự chuẩn bị mới là thứ tạo ra tốc độ mà không cần hoảng loạn.',
            'Tại Bay Area, người mua thường cảm thấy mình phải hành động thật nhanh nếu không sẽ bỏ lỡ cơ hội. Cảm giác đó là có thật, nhưng tốc độ chỉ thực sự hữu ích khi nó đến từ sự sẵn sàng chứ không phải từ cảm xúc. Người hiểu rõ con số của mình thường hành động nhanh hơn và chắc chắn hơn người vẫn còn đang đoán.',
            'Bước đầu tiên là xem ngân sách một cách trung thực. Không chỉ là số tiền lender có thể chấp thuận, mà là khoản thanh toán nào vẫn thật sự dễ chịu sau khi cộng thuế nhà, bảo hiểm, chi phí sửa chữa, HOA, đi lại và sinh hoạt hàng ngày. Một căn nhà có thể technically affordable nhưng vẫn khiến cuộc sống bị căng về tiền.',
            'Bước thứ hai là chuẩn bị giấy tờ sớm. Khi hồ sơ đã ngăn nắp, người mua có thể phản ứng nhanh hơn khi cần cập nhật pre-approval, gửi offer hoặc trả lời các yêu cầu từ lender. Điều đó cũng giúp người mua trông đáng tin hơn trong mắt các bên tham gia giao dịch.',
            'Bước thứ ba là hiểu mình có thể linh hoạt ở đâu. Có người linh hoạt về thành phố, có người linh hoạt về diện tích, tình trạng nhà hoặc thời gian closing. Chính sự linh hoạt đó thường giúp mở rộng cơ hội mà không buộc người mua phải bước vào một giao dịch không thật sự phù hợp.',
            'Một chiến lược mua nhà tốt cũng cần kỷ luật cảm xúc. Người mua đôi khi cố kéo quá sức chỉ vì căn nhà đẹp hoặc vì áp lực cạnh tranh. Nếu dừng lại để so lại khoản thanh toán, mức độ thoải mái dài hạn và chi phí sở hữu thật sự, bạn sẽ tránh được nhiều quyết định đáng tiếc.',
            'Mục tiêu không chỉ là thắng offer. Mục tiêu tốt hơn là thắng đúng căn nhà với điều kiện vẫn hỗ trợ cuộc sống của bạn sau khi hoàn tất. Một chiến thắng quá vội có thể trở thành gánh nặng nếu nó làm cạn reserves hoặc tạo áp lực thanh toán kéo dài.',
            'Những người mua làm tốt nhất trong thị trường cạnh tranh thường là người chịu khó chậm lại ở giai đoạn chuẩn bị, rồi chỉ tăng tốc khi cơ hội phù hợp thật sự xuất hiện.'
          ],
        },
        {
          slug: 'jumbo-loans-plain-english',
          title: 'Jumbo loans explained in plain English',
          category: 'Jumbo',
          excerpt: 'A short guide to why jumbo financing works differently and what high-price home buyers should prepare for.',
          date: 'April 2026',
          readTime: '6 min read',
          image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1400&q=80',
          imageAlt: 'High-value home representing jumbo financing',
          body: [
            'Jumbo loan thường được dùng khi số tiền vay vượt quá giới hạn conforming tiêu chuẩn. Trong các thị trường giá cao, đây có thể là điều rất bình thường chứ không hề hiếm.',
            'Vì khoản vay lớn hơn, lender thường xem hồ sơ kỹ hơn. Tín dụng, reserves, down payment và sức mạnh thu nhập tổng thể đều được nhìn chặt hơn vì mức độ rủi ro của khoản vay cũng lớn hơn.',
            'Đó là lý do jumbo financing thường cho cảm giác khác so với những khoản vay nhỏ hơn. Người vay có thể gặp yêu cầu cao hơn về reserves, kỳ vọng tín dụng mạnh hơn hoặc nhu cầu giấy tờ sạch và rõ ràng hơn. Điều đó không có nghĩa khoản vay này quá khó. Nó chỉ có nghĩa sự chuẩn bị cần tốt hơn.',
            'Ở những nơi như Bay Area, jumbo không nhất thiết đồng nghĩa với nhà siêu sang như nhiều người nghĩ. Nhiều căn nhà gia đình rất bình thường ở khu vực tốt vẫn có thể rơi vào nhóm cần jumbo chỉ vì mức giá và số tiền vay đi kèm.',
            'Với người mua đang cân nhắc jumbo, điều hữu ích là nhìn xa hơn chuyện có được chấp thuận hay không. Câu hỏi tốt hơn là khoản thanh toán, down payment, reserves và vị thế tiền mặt tổng thể của bạn kết hợp với nhau như thế nào. Người mua thường tự tin hơn khi biết không chỉ mình có thể qualify bao nhiêu, mà còn cấu trúc nào khiến cuộc sống sau closing dễ chịu hơn.',
            'Giấy tờ thường đóng vai trò rất lớn. Hồ sơ thu nhập rõ ràng, tài sản minh bạch và hiểu chính xác nguồn tiền sẵn có sẽ giúp quá trình mượt hơn nhiều. Điều này càng quan trọng với người tự doanh hoặc thu nhập biến động.',
            'Chiến lược jumbo cũng gắn chặt với kế hoạch dài hạn. Có người muốn giữ thanh khoản mạnh hơn. Có người muốn giảm áp lực khoản thanh toán. Có người muốn reserves cao hơn dù phải điều chỉnh cấu trúc down payment. Không có một câu trả lời đúng cho tất cả.',
            'Điều quan trọng là hiểu các con số càng sớm càng tốt. Khi người mua hiểu jumbo financing trước khi bước vào giai đoạn shopping nghiêm túc, họ thường đi nhanh hơn và bớt căng thẳng hơn.'
          ],
        },
      ],
      topics: ['Mortgage rates', 'Bay Area housing market', 'Refinance timing', 'First-time buyer tips', 'Jumbo loan knowledge', 'Monthly payment strategies'],
      ctaTitle: 'Done reading and want more advice?',
      ctaDescription: 'Use these articles to educate clients first, then guide them to a simple call or consultation with Laura.',
      primaryCta: 'Talk to Laura',
      secondaryCta: 'Back to home',
    },
    thankYou: {
      eyebrow: 'Thank you',
      title: 'Your request has been received.',
      description: 'Thank you for your request.',
      stepsTitle: 'Next steps',
      steps: ["Replace the placeholder phone number with your real number.", "Add Laura's real headshot in the hero and profile.", "Connect the form to email workflow or Calendly."],
      back: 'Back to home',
    },
    footer: {
      brand: 'Laura Bui Home Loans',
      equalHousing: 'Equal Housing Opportunity',
      licensing: 'Licensed in California. Replace this line with your exact licensed entity name, license type, California regulator details, and any required company disclosure.',
      nmls: 'NMLS ID: Update with your individual NMLS and company NMLS, if applicable.',
      consumerAccess: 'NMLS Consumer Access',
      privacy: 'Privacy Policy',
      terms: 'Terms of Use',
      disclosures: 'State Disclosures',
      legalNote: 'This footer is a template only. Before publishing, confirm all required California, federal, lender, brokerage, fair housing, advertising, privacy, SMS, and disclosure language with your compliance team or attorney.',
      attribution: '© 2026 Laura Bui Home Loans. All Rights Reserved. Created and designed by Horizon Data Solutions.',
    },
    mobile: {
      call: 'Call',
      primaryHome: 'Get Started',
      primaryOther: 'Contact',
    },
    validation: {
      fullNameRequired: 'Full name is required.',
      emailRequired: 'Email is required.',
      emailInvalid: 'Please enter a valid email address.',
      phoneRequired: 'Phone number is required.',
      timelineRequired: 'Timeline is required.',
      zipRequired: 'ZIP code is required.',
      consentRequired: 'You must agree before submitting the form.',
      submitError: 'An error occurred while submitting the form.',
    },
  },
};

const iconMap = {
  timer: Timer,
  file: FileCheck2,
  building: Building2,
} as const;

const pageParamMap: Record<PageKey, string> = {
  home: 'home',
  loanOptions: 'loan-options',
  marketNews: 'market-news',
  aboutMe: 'about-me',
  blueprint: 'blueprint',
};

const phoneHref = 'tel:+10000000000';
const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A96B] focus-visible:ring-offset-2 focus-visible:ring-offset-white';

function emphasizeText(text: string) {
  const pattern = /(3(?:\.5)?% down|0% down|10% down|10–20% down|15–25% down|620\+ credit|580\+ FICO|500–579|700\+ credit|680–700\+ credit|6–12 months reserves|80% loan-to-value|20% equity|PMI|mortgage insurance|Certificate of Eligibility|primary residence|closing costs|home equity)/g;
  return text.split(pattern).map((part, index) => {
    const isImportant = pattern.test(part);
    pattern.lastIndex = 0;
    return isImportant ? (
      <strong key={`${part}-${index}`} className="font-semibold text-[#142235]">{part}</strong>
    ) : (
      <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>
    );
  });
}

function SectionTitle({ eyebrow, title, subtitle, light = false }: { eyebrow: string; title: string; subtitle: string; light?: boolean }) {
  return (
    <div className="max-w-3xl">
      <p className={`text-sm font-semibold uppercase tracking-[0.22em] ${light ? 'text-[#E8C98A]' : 'text-[#8B7355]'}`}>{eyebrow}</p>
      <h2 className={`mt-3 text-3xl font-semibold tracking-tight sm:text-4xl ${light ? 'text-white' : 'text-[#142235]'}`}>{title}</h2>
      <p className={`mt-4 text-base leading-7 sm:text-lg ${light ? 'text-white/75' : 'text-[#5B6472]'}`}>{subtitle}</p>
    </div>
  );
}

function LanguageSwitcher({ locale, onChange }: { locale: Locale; onChange: (nextLocale: Locale) => void }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[#E7DECF] bg-[#FBF7F0] p-1">
      <Languages className="ml-2 h-4 w-4 text-[#8B7355]" />
      <button type="button" onClick={() => onChange('en')} aria-pressed={locale === 'en'} className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${focusRing} ${locale === 'en' ? 'bg-[#142235] text-white' : 'text-[#5B6472]'}`}>US</button>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-[#E7DECF] bg-white p-5 shadow-sm shadow-[#D6C3A2]/10">
      <button type="button" onClick={() => setOpen((prev) => !prev)} className={`flex w-full items-center justify-between gap-4 text-left ${focusRing}`} aria-expanded={open}>
        <span className="text-base font-semibold text-[#142235]">{question}</span>
        <ChevronDown className={`h-5 w-5 shrink-0 text-[#8B7355] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open ? <p className="mt-4 text-sm leading-6 text-[#5B6472]">{answer}</p> : null}
    </div>
  );
}

function LoanComparisonTable({ title, subtitle, mobileHint, headers, rows }: { title: string; subtitle: string; mobileHint: string; headers: CopyShape['loanPage']['compareHeaders']; rows: CompareRow[] }) {
  const attributes: { key: CompareKey; label: string }[] = [
    { key: 'down', label: headers.down },
    { key: 'flexibility', label: headers.flexibility },
    { key: 'monthly', label: headers.monthly },
    { key: 'best', label: headers.best },
  ];
  return (
    <div className="overflow-hidden rounded-[32px] border border-[#E7DECF] bg-white shadow-sm shadow-[#D8CBB6]/10">
      <div className="border-b border-[#EDE4D7] bg-[linear-gradient(180deg,#FBF7F0_0%,#F5E9D6_100%)] px-6 py-6 sm:px-8">
        <h2 className="text-2xl font-semibold tracking-tight text-[#142235]">{title}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-[#5B6472]">{subtitle}</p>
        <p className="mt-3 text-xs font-medium text-[#8B7355] md:hidden">{mobileHint}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full text-left">
          <caption className="sr-only">{title}</caption>
          <thead className="bg-[#FCFAF6]">
            <tr className="text-sm text-[#6E6A64]">
              <th scope="col" className="sticky left-0 z-10 bg-[#FCFAF6] px-6 py-4 font-semibold sm:px-8">{headers.loan}</th>
              {rows.map((row) => <th key={row.loan} scope="col" className="bg-[#FCFAF6] px-6 py-4 font-semibold">{row.loan}</th>)}
            </tr>
          </thead>
          <tbody>
            {attributes.map((attribute, rowIndex) => (
              <tr key={attribute.key} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-[#FFFCF7]'}>
                <th scope="row" className="sticky left-0 z-10 border-t border-[#EFE4D3] bg-inherit px-6 py-4 font-semibold text-[#142235] sm:px-8">{attribute.label}</th>
                {rows.map((row) => <td key={`${attribute.key}-${row.loan}`} className="border-t border-[#EFE4D3] px-6 py-4 text-sm text-[#5B6472]">{row[attribute.key]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LoanFilterBar({ title, labels, current, resultCountText, onChange }: { title: string; labels: Record<LoanFilterKey, string>; current: LoanFilterKey; resultCountText: string; onChange: (next: LoanFilterKey) => void }) {
  return (
    <div className="mb-8 rounded-[28px] border border-[#E7DECF] bg-[linear-gradient(180deg,#FBF7F0_0%,#F8EEE0_100%)] p-5 shadow-sm shadow-[#D8CBB6]/10 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8B7355]">{title}</p>
          <p className="mt-2 text-sm text-[#5B6472]">{resultCountText}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(Object.entries(labels) as [LoanFilterKey, string][]).map(([key, label]) => (
            <button key={key} type="button" onClick={() => onChange(key)} aria-pressed={current === key} className={`rounded-full px-4 py-2 text-sm font-medium transition ${focusRing} ${current === key ? 'bg-[#142235] text-white shadow-md shadow-[#142235]/15' : 'border border-[#D8CDBD] bg-white text-[#4F5966] hover:border-[#C8A96B] hover:text-[#142235]'}`}>{label}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function LoanOptionCard({ card, index }: { card: LoanCard; index: number }) {
  const loanCardIcons = [Home, BadgeCheck, ShieldCheck, Building2, Timer, FileCheck2, Home, Sparkles] as const;
  const loanCardShells = ['from-[#142235] to-[#25456B]', 'from-[#7A5B2E] to-[#B88B44]', 'from-[#284B63] to-[#3D6D8A]', 'from-[#433D72] to-[#6A64A8]', 'from-[#1B5A53] to-[#2C8C82]', 'from-[#5A3F2C] to-[#8B6243]', 'from-[#3C4A2F] to-[#667A4C]', 'from-[#5B365D] to-[#8C5D8E]'] as const;
  const Icon = loanCardIcons[index % loanCardIcons.length];
  const shell = loanCardShells[index % loanCardShells.length];
  return (
    <article className="group overflow-hidden rounded-[32px] border border-[#E7DECF] bg-white shadow-sm shadow-[#D8CBB6]/12 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#D8CBB6]/18">
      <div className={`bg-gradient-to-r ${shell} px-6 py-5 text-white sm:px-7`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">{String(index + 1).padStart(2, '0')}</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight">{card.title}</h3>
          </div>
          <div className="rounded-2xl bg-white/12 p-3 ring-1 ring-white/15"><Icon className="h-5 w-5" /></div>
        </div>
      </div>
      <div className="p-6 sm:p-7">
        <p className="text-base leading-7 text-[#4F5966]">{emphasizeText(card.description)}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-[#FBF7F0] p-4 ring-1 ring-[#EFE4D3]">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8B7355]">{card.bestForLabel}</p>
            <p className="mt-3 text-sm leading-6 text-[#394556]">{emphasizeText(card.bestFor)}</p>
          </div>
          <div className="rounded-2xl border border-[#E7DECF] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8B7355]">{card.noteLabel}</p>
            <p className="mt-3 text-sm leading-6 text-[#394556]">{emphasizeText(card.note)}</p>
          </div>
        </div>
        <div className="mt-4 rounded-2xl border border-[#E7DECF] bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8B7355]">{card.requirementLabel}</p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {card.requirements.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm leading-6 text-[#394556]">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#8B7355]" />
                <span>{emphasizeText(item)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

function looksLikeEmail(value: string) {
  const trimmed = value.trim();
  return trimmed.includes('@') && trimmed.includes('.') && trimmed.length >= 5;
}

function validateForm(data: FormState, localeCopy: CopyShape) {
  if (!data.fullName.trim()) return localeCopy.validation.fullNameRequired;
  if (!data.email.trim()) return localeCopy.validation.emailRequired;
  if (!looksLikeEmail(data.email)) return localeCopy.validation.emailInvalid;
  if (!data.phone.trim()) return localeCopy.validation.phoneRequired;
  if (!data.timeline.trim()) return localeCopy.validation.timelineRequired;
  if (!data.zipCode.trim()) return localeCopy.validation.zipRequired;
  if (!data.consent) return localeCopy.validation.consentRequired;
  return '';
}

function getPageFromUrl(): PageKey {
  if (typeof window === 'undefined') return 'home';
  const page = new URLSearchParams(window.location.search).get('page');
  if (page === pageParamMap.loanOptions) return 'loanOptions';
  if (page === pageParamMap.marketNews) return 'marketNews';
  if (page === pageParamMap.aboutMe) return 'aboutMe';
  if (page === pageParamMap.blueprint) return 'blueprint';
  return 'home';
}

function getResultCountText(locale: Locale, count: number) {
  return count === 1
    ? copy.en.loanPage.resultCount.singular
    : copy.en.loanPage.resultCount.plural.replace('{count}', String(count));
}

export default function MortgageLandingPage() {
  const [locale, setLocale] = useState<Locale>('en');
  const [currentPage, setCurrentPage] = useState<PageKey>('home');
  const [loanFilter, setLoanFilter] = useState<LoanFilterKey>('all');
  const [selectedPostSlug, setSelectedPostSlug] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    email: '',
    phone: '',
    loanGoal: copy.en.home.form.loanGoals[0],
    timeline: '',
    zipCode: '',
    details: '',
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);
  const [blueprintFormData, setBlueprintFormData] = useState({ fullName: '', email: '' });
  const [blueprintSubmitted, setBlueprintSubmitted] = useState(false);
  const [blueprintSubmitting, setBlueprintSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resourcesDropdownOpen && !(event.target as Element).closest('.relative')) {
        setResourcesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [resourcesDropdownOpen]);

  const t = copy[locale];

  const isValid = useMemo(() => validateForm(formData, t) === '', [formData, t]);

  const filteredLoanCards = useMemo(() => {
    const cards = t.loanPage.cards.filter((card) => loanFilter === 'all' || card.filters.includes(loanFilter));
    return [...cards].sort((a, b) => Number(b.filters.includes(loanFilter)) - Number(a.filters.includes(loanFilter)));
  }, [loanFilter, t]);

  const selectedPost = useMemo(() => t.marketNews.posts.find((post) => post.slug === selectedPostSlug) ?? null, [selectedPostSlug, t]);

  useEffect(() => {
    const seoTitle =
      currentPage === 'home'
        ? t.seo.homeTitle
        : currentPage === 'loanOptions'
          ? t.seo.loanTitle
          : currentPage === 'aboutMe'
            ? t.seo.aboutTitle
            : currentPage === 'blueprint'
              ? t.seo.blueprintTitle
              : selectedPost
                ? `${selectedPost.title} | ${t.brand.name}`
                : t.seo.newsTitle;
    const seoDescription =
      currentPage === 'home'
        ? t.seo.homeDescription
        : currentPage === 'loanOptions'
          ? t.seo.loanDescription
          : currentPage === 'aboutMe'
            ? t.seo.aboutDescription
            : currentPage === 'blueprint'
              ? t.seo.blueprintDescription
              : selectedPost
                ? selectedPost.excerpt
                : t.seo.newsDescription;
    document.title = seoTitle;
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', seoDescription);
  }, [currentPage, selectedPost, t]);

  function updateField<K extends keyof FormState>(name: K, value: FormState[K]) {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function switchLocale(nextLocale: Locale) {
    if (nextLocale === locale) return;
    setError('');
    setFormData((prev) => {
      const currentGoals = copy[locale].home.form.loanGoals;
      const nextGoals = copy[nextLocale].home.form.loanGoals;
      const currentIndex = Math.max(currentGoals.indexOf(prev.loanGoal), 0);
      return { ...prev, loanGoal: nextGoals[currentIndex] ?? nextGoals[0] };
    });
    setLocale(nextLocale);
    try {
      window.localStorage.setItem('laura-bui-locale', nextLocale);
    } catch {}
  }

  function navigateToPage(nextPage: PageKey) {
    setCurrentPage(nextPage);
    if (nextPage !== 'marketNews') setSelectedPostSlug(null);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (nextPage === 'home') url.searchParams.delete('page');
      else url.searchParams.set('page', pageParamMap[nextPage]);
      window.history.pushState({}, '', url.toString());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function openPost(slug: string) {
    setSelectedPostSlug(slug);
    setCurrentPage('marketNews');
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goToContact() {
    if (currentPage !== 'home') {
      navigateToPage('home');
      window.setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
      return;
    }
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationError = validateForm(formData, t);
    setError(validationError);
    if (validationError) return;
    try {
      setIsSubmitting(true);
      await new Promise((resolve) => window.setTimeout(resolve, 600));
      setSubmitted(true);
      setError('');
    } catch {
      setError(t.validation.submitError);
    } finally {
      setIsSubmitting(false);
    }
  }

  function updateBlueprintField<K extends keyof typeof blueprintFormData>(name: K, value: typeof blueprintFormData[K]) {
    setBlueprintFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleBlueprintSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!blueprintFormData.fullName.trim() || !blueprintFormData.email.trim()) return;

    try {
      setBlueprintSubmitting(true);

      // Immediate PDF download
      const link = document.createElement('a');
      link.href = '/Laura_Bui_Homebuyer_Blueprint.pdf';
      link.download = 'Laura_Bui_Homebuyer_Blueprint.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Show success message
      setBlueprintSubmitted(true);
      setBlueprintFormData({ fullName: '', email: '' }); // Clear form

    } catch (error) {
      console.error('Blueprint download error:', error);
      // Still show success for better UX
      setBlueprintSubmitted(true);
      setBlueprintFormData({ fullName: '', email: '' });
    } finally {
      setBlueprintSubmitting(false);
    }
  }

  function renderMarketNewsPage() {
    if (selectedPost) {
      return (
        <main>
          <section className="border-b border-[#E8DED0] bg-[linear-gradient(180deg,#142235_0%,#1F3552_100%)] text-white">
            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
              <button type="button" onClick={() => setSelectedPostSlug(null)} className={`inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/90 transition hover:bg-white/5 ${focusRing}`}>
                <ArrowLeft className="h-4 w-4" />
                {t.marketNews.backToNews}
              </button>
              <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-white/75">
                <span className="inline-flex items-center rounded-full border border-white/15 px-3 py-1">{selectedPost.category}</span>
                <span className="inline-flex items-center">{selectedPost.date}</span>
                <span className="inline-flex items-center">{selectedPost.readTime}</span>
              </div>
              <div className="mt-8 overflow-hidden rounded-[28px] border border-white/10 bg-white/5">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.imageAlt}
                  className="h-[280px] w-full object-cover sm:h-[360px]"
                />
              </div>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">{selectedPost.title}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">{selectedPost.excerpt}</p>
            </div>
          </section>
          <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="rounded-[32px] border border-[#E7DECF] bg-white p-8 shadow-sm shadow-[#D8CBB6]/12 sm:p-10">
              <div className="prose prose-lg max-w-none prose-p:leading-8 prose-p:text-[#4F5966]">
                {selectedPost.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={() => setSelectedPostSlug(null)} className={`inline-flex items-center justify-center gap-2 rounded-full border border-[#D6C5A4] bg-white px-5 py-3 text-sm font-medium text-[#142235] transition hover:bg-[#FFFDFC] ${focusRing}`}>
                <ArrowLeft className="h-4 w-4" />
                {t.marketNews.backToNews}
              </button>
              <button type="button" onClick={goToContact} className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#142235] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#1B2E48] ${focusRing}`}>
                {t.marketNews.primaryCta}
              </button>
            </div>
          </section>
        </main>
      );
    }

    const featuredPost = t.marketNews.posts[0];
    const latestPosts = t.marketNews.posts.slice(1);
    return (
      <main>
        <section className="border-b border-[#E8DED0] bg-[linear-gradient(180deg,#142235_0%,#1F3552_100%)] text-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <SectionTitle eyebrow={t.marketNews.heroEyebrow} title={t.marketNews.title} subtitle={t.marketNews.subtitle} light />
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="rounded-[32px] border border-[#E7DECF] bg-white p-8 shadow-sm shadow-[#D8CBB6]/12">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#FBF7F0] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#8B7355] ring-1 ring-[#EFE4D3]">
                <Newspaper className="h-4 w-4" />
                {t.marketNews.featuredLabel}
              </div>
              {featuredPost ? (
                <>
                  <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[#142235]">{featuredPost.title}</h2>
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-[#6F7784]">
                    <span className="inline-flex items-center rounded-full border border-[#E7DECF] px-3 py-1">{featuredPost.category}</span>
                    <span className="inline-flex items-center">{featuredPost.date}</span>
                    <span className="inline-flex items-center">{featuredPost.readTime}</span>
                  </div>
                  <div className="mt-5 overflow-hidden rounded-[24px] border border-[#E7DECF] bg-[#FBF7F0]">
                    <img src={featuredPost.image} alt={featuredPost.imageAlt} className="h-[220px] w-full object-cover" />
                  </div>
                  <p className="mt-5 text-base leading-7 text-[#5B6472]">{featuredPost.excerpt}</p>
                  <button type="button" onClick={() => openPost(featuredPost.slug)} className={`mt-8 inline-flex items-center gap-2 rounded-full bg-[#142235] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#1B2E48] ${focusRing}`}>
                    <BookOpenText className="h-4 w-4" />
                    {t.marketNews.readMore}
                  </button>
                </>
              ) : null}
              <div className="mt-8 rounded-[28px] bg-[linear-gradient(180deg,#FBF7F0_0%,#F5E9D6_100%)] p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8B7355]">{t.marketNews.featuredTitle}</p>
                <p className="mt-3 text-sm leading-7 text-[#5B6472]">{t.marketNews.featuredDescription}</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="rounded-[32px] border border-[#E7DECF] bg-white p-6 shadow-sm shadow-[#D8CBB6]/10">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8B7355]">{t.marketNews.categoriesLabel}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {t.marketNews.topics.map((topic) => <span key={topic} className="rounded-full border border-[#E7DECF] bg-[#FBF7F0] px-4 py-2 text-sm text-[#5B6472]">{topic}</span>)}
                </div>
              </div>
              <div className="rounded-[32px] border border-[#E7DECF] bg-[linear-gradient(180deg,#FBF7F0_0%,#F3E7D2_100%)] p-6 shadow-sm shadow-[#D8CBB6]/10">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-[#8B7355]" />
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8B7355]">{t.marketNews.latestLabel}</p>
                </div>
                <div className="mt-5 space-y-4">
                  {latestPosts.map((post) => (
                    <article key={post.slug} className="rounded-2xl border border-[#E7DECF] bg-white p-5">
                      <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-[#8B7355]">
                        <span className="inline-flex items-center rounded-full bg-[#FBF7F0] px-2.5 py-1 ring-1 ring-[#EFE4D3]">{post.category}</span>
                        <span className="inline-flex items-center">{post.date}</span>
                        <span className="inline-flex items-center">{post.readTime}</span>
                      </div>
                      <div className="mt-4 overflow-hidden rounded-2xl border border-[#E7DECF] bg-[#FBF7F0]">
                        <img src={post.image} alt={post.imageAlt} className="h-[180px] w-full object-cover" />
                      </div>
                      <h3 className="mt-3 text-lg font-semibold text-[#142235]">{post.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#5B6472]">{post.excerpt}</p>
                      <button type="button" onClick={() => openPost(post.slug)} className={`mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#142235] ${focusRing}`}>
                        {t.marketNews.readMore}
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="rounded-[32px] bg-[linear-gradient(180deg,#142235_0%,#1E3049_100%)] p-8 text-white shadow-2xl shadow-[#C8A96B]/15 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t.marketNews.ctaTitle}</h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">{t.marketNews.ctaDescription}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <button type="button" onClick={goToContact} className={`inline-flex items-center justify-center rounded-full bg-[#C8A96B] px-6 py-3 text-sm font-medium text-[#142235] transition hover:bg-[#D6BA83] ${focusRing}`}>{t.marketNews.primaryCta}</button>
                <button type="button" onClick={() => navigateToPage('home')} className={`inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/5 ${focusRing}`}>{t.marketNews.secondaryCta}</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  function renderAboutMePage() {
    return (
      <main>
        <section className="border-b border-[#E8DED0] bg-[linear-gradient(180deg,#142235_0%,#1F3552_100%)] text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-20">
            <div>
              <SectionTitle
                eyebrow={t.aboutMe.heroEyebrow}
                title={t.aboutMe.title}
                subtitle={t.aboutMe.subtitle}
                light
              />
            </div>
            <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-2xl shadow-[#C8A96B]/10">
              <img
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1400&q=80"
                alt="Modern Bay Area workspace with laptop and data dashboard"
                className="h-[320px] w-full object-cover lg:h-[420px]"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[32px] border border-[#E7DECF] bg-white p-8 shadow-sm shadow-[#D8CBB6]/12 sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8B7355]">{t.aboutMe.bioTitle}</p>
              <div className="mt-5 space-y-5 text-base leading-8 text-[#4F5966]">
                {t.aboutMe.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="overflow-hidden rounded-[32px] border border-[#E7DECF] bg-white shadow-sm shadow-[#D8CBB6]/12">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80"
                  alt="San Jose skyline and Bay Area city view"
                  className="h-[220px] w-full object-cover"
                />
                <div className="p-6">
                  <p className="text-sm leading-7 text-[#5B6472]">
                    Data-driven mortgage strategy, local market precision, and a faster digital process for Bay Area buyers.
                  </p>
                </div>
              </div>
              <div className="rounded-[32px] border border-[#E7DECF] bg-[linear-gradient(180deg,#FBF7F0_0%,#F3E7D2_100%)] p-6 shadow-sm shadow-[#D8CBB6]/10">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8B7355]">{t.aboutMe.beyondTitle}</p>
                <p className="mt-3 text-sm leading-7 text-[#5B6472]">{t.aboutMe.beyondBody}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow={t.aboutMe.heroEyebrow}
            title={t.aboutMe.expectTitle}
            subtitle="A sharper, more analytical approach to guidance, communication, and execution."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {t.aboutMe.expectations.map((item, index) => {
              const icons = [ShieldCheck, Sparkles, MapPin] as const;
              const Icon = icons[index] ?? ShieldCheck;
              return (
                <div
                  key={item.title}
                  className="rounded-[28px] border border-[#E7DECF] bg-white p-6 shadow-sm shadow-[#D8CBB6]/10"
                >
                  <div className="inline-flex rounded-2xl bg-[#F6E9CF] p-3 text-[#6E5424]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-[#142235]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#5B6472]">{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-[32px] bg-[linear-gradient(180deg,#142235_0%,#1E3049_100%)] p-8 text-white shadow-2xl shadow-[#C8A96B]/15 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t.aboutMe.ctaTitle}</h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">{t.aboutMe.ctaBody}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <button
                  type="button"
                  onClick={goToContact}
                  className={`inline-flex items-center justify-center rounded-full bg-[#C8A96B] px-6 py-3 text-sm font-medium text-[#142235] transition hover:bg-[#D6BA83] ${focusRing}`}
                >
                  {t.aboutMe.primaryCta}
                </button>
                <button
                  type="button"
                  onClick={goToContact}
                  className={`inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/5 ${focusRing}`}
                >
                  {t.aboutMe.secondaryCta}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  function renderBlueprintPage() {
    return (
      <main>
        <section className="border-b border-[#E8DED0] bg-[linear-gradient(180deg,#142235_0%,#1F3552_100%)] text-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <SectionTitle eyebrow={t.blueprint.heroEyebrow} title={t.blueprint.title} subtitle={t.blueprint.subtitle} light />
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#142235] mb-4">Preview the Blueprint</h3>
                <div className="relative rounded-[16px] border border-[#E7DECF] bg-white shadow-xl shadow-[#C8A96B]/15 overflow-hidden -mx-4 md:-mx-8">
                  <iframe
                    src="/Laura_Bui_Homebuyer_Blueprint.pdf#view=FitH&page=1"
                    className="w-full h-80 border-0"
                    title="Blueprint Preview"
                  />
                  {/* Blur overlay for content after 3 pages */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-[#142235] text-white px-4 py-2 rounded-full text-xs font-medium shadow-lg">
                    Fill out the form to download the full blueprint
                  </div>
                </div>
              </div>
              <p className="text-lg leading-8 text-[#5B6472]">{t.blueprint.description}</p>
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-[#142235]">What you'll get:</h3>
                <ul className="mt-4 space-y-3">
                  {t.blueprint.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-[#8B7355] mt-0.5 flex-shrink-0" />
                      <span className="text-sm leading-6 text-[#5B6472]">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="lg:sticky lg:top-8">
              <div className="rounded-[32px] border border-[#E7DECF] bg-white p-8 shadow-xl shadow-[#C8A96B]/15">
                <div className="text-center">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8B7355]">{t.blueprint.form.eyebrow}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-[#142235]">{t.blueprint.form.title}</h3>
                  <p className="mt-2 text-sm text-[#5B6472]">{t.blueprint.form.description}</p>
                </div>
                <form onSubmit={handleBlueprintSubmit} className="mt-8 space-y-6">
                  <div>
                    <label htmlFor="blueprintFullName" className="mb-2 block text-sm font-medium text-[#142235]">{t.blueprint.form.labels.fullName}</label>
                    <input
                      id="blueprintFullName"
                      type="text"
                      required
                      className="w-full rounded-2xl border border-[#D8D1C5] px-4 py-3 text-sm outline-none transition focus:border-[#8B7355] focus-visible:ring-2 focus-visible:ring-[#C8A96B]"
                      placeholder={t.blueprint.form.placeholders.fullName}
                      value={blueprintFormData.fullName}
                      onChange={(event) => updateBlueprintField('fullName', event.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="blueprintEmail" className="mb-2 block text-sm font-medium text-[#142235]">{t.blueprint.form.labels.email}</label>
                    <input
                      id="blueprintEmail"
                      type="email"
                      required
                      className="w-full rounded-2xl border border-[#D8D1C5] px-4 py-3 text-sm outline-none transition focus:border-[#8B7355] focus-visible:ring-2 focus-visible:ring-[#C8A96B]"
                      placeholder={t.blueprint.form.placeholders.email}
                      value={blueprintFormData.email}
                      onChange={(event) => updateBlueprintField('email', event.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={blueprintSubmitting}
                    className={`w-full rounded-2xl bg-[#142235] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#1B2E48] disabled:opacity-50 ${focusRing}`}
                  >
                    {blueprintSubmitting ? t.blueprint.form.submitting : t.blueprint.form.submit}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  function renderLoanOptionsPage() {
    return (
      <main>
        <section className="border-b border-[#E8DED0] bg-[linear-gradient(180deg,#142235_0%,#1F3552_100%)] text-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <SectionTitle eyebrow={t.loanPage.heroEyebrow} title={t.loanPage.title} subtitle={t.loanPage.subtitle} light />
              </div>
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden rounded-[24px] bg-gradient-to-br from-[#C8A96B]/20 to-[#8B7355]/20 shadow-2xl">
                  <img
                    src="/loan-hero-image.jpg"
                    alt="Modern home with mortgage documents"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div className="flex h-full w-full items-center justify-center text-white/60" style={{ display: 'none' }}>
                    <div className="text-center">
                      <Home className="mx-auto h-16 w-16 mb-4" />
                      <p className="text-sm">Hero Image</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="relative -mt-16 z-10 mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <div className="group rounded-[32px] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#C8A96B]/20">
            <LoanComparisonTable title={t.loanPage.compareTitle} subtitle={t.loanPage.compareSubtitle} mobileHint={t.loanPage.compareMobileHint} headers={t.loanPage.compareHeaders} rows={t.loanPage.compareRows} />
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <LoanFilterBar title={t.loanPage.filterTitle} labels={t.loanPage.filterLabels} current={loanFilter} resultCountText={getResultCountText(locale, filteredLoanCards.length)} onChange={setLoanFilter} />
          <div className="grid gap-6 lg:grid-cols-2">
            {filteredLoanCards.map((card, index) => <LoanOptionCard key={`${card.title}-${locale}-${loanFilter}`} card={card} index={index} />)}
          </div>
          <div className="mt-10 rounded-[32px] border border-[#E7DECF] bg-[linear-gradient(180deg,#FBF7F0_0%,#F3E7D2_100%)] p-8 shadow-sm shadow-[#D8CBB6]/10">
            <p className="text-sm leading-7 text-[#5B6472]">{t.loanPage.disclaimer}</p>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[32px] bg-[linear-gradient(180deg,#142235_0%,#1E3049_100%)] p-8 text-white shadow-2xl shadow-[#C8A96B]/15 sm:p-10">
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t.loanPage.ctaTitle}</h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">{t.loanPage.ctaDescription}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <button type="button" onClick={goToContact} className={`inline-flex items-center justify-center rounded-full bg-[#C8A96B] px-6 py-3 text-sm font-medium text-[#142235] transition hover:bg-[#D6BA83] ${focusRing}`}>{t.loanPage.primaryCta}</button>
                <button type="button" onClick={() => navigateToPage('home')} className={`inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/5 ${focusRing}`}>{t.loanPage.secondaryCta}</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  function renderHomePage() {
    return (
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(20,34,53,0.08),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(200,169,107,0.18),_transparent_32%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-8 lg:py-24">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E7DECF] bg-white px-3 py-1 text-sm text-[#5B6472] shadow-sm"><ShieldCheck className="h-4 w-4 text-[#8B7355]" />{t.home.heroBadge}</div>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-[#142235] sm:text-5xl lg:text-6xl">{t.home.title}</h1>
              <p className="mt-4 text-base font-medium text-[#7A6338]">{t.home.subtitleLine}</p>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#5B6472]">{t.home.description}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={goToContact} className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#142235] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#1B2E48] ${focusRing}`}><Calendar className="h-4 w-4" />{t.home.primaryCta}</button>
                <a href={phoneHref} className={`inline-flex items-center justify-center gap-2 rounded-full border border-[#D6C5A4] bg-white px-6 py-3 text-sm font-medium text-[#142235] transition hover:bg-[#FFFDFC] ${focusRing}`}><Phone className="h-4 w-4" />{t.home.secondaryCta}</a>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {t.home.stats.map((item, index) => {
                  const icons = [Clock3, BadgeCheck, MapPin, TrendingUp] as const;
                  const Icon = icons[index] ?? Clock3;
                  const titleWithHighlight = item.title.includes('615') ? (
                    <>
                      {item.title.split('615').map((part, i) => (
                        <React.Fragment key={i}>
                          {part}
                          {i < item.title.split('615').length - 1 && <span className="font-bold text-[#1D5A4F]">615</span>}
                        </React.Fragment>
                      ))}
                    </>
                  ) : item.title;
                  return <div key={item.title} className="rounded-2xl border border-[#E7DECF] bg-white/90 p-4 shadow-sm shadow-[#D8CBB6]/20 backdrop-blur"><Icon className="h-5 w-5 text-[#8B7355]" /><p className="mt-3 text-sm font-semibold">{titleWithHighlight}</p><p className="mt-1 text-sm text-[#5B6472]">{item.description}</p></div>;
                })}
              </div>
            </div>
            <div className="relative lg:pl-8">
              <div className="absolute -left-4 top-8 hidden rounded-3xl bg-white p-4 shadow-xl shadow-[#C8A96B]/20 lg:block">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8B7355]">{t.home.fastCard.eyebrow}</p>
            <p className="mt-2 text-lg font-semibold text-[#142235]">{t.home.fastCard.title}</p>
            <p className="mt-1 max-w-[220px] text-sm leading-6 text-[#5B6472]">{t.home.fastCard.description}</p>
          </div>
              <div className="overflow-hidden rounded-[32px] border border-[#E7DECF] bg-white shadow-2xl shadow-[#C8A96B]/15">
                <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80" alt={locale === 'en' ? 'Beautiful Bay Area style home exterior' : 'Mặt tiền một ngôi nhà đẹp theo phong cách Bay Area'} className="h-[280px] w-full object-cover sm:h-[340px]" />
                <div className="grid gap-4 p-5 sm:grid-cols-[1.05fr_0.95fr] sm:p-6">
                  <div className="overflow-hidden rounded-[24px] bg-[#F4E8D3]"><img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=80" alt={locale === 'en' ? 'Professional portrait placeholder for Laura Bui' : 'Ảnh chân dung mẫu cho Laura Bui'} className="h-full min-h-[260px] w-full object-cover" /></div>
                  <div className="rounded-[24px] bg-[linear-gradient(180deg,#142235_0%,#1F3552_100%)] p-6 text-white">
                    <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#E8C98A]"><Sparkles className="h-4 w-4" />{t.home.meetLaura.eyebrow}</p>
                    <h3 className="mt-5 text-2xl font-semibold">{t.home.meetLaura.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-white/75">{t.home.meetLaura.description}</p>
                    <div className="mt-6 grid gap-3 text-sm text-white/90">{t.home.meetLaura.bullets.map((bullet) => <div key={bullet} className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4 text-[#E8C98A]" />{bullet}</div>)}</div>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-xs leading-5 text-[#7B746D]">{t.home.fastCard.footnote}</p>
            </div>
          </div>
        </section>
        <section className="border-y border-[#E8DED0] bg-white/80 backdrop-blur">
          <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 text-sm text-[#5B6472] sm:grid-cols-2 lg:grid-cols-4 sm:px-6 lg:px-8">
            {t.home.trustStrip.map((item, index) => {
              const icons = [ShieldCheck, Star, Home, Timer] as const;
              const Icon = icons[index] ?? ShieldCheck;
              return <div key={item} className="flex items-center gap-2"><Icon className="h-4 w-4 text-[#8B7355]" />{item}</div>;
            })}
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionTitle eyebrow={t.home.featured.eyebrow} title={t.home.featured.title} subtitle={t.home.featured.subtitle} />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">{t.home.featured.cards.map((item) => { const Icon = iconMap[item.iconKey]; return <div key={item.title} className="rounded-[28px] border border-[#E7DECF] bg-white p-6 shadow-sm shadow-[#D8CBB6]/15"><div className="inline-flex rounded-2xl bg-[#F6E9CF] p-3 text-[#6E5424]"><Icon className="h-5 w-5" /></div><h3 className="mt-5 text-xl font-semibold text-[#142235]">{item.title}</h3><p className="mt-3 text-sm leading-7 text-[#5B6472]">{item.description}</p></div>; })}</div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[36px] border border-[#E7DECF] bg-[linear-gradient(120deg,#132032_0%,#1E3049_55%,#314A6D_100%)] text-white shadow-2xl shadow-[#C8A96B]/15">
            <div className="grid gap-10 px-6 py-10 sm:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <SectionTitle eyebrow={t.home.fastSection.eyebrow} title={t.home.fastSection.title} subtitle={t.home.fastSection.subtitle} light />
                <div className="mt-8 space-y-4">{t.home.fastSection.steps.map((item) => <div key={item.step} className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="flex items-start gap-4"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8C98A] text-sm font-semibold text-[#142235]">{item.step}</div><div><p className="text-base font-semibold text-white">{item.title}</p><p className="mt-1 text-sm leading-6 text-white/75">{item.description}</p></div></div></div>)}</div>
              </div>
              <div className="relative">
                <div className="overflow-hidden rounded-[28px] bg-white/10 p-3 backdrop-blur"><img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80" alt={locale === 'en' ? 'Interior of a bright modern home' : 'Nội thất một ngôi nhà hiện đại sáng sủa'} className="h-[360px] w-full rounded-[22px] object-cover" /></div>
                <div className="absolute bottom-6 left-6 max-w-[260px] rounded-3xl bg-white p-5 text-[#142235] shadow-xl shadow-black/10"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8B7355]">{t.home.fastSection.spotlightEyebrow}</p><p className="mt-2 text-2xl font-semibold">{t.home.fastSection.spotlightTitle}</p><p className="mt-2 text-sm leading-6 text-[#5B6472]">{t.home.fastSection.spotlightDescription}</p></div>
              </div>
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionTitle eyebrow={t.home.service.eyebrow} title={t.home.service.title} subtitle={t.home.service.subtitle} />
          <div className="mt-8 flex flex-wrap gap-3">{t.home.service.cities.map((city) => <span key={city} className="rounded-full border border-[#E7DECF] bg-[#FBF7F0] px-4 py-2 text-sm font-medium text-[#5B6472]">{city}</span>)}</div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">{t.home.service.loanCards.map((item) => <div key={item.title} className="rounded-[28px] border border-[#E7DECF] bg-white p-6 shadow-sm shadow-[#D8CBB6]/10"><h3 className="text-xl font-semibold text-[#142235]">{item.title}</h3><p className="mt-3 text-sm leading-6 text-[#5B6472]">{item.description}</p><ul className="mt-5 space-y-3">{item.points.map((point) => <li key={point} className="flex items-start gap-3 text-sm text-[#314056]"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#8B7355]" /><span>{point}</span></li>)}</ul></div>)}</div>
        </section>
        <section className="bg-[#142235]">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 text-white sm:px-6 lg:grid-cols-2 lg:px-8">
            <div><SectionTitle eyebrow={t.home.why.eyebrow} title={t.home.why.title} subtitle={t.home.why.subtitle} light /></div>
            <div className="grid gap-4 sm:grid-cols-2">{t.home.why.cards.map((item) => <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"><p className="text-sm font-medium text-white/90">{item}</p></div>)}</div>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="overflow-hidden rounded-[32px] border border-[#E7DECF] bg-white shadow-xl shadow-[#C8A96B]/10"><img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80" alt={locale === 'en' ? 'Modern home with landscaping' : 'Ngôi nhà hiện đại với cảnh quan đẹp'} className="h-full min-h-[420px] w-full object-cover" /></div>
            <div>
              <SectionTitle eyebrow={t.home.proof.eyebrow} title={t.home.proof.title} subtitle={t.home.proof.subtitle} />
              <div className="mt-10 grid gap-6">{t.home.proof.testimonials.map((item) => <div key={item.name} className="rounded-[28px] border border-[#E7DECF] bg-white p-6 shadow-sm shadow-[#D8CBB6]/10"><div className="flex gap-1 text-[#C8A96B]">{Array.from({ length: 5 }).map((_, index) => <Star key={`${item.name}-${index}`} className="h-4 w-4 fill-current" />)}</div><p className="mt-4 text-sm leading-7 text-[#5B6472]">“{item.quote}”</p><p className="mt-5 text-sm font-semibold text-[#142235]">{item.name}</p></div>)}</div>
            </div>
          </div>
        </section>
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mb-16 rounded-[32px] border border-[#E7DECF] bg-[linear-gradient(180deg,#FBF7F0_0%,#F5E9D6_100%)] p-8 shadow-sm shadow-[#D8CBB6]/10 sm:p-10">
              <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                <div><p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8B7355]">{t.home.areas.eyebrow}</p><h3 className="mt-3 text-3xl font-semibold tracking-tight text-[#142235]">{t.home.areas.title}</h3><p className="mt-4 text-base leading-7 text-[#5B6472]">{t.home.areas.subtitle}</p></div>
                <div className="grid gap-4 sm:grid-cols-2">{t.home.areas.cards.map((area) => <div key={area.title} className="rounded-2xl border border-[#E7DECF] bg-white p-5 shadow-sm"><p className="text-sm font-semibold text-[#142235]">{area.title}</p><p className="mt-2 text-sm leading-6 text-[#5B6472]">{area.items}</p></div>)}</div>
              </div>
            </div>
            <SectionTitle eyebrow={t.home.faq.eyebrow} title={t.home.faq.title} subtitle={t.home.faq.subtitle} />
            <div className="mt-10 grid gap-4 lg:grid-cols-2">{t.home.faq.items.map((item) => <FAQItem key={item.question} question={item.question} answer={item.answer} />)}</div>
          </div>
        </section>
        <section id="contact" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
            <div className="rounded-[32px] bg-[linear-gradient(180deg,#142235_0%,#1E3049_100%)] p-8 text-white shadow-2xl shadow-[#C8A96B]/15 sm:p-10"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#D8C39A]">{t.home.nextStep.eyebrow}</p><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{t.home.nextStep.title}</h2><p className="mt-4 max-w-2xl text-base leading-7 text-white/75">{t.home.nextStep.description}</p><div className="mt-8 space-y-4 text-sm text-white/90">{t.home.nextStep.bullets.map((item) => <div key={item} className="flex items-start gap-3"><ArrowRight className="mt-0.5 h-4 w-4 text-[#E8C98A]" />{item}</div>)}</div></div>
            <div className="rounded-[32px] border border-[#E7DECF] bg-white p-6 shadow-xl shadow-[#D8CBB6]/20 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8B7355]">{t.home.form.eyebrow}</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#142235]">{t.home.form.title}</h2>
              <p className="mt-2 text-sm leading-6 text-[#5B6472]">{t.home.form.description}</p>
              <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
                <div>
                  <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-[#142235]">{t.home.form.labels.fullName}</label>
                  <input id="fullName" className="w-full rounded-2xl border border-[#D8D1C5] px-4 py-3 text-sm outline-none ring-0 transition focus:border-[#8B7355] focus-visible:ring-2 focus-visible:ring-[#C8A96B]" value={formData.fullName} onChange={(event) => updateField('fullName', event.target.value)} placeholder={t.home.form.placeholders.fullName} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div><label htmlFor="email" className="mb-2 block text-sm font-medium text-[#142235]">{t.home.form.labels.email}</label><input id="email" type="email" className="w-full rounded-2xl border border-[#D8D1C5] px-4 py-3 text-sm outline-none transition focus:border-[#8B7355] focus-visible:ring-2 focus-visible:ring-[#C8A96B]" value={formData.email} onChange={(event) => updateField('email', event.target.value)} placeholder={t.home.form.placeholders.email} /></div>
                  <div><label htmlFor="phone" className="mb-2 block text-sm font-medium text-[#142235]">{t.home.form.labels.phone}</label><input id="phone" className="w-full rounded-2xl border border-[#D8D1C5] px-4 py-3 text-sm outline-none transition focus:border-[#8B7355] focus-visible:ring-2 focus-visible:ring-[#C8A96B]" value={formData.phone} onChange={(event) => updateField('phone', event.target.value)} placeholder={t.home.form.placeholders.phone} /></div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div><label htmlFor="loanGoal" className="mb-2 block text-sm font-medium text-[#142235]">{t.home.form.labels.loanGoal}</label><select id="loanGoal" className="w-full rounded-2xl border border-[#D8D1C5] px-4 py-3 text-sm outline-none transition focus:border-[#8B7355] focus-visible:ring-2 focus-visible:ring-[#C8A96B]" value={formData.loanGoal} onChange={(event) => updateField('loanGoal', event.target.value)}>{t.home.form.loanGoals.map((option) => <option key={option}>{option}</option>)}</select></div>
                  <div><label htmlFor="timeline" className="mb-2 block text-sm font-medium text-[#142235]">{t.home.form.labels.timeline}</label><input id="timeline" className="w-full rounded-2xl border border-[#D8D1C5] px-4 py-3 text-sm outline-none transition focus:border-[#8B7355] focus-visible:ring-2 focus-visible:ring-[#C8A96B]" value={formData.timeline} onChange={(event) => updateField('timeline', event.target.value)} placeholder={t.home.form.placeholders.timeline} /></div>
                </div>
                <div><label htmlFor="zipCode" className="mb-2 block text-sm font-medium text-[#142235]">{t.home.form.labels.zipCode}</label><input id="zipCode" className="w-full rounded-2xl border border-[#D8D1C5] px-4 py-3 text-sm outline-none transition focus:border-[#8B7355] focus-visible:ring-2 focus-visible:ring-[#C8A96B]" value={formData.zipCode} onChange={(event) => updateField('zipCode', event.target.value)} placeholder={t.home.form.placeholders.zipCode} /></div>
                <div><label htmlFor="details" className="mb-2 block text-sm font-medium text-[#142235]">{t.home.form.labels.details}</label><textarea id="details" rows={4} className="w-full rounded-2xl border border-[#D8D1C5] px-4 py-3 text-sm outline-none transition focus:border-[#8B7355] focus-visible:ring-2 focus-visible:ring-[#C8A96B]" value={formData.details} onChange={(event) => updateField('details', event.target.value)} placeholder={t.home.form.placeholders.details} /></div>
                <label className="flex items-start gap-3 rounded-2xl border border-[#E7DECF] bg-[#FBF8F3] p-4 text-sm leading-6 text-[#5B6472]"><input type="checkbox" checked={formData.consent} onChange={(event) => updateField('consent', event.target.checked)} className="mt-1 h-4 w-4 rounded border-[#D8D1C5]" /><span>{t.home.form.labels.consent}</span></label>
                {error ? <p className="text-sm text-red-600">{error}</p> : null}
                <button type="submit" disabled={!isValid || isSubmitting} className={`w-full rounded-2xl bg-[#142235] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#1B2E48] disabled:cursor-not-allowed disabled:opacity-50 ${focusRing}`}>{isSubmitting ? t.home.form.submitting : t.home.form.submit}</button>
              </form>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (blueprintSubmitted) {
    return (
      <main className="min-h-screen bg-[linear-gradient(180deg,#F7F2EA_0%,#EFE3CC_100%)] px-4 py-20 text-[#142235] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-[32px] border border-[#E7DECF] bg-white p-10 shadow-xl shadow-[#C8A96B]/15">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8B7355]">{t.blueprint.success.eyebrow}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">{t.blueprint.success.title}</h1>
          <p className="mt-4 text-lg leading-8 text-[#5B6472]">{t.blueprint.success.description}</p>
          <div className="mt-8"><button type="button" onClick={() => { setBlueprintSubmitted(false); navigateToPage('home'); }} className={`inline-flex items-center rounded-full bg-[#142235] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#1B2E48] ${focusRing}`}>{t.blueprint.success.back}</button></div>
        </div>
      </main>
    );
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-[linear-gradient(180deg,#F7F2EA_0%,#EFE3CC_100%)] px-4 py-20 text-[#142235] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-[32px] border border-[#E7DECF] bg-white p-10 shadow-xl shadow-[#C8A96B]/15">
          <div className="mb-6 flex items-center justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8B7355]">{t.thankYou.eyebrow}</p></div><LanguageSwitcher locale={locale} onChange={switchLocale} /></div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">{t.thankYou.title}</h1>
          <p className="mt-4 text-lg leading-8 text-[#5B6472]">{t.thankYou.description}</p>
          <div className="mt-8 rounded-3xl bg-[linear-gradient(180deg,#FBF7F0_0%,#F3E7D2_100%)] p-6"><p className="font-semibold">{t.thankYou.stepsTitle}</p><ul className="mt-4 list-disc space-y-2 pl-5 text-[#5B6472]">{t.thankYou.steps.map((step) => <li key={step}>{step}</li>)}</ul></div>
          <div className="mt-8"><button type="button" onClick={() => setSubmitted(false)} className={`inline-flex items-center rounded-full bg-[#142235] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#1B2E48] ${focusRing}`}>{t.thankYou.back}</button></div>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#FBF7F0_0%,#F7F2EA_52%,#FFFDF9_100%)] text-[#142235]">
      <header className="sticky top-0 z-30 border-b border-[#E8DED0] bg-[#FBF7F0]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex-shrink-0">
            <p className="text-lg font-semibold">{t.brand.name} <span className="text-sm font-normal text-[#8B7355]">+1 (669) 220 9164</span></p>
            <p className="text-xs text-[#6F7784]">{t.brand.tagline}</p>
          </div>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            <button type="button" onClick={() => navigateToPage('home')} className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${focusRing} ${currentPage === 'home' ? 'bg-[#142235] text-white' : 'text-[#142235] hover:bg-[#F0E8D8]'}`}>{t.nav.home}</button>
            <button type="button" onClick={() => navigateToPage('loanOptions')} className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${focusRing} ${currentPage === 'loanOptions' ? 'bg-[#142235] text-white' : 'text-[#142235] hover:bg-[#F0E8D8]'}`}>{t.nav.loanOptions}</button>
            <div className="relative">
              <button type="button" onClick={() => setResourcesDropdownOpen(!resourcesDropdownOpen)} className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition ${focusRing} ${currentPage === 'blueprint' ? 'bg-[#142235] text-white' : 'text-[#142235] hover:bg-[#F0E8D8]'}`}>
                {t.nav.resources}
                <ChevronDown className="h-3 w-3" />
              </button>
              {resourcesDropdownOpen && (
                <div className="absolute top-full left-0 z-50 mt-1 w-64 rounded-2xl border border-[#E7DECF] bg-white p-2 shadow-lg shadow-[#C8A96B]/20">
                  <button type="button" onClick={() => { navigateToPage('blueprint'); setResourcesDropdownOpen(false); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm hover:bg-[#F7F2EA] transition">
                    <BookOpenText className="h-4 w-4 text-[#8B7355]" />
                    {t.nav.blueprint}
                  </button>
                </div>
              )}
            </div>
            <button type="button" onClick={() => navigateToPage('marketNews')} className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${focusRing} ${currentPage === 'marketNews' ? 'bg-[#142235] text-white' : 'text-[#142235] hover:bg-[#F0E8D8]'}`}>{t.nav.marketNews}</button>
            <button type="button" onClick={() => navigateToPage('aboutMe')} className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${focusRing} ${currentPage === 'aboutMe' ? 'bg-[#142235] text-white' : 'text-[#142235] hover:bg-[#F0E8D8]'}`}>{t.nav.aboutMe}</button>
          </nav>
          <div className="flex items-center gap-2">
            <a href={phoneHref} className={`hidden rounded-full bg-[#C8A96B] px-3 py-1.5 text-xs font-medium text-[#142235] transition hover:bg-[#B88B44] sm:inline-block ${focusRing}`}>{t.nav.callLaura}</a>
          </div>
        </div>
      </header>
      {currentPage === 'home'
        ? renderHomePage()
        : currentPage === 'loanOptions'
          ? renderLoanOptionsPage()
          : currentPage === 'aboutMe'
            ? renderAboutMePage()
          : currentPage === 'blueprint'
            ? renderBlueprintPage()
            : renderMarketNewsPage()}
      <footer className="border-t border-[#E8DED0] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-[#6F7784] sm:px-6 lg:px-8">
          <p className="font-medium text-[#142235]">{t.footer.brand}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-3 rounded-full border border-[#DCCFBF] bg-[#FBF7F0] px-3 py-1.5 font-medium text-[#142235]">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#DCCFBF] bg-white" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#142235]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 10.5 12 3l9 7.5" />
                  <path d="M5.5 9.5V20h13V9.5" />
                  <path d="M9 20v-5h6v5" />
                  <path d="M4 12h16" />
                </svg>
              </span>
              <span>{t.footer.equalHousing}</span>
            </span>
            <span className="inline-flex items-center rounded-full border border-[#DCCFBF] bg-[#FBF7F0] px-3 py-1.5">
              {t.footer.nmls}
            </span>
          </div>
          <p className="mt-4 max-w-5xl leading-6">{t.footer.licensing}</p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <a
              href="https://nmlsconsumeraccess.org/"
              target="_blank"
              rel="noreferrer"
              className="text-[#142235] underline underline-offset-4"
            >
              {t.footer.consumerAccess}
            </a>
            <a href="#" className="text-[#142235] underline underline-offset-4">
              {t.footer.privacy}
            </a>
            <a href="#" className="text-[#142235] underline underline-offset-4">
              {t.footer.terms}
            </a>
            <a href="#" className="text-[#142235] underline underline-offset-4">
              {t.footer.disclosures}
            </a>
          </div>
          <p className="mt-4 max-w-5xl leading-6">{t.footer.legalNote}</p>
          <p className="mt-4 text-xs leading-6 text-[#8A8178]">{t.footer.attribution}</p>
        </div>
      </footer>
      <div className="fixed inset-x-0 bottom-4 z-40 px-4 sm:hidden">
        <div className="mx-auto flex max-w-md gap-3 rounded-full border border-[#E7DECF] bg-white p-2 shadow-2xl">
          <a href={phoneHref} className={`flex-1 rounded-full border border-[#D6C5A4] px-4 py-3 text-center text-sm font-medium text-[#142235] ${focusRing}`}>{t.mobile.call}</a>
          <button type="button" onClick={currentPage === 'home' ? goToContact : () => navigateToPage('home')} className={`flex-1 rounded-full bg-[#142235] px-4 py-3 text-center text-sm font-medium text-white ${focusRing}`}>{currentPage === 'home' ? t.mobile.primaryHome : t.mobile.primaryOther}</button>
        </div>
      </div>
    </div>
  );
}
