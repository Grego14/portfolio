const getScreenType = (
  /** @type {boolean} */ isDesktop,
  /** @type {boolean} */ isMobile
) => (isMobile ? 'mobile' : isDesktop ? 'desktop' : 'tablet')

export default getScreenType
