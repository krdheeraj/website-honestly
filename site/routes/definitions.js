// @flow

type RouteDefinition = {
  title: string | (props: Object) => string,
  key: string,
  route: string,
  stateToProps?: (state: Object, params?: Object) => any,
  gen?: (state: Object) => Array<Object>,
}

const getPageParams = (tag, count) => {
  const params = [];
  for (let page = 1; page <= Math.ceil(count / 3); page += 1) {
    params.push({ tag, page });
  }
  return params;
};

const genBadgersParams = state => (
  state.categories.reduce((params, category) => {
    const count = state.badgers
      .filter(badger => badger.tags.filter(tag => tag === category).length > 0)
      .length > 0;
    return params.concat(getPageParams(category.toLowerCase(), count));
  }, getPageParams('everyone', state.badgers.length || 1))
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
    title: ({ tag }) => 'Meet our team' + (tag !== 'everyone' ? ` (${tag})` : ''),
    key: 'badgers',
    route: 'about-us/people/{tag?}/{page?}',
    defaults: { tag: 'everyone', page: 1 },
    urlEncode: (_, key, val) => (val === 'ux & design' ? 'ux-design' : encodeURIComponent(val)),
    urlDecode: (_, key, val) => (val === 'ux-design' ? 'ux & design' : decodeURIComponent(val)),
    stateToProps: ({ badgers }, params = {}) => ({ badgers, tag: params.tag }),
    gen: genBadgersParams,
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
