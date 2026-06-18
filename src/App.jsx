import { useEffect, useRef, useState } from 'react'
import './App.css'
import Grainient from './Grainient'
import heroPosterImage from './assets/hero.png'
import portraitImage from './assets/portrait-ui-designer.svg'
import profileAvatarImage from './assets/profile-ip-character.webp'
import coverAiDesign from './assets/cover-ai-design.webp'
import coverBEndDesign from './assets/cover-b-end-design.webp'
import coverMobileDesign from './assets/cover-mobile-design.webp'
import coverVisualDesign from './assets/cover-visual-design.webp'
import projectAiImage from './assets/project-ai-commerce.svg'
import projectRobotImage from './assets/project-robot-ui.svg'
import projectMiniappImage from './assets/project-miniapp-revamp.svg'

const publicAsset = (assetPath) => `${import.meta.env.BASE_URL}${assetPath}`
const thumbAsset = (assetUrl) =>
  assetUrl.replace('/portfolio-works/', '/portfolio-works-thumbs/').replace(/\.[^.]+$/u, '.webp')

const profileFacts = [
  { label: '服务角色', value: 'UI / Visual Designer' },
  { label: '聚焦方向', value: 'Brand / B-end / AIGC' },
  { label: '手机', value: '183 5562 1861', href: 'tel:18355621861' },
  { label: '邮箱', value: '54309542@qq.com', href: 'mailto:54309542@qq.com' },
]

const profileHighlights = [
  { value: '5+', label: '设计经验' },
  { value: '100+', label: '服务商家' },
  { value: '40%', label: '曝光提升' },
]

const profileFocuses = ['品牌视觉系统', 'AIGC 提案流程', 'B 端组件规范', '短视频传播视觉']

const careerPath = [
  {
    period: '2025.11 - 2026.04',
    company: '杭州向榕科技有限公司「短期项目」',
    role: 'UI设计师',
    summary: [
      '1.海外H5短剧落地页UI设计:聚焦海外用户审美与使用场景，独立完成短剧落地页的视觉设计(含版式布局、色彩搭配、图标/按钮设计等)，确保页面符合海外目标市场调性，同时适配不同终端(移动端为主)的显示效果，提升用户点击转化意愿',
      '2.公司官网设计:参与官网视觉风格定义与界面设计，涵盖首页、栏目页、详情页等核心页面，优化官网信息层级与视觉动线，保障品牌形象统一，同时兼顾海外用户的浏览习惯与交互体验。',
      '3.移动端APP UI设计:协助完成APP核心功能模块的UI设计(如界面布局、组件设计、图标规范等)，配合产品需求输出高保真设计稿，参与设计方案研讨，确保设计贴合产品定位与用户需求。',
    ],
  },
  {
    period: '2023.11 - 2025.09',
    company: '杭州星河湖海有限公司',
    role: 'UI设计师',
    summary: [
      '1. B端产品UI设计：主导AI电商引擎（核心产品）的视觉设计，输出高保真界面、图标、动效及设计规范文档，搭建产品组件库，统一品牌视觉语言，完成B端产品版本迭代更新；',
      '2. 移动端设计：负责移动端 H5 页面、小程序及官网界面的 UI 设计，主导视觉风格与交互流程优化，提升用户体验与页面转化率；',
      '3. 视觉物料与设计系统：完成8+场会展活动物料（海报、展板、宣传册）设计，落地印刷交付；搭建并维护 Design System，统一团队视觉标准，减少重复设计工作；',
      '4. 跨部门协作：参与产品需求讨论，基于用户场景与业务目标优化设计方案，输出高保真原型与设计规范，推动设计落地；',
      '5. 关注行业设计趋势，定期输出设计优化提案，持续提升产品视觉品质与用户体验',
    ],
  },
  {
    period: '2021.04 - 2023.10',
    company: '广州塔斯克机器人有限公司',
    role: '视觉设计师',
    summary: [
      '1. 硬件/B端UI设计：负责托盘机器人小车触控屏、充电桩显示屏、可视化数据大屏、Lothar B端操作系统的视觉设计与迭代，优化小屏交互可读性；',
      '2. 视觉物料全流程：独立完成展架、画册、灯箱图、产品包装等物料设计，覆盖品牌VI、日常运营、展厅文化墙等场景，贴合品牌调性；',
      '3. 协助完成智能小车 HMI 界面、控制端 UI 设计，优化界面布局与交互流程，提升操作便捷性；',
      '4. 参与竞品分析与市场调研，提炼设计亮点，为产品视觉策略提供数据与案例支撑；',
      '5. 视频与AI辅助设计：整理展会视频素材，完成短视频剪辑；运用Midjourney输出创意参考图，支撑设计方案快速落地',
    ],
  },
  {
    period: '2018.09 - 2020.11',
    company: '安徽九紫春集团贸易有限公司',
    role: '视觉设计师',
    summary: [
      '1. 小程序UI设计与改版：主导“潮惠购”会员订货小程序改版，优化商品分类逻辑与界面层级，输出原型图、视觉效果图及切图，上线后用户下单转化率提升15%，后台订单处理效率提升20%；',
      '2. 电商视觉设计：完成线上电商产品详情页、主图、海报等50+款设计，优化产品展示效果，助力商品点击率提升12%；',
      '3. 跨部门协同：对接产品经理、IT团队，明确交互设计细节，推动小程序从需求调研到上线全流程落地，版本迭代周期缩短10天',
    ],
  },
]

const projects = [
  {
    title: 'AI电商引擎',
    subtitle: 'B端产品 / 组件系统 / 商家增长',
    description:
      '面向本地生活商家的 AI 智能剪辑工具。我负责原型、高保真界面、组件库与规范协同，帮助产品在复杂流程里保持一致的视觉体验。',
    outcome: '服务100+商家，短视频曝光平均提升40%，到店率提升25%。',
    image: projectAiImage,
    tags: ['Figma', 'Design System', 'B端产品'],
  },
  {
    title: '塔斯克机器人充电桩 UI',
    subtitle: '工业终端 / 小屏交互 / 可读性优化',
    description:
      '围绕机器人配套充电桩与触控屏场景，重新梳理信息层级、状态反馈与核心操作路径，让小尺寸界面更稳定、更清晰。',
    outcome: '界面辨识度提升20%，操作步骤减少2步，误触率下降15%。',
    image: projectRobotImage,
    tags: ['Sketch', 'HMI', '硬件界面'],
  },
  {
    title: '潮惠购小程序改版',
    subtitle: '零售电商 / 会员订货 / 体验升级',
    description:
      '从商品分类、界面层级到视觉风格进行整体改版，输出流程图、页面原型与视觉稿，并协同研发推进版本落地上线。',
    outcome: '下单转化率提升15%，订单处理效率提升20%，迭代周期缩短10天。',
    image: projectMiniappImage,
    tags: ['Mini Program', 'E-commerce', 'UX优化'],
  },
]

const selectedWorks = [
  {
    ...projects[2],
    title: '移动端设计',
    subtitle: '小程序 / App / 体验升级',
    image: coverMobileDesign,
  },
  {
    ...projects[0],
    title: 'B端设计',
    subtitle: '后台产品 / 组件系统 / 数据界面',
    image: coverBEndDesign,
  },
  {
    ...projects[1],
    title: '视觉平面设计',
    subtitle: '品牌物料 / 海报延展 / 空间视觉',
    image: coverVisualDesign,
  },
  {
    ...projects[2],
    title: 'AI设计',
    subtitle: 'AIGC 提案 / 概念探索 / 视觉生成',
    image: coverAiDesign,
  },
]

const heroWorks = [
  { title: 'AE TOLS智能AI', subtitle: '移动端设计 / App设计', image: publicAsset('portfolio-works/mobile/AE TOLS智能AI.png'), tags: ['移动端设计', 'App设计'] },
  { title: '宠趣', subtitle: '移动端设计 / App设计', image: publicAsset('portfolio-works/mobile/宠趣.jpg'), tags: ['移动端设计', 'App设计'] },
  { title: '会员充值', subtitle: '移动端设计 / 会员体系', image: publicAsset('portfolio-works/mobile/会员充值.png'), tags: ['移动端设计', '会员体系'] },
  { title: '会员充值2', subtitle: '移动端设计 / 会员体系', image: publicAsset('portfolio-works/mobile/会员充值2.png'), tags: ['移动端设计', '会员体系'] },
  { title: '首页', subtitle: '移动端设计 / 界面首页', image: publicAsset('portfolio-works/mobile/首页.png'), tags: ['移动端设计', '界面首页'] },

  { title: 'AI电商管理系统', subtitle: 'B端设计 / 后台系统', image: publicAsset('portfolio-works/b-end/AI电商管理系统.jpg'), tags: ['B端设计', '后台系统'] },
  { title: '塔斯克机器人UI', subtitle: 'B端设计 / 机器人界面', image: publicAsset('portfolio-works/b-end/塔斯克机器人UI.jpg'), tags: ['B端设计', '机器人界面'] },
  { title: '塔斯克订单财务系统', subtitle: 'B端设计 / 财务系统', image: publicAsset('portfolio-works/b-end/塔斯克订单财务系统.png'), tags: ['B端设计', '财务系统'] },
  { title: '普特教育商家服务', subtitle: 'B端设计 / 商家服务', image: publicAsset('portfolio-works/b-end/普特教育商家服务.png'), tags: ['B端设计', '商家服务'] },

  { title: 'AI app', subtitle: 'AI设计 / 产品概念', image: publicAsset('portfolio-works/ai/AI app.png'), tags: ['AI设计', '产品概念'] },
  { title: '宠物 app', subtitle: 'AI设计 / 概念界面', image: publicAsset('portfolio-works/ai/宠物 app.png'), tags: ['AI设计', '概念界面'] },
  { title: 'KINETIC VOID官网', subtitle: 'AI设计 / 官网视觉', image: publicAsset('portfolio-works/ai/KINETIC VOID官网.jpg'), tags: ['AI设计', '官网视觉'] },

  { title: 'F系列小车HMI', subtitle: '视觉平面设计 / HMI动态', image: publicAsset('portfolio-works/visual/F系列小车HMI.gif'), tags: ['视觉平面设计', 'HMI动态'] },
  { title: 'H5 优惠券', subtitle: '视觉平面设计 / H5视觉', image: publicAsset('portfolio-works/visual/H5 优惠券.png'), tags: ['视觉平面设计', 'H5视觉'] },
  { title: 'H5 活动', subtitle: '视觉平面设计 / H5视觉', image: publicAsset('portfolio-works/visual/H5 活动.png'), tags: ['视觉平面设计', 'H5视觉'] },
  { title: 'H5 食品卡', subtitle: '视觉平面设计 / H5视觉', image: publicAsset('portfolio-works/visual/H5 食品卡.png'), tags: ['视觉平面设计', 'H5视觉'] },
  { title: 'h5', subtitle: '视觉平面设计 / H5视觉', image: publicAsset('portfolio-works/visual/h5.png'), tags: ['视觉平面设计', 'H5视觉'] },
  { title: 'VI设计', subtitle: '视觉平面设计 / 品牌视觉', image: publicAsset('portfolio-works/visual/VI设计.jpg'), tags: ['视觉平面设计', '品牌视觉'] },
  { title: '充电桩首页HMI', subtitle: '视觉平面设计 / HMI界面', image: publicAsset('portfolio-works/visual/充电桩首页HMI.jpg'), tags: ['视觉平面设计', 'HMI界面'] },
  { title: '端午节', subtitle: '视觉平面设计 / 节日海报', image: publicAsset('portfolio-works/visual/端午节.jpg'), tags: ['视觉平面设计', '节日海报'] },
  { title: '耳机海报', subtitle: '视觉平面设计 / 海报设计', image: publicAsset('portfolio-works/visual/耳机海报.png'), tags: ['视觉平面设计', '海报设计'] },
  { title: '管理的真相', subtitle: '视觉平面设计 / 版式设计', image: publicAsset('portfolio-works/visual/管理的真相.png'), tags: ['视觉平面设计', '版式设计'] },
  { title: '海报', subtitle: '视觉平面设计 / 海报设计', image: publicAsset('portfolio-works/visual/海报.jpg'), tags: ['视觉平面设计', '海报设计'] },
  { title: '海报1', subtitle: '视觉平面设计 / 海报设计', image: publicAsset('portfolio-works/visual/海报1.png'), tags: ['视觉平面设计', '海报设计'] },
  { title: '海报2', subtitle: '视觉平面设计 / 海报设计', image: publicAsset('portfolio-works/visual/海报2.png'), tags: ['视觉平面设计', '海报设计'] },
  { title: '海报3', subtitle: '视觉平面设计 / 海报设计', image: publicAsset('portfolio-works/visual/海报3.png'), tags: ['视觉平面设计', '海报设计'] },
  { title: '海报4', subtitle: '视觉平面设计 / 海报设计', image: publicAsset('portfolio-works/visual/海报4.png'), tags: ['视觉平面设计', '海报设计'] },
  { title: '红酒海报', subtitle: '视觉平面设计 / 海报设计', image: publicAsset('portfolio-works/visual/红酒海报.png'), tags: ['视觉平面设计', '海报设计'] },
  { title: '画册', subtitle: '视觉平面设计 / 品牌画册', image: publicAsset('portfolio-works/visual/画册.jpg'), tags: ['视觉平面设计', '品牌画册'] },
  { title: '流量峰会', subtitle: '视觉平面设计 / 活动主视觉', image: publicAsset('portfolio-works/visual/流量峰会.jpg'), tags: ['视觉平面设计', '活动主视觉'] },
  { title: '名片4', subtitle: '视觉平面设计 / 名片设计', image: publicAsset('portfolio-works/visual/名片4.jpg'), tags: ['视觉平面设计', '名片设计'] },
  { title: '商家服务平台', subtitle: '视觉平面设计 / 运营视觉', image: publicAsset('portfolio-works/visual/商家服务平台.png'), tags: ['视觉平面设计', '运营视觉'] },
  { title: '手提袋1', subtitle: '视觉平面设计 / 品牌物料', image: publicAsset('portfolio-works/visual/手提袋1.jpg'), tags: ['视觉平面设计', '品牌物料'] },
  { title: '物料', subtitle: '视觉平面设计 / 品牌物料', image: publicAsset('portfolio-works/visual/物料.png'), tags: ['视觉平面设计', '品牌物料'] },
  { title: '宣传单张', subtitle: '视觉平面设计 / 宣传单张', image: publicAsset('portfolio-works/visual/宣传单张.jpg'), tags: ['视觉平面设计', '宣传单张'] },
  { title: '宣传海报', subtitle: '视觉平面设计 / 宣传海报', image: publicAsset('portfolio-works/visual/宣传海报.jpg'), tags: ['视觉平面设计', '宣传海报'] },
  { title: '宣传海报2', subtitle: '视觉平面设计 / 宣传海报', image: publicAsset('portfolio-works/visual/宣传海报2.jpg'), tags: ['视觉平面设计', '宣传海报'] },
  { title: '一次性纸杯', subtitle: '视觉平面设计 / 包装物料', image: publicAsset('portfolio-works/visual/一次性纸杯.jpg'), tags: ['视觉平面设计', '包装物料'] },
  { title: '纸杯1', subtitle: '视觉平面设计 / 包装物料', image: publicAsset('portfolio-works/visual/纸杯1.jpg'), tags: ['视觉平面设计', '包装物料'] },
]
const heroGalleryLoop = [...heroWorks, ...heroWorks]

const coreStrengthCards = [
  {
    id: '01',
    tag: 'CORE',
    title: '完整项目主导能力',
    description: '从方向梳理、视觉定调到研发落地，能把完整项目稳稳推进下去。',
    variant: 'feature',
  },
  {
    id: '02',
    tag: 'CORE',
    title: '品牌视觉体系搭建',
    description: '把界面语言、品牌识别和传播触点整理成统一的设计系统。',
    variant: 'lime',
  },
  {
    id: '03',
    tag: 'SYSTEM',
    title: 'AI 设计提效',
    description: '把AIGC工具接入灵感探索、草图生成与提案流程。',
    variant: 'orbit',
  },
  {
    id: '04',
    tag: 'SYSTEM',
    title: '设计管理统筹',
    description: '在需求、时间与交付节点之间保持节奏和质量。',
    variant: 'block',
  },
  {
    id: '05',
    tag: 'SYSTEM',
    title: '跨部门协同',
    description: '和产品、研发、运营快速对齐目标，推动方案真正上线。',
    variant: 'loop',
  },
]

const contactDetails = [
  { label: '手机', value: '183 5562 1861', href: 'tel:18355621861' },
  { label: '邮箱', value: '54309542@qq.com', href: 'mailto:54309542@qq.com' },
  { label: '城市', value: '杭州 / 可远程协作' },
]

function App() {
  const shellRef = useRef(null)
  const lightboxImageWrapRef = useRef(null)
  const profileTiltRef = useRef(null)
  const careerScrollerRef = useRef(null)
  const careerDragRef = useRef({
    isPointerDown: false,
    isDragging: false,
    wasDragging: false,
    startX: 0,
    startScrollLeft: 0,
  })
  const [activeWorkIndex, setActiveWorkIndex] = useState(null)
  const [activeCareerIndex, setActiveCareerIndex] = useState(null)
  const [imageZoom, setImageZoom] = useState(1)
  const [fitMode, setFitMode] = useState('fit-width')
  const [imageNaturalSize, setImageNaturalSize] = useState({ width: 0, height: 0 })
  const [viewerSize, setViewerSize] = useState({ width: 0, height: 0 })
  const [shouldLoadHeroVideo, setShouldLoadHeroVideo] = useState(false)
  const heroVideoSrc = publicAsset('echobird-home.mp4')
  const contactQrSrc = publicAsset('contact-qr.png')

  const activeWork = activeWorkIndex === null ? null : heroWorks[activeWorkIndex]
  const lightboxImageStyle = (() => {
    if (!activeWork) return undefined

    const widthLimit = Math.max((viewerSize.width - 48) * 0.78, 240)
    const heightLimit = Math.max((viewerSize.height - 48) * 0.82, 240)

    if (fitMode === 'fit-height') {
      return {
        width: 'auto',
        height: `${Math.round(heightLimit * imageZoom)}px`,
        maxWidth: 'none',
      }
    }

    if (fitMode === 'original') {
      return {
        width: `${Math.max(Math.round((imageNaturalSize.width || 960) * imageZoom), 240)}px`,
        height: 'auto',
        maxWidth: 'none',
      }
    }

    return {
      width: `${Math.round(widthLimit * imageZoom)}px`,
      height: 'auto',
      maxWidth: 'none',
    }
  })()

  useEffect(() => {
    if (activeWorkIndex === null && activeCareerIndex === null) {
      document.body.style.overflow = ''
      return
    }

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [activeWorkIndex, activeCareerIndex])

  useEffect(() => {
    if (activeWorkIndex === null && activeCareerIndex === null) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setActiveWorkIndex(null)
      if (event.key === 'Escape') setActiveCareerIndex(null)
      if (event.key === 'ArrowRight') {
        setActiveWorkIndex((current) => (current === null ? 0 : (current + 1) % heroWorks.length))
      }
      if (event.key === 'ArrowLeft') {
        setActiveWorkIndex((current) =>
          current === null ? heroWorks.length - 1 : (current - 1 + heroWorks.length) % heroWorks.length,
        )
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeWorkIndex, activeCareerIndex])

  useEffect(() => {
    setImageZoom(1)
    setFitMode('fit-width')
    setImageNaturalSize({ width: 0, height: 0 })
    lightboxImageWrapRef.current?.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [activeWorkIndex])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return undefined

    let idleId = 0
    let timeoutId = 0
    const startLoading = () => setShouldLoadHeroVideo(true)

    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(startLoading, { timeout: 1400 })
    } else {
      timeoutId = window.setTimeout(startLoading, 320)
    }

    return () => {
      if (idleId && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId)
      }
      if (timeoutId) {
        window.clearTimeout(timeoutId)
      }
    }
  }, [])

  useEffect(() => {
    if (!activeWork || !lightboxImageWrapRef.current) return undefined

    const element = lightboxImageWrapRef.current

    const updateViewerSize = () => {
      setViewerSize({
        width: element.clientWidth,
        height: element.clientHeight,
      })
    }

    updateViewerSize()

    const resizeObserver = new ResizeObserver(() => updateViewerSize())
    resizeObserver.observe(element)

    return () => resizeObserver.disconnect()
  }, [activeWork])

  useEffect(() => {
    const root = shellRef.current

    if (!root) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      root.classList.add('motion-reduced')
      root.querySelectorAll('[data-motion-section]').forEach((section) => section.classList.add('is-inview'))
      return undefined
    }

    root.classList.add('motion-enabled')

    const enterFrame = requestAnimationFrame(() => {
      root.classList.add('motion-entered')
    })

    const sections = [...root.querySelectorAll('[data-motion-section]')]
    let sectionObserver
    sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-inview')
            sectionObserver.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.22,
        rootMargin: '0px 0px -10% 0px',
      },
    )

    sections.forEach((section) => sectionObserver.observe(section))

    const parallaxItems = [...root.querySelectorAll('[data-parallax]')]
    const activeParallaxItems = new Set()
    let rafId = 0

    const updateParallax = () => {
      if (!activeParallaxItems.size) {
        rafId = 0
        return
      }

      const viewportHeight = window.innerHeight || 1

      activeParallaxItems.forEach((item) => {
        const rect = item.getBoundingClientRect()
        const intensity = Number(item.getAttribute('data-parallax') || 18)
        const progress = (rect.top + rect.height * 0.5 - viewportHeight * 0.5) / viewportHeight
        const y = Math.max(Math.min(progress * -intensity, intensity), -intensity)
        item.style.setProperty('--parallax-y', `${y.toFixed(2)}px`)
      })

      rafId = 0
    }

    const requestParallaxUpdate = () => {
      if (rafId) return
      rafId = window.requestAnimationFrame(updateParallax)
    }

    let parallaxObserver

    if (parallaxItems.length) {
      parallaxObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) activeParallaxItems.add(entry.target)
            else activeParallaxItems.delete(entry.target)
          })
          requestParallaxUpdate()
        },
        {
          threshold: 0,
          rootMargin: '20% 0px 20% 0px',
        },
      )

      parallaxItems.forEach((item) => parallaxObserver.observe(item))
      updateParallax()
      window.addEventListener('scroll', requestParallaxUpdate, { passive: true })
      window.addEventListener('resize', requestParallaxUpdate, { passive: true })
    }

    return () => {
      window.cancelAnimationFrame(enterFrame)
      if (rafId) window.cancelAnimationFrame(rafId)
      sectionObserver.disconnect()
      parallaxObserver?.disconnect()
      window.removeEventListener('scroll', requestParallaxUpdate)
      window.removeEventListener('resize', requestParallaxUpdate)
    }
  }, [])

  const showNextWork = () => {
    setActiveWorkIndex((current) => (current === null ? 0 : (current + 1) % heroWorks.length))
  }

  const showPreviousWork = () => {
    setActiveWorkIndex((current) =>
      current === null ? heroWorks.length - 1 : (current - 1 + heroWorks.length) % heroWorks.length,
    )
  }

  const zoomInImage = () => {
    setImageZoom((current) => Math.min(Number((current + 0.25).toFixed(2)), 3))
  }

  const zoomOutImage = () => {
    setImageZoom((current) => Math.max(Number((current - 0.25).toFixed(2)), 0.75))
  }

  const resetImageZoom = () => {
    setImageZoom(1)
  }

  const handleViewerWheel = (event) => {
    const wrap = lightboxImageWrapRef.current

    if (!wrap) return

    if (event.ctrlKey || event.metaKey) {
      event.preventDefault()

      if (event.deltaY < 0) {
        zoomInImage()
      } else {
        zoomOutImage()
      }

      return
    }

    event.preventDefault()

    if (event.shiftKey) {
      wrap.scrollLeft += event.deltaY
      return
    }

    wrap.scrollTop += event.deltaY
  }

  const handleImageLoad = (event) => {
    setImageNaturalSize({
      width: event.currentTarget.naturalWidth,
      height: event.currentTarget.naturalHeight,
    })
  }

  const handleProfilePointerMove = (event) => {
    const frame = profileTiltRef.current

    if (!frame) return

    const rect = frame.getBoundingClientRect()
    const relativeX = (event.clientX - rect.left) / rect.width
    const relativeY = (event.clientY - rect.top) / rect.height
    const rotateY = (relativeX - 0.5) * 12
    const rotateX = (0.5 - relativeY) * 12
    const shiftX = (relativeX - 0.5) * 18
    const shiftY = (relativeY - 0.5) * 18

    frame.classList.add('is-tilting')
    frame.style.setProperty('--tilt-rotate-x', `${rotateX.toFixed(2)}deg`)
    frame.style.setProperty('--tilt-rotate-y', `${rotateY.toFixed(2)}deg`)
    frame.style.setProperty('--tilt-shift-x', `${shiftX.toFixed(2)}px`)
    frame.style.setProperty('--tilt-shift-y', `${shiftY.toFixed(2)}px`)
    frame.style.setProperty('--tilt-glow-x', `${(relativeX * 100).toFixed(2)}%`)
    frame.style.setProperty('--tilt-glow-y', `${(relativeY * 100).toFixed(2)}%`)
  }

  const resetProfileTilt = () => {
    const frame = profileTiltRef.current

    if (!frame) return

    frame.classList.remove('is-tilting')
    frame.style.setProperty('--tilt-rotate-x', '0deg')
    frame.style.setProperty('--tilt-rotate-y', '0deg')
    frame.style.setProperty('--tilt-shift-x', '0px')
    frame.style.setProperty('--tilt-shift-y', '0px')
    frame.style.setProperty('--tilt-glow-x', '50%')
    frame.style.setProperty('--tilt-glow-y', '50%')
  }

  const handleCareerPointerDown = (event) => {
    const scroller = careerScrollerRef.current
    if (!scroller) return

    careerDragRef.current = {
      isPointerDown: true,
      isDragging: false,
      wasDragging: false,
      startX: event.clientX,
      startScrollLeft: scroller.scrollLeft,
    }

    scroller.setPointerCapture?.(event.pointerId)
    scroller.classList.add('is-dragging')
  }

  const handleCareerPointerMove = (event) => {
    const scroller = careerScrollerRef.current
    const dragState = careerDragRef.current
    if (!scroller || !dragState.isPointerDown) return

    const deltaX = event.clientX - dragState.startX
    if (!dragState.isDragging && Math.abs(deltaX) > 4) {
      dragState.isDragging = true
    }

    scroller.scrollLeft = dragState.startScrollLeft - deltaX
  }

  const handleCareerPointerUp = (event) => {
    const dragState = careerDragRef.current
    const isTap = dragState.isPointerDown && !dragState.isDragging
    const cardNode = isTap
      ? document
          .elementFromPoint(event.clientX, event.clientY)
          ?.closest?.('[data-career-index]')
      : null

    resetCareerDrag(event.pointerId)

    if (!cardNode) return

    const cardIndex = Number(cardNode.getAttribute('data-career-index'))

    if (Number.isNaN(cardIndex)) return

    setActiveCareerIndex(cardIndex)
  }

  const resetCareerDrag = (pointerId) => {
    const scroller = careerScrollerRef.current
    if (!scroller) return

    if (pointerId !== undefined) {
      try {
        scroller.releasePointerCapture?.(pointerId)
      } catch {}
    }

    careerDragRef.current.wasDragging = careerDragRef.current.isDragging
    careerDragRef.current.isPointerDown = false
    careerDragRef.current.isDragging = false
    scroller.classList.remove('is-dragging')
  }

  const handleCareerCardClick = (index) => {
    if (careerDragRef.current.wasDragging) {
      careerDragRef.current.wasDragging = false
      return
    }

    setActiveCareerIndex(index)
  }

  const handleCareerCardKeyDown = (event, index) => {
    if (event.key !== 'Enter' && event.key !== ' ') return

    event.preventDefault()
    setActiveCareerIndex(index)
  }

  const handleNavJump = (event, targetId) => {
    event.preventDefault()

    const target = document.getElementById(targetId)

    if (!target) return

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <main className="portfolio-shell" ref={shellRef}>
      <div className="grainient-page-bg" aria-hidden="true">
        <Grainient
          color1="#5e2409"
          color2="#000000"
          color3="#52747c"
          timeSpeed={0.25}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={0.8}
          grainAmount={0}
          grainScale={0.8}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
      </div>
      <header className="site-nav">
        <a className="brand" href="#home" onClick={(event) => handleNavJump(event, 'home')}>
          <span className="brand-mark" aria-hidden="true" />
          <span>ZHOU</span>
        </a>

        <nav className="nav-links" aria-label="主导航">
          <a href="#profile" onClick={(event) => handleNavJump(event, 'profile')}>
            工作经历
          </a>
          <a href="#projects" onClick={(event) => handleNavJump(event, 'projects')}>
            精选作品
          </a>
          <a href="#strengths" onClick={(event) => handleNavJump(event, 'strengths')}>
            个人优势
          </a>
        </nav>

        <a className="nav-cta" href="#contact" onClick={(event) => handleNavJump(event, 'contact')}>
          <span>联系我</span>
        </a>
      </header>

      <section className="hero-section" id="home" data-motion-section>
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={heroPosterImage}
        >
          {shouldLoadHeroVideo ? <source src={heroVideoSrc} type="video/mp4" /> : null}
        </video>
        <div className="hero-grid" aria-hidden="true" />
        <img className="hero-portrait" src={portraitImage} alt="" aria-hidden="true" />

        <div className="container hero-frame">
          <div className="hero-copy">
            <div className="hero-stage">
              <div className="hero-intro">
                <div className="hero-title-wrap">
                  <p className="eyebrow">PORTFOLIO / UI VISUAL DESIGNER / HANGZHOU</p>
                  <h1 aria-label="ZHOU Portfolio">
                    <span className="hero-title-line">
                      <span>ZHOU</span>
                    </span>
                    <span className="hero-title-line">
                      <span>PORTFOLIO</span>
                    </span>
                  </h1>
                </div>

                <p className="hero-summary">用视觉系统与 AI 工作流，让品牌内容更快、更准、更有辨识度。</p>
              </div>
            </div>

            <div className="hero-gallery" aria-label="作品预览带">
              <div className="hero-gallery-viewport">
                <div className="hero-gallery-track">
                  {heroGalleryLoop.map((work, index) => (
                    <button
                      className="hero-gallery-card"
                      key={`${work.title}-${index}`}
                      onClick={() => setActiveWorkIndex(index % heroWorks.length)}
                      type="button"
                      aria-label={`查看 ${work.title}`}
                      style={{ '--stagger-index': index % heroWorks.length }}
                    >
                      <span className="hero-gallery-ripple" aria-hidden="true" />
                      <img
                        src={thumbAsset(work.image)}
                        alt={work.title}
                        loading={index < 10 ? 'eager' : 'lazy'}
                        decoding="async"
                        fetchPriority={index < 4 ? 'high' : 'low'}
                        sizes="(max-width: 820px) 116px, 134px"
                      />
                      <span>{work.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section profile-section" id="profile" data-motion-section>
        <div className="container">
          <div className="profile-heading motion-heading">
            <div className="profile-title-row">
              <h2>WORK EXPERIENCE</h2>
              <span className="profile-title-arrow" aria-hidden="true">
                →
              </span>
            </div>
            <p>个人经历</p>
          </div>

          <div className="profile-overview">
            <div className="profile-photo-panel">
              <div
                className="profile-photo-frame"
                onMouseLeave={resetProfileTilt}
                onMouseMove={handleProfilePointerMove}
                onTouchEnd={resetProfileTilt}
                ref={profileTiltRef}
              >
                <img
                  src={profileAvatarImage}
                  alt="ZHOU 的 3D 设计师头像"
                  data-parallax="22"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            <div className="profile-summary-panel">
              <div className="profile-summary-inner">
                <p className="profile-kicker">ABOUT ME</p>
                <h3>Hi, I am ZHOU!</h3>
                <p className="profile-summary-text">
                  我把视觉系统、品牌叙事和 AI 工作流整理成一套能落地的设计能力。擅长从 0 到 1 搭建视觉方向，让产品界面、品牌物料和传播内容始终保持同一种判断与气质。
                </p>

                <div className="profile-fact-grid" aria-label="个人资料">
                  {profileFacts.map((item) => {
                    const value = item.href ? <a href={item.href}>{item.value}</a> : item.value

                    return (
                      <div className="profile-fact-item" key={item.label}>
                        <span>{item.label}</span>
                        <strong>{value}</strong>
                      </div>
                    )
                  })}
                </div>

                <div className="profile-highlight-row" aria-label="鏍稿績鏁版嵁">
                  {profileHighlights.map((item) => (
                    <div className="profile-highlight-item" key={item.label}>
                      <strong>{item.value}</strong>
                      <span>{item.label}</span>
                    </div>
                  ))}

                  <div className="profile-current-state">
                    <span>进行中的项目</span>
                    <strong>3 项并行中</strong>
                  </div>
                </div>

                <div className="profile-now-building">
                  <p className="profile-kicker">NOW BUILDING</p>
                  <div className="profile-focus-chips">
                    {profileFocuses.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="career-path">
            <div className="career-path-header">
              <span>CAREER PATH</span>
              <strong>工作经历</strong>
            </div>

            <div
              className="career-path-scroller"
              ref={careerScrollerRef}
              onPointerDown={handleCareerPointerDown}
              onPointerMove={handleCareerPointerMove}
              onPointerUp={handleCareerPointerUp}
              onPointerCancel={(event) => resetCareerDrag(event.pointerId)}
              onPointerLeave={(event) => resetCareerDrag(event.pointerId)}
            >
              <div className="career-path-track">
                <div className="career-path-line" aria-hidden="true">
                  {careerPath.map((item, index) => (
                    <span
                      className="career-path-point"
                      key={item.period}
                      style={{ left: `${(index / (careerPath.length - 1)) * 100}%` }}
                    />
                  ))}
                </div>

                <div className="career-path-grid">
                  {careerPath.map((item, index) => (
                    <button
                      className="career-card"
                      key={`${item.period}-${item.company}`}
                      style={{ '--stagger-index': index }}
                      type="button"
                      data-career-index={index}
                      onClick={() => handleCareerCardClick(index)}
                      onKeyDown={(event) => handleCareerCardKeyDown(event, index)}
                    >
                      <p className="career-period">{item.period}</p>
                      <h3>{item.company}</h3>
                      <span className="career-role">{item.role}</span>
                      <div className="career-summary-wrap">
                        <div className="career-summary">
                          {item.summary.slice(0, 2).map((line) => (
                            <p className="career-summary-line" key={line}>
                              {line}
                            </p>
                          ))}
                        </div>
                        <span className="career-summary-hint">点击查看完整经历</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section projects-section" id="projects" data-motion-section>
        <div className="container">
          <div className="works-heading motion-heading">
            <div className="works-title-row">
              <h2>SELECTED WORKS</h2>
              <span className="works-title-arrow" aria-hidden="true">
                →
              </span>
            </div>
            <p>视觉作品</p>
          </div>

          <div className="works-grid">
            {selectedWorks.map((work, index) => (
              <article className="work-card" key={work.title} style={{ '--stagger-index': index }}>
                <img
                  src={work.image}
                  alt={work.title}
                  className="work-card__image"
                  data-parallax="24"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 1180px) 100vw, 50vw"
                />
                <div className="work-card__shade" aria-hidden="true" />
                <div className="work-card__content">
                  <h3>{work.title}</h3>
                  <p>{work.subtitle}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section strengths-section" id="strengths" data-motion-section>
        <div className="container">
          <div className="strengths-heading motion-heading">
            <div className="strengths-title-row">
              <h2>CORE STRENGTHS</h2>
              <span className="strengths-title-arrow" aria-hidden="true">
                →
              </span>
            </div>
            <p>个人优势</p>
          </div>

          <div className="core-strengths-grid">
            {coreStrengthCards.map((item, index) => (
              <article
                className={`core-strength-card core-strength-card--${item.variant}`}
                key={item.id}
                style={{ '--stagger-index': index }}
                >
                  <div className="core-strength-meta">
                    <span className="core-strength-num">{item.id}</span>
                    <span className="core-strength-tag">{item.tag}</span>
                  </div>
                  <h3>
                    {item.title}
                    <i>.</i>
                  </h3>
                  {item.description ? <p>{item.description}</p> : null}
                  <div className="core-strength-deco" aria-hidden="true" />
                </article>
              ))}
            </div>
        </div>
      </section>

      <section className="contact-section" id="contact" data-motion-section>
        <div className="container contact-layout">
          <div className="contact-copy-block">
            <p className="contact-kicker">联系方式</p>
            <h2 className="contact-display">
              <span>LET&apos;S BUILD</span>
              <span>BETTER VISUAL</span>
              <span>
                <em>SY</em>STEMS
                <i>→</i>
              </span>
            </h2>

            <a className="contact-brand-pill" href="#home">
              <span className="contact-brand-mark" aria-hidden="true" />
              <span>ZHOU</span>
            </a>
          </div>

          <aside className="contact-panel">
            <p className="contact-panel-title">CONTACT</p>
            <div className="contact-panel-list">
              {contactDetails.map((item, index) => (
                <div className="contact-panel-item" key={item.label} style={{ '--stagger-index': index }}>
                  <span>{item.label}</span>
                  {item.href ? <a href={item.href}>{item.value}</a> : <strong>{item.value}</strong>}
                </div>
              ))}
            </div>
            <p className="contact-panel-note">Visual, Brand &amp; AI Design</p>
            <div className="contact-code">
              <img src={contactQrSrc} alt="ZHOU 的微信二维码" loading="lazy" decoding="async" />
            </div>
          </aside>
        </div>
      </section>

      {activeWork ? (
        <div className="work-lightbox" role="dialog" aria-modal="true" onClick={() => setActiveWorkIndex(null)}>
          <div className="work-lightbox__dialog" onClick={(event) => event.stopPropagation()}>
            <button
              className="work-lightbox__close"
              onClick={() => setActiveWorkIndex(null)}
              type="button"
              aria-label="关闭查看"
            >
              <CloseIcon />
            </button>

            <button
              className="work-lightbox__nav work-lightbox__nav--prev"
              onClick={showPreviousWork}
              type="button"
              aria-label="查看上一张作品"
            >
              <ChevronLeftIcon />
            </button>

            <div className="work-lightbox__panel">
              <div className="work-lightbox__meta">
                <span className="work-lightbox__eyebrow">SELECTED WORK</span>
                <strong>{activeWork.title}</strong>
                <p>{activeWork.subtitle}</p>
                <div className="work-lightbox__tags">
                  {activeWork.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <div className="work-lightbox__modes" aria-label="图片查看模式">
                  <button
                    className={fitMode === 'fit-width' ? 'is-active' : ''}
                    onClick={() => {
                      setFitMode('fit-width')
                      setImageZoom(1)
                    }}
                    type="button"
                  >
                    适应宽度
                  </button>
                  <button
                    className={fitMode === 'fit-height' ? 'is-active' : ''}
                    onClick={() => {
                      setFitMode('fit-height')
                      setImageZoom(1)
                    }}
                    type="button"
                  >
                    适应高度
                  </button>
                  <button
                    className={fitMode === 'original' ? 'is-active' : ''}
                    onClick={() => {
                      setFitMode('original')
                      setImageZoom(1)
                    }}
                    type="button"
                  >
                    原图大小
                  </button>
                </div>

                <div className="work-lightbox__zoom">
                  <button onClick={zoomOutImage} type="button" aria-label="缩小图片">
                    -
                  </button>
                  <button onClick={resetImageZoom} type="button" aria-label="重置缩放">
                    {Math.round(imageZoom * 100)}%
                  </button>
                  <button onClick={zoomInImage} type="button" aria-label="放大图片">
                    +
                  </button>
                </div>

                <p className="work-lightbox__hint">滚动鼠标滚轮查看长图，按住 Ctrl 再滚轮可以快速缩放。</p>
              </div>

              <div className="work-lightbox__image-wrap" onWheel={handleViewerWheel} ref={lightboxImageWrapRef}>
                <div className="work-lightbox__canvas">
                  <img src={activeWork.image} alt={activeWork.title} onLoad={handleImageLoad} style={lightboxImageStyle} />
                </div>
              </div>
            </div>

            <button
              className="work-lightbox__nav work-lightbox__nav--next"
              onClick={showNextWork}
              type="button"
              aria-label="查看下一张作品"
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      ) : null}

      {activeCareerIndex !== null ? (
        <div className="work-lightbox" role="dialog" aria-modal="true" onClick={() => setActiveCareerIndex(null)}>
          <div className="career-lightbox__dialog" onClick={(event) => event.stopPropagation()}>
            <button
              className="work-lightbox__close"
              onClick={() => setActiveCareerIndex(null)}
              type="button"
              aria-label="关闭经历详情"
            >
              <CloseIcon />
            </button>

            <div className="career-lightbox__panel">
              <div className="career-lightbox__meta">
                <span className="work-lightbox__eyebrow">CAREER DETAIL</span>
                <strong>{careerPath[activeCareerIndex].company}</strong>
                <div className="career-lightbox__facts">
                  <span>{careerPath[activeCareerIndex].role}</span>
                  <span>{careerPath[activeCareerIndex].period}</span>
                </div>
                <p className="career-lightbox__lead">完整工作内容</p>
              </div>

              <div className="career-lightbox__content">
                {careerPath[activeCareerIndex].summary.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  )
}

function ArrowUpRightIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M5.833 14.167 14.167 5.833M7.5 5.833h6.667V12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="m11.667 4.167-5 5 5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="m8.333 4.167 5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="m6 6 8 8M14 6l-8 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M3.333 5.833h13.334v8.334H3.333V5.833Zm0 0 6.667 5 6.667-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M5.485 3.333h2.067l1.033 4.133-1.291 1.292a11.667 11.667 0 0 0 3.948 3.948l1.292-1.292 4.133 1.033v2.068a1.667 1.667 0 0 1-1.667 1.666h-.833A10.833 10.833 0 0 1 3.333 5v-.833a1.667 1.667 0 0 1 1.667-1.667Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 17.083s5-4.34 5-8.333a5 5 0 1 0-10 0c0 3.993 5 8.333 5 8.333Zm0-6.666a1.667 1.667 0 1 0 0-3.334 1.667 1.667 0 0 0 0 3.334Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default App
