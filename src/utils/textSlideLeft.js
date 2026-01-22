import gsap from 'gsap'

/** @param {gsap.TweenTarget} target the animation target
 * @param {gsap.TweenVars} props transition tween variables
 * @param {boolean} asTimeline should return timeline or a tween
 * */
export default function textSlideLeft(target, props, asTimeline = false) {
  const tlProps = {
    autoAlpha: 0,
    ease: 'power4.out',
    paused: !asTimeline,
    stagger: 0.05,
    x: 15,
    ...props
  }

  if (asTimeline) {
    const tl = gsap.timeline()
    tl.from(target, tlProps)
    return tl
  }

  return gsap.from(target, tlProps)
}
