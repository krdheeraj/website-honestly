// @flow

type RouteDefinition = {|
  title: string | (props: Object) => string,
  key: string,
  route: string,
  defaults?: any,
  stateToProps?: (state: Object, params?: Object) => any,
  gen?: (state: Object) => Array<Object>,
  render?: (state: Object) => any,
|}

const getTags = (uniqueTags, badger) => (
  badger.tags
    .reduce((tags, tag) => {
      let newTags = tags;
      if (!tags[tag]) {
        newTags = { ...tags, [tag]: 1 };
      }
      return newTags;
    }, uniqueTags)
);

export const routeDefinitions : Array<RouteDefinition> = [
  {
    title: 'Home',
    key: 'homePage',
    route: '',
    defaults: { contactUs: false },
    stateToProps: ({ featuredBlogPosts, contactUsURL }) => ({ featuredBlogPosts, contactUsURL }),
  },
  {
    title: 'What we do',
    key: 'whatWeDoPage',
    route: 'what-we-do',
  },
  {
    title: 'About Us',
    key: 'aboutUsPage',
    route: 'about-us',
    stateToProps: ({ contactUsURL }) => ({ contactUsURL }),
  },
  {
    title: 'Join us',
    key: 'joinUs',
    route: 'about-us/join-us',
    stateToProps: ({ jobs }) => ({ jobs }),
  },
  {
    title: ({ job }) => job.title,
    key: 'job',
    route: 'about-us/join-us/{slug}',
    stateToProps: (state, params = {}) => ({ job: state.job[params.slug] }),
    gen: state => state.jobs.map(({ slug }) => ({ slug })),
  },
  {
    title: 'Events',
    key: 'events',
    route: 'about-us/events',
    stateToProps: ({ events }) => ({ events }),
  },
  {
    title: ({ event }) => event.title,
    key: 'event',
    route: 'about-us/events/{year}/{month}/{date}/{slug}',
    stateToProps: (state, params = {}) => ({ event: state.event[params.slug] }),
    gen: state => state.events.map(({ startDateTime: { date, month, year }, slug }) => ({ date, month, year, slug })),
  },
  {
    title: ({ tag }) => (tag ? 'Badgers by' + tag : 'Badgers'),
    key: 'badgers',
    route: 'about-us/people/{tag?}',
    defaults: { tag: 'everyone' },
    stateToProps: ({ badgers }, params = {}) => ({ badgers, tag: params.tag }),
    gen: state => Object.keys(state.badgers.reduce(getTags, { everyone: 1 })).map(tag => ({ tag: tag.toLowerCase() })),
  },
  {
    title: 'Not found',
    key: 'notFoundPage',
    route: '404',
  },
  {
    title: 'Server error',
    key: 'serverErrorPage',
    route: '50x',
  },
  {
    title: 'Lost connection',
    key: 'offlinePage',
    route: 'offline',
  },
];
