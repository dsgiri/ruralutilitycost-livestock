import { LivestockTool } from './types';

export const LIVESTOCK_TOOLS: LivestockTool[] = [
  {
    id: 'cattle-age-estimator',
    title: 'Cattle Age Estimator',
    description: 'Accurately estimate the age of a cow by teeth (dentition) or calculate cattle age from weight based on breed frame size.',
    category: 'Cattle tools',
    primaryOutcome: 'Age calculation',
    href: '/tools/cattle-age-estimator'
  },
  {
    id: 'cattle-growth-tracker',
    title: 'Cattle Growth Tracker',
    description: 'Track and project weight gain over time. A reliable beef cattle ADG calculator for estimating days on feed and finishing weight.',
    category: 'Growth estimation',
    primaryOutcome: 'Growth projection chart',
    href: '/tools/cattle-growth-tracker'
  },
  {
    id: 'herd-feed-requirement-calculator',
    title: 'Herd Feed Requirement Calculator',
    description: 'Calculate daily dry matter intake and winter hay consumption for your beef cattle herd. Accurate feed planning for livestock.',
    category: 'Feed needs',
    primaryOutcome: 'Feed volume estimate',
    href: '/tools/herd-feed-requirement-calculator'
  },
  {
    id: 'breeding-schedule-planner',
    title: 'Breeding Schedule Planner',
    description: 'A comprehensive gestation calculator and breeding schedule planner for cattle, sheep, goats, and pigs farrowing dates.',
    category: 'Breeding support',
    primaryOutcome: 'Breeding calendar',
    href: '/tools/breeding-schedule-planner'
  },
  {
    id: 'calving-interval-planner',
    title: 'Calving Interval Planner',
    description: 'Optimize your 365-day calving interval. Calculate cow days open and improve your herd planning and reproduction efficiency.',
    category: 'Herd planning',
    primaryOutcome: 'Interval optimization',
    href: '/tools/calving-interval-planner'
  },
  {
    id: 'livestock-weight-projection',
    title: 'Livestock Weight Projection',
    description: 'Predict future weights based on current growth rates and expected ADG. The perfect steer and cattle weight calculator for target dates.',
    category: 'Growth estimation',
    primaryOutcome: 'Weight forecast',
    href: '/tools/livestock-weight-projection'
  },
  {
    id: 'goat-sheep-feed-planner',
    title: 'Goat / Sheep Feed Planner',
    description: 'Estimate forage and hay requirement for meat goats and sheep. Manage daily dry matter intake for maintenance and lactation.',
    category: 'Sheep / goat tools',
    primaryOutcome: 'Feed requirements',
    href: '/tools/goat-sheep-feed-planner'
  },
  {
    id: 'poultry-flock-growth-overview',
    title: 'Poultry Flock Growth Overview',
    description: 'Track daily weight and meat bird feed conversion ratio (FCR) for broiler flocks to optimize your poultry harvest weight.',
    category: 'Poultry tools',
    primaryOutcome: 'Growth and FCR metrics',
    href: '/tools/poultry-flock-growth-overview'
  }
];

export const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Plan', href: 'https://plan.ruralutilitycost.com/' },
  { name: 'Forecast', href: 'https://forecast.ruralutilitycost.com/' },
  { name: 'What If', href: 'https://whatif.ruralutilitycost.com/' },
  { name: 'Predictor', href: 'https://predictor.ruralutilitycost.com/' },
  { name: 'Livestock', href: '/' },
  { name: 'My favorites', href: '/favorites' },
];

export const FOOTER_LINKS = [
  { name: 'About Us', href: 'https://www.ruralutilitycost.com/about' },
  { name: 'Contact Us', href: 'https://www.ruralutilitycost.com/contact' },
  { name: 'Privacy Policy', href: 'https://www.ruralutilitycost.com/privacy-policy' },
  { name: 'Terms of Use', href: 'https://www.ruralutilitycost.com/terms-of-use' },
  { name: 'Disclaimer', href: 'https://www.ruralutilitycost.com/disclaimer' },
  { name: 'Portfolio', href: 'https://ruralutilitycost.com/portfolio' }
];
