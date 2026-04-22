import { useMemo, useState } from 'react'
import './App.css'

const sidebarMenu = [
  'Dashboard',
  'Videos',
  'Podcast',
  'Settings',
  'User Management',
  'Roleplay Templates',
  'Chat Leads',
  'Contacts',
  'AI Training Materials',
  'Subscription Plans',
]

const defaultTopic = {
  title: '',
  category: 'Contract/Freelance',
  subCategory: 'Select sub-category',
  tags: '',
  isActive: 'Yes',
  overview: '',
}

const createDefaultVideo = (id = 1) => ({
  id,
  title: '',
  duration: '',
  skillLevel: 'Beginner',
  description: '',
  thumbnail: '',
  thumbnailPreview: '',
  videoFile: '',
  videoPreview: '',
  mediaFileType: 'video',
  subtitleFile: '',
  quizQuestions: [],
  podcastInstruction: '',
  podcastScript: '',
  podcastHost: '',
  podcastGuest: '',
  podcastTone: '',
  podcastScriptVersion: 'v1',
})

const seededTopics = [
  {
    id: 1,
    courseType: 'single',
    updatedAt: '27 Jul 2025',
    topic: {
      title: 'How can someone overcome fear in real life from the depths of their heart?',
      category: 'Recruiting',
      subCategory: 'Business',
      tags: 'confidence,fear',
      isActive: 'Yes',
      overview: 'A deep dive into the psychology of fear and how recruiters can use mental resilience techniques to show up confidently in every conversation.',
    },
    videos: [{ ...createDefaultVideo(1), duration: '1h 30m', skillLevel: 'Intermediate', videoFile: 'fear-video.mp4' }],
  },
  {
    id: 2,
    courseType: 'series',
    updatedAt: '12 Jun 2025',
    topic: {
      title: 'How to Overcome Objections When Selling a Candidate.',
      category: 'Recruiting',
      subCategory: 'Business',
      tags: 'sales,objection-handling',
      isActive: 'Yes',
      overview: 'A modular series covering every type of objection a recruiter faces — from client pushback to candidate hesitation — with proven response frameworks.',
    },
    videos: [
      { ...createDefaultVideo(1), title: 'Module 1: Understand Objections', duration: '14m', videoFile: 'module-1.mp4' },
      { ...createDefaultVideo(2), title: 'Module 2: Reframe and Respond', duration: '18m', videoFile: 'module-2.mp4' },
    ],
  },
  {
    id: 3,
    courseType: 'single',
    updatedAt: '03 Aug 2025',
    topic: {
      title: 'Mastering LinkedIn Recruiter Search Filters to Find Hidden Talent',
      category: 'Tech & Tools',
      subCategory: 'Sourcing',
      tags: 'linkedin,sourcing,boolean',
      isActive: 'Yes',
      overview: 'Learn how to use Boolean strings, spotlights, and advanced filters in LinkedIn Recruiter to surface passive candidates your competitors are missing.',
    },
    videos: [{ ...createDefaultVideo(1), duration: '9m', skillLevel: 'Beginner', videoFile: 'linkedin-filters.mp4' }],
  },
  {
    id: 4,
    courseType: 'series',
    updatedAt: '18 Jul 2025',
    topic: {
      title: 'Building a High-Performance Recruiting Team from Scratch',
      category: 'Management',
      subCategory: 'Leadership',
      tags: 'team-building,leadership,management',
      isActive: 'Yes',
      overview: 'A step-by-step series for recruitment managers covering hiring, onboarding, KPI setting, and coaching a team to consistently hit targets.',
    },
    videos: [
      { ...createDefaultVideo(1), title: 'Episode 1: Defining Your Team Structure', duration: '11m', skillLevel: 'Intermediate', videoFile: 'team-ep1.mp4' },
      { ...createDefaultVideo(2), title: 'Episode 2: Hiring Your First Recruiters', duration: '13m', skillLevel: 'Intermediate', videoFile: 'team-ep2.mp4' },
      { ...createDefaultVideo(3), title: 'Episode 3: Setting KPIs That Drive Results', duration: '10m', skillLevel: 'Intermediate', videoFile: 'team-ep3.mp4' },
    ],
  },
  {
    id: 5,
    courseType: 'single',
    updatedAt: '22 Jul 2025',
    topic: {
      title: 'Reducing Unconscious Bias in Candidate Screening',
      category: 'DE&I',
      subCategory: 'Inclusion',
      tags: 'bias,dei,screening,inclusion',
      isActive: 'Yes',
      overview: 'Practical techniques to identify and minimise unconscious bias at the CV review and interview stages to build more diverse, high-performing teams.',
    },
    videos: [{ ...createDefaultVideo(1), duration: '8m', skillLevel: 'Beginner', videoFile: 'bias-screening.mp4' }],
  },
  {
    id: 6,
    courseType: 'single',
    updatedAt: '05 Aug 2025',
    topic: {
      title: 'How to Set Your Freelance Recruiter Day Rate and Win Contracts',
      category: 'Contract/Freelance',
      subCategory: 'Business Development',
      tags: 'freelance,rates,contracts,pricing',
      isActive: 'Yes',
      overview: 'Everything an independent recruiter needs to know about pricing their services, structuring contracts, and landing retainer clients.',
    },
    videos: [{ ...createDefaultVideo(1), duration: '7m', skillLevel: 'Beginner', videoFile: 'freelance-rates.mp4' }],
  },
  {
    id: 7,
    courseType: 'series',
    updatedAt: '30 Jul 2025',
    topic: {
      title: 'Cold Outreach Mastery: Getting Replies from Passive Candidates',
      category: 'Recruiting',
      subCategory: 'Sourcing',
      tags: 'outreach,messaging,passive-candidates',
      isActive: 'Yes',
      overview: 'A practical series on writing InMails and emails that passive candidates actually reply to — with templates, A/B testing tips, and follow-up sequences.',
    },
    videos: [
      { ...createDefaultVideo(1), title: 'Part 1: Why Most Messages Get Ignored', duration: '6m', skillLevel: 'Beginner', videoFile: 'outreach-p1.mp4' },
      { ...createDefaultVideo(2), title: 'Part 2: The Hook-Value-CTA Framework', duration: '8m', skillLevel: 'Beginner', videoFile: 'outreach-p2.mp4' },
      { ...createDefaultVideo(3), title: 'Part 3: Follow-Up Without Being Annoying', duration: '7m', skillLevel: 'Intermediate', videoFile: 'outreach-p3.mp4' },
    ],
  },
  {
    id: 8,
    courseType: 'single',
    updatedAt: '10 Aug 2025',
    topic: {
      title: 'Using AI Tools to Source and Engage Passive Candidates Faster',
      category: 'Tech & Tools',
      subCategory: 'AI & Automation',
      tags: 'ai,automation,sourcing,productivity',
      isActive: 'Yes',
      overview: 'A hands-on walkthrough of the AI tools reshaping recruitment — from sourcing automation to AI-written outreach — and how to integrate them into your daily workflow.',
    },
    videos: [{ ...createDefaultVideo(1), duration: '10m', skillLevel: 'Intermediate', videoFile: 'ai-sourcing.mp4' }],
  },
  {
    id: 9,
    courseType: 'series',
    updatedAt: '08 Aug 2025',
    topic: {
      title: 'Recruiter Metrics That Actually Matter: Track, Analyse, Improve',
      category: 'Management',
      subCategory: 'Analytics',
      tags: 'metrics,kpis,data,performance',
      isActive: 'Yes',
      overview: 'Stop tracking vanity metrics. This series breaks down the key recruiting KPIs that predict revenue, where to find the data, and how to use it to coach your team.',
    },
    videos: [
      { ...createDefaultVideo(1), title: 'Module 1: The 5 Metrics Every Recruiter Must Own', duration: '9m', skillLevel: 'Intermediate', videoFile: 'metrics-m1.mp4' },
      { ...createDefaultVideo(2), title: 'Module 2: Building Your Recruiting Dashboard', duration: '12m', skillLevel: 'Advanced', videoFile: 'metrics-m2.mp4' },
    ],
  },
]

const seededPodcasts = [
  {
    id: 101,
    courseType: 'single',
    updatedAt: '14 Aug 2025',
    topic: {
      title: 'The Mindset of a Top Biller: What Separates Average Recruiters from the Elite',
      category: 'Recruiting',
      subCategory: 'Business',
      tags: 'mindset,top-biller,performance',
      isActive: 'Yes',
      overview: 'A candid conversation about the daily habits, self-talk, and decision-making patterns that distinguish consistent high billers from everyone else.',
    },
    videos: [{ ...createDefaultVideo(1), duration: '28m', skillLevel: 'Intermediate', videoFile: 'mindset-top-biller.mp3', mediaFileType: 'audio' }],
  },
  {
    id: 102,
    courseType: 'series',
    updatedAt: '10 Aug 2025',
    topic: {
      title: 'Recruiter Roundtable: Real Stories from the Desk',
      category: 'Recruiting',
      subCategory: 'Business',
      tags: 'stories,roundtable,recruiting',
      isActive: 'Yes',
      overview: 'A multi-part series where experienced recruiters share unfiltered stories — the deals that went wrong, the lessons learned, and the moments that changed their careers.',
    },
    videos: [
      { ...createDefaultVideo(1), title: 'Episode 1: The Deal That Nearly Broke Me', duration: '34m', skillLevel: 'Beginner', videoFile: 'roundtable-ep1.mp3', mediaFileType: 'audio' },
      { ...createDefaultVideo(2), title: 'Episode 2: Landing a Retainer Client Against All Odds', duration: '31m', skillLevel: 'Intermediate', videoFile: 'roundtable-ep2.mp3', mediaFileType: 'audio' },
      { ...createDefaultVideo(3), title: 'Episode 3: Building a $1M Desk from Scratch', duration: '38m', skillLevel: 'Advanced', videoFile: 'roundtable-ep3.mp3', mediaFileType: 'audio' },
    ],
  },
  {
    id: 103,
    courseType: 'single',
    updatedAt: '06 Aug 2025',
    topic: {
      title: 'DE&I in Hiring: Honest Conversations with Diversity Leaders',
      category: 'DE&I',
      subCategory: 'Inclusion',
      tags: 'dei,diversity,hiring,inclusion',
      isActive: 'Yes',
      overview: 'An audio interview series exploring what genuine inclusion looks like inside talent teams — with practical takeaways, not corporate platitudes.',
    },
    videos: [{ ...createDefaultVideo(1), duration: '22m', skillLevel: 'Beginner', videoFile: 'dei-interview.mp3', mediaFileType: 'audio' }],
  },
  {
    id: 104,
    courseType: 'single',
    updatedAt: '01 Aug 2025',
    topic: {
      title: 'Freelance Recruiting Q&A: Your Biggest Questions Answered Live',
      category: 'Contract/Freelance',
      subCategory: 'Business Development',
      tags: 'freelance,qa,contracts,independent',
      isActive: 'Yes',
      overview: 'A recorded live Q&A covering the most common questions from independent recruiters — pricing, client contracts, chasing invoices, and building a pipeline solo.',
    },
    videos: [{ ...createDefaultVideo(1), duration: '45m', skillLevel: 'Beginner', videoFile: 'freelance-qa.mp4', mediaFileType: 'video' }],
  },
]

function App() {
  const [pageView, setPageView] = useState('list')
  const [activeMenu, setActiveMenu] = useState('Videos')
  const [topics, setTopics] = useState(seededTopics)
  const [podcastTopics, setPodcastTopics] = useState(seededPodcasts)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const [editingTopicId, setEditingTopicId] = useState(null)
  const [courseType, setCourseType] = useState('single')
  const [topic, setTopic] = useState(defaultTopic)
  const [videos, setVideos] = useState([createDefaultVideo(1)])
  const [expandedEpisodeId, setExpandedEpisodeId] = useState(1)
  const [draggingEpisodeId, setDraggingEpisodeId] = useState(null)
  const singleVideo = videos[0]


  const isPodcast = activeMenu === 'Podcast'
  const activeTopics = isPodcast ? podcastTopics : topics
  const setActiveTopics = isPodcast ? setPodcastTopics : setTopics

  const isVideoValid = (video) =>
    courseType === 'single'
      ? Boolean(video.duration.trim() && video.videoFile.trim())
      : Boolean(video.title.trim() && video.duration.trim() && video.videoFile.trim())

  const canSave = Boolean(topic.title.trim()) && videos.length > 0 && videos.every(isVideoValid)

  const filteredTopics = useMemo(
    () =>
      activeTopics.filter((row) => {
        const matchesSearch = row.topic.title.toLowerCase().includes(search.toLowerCase())
        const matchesType = typeFilter === 'all' ? true : row.courseType === typeFilter
        const rowStatus = row.topic.isActive === 'Yes' ? 'active' : 'inactive'
        const matchesStatus = statusFilter === 'all' ? true : rowStatus === statusFilter
        return matchesSearch && matchesType && matchesStatus
      }),
    [activeTopics, search, typeFilter, statusFilter],
  )

  const normalizedPayload = useMemo(
    () => ({
      id: editingTopicId,
      courseType,
      ...topic,
      videos: videos.map((video, index) => ({
        order: index + 1,
        title: courseType === 'single' ? topic.title.trim() : video.title,
        duration: video.duration,
        skillLevel: video.skillLevel,
        description: courseType === 'single' ? topic.overview : video.description,
        thumbnail: video.thumbnail,
        videoFile: video.videoFile,
        subtitleFile: video.subtitleFile,
        quizQuestions: video.quizQuestions,
      })),
    }),
    [editingTopicId, courseType, topic, videos],
  )

  const resetForCreate = () => {
    setEditingTopicId(null)
    setCourseType('single')
    setTopic(defaultTopic)
    setVideos([createDefaultVideo(1)])
    setExpandedEpisodeId(1)
    setPageView('editor')
  }

  const startEdit = (id) => {
    const row = activeTopics.find((item) => item.id === id)
    if (!row) return
    setEditingTopicId(row.id)
    setCourseType(row.courseType)
    setTopic({ ...row.topic })
    setVideos(row.videos.map((video) => ({ ...video, quizQuestions: [...video.quizQuestions] })))
    setExpandedEpisodeId(row.videos[0]?.id ?? 1)
    setPageView('editor')
  }

  const saveTopic = () => {
    if (!canSave) return
    const saved = {
      id: editingTopicId ?? Date.now(),
      courseType,
      updatedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      topic: { ...topic },
      videos: videos.map((video, index) => ({
        ...video,
        title: courseType === 'single' ? '' : video.title || `Episode ${index + 1}`,
        description: courseType === 'single' ? '' : video.description,
      })),
    }

    setActiveTopics((current) =>
      editingTopicId ? current.map((row) => (row.id === editingTopicId ? saved : row)) : [saved, ...current],
    )
    setPageView('list')
  }

  const savePodcast = (activeStatus) => {
    if (!topic.title.trim()) return
    const saved = {
      id: editingTopicId ?? Date.now(),
      courseType,
      updatedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      topic: { ...topic, isActive: activeStatus },
      videos: videos.map((video, index) => ({
        ...video,
        title: courseType === 'single' ? '' : video.title || `Episode ${index + 1}`,
      })),
    }
    setActiveTopics((current) =>
      editingTopicId ? current.map((row) => (row.id === editingTopicId ? saved : row)) : [saved, ...current],
    )
    setPageView('list')
  }

  const handleGenerateScript = (videoId) => {
    const video = videos.find((v) => v.id === videoId)
    if (!video) return
    const host = video.podcastHost || 'Host'
    const guest = video.podcastGuest || 'Guest'
    const tone = (video.podcastTone || 'professional').toLowerCase()
    const title = (courseType === 'single' ? topic.title : video.title) || topic.title || 'this topic'
    updateVideoField(videoId, 'podcastScript',
      `[${host}]: Welcome to the Vidmology Podcast. I'm your host ${host}, and today we have ${guest} joining us. We're talking about ${title}.\n\n[${guest}]: Thanks for having me! Really excited to get into this one.\n\n[${host}]: Let's dive in. ${video.podcastInstruction || `Tell us about ${title}.`}\n\n[${guest}]: Great question. When you think about ${title}, there are a few key things to consider — and it starts with understanding the fundamentals.\n\n[${host}]: That's a really ${tone} take. Can you elaborate on that?\n\n[${guest}]: Absolutely. The most important thing is applying it practically in your day-to-day work.\n\n[${host}]: Fantastic insight. Before we wrap up — one key takeaway for our listeners?\n\n[${guest}]: Stay curious, keep learning, and never stop growing.\n\n[${host}]: Couldn't have said it better. Thanks for joining us, ${guest}!\n\n[${guest}]: My pleasure. Great conversation!`
    )
  }

  const updateTopicField = (field, value) => {
    setTopic((current) => ({ ...current, [field]: value }))
  }

  const updateVideoField = (videoId, field, value) => {
    setVideos((current) => current.map((video) => (video.id === videoId ? { ...video, [field]: value } : video)))
  }

  const toggleEpisode = (videoId) => {
    setExpandedEpisodeId((current) => (current === videoId ? null : videoId))
  }

  const handleDragStart = (videoId, event) => {
    setDraggingEpisodeId(videoId)
    event.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleDrop = (targetId) => {
    if (!draggingEpisodeId || draggingEpisodeId === targetId) return
    setVideos((current) => {
      const fromIndex = current.findIndex((video) => video.id === draggingEpisodeId)
      const toIndex = current.findIndex((video) => video.id === targetId)
      if (fromIndex < 0 || toIndex < 0) return current
      const reordered = [...current]
      const [moved] = reordered.splice(fromIndex, 1)
      reordered.splice(toIndex, 0, moved)
      return reordered
    })
  }

  const handleDragEnd = () => {
    setDraggingEpisodeId(null)
  }

  const handleCourseTypeChange = (nextType) => {
    setCourseType(nextType)
    let nextVideos = [...videos]

    if (nextType === 'single') {
      nextVideos = [{ ...nextVideos[0], title: '' }]
    } else {
      nextVideos = nextVideos.map((video, index) => ({
        ...video,
        title: video.title || `Episode ${index + 1}`,
      }))
    }

    setVideos(nextVideos)
    setExpandedEpisodeId(nextVideos[0]?.id ?? 1)
  }

  const addEpisode = () => {
    const nextId = Math.max(...videos.map((video) => video.id)) + 1
    const nextVideo = { ...createDefaultVideo(nextId), title: `Episode ${videos.length + 1}` }
    setVideos((current) => [...current, nextVideo])
    setExpandedEpisodeId(nextId)
  }

  const removeEpisode = (videoId) => {
    if (videos.length === 1) return
    const filtered = videos.filter((video) => video.id !== videoId)
    setVideos(filtered)
    if (expandedEpisodeId === videoId) {
      setExpandedEpisodeId(filtered[0]?.id ?? null)
    }
  }

  const handleFileUpload = (videoId, field, event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setVideos((current) =>
      current.map((video) => {
        if (video.id !== videoId) return video

        if (field === 'thumbnail') {
          if (video.thumbnailPreview?.startsWith('blob:')) URL.revokeObjectURL(video.thumbnailPreview)
          return {
            ...video,
            thumbnail: file.name,
            thumbnailPreview: URL.createObjectURL(file),
          }
        }

        if (field === 'videoFile') {
          if (video.videoPreview?.startsWith('blob:')) URL.revokeObjectURL(video.videoPreview)
          return {
            ...video,
            videoFile: file.name,
            videoPreview: URL.createObjectURL(file),
            mediaFileType: file.type.startsWith('audio/') ? 'audio' : 'video',
          }
        }

        return { ...video, [field]: file.name }
      }),
    )
  }

  const clearMediaField = (videoId, field) => {
    setVideos((current) =>
      current.map((video) => {
        if (video.id !== videoId) return video

        if (field === 'thumbnail') {
          if (video.thumbnailPreview?.startsWith('blob:')) URL.revokeObjectURL(video.thumbnailPreview)
          return { ...video, thumbnail: '', thumbnailPreview: '' }
        }

        if (field === 'videoFile') {
          if (video.videoPreview?.startsWith('blob:')) URL.revokeObjectURL(video.videoPreview)
          return { ...video, videoFile: '', videoPreview: '', mediaFileType: 'video' }
        }

        return { ...video, [field]: '' }
      }),
    )
  }

  const addQuizQuestion = (videoId) => {
    setVideos((current) =>
      current.map((video) =>
        video.id === videoId
          ? {
              ...video,
              quizQuestions: [
                ...video.quizQuestions,
                { id: video.quizQuestions.length + 1, question: `New question ${video.quizQuestions.length + 1}` },
              ],
            }
          : video,
      ),
    )
  }

  const [studentViewTopicId, setStudentViewTopicId] = useState(null)
  const [studentEpisodeId, setStudentEpisodeId] = useState(null)
  const [studentTab, setStudentTab] = useState('overview')
  const [catalogSearch, setCatalogSearch] = useState('')
  const [catalogCategory, setCatalogCategory] = useState('all')
  const [catalogLevel, setCatalogLevel] = useState('all')

  const openStudentView = (topicId) => {
    const row = topics.find((t) => t.id === topicId) || podcastTopics.find((t) => t.id === topicId)
    if (!row) return
    setStudentViewTopicId(topicId)
    setStudentEpisodeId(row.videos[0]?.id ?? null)
    setStudentTab('overview')
    setPageView('student-player')
  }

  const openCatalog = () => {
    setCatalogSearch('')
    setCatalogCategory('all')
    setCatalogLevel('all')
    setPageView('student-catalog')
  }

  const categories = ['all', ...Array.from(new Set(topics.map((t) => t.topic.category)))]
  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced']
  const categoryPills = ['Contract/Freelance', 'Management', 'Recruiting', 'Tech & Tools', 'DE&I']

  if (pageView === 'student-catalog') {
    const activeTopics = topics.filter((t) => t.topic.isActive === 'Yes')
    const filteredCatalog = activeTopics.filter((t) => {
      const matchSearch = t.topic.title.toLowerCase().includes(catalogSearch.toLowerCase())
      const matchCat = catalogCategory === 'all' || t.topic.category === catalogCategory
      const matchLevel = catalogLevel === 'all' || t.videos.some((v) => v.skillLevel === catalogLevel)
      return matchSearch && matchCat && matchLevel
    })

    return (
      <div className="sc-shell">
        <nav className="sc-nav">
          <div className="sc-nav-inner">
            <div className="sc-logo">
              <span className="sc-logo-mark">▶</span>
              <strong>Vidmology</strong>
            </div>
            <div className="sc-nav-links">
              <div className="nav-learn-wrap">
                <span className="nav-learn-trigger">Learn ▾</span>
                <div className="nav-learn-dropdown">
                  <div className="nav-learn-col" role="button" tabIndex={0} onClick={() => setPageView('student-catalog')} onKeyDown={(e) => e.key === 'Enter' && setPageView('student-catalog')}>
                    <strong>Videos</strong>
                    <p>Learn with 12 categories of bite videos and podcast</p>
                  </div>
                  <div className="nav-learn-col" role="button" tabIndex={0} onClick={() => setPageView('student-podcast-catalog')} onKeyDown={(e) => e.key === 'Enter' && setPageView('student-podcast-catalog')}>
                    <strong>Podcast</strong>
                    <p>Your 24/7 ai powered coach to help you with quiz, role play &amp; more.</p>
                  </div>
                </div>
              </div>
              <span>Ai Coach</span>
              <span>White Label</span>
              <span>Pricing</span>
              <span>About</span>
            </div>
            <button type="button" className="sc-admin-btn" onClick={() => setPageView('list')}>
              ← Admin
            </button>
          </div>
        </nav>

        <div className="sc-hero">
          <div className="sc-hero-inner">
            <h1 className="sc-hero-title">Find the Video Topic That Matches Your Goals and Interests</h1>
            <p className="sc-hero-sub">Choose from a growing library of bite sized videos no longer than 10 minutes.</p>
            <div className="sc-search-row">
              <input
                className="sc-search-input"
                placeholder="Search"
                value={catalogSearch}
                onChange={(e) => setCatalogSearch(e.target.value)}
              />
              <button type="button" className="sc-search-btn">🔍 Search</button>
            </div>
            <div className="sc-pills">
              {categoryPills.map((pill) => (
                <button
                  key={pill}
                  type="button"
                  className={`sc-pill ${catalogCategory === pill ? 'active' : ''}`}
                  onClick={() => setCatalogCategory(catalogCategory === pill ? 'all' : pill)}
                >
                  {pill}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="sc-body">
          <div className="sc-body-inner">
            <div className="sc-filters">
              <div className="sc-filter-group">
                <label className="sc-filter-label">Categories</label>
                <select className="sc-filter-select" value={catalogCategory} onChange={(e) => setCatalogCategory(e.target.value)}>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>
                  ))}
                </select>
              </div>
              <div className="sc-filter-group">
                <label className="sc-filter-label">Levels</label>
                <select className="sc-filter-select" value={catalogLevel} onChange={(e) => setCatalogLevel(e.target.value)}>
                  {levels.map((l) => (
                    <option key={l} value={l}>{l === 'all' ? 'All Skills' : l}</option>
                  ))}
                </select>
              </div>
              <div className="sc-filter-group">
                <label className="sc-filter-label">Sort By</label>
                <select className="sc-filter-select">
                  <option>Default sorting</option>
                  <option>Newest first</option>
                </select>
              </div>
            </div>

            {filteredCatalog.length === 0 ? (
              <p className="sc-empty">No courses match your search.</p>
            ) : (
              <div className="sc-grid">
                {filteredCatalog.map((t) => {
                  const firstVideo = t.videos[0]
                  return (
                    <div
                      key={t.id}
                      className="sc-card"
                      role="button"
                      tabIndex={0}
                      onClick={() => openStudentView(t.id)}
                      onKeyDown={(e) => e.key === 'Enter' && openStudentView(t.id)}
                    >
                      <div className="sc-card-thumb">
                        {firstVideo?.thumbnailPreview ? (
                          <img src={firstVideo.thumbnailPreview} alt={t.topic.title} />
                        ) : (
                          <div className="sc-thumb-bg" />
                        )}
                        <div className="sc-card-badges">
                          <span className="sc-badge">{firstVideo?.skillLevel || 'Beginner'}</span>
                          <span className="sc-badge">{t.topic.category}</span>
                          <span className="sc-badge sc-badge-dur">⏱ {firstVideo?.duration || '--'}</span>
                        </div>
                      </div>
                      <div className="sc-card-body">
                        <h3 className="sc-card-title">{t.topic.title}</h3>
                        <p className="sc-card-desc">{t.topic.overview || 'No description.'}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        <footer className="sc-footer">
          <div className="sc-footer-inner">
            <div className="sc-footer-brand">
              <div className="sc-logo">
                <span className="sc-logo-mark">▶</span>
                <strong>Vidmology</strong>
              </div>
              <p>AI-Powered Micro learning platform.</p>
            </div>
            <div className="sc-footer-col">
              <strong>Company</strong>
              <span>Videos</span><span>Podcast</span><span>Ai Coach</span><span>White label</span>
            </div>
            <div className="sc-footer-col">
              <strong>Resources</strong>
              <span>FAQ</span><span>Case Studies</span>
            </div>
            <div className="sc-footer-col">
              <strong>Legal</strong>
              <span>GDPR Policy</span><span>Terms &amp; Conditions</span><span>Privacy Policy</span>
            </div>
          </div>
          <div className="sc-footer-bottom">
            <span>info@vidmology.com</span>
            <span>© 2025 Vidmology. All Rights Reserved.</span>
          </div>
        </footer>
      </div>
    )
  }

  if (pageView === 'student-podcast-catalog') {
    const activePodcasts = podcastTopics.filter((t) => t.topic.isActive === 'Yes')
    const podcastCategories = ['all', ...Array.from(new Set(podcastTopics.map((t) => t.topic.category)))]
    const filteredPodcasts = activePodcasts.filter((t) => {
      const matchSearch = t.topic.title.toLowerCase().includes(catalogSearch.toLowerCase())
      const matchCat = catalogCategory === 'all' || t.topic.category === catalogCategory
      const matchLevel = catalogLevel === 'all' || t.videos.some((v) => v.skillLevel === catalogLevel)
      return matchSearch && matchCat && matchLevel
    })

    return (
      <div className="sc-shell">
        <nav className="sc-nav">
          <div className="sc-nav-inner">
            <div className="sc-logo">
              <span className="sc-logo-mark">▶</span>
              <strong>Vidmology</strong>
            </div>
            <div className="sc-nav-links">
              <div className="nav-learn-wrap">
                <span className="nav-learn-trigger">Learn ▾</span>
                <div className="nav-learn-dropdown">
                  <div className="nav-learn-col" role="button" tabIndex={0} onClick={() => setPageView('student-catalog')} onKeyDown={(e) => e.key === 'Enter' && setPageView('student-catalog')}>
                    <strong>Videos</strong>
                    <p>Learn with 12 categories of bite videos and podcast</p>
                  </div>
                  <div className="nav-learn-col" role="button" tabIndex={0} onClick={() => setPageView('student-podcast-catalog')} onKeyDown={(e) => e.key === 'Enter' && setPageView('student-podcast-catalog')}>
                    <strong>Podcast</strong>
                    <p>Your 24/7 ai powered coach to help you with quiz, role play &amp; more.</p>
                  </div>
                </div>
              </div>
              <span>Ai Coach</span>
              <span>White Label</span>
              <span>Pricing</span>
              <span>About</span>
            </div>
            <button type="button" className="sc-admin-btn" onClick={() => setPageView('list')}>
              ← Admin
            </button>
          </div>
        </nav>

        <div className="sc-hero">
          <div className="sc-hero-inner">
            <h1 className="sc-hero-title">Podcasts to Level Up Your Recruiting Game</h1>
            <p className="sc-hero-sub">Real conversations, expert insights — listen anywhere, anytime.</p>
            <div className="sc-search-row">
              <input
                className="sc-search-input"
                placeholder="Search podcasts"
                value={catalogSearch}
                onChange={(e) => setCatalogSearch(e.target.value)}
              />
              <button type="button" className="sc-search-btn">🔍 Search</button>
            </div>
            <div className="sc-pills">
              {categoryPills.map((pill) => (
                <button
                  key={pill}
                  type="button"
                  className={`sc-pill ${catalogCategory === pill ? 'active' : ''}`}
                  onClick={() => setCatalogCategory(catalogCategory === pill ? 'all' : pill)}
                >
                  {pill}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="sc-body">
          <div className="sc-body-inner">
            <div className="sc-filters">
              <div className="sc-filter-group">
                <label className="sc-filter-label">Categories</label>
                <select className="sc-filter-select" value={catalogCategory} onChange={(e) => setCatalogCategory(e.target.value)}>
                  {podcastCategories.map((c) => (
                    <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>
                  ))}
                </select>
              </div>
              <div className="sc-filter-group">
                <label className="sc-filter-label">Levels</label>
                <select className="sc-filter-select" value={catalogLevel} onChange={(e) => setCatalogLevel(e.target.value)}>
                  {levels.map((l) => (
                    <option key={l} value={l}>{l === 'all' ? 'All Skills' : l}</option>
                  ))}
                </select>
              </div>
              <div className="sc-filter-group">
                <label className="sc-filter-label">Sort By</label>
                <select className="sc-filter-select">
                  <option>Default sorting</option>
                  <option>Newest first</option>
                </select>
              </div>
            </div>

            {filteredPodcasts.length === 0 ? (
              <p className="sc-empty">No podcasts match your search.</p>
            ) : (
              <div className="sc-grid">
                {filteredPodcasts.map((t) => {
                  const firstVideo = t.videos[0]
                  const isAudio = firstVideo?.mediaFileType === 'audio'
                  return (
                    <div
                      key={t.id}
                      className="sc-card"
                      role="button"
                      tabIndex={0}
                      onClick={() => openStudentView(t.id)}
                      onKeyDown={(e) => e.key === 'Enter' && openStudentView(t.id)}
                    >
                      <div className="sc-card-thumb">
                        {firstVideo?.thumbnailPreview ? (
                          <img src={firstVideo.thumbnailPreview} alt={t.topic.title} />
                        ) : (
                          <div className="sc-thumb-bg sc-thumb-podcast">{isAudio ? '🎙' : '▶'}</div>
                        )}
                        <div className="sc-card-badges">
                          <span className="sc-badge">{firstVideo?.skillLevel || 'Beginner'}</span>
                          <span className="sc-badge">{t.topic.category}</span>
                          <span className="sc-badge sc-badge-dur">⏱ {firstVideo?.duration || '--'}</span>
                        </div>
                      </div>
                      <div className="sc-card-body">
                        <h3 className="sc-card-title">{t.topic.title}</h3>
                        <p className="sc-card-desc">{t.topic.overview || 'No description.'}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        <footer className="sc-footer">
          <div className="sc-footer-inner">
            <div className="sc-footer-brand">
              <div className="sc-logo">
                <span className="sc-logo-mark">▶</span>
                <strong>Vidmology</strong>
              </div>
              <p>AI-Powered Micro learning platform.</p>
            </div>
            <div className="sc-footer-col">
              <strong>Company</strong>
              <span>Videos</span><span>Podcast</span><span>Ai Coach</span><span>White label</span>
            </div>
            <div className="sc-footer-col">
              <strong>Resources</strong>
              <span>FAQ</span><span>Case Studies</span>
            </div>
            <div className="sc-footer-col">
              <strong>Legal</strong>
              <span>GDPR Policy</span><span>Terms &amp; Conditions</span><span>Privacy Policy</span>
            </div>
          </div>
          <div className="sc-footer-bottom">
            <span>info@vidmology.com</span>
            <span>© 2025 Vidmology. All Rights Reserved.</span>
          </div>
        </footer>
      </div>
    )
  }

  if (pageView === 'student-player') {
    const row = topics.find((t) => t.id === studentViewTopicId) || podcastTopics.find((t) => t.id === studentViewTopicId)
    if (!row) return null
    const isCurrentPodcast = !topics.find((t) => t.id === studentViewTopicId)
    const activeVideo = row.videos.find((v) => v.id === studentEpisodeId) ?? row.videos[0]
    const otherTopics = (isCurrentPodcast ? podcastTopics : topics).filter((t) => t.id !== row.id && t.topic.isActive === 'Yes')

    return (
      <div className="sv-shell">
        <nav className="sv-nav">
          <div className="sv-nav-inner">
            <div className="sv-logo">
              <span className="sv-logo-mark">▶</span>
              <strong>Vidmology</strong>
            </div>
            <div className="sv-nav-links">
              <div className="nav-learn-wrap">
                <span className="nav-learn-trigger">Learn ▾</span>
                <div className="nav-learn-dropdown">
                  <div className="nav-learn-col" role="button" tabIndex={0} onClick={() => setPageView('student-catalog')} onKeyDown={(e) => e.key === 'Enter' && setPageView('student-catalog')}>
                    <strong>Videos</strong>
                    <p>Learn with 12 categories of bite videos and podcast</p>
                  </div>
                  <div className="nav-learn-col" role="button" tabIndex={0} onClick={() => setPageView('student-podcast-catalog')} onKeyDown={(e) => e.key === 'Enter' && setPageView('student-podcast-catalog')}>
                    <strong>Podcast</strong>
                    <p>Your 24/7 ai powered coach to help you with quiz, role play &amp; more.</p>
                  </div>
                </div>
              </div>
              <span>Ai Coach</span>
              <span>White Label</span>
              <span>Pricing</span>
              <span>About</span>
            </div>
            <button type="button" className="sv-back-btn" onClick={() => setPageView(isCurrentPodcast ? 'student-podcast-catalog' : 'student-catalog')}>
              ← Back
            </button>
            <button type="button" className="sv-admin-link" onClick={() => setPageView('list')}>
              Admin
            </button>
          </div>
        </nav>

        <div className="sv-player-section">
          <div className={`sv-player-wrap ${row.courseType === 'series' ? 'with-sidebar' : ''}`}>
            <div className="sv-video-container">
              {activeVideo.videoPreview ? (
                activeVideo.mediaFileType === 'audio' ? (
                  <div className="sv-audio-wrap">
                    <div className="sv-audio-cover">🎙</div>
                    <audio src={activeVideo.videoPreview} controls className="sv-audio" />
                  </div>
                ) : (
                  <video src={activeVideo.videoPreview} controls className="sv-video" />
                )
              ) : (
                <div className="sv-video-placeholder">
                  <div className="sv-play-icon">{activeVideo.mediaFileType === 'audio' ? '🎙' : '▶'}</div>
                  <p>{activeVideo.videoFile || 'No media uploaded yet'}</p>
                </div>
              )}
            </div>

            {row.courseType === 'series' && (
              <div className="sv-episode-sidebar">
                <h3 className="sv-sidebar-title">Episodes ({row.videos.length})</h3>
                <div className="sv-episode-list">
                  {row.videos.map((video, index) => (
                    <button
                      key={video.id}
                      type="button"
                      className={`sv-episode-item ${video.id === studentEpisodeId ? 'active' : ''}`}
                      onClick={() => setStudentEpisodeId(video.id)}
                    >
                      <span className="sv-ep-num">{index + 1}</span>
                      <div className="sv-ep-info">
                        <strong>{video.title || `Episode ${index + 1}`}</strong>
                        <span>{video.duration || '--'}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="sv-below-player">
          <div className="sv-content-inner">
            <div className="sv-meta-row">
              <div className="sv-meta-left">
                <h1 className="sv-title">
                  {row.courseType === 'single' ? row.topic.title : activeVideo.title || row.topic.title}
                </h1>
                <div className="sv-stats">
                  <span className="sv-stat">⭐ 5/5.0</span>
                  <span className="sv-stat">👁 19.4K Viewed</span>
                  <span className="sv-stat">📶 {activeVideo.skillLevel}</span>
                </div>
                <button type="button" className="sv-share-btn">share</button>
              </div>
              <div className="sv-tags-block">
                <strong className="sv-tags-label">Tags</strong>
                <div className="sv-tags-list">
                  {row.topic.tags.split(',').filter(Boolean).map((tag) => (
                    <span key={tag} className="sv-tag">{tag.trim()}</span>
                  ))}
                  {!row.topic.tags && <span className="sv-tag">general</span>}
                </div>
              </div>
            </div>

            <div className="sv-tabs-row">
              {['overview', 'quiz'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`sv-tab-btn ${studentTab === tab ? 'active' : ''}`}
                  onClick={() => setStudentTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="sv-tab-content">
              {studentTab === 'overview' && (
                <div>
                  <h3 className="sv-section-title">Description</h3>
                  <p className="sv-description">
                    {(row.courseType === 'single'
                      ? row.topic.overview
                      : activeVideo.description || row.topic.overview) || 'No description provided.'}
                  </p>
                </div>
              )}
              {studentTab === 'quiz' && (
                <div>
                  <h3 className="sv-section-title">Quiz</h3>
                  {activeVideo.quizQuestions.length === 0 ? (
                    <p className="sv-empty-msg">No quiz questions for this video yet.</p>
                  ) : (
                    <div className="sv-quiz-list">
                      {activeVideo.quizQuestions.map((q, i) => (
                        <div key={q.id} className="sv-quiz-q">
                          <strong>{i + 1}. {q.question}</strong>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {otherTopics.length > 0 && (
          <div className="sv-related-section">
            <div className="sv-content-inner">
              <h2 className="sv-related-heading">Related Videos</h2>
              <div className="sv-related-grid">
                {otherTopics.map((t) => (
                  <div
                    key={t.id}
                    className="sv-course-card"
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      setStudentViewTopicId(t.id)
                      setStudentEpisodeId(t.videos[0]?.id ?? null)
                      setStudentTab('overview')
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && openStudentView(t.id)}
                  >
                    <div className="sv-card-thumb">
                      {t.videos[0]?.thumbnailPreview ? (
                        <img src={t.videos[0].thumbnailPreview} alt={t.topic.title} />
                      ) : (
                        <div className="sv-thumb-placeholder">
                          <span>▶</span>
                          <p>{t.topic.title}</p>
                        </div>
                      )}
                      <div className="sv-card-badges">
                        <span className="sv-badge sv-badge-skill">{t.videos[0]?.skillLevel || 'Beginner'}</span>
                        <span className="sv-badge sv-badge-cat">{t.topic.category}</span>
                        <span className="sv-badge sv-badge-dur">⏱ {t.videos[0]?.duration || '--'}</span>
                      </div>
                    </div>
                    <div className="sv-card-body">
                      <h4 className="sv-card-title">{t.topic.title}</h4>
                      <p className="sv-card-desc">{t.topic.overview || 'No description.'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <footer className="sv-footer">
          <div className="sv-content-inner">
            <p>© 2025 Vidmology. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="admin-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="logo-mark">▶</div>
          <div>
            <h1>Vidmology</h1>
            <p>Microlearning platform for recruiters</p>
          </div>
        </div>

        <nav>
          {sidebarMenu.map((item) => (
            <button
              key={item}
              type="button"
              className={`menu-item ${item === activeMenu ? 'active' : ''}`}
              onClick={() => {
                if (item === 'Videos' || item === 'Podcast') {
                  setActiveMenu(item)
                  setPageView('list')
                }
              }}
            >
              {item}
            </button>
          ))}
        </nav>

        <button type="button" className="logout">
          Logout
        </button>
      </aside>

      <main className="content">
        <header className="top-bar">
          <button type="button" className="back">
            «
          </button>
          <div className="top-actions">
            <button type="button" className="view-site-btn" title="Student View" onClick={openCatalog}>
              🌐
            </button>
            <span>◐</span>
            <span>⚙</span>
            <span>👤</span>
          </div>
        </header>

        {pageView === 'list' && (
          <section className="panel">
            <div className="panel-header">
              <div>
                <h2>{isPodcast ? 'Podcast List' : 'Video Topic List'}</h2>
                <p className="panel-subtitle">Total {isPodcast ? 'Podcasts' : 'Topics'} {activeTopics.length}</p>
              </div>
              <div className="actions">
                <button type="button" className="primary" onClick={resetForCreate}>
                  {isPodcast ? 'Add Podcast' : 'Add Video Topic'}
                </button>
              </div>
            </div>

            <div className="table-filters">
              <input placeholder={isPodcast ? 'Search podcasts...' : 'Search videos...'} value={search} onChange={(event) => setSearch(event.target.value)} />
              <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
                <option value="all">All Type</option>
                <option value="single">Single</option>
                <option value="series">Modular Series</option>
              </select>
              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>{isPodcast ? 'Podcast Title' : 'Video Topic Title'}</th>
                  <th>Type</th>
                  <th>{isPodcast ? 'Episodes' : 'Videos'}</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTopics.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="empty">
                      No topics found.
                    </td>
                  </tr>
                ) : (
                  filteredTopics.map((row, index) => (
                    <tr key={row.id}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="row-title">
                          <strong>{row.topic.title}</strong>
                          <span>{row.updatedAt}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`type-badge ${row.courseType}`}>{row.courseType === 'single' ? 'Single' : 'Modular Series'}</span>
                      </td>
                      <td>{row.videos.length}</td>
                      <td>
                        <span className={row.topic.isActive === 'Yes' ? 'status-badge active' : 'status-badge inactive'}>
                          {row.topic.isActive === 'Yes' ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button type="button" onClick={() => startEdit(row.id)}>
                            Edit
                          </button>
                          <button
                            type="button"
                            className="danger"
                            onClick={() => setActiveTopics((current) => current.filter((topicRow) => topicRow.id !== row.id))}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </section>
        )}

        {pageView === 'editor' && (
          <section className="panel">
            <div className="panel-header">
              <h2>{editingTopicId ? `Edit ${isPodcast ? 'Podcast' : 'Video Topic'}` : `Create ${isPodcast ? 'Podcast' : 'Video Topic'}`}</h2>
              <div className="actions">
                <button type="button" onClick={() => setPageView('list')}>
                  {isPodcast ? 'Back To Podcast List' : 'Back To Video List'}
                </button>
              </div>
            </div>

            <div className="form-grid">
              <h3>Topic Settings</h3>

              <label>
                {isPodcast ? 'Podcast type *' : 'Course type *'}
                <select value={courseType} onChange={(event) => handleCourseTypeChange(event.target.value)}>
                  <option value="single">{isPodcast ? 'Single Episode' : 'Single Video'}</option>
                  <option value="series">{isPodcast ? 'Multi-Episode Series' : 'Modular Series'}</option>
                </select>
              </label>

              {courseType === 'single' ? (
                <div className="two-col">
                  <label>
                    {isPodcast ? 'Podcast title *' : 'Video topic title *'}
                    <input value={topic.title} onChange={(event) => updateTopicField('title', event.target.value)} />
                  </label>
                  <label>
                    Duration *
                    <input
                      value={singleVideo?.duration ?? ''}
                      onChange={(event) => updateVideoField(singleVideo.id, 'duration', event.target.value)}
                    />
                  </label>
                </div>
              ) : (
                <label>
                  {isPodcast ? 'Series name *' : 'Program name *'}
                  <input value={topic.title} onChange={(event) => updateTopicField('title', event.target.value)} />
                </label>
              )}

              <div className="three-col">
                <label>
                  Category
                  <select value={topic.category} onChange={(event) => updateTopicField('category', event.target.value)}>
                    <option>Contract/Freelance</option>
                    <option>Management</option>
                    <option>Recruiting</option>
                  </select>
                </label>
                <label>
                  Sub-Category
                  <select
                    value={topic.subCategory}
                    onChange={(event) => updateTopicField('subCategory', event.target.value)}
                  >
                    <option>Select sub-category</option>
                    <option>Tech</option>
                    <option>Business</option>
                  </select>
                </label>
                <label>
                  Is Active
                  <select value={topic.isActive} onChange={(event) => updateTopicField('isActive', event.target.value)}>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </label>
              </div>

              <label>
                Tags *
                <input value={topic.tags} onChange={(event) => updateTopicField('tags', event.target.value)} />
              </label>

              <label>
                Overview (optional)
                <textarea rows={4} value={topic.overview} onChange={(event) => updateTopicField('overview', event.target.value)} />
              </label>

              <div className="episode-header">
                <h3>{courseType === 'single' ? (isPodcast ? 'Episode Details' : 'Video Details') : `Episodes (${videos.length})`}</h3>
                {courseType === 'series' && (
                  <button type="button" className="primary" onClick={addEpisode}>
                    Add Episode
                  </button>
                )}
              </div>

              <div className="episodes-stack">
                {videos.map((video, index) => {
                  const expanded = video.id === expandedEpisodeId
                  const label = courseType === 'single' ? 'Video' : `Episode ${index + 1}`
                  return (
                    <article
                      key={video.id}
                      className={`episode-card ${expanded ? 'expanded' : ''} ${
                        draggingEpisodeId === video.id ? 'dragging' : ''
                      }`}
                      draggable={courseType === 'series' && !expanded}
                      onDragStart={(event) => handleDragStart(video.id, event)}
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop(video.id)}
                      onDragEnd={handleDragEnd}
                    >
                      <div className="episode-card-header">
                        {courseType === 'series' && (
                          <div className="episode-controls-left">
                            <span className="drag-handle" aria-hidden="true">
                              ⋮⋮
                            </span>
                          </div>
                        )}
                        <button type="button" className="episode-toggle" onClick={() => toggleEpisode(video.id)}>
                          <strong className="truncate">
                            {label}:{' '}
                            {courseType === 'single' ? topic.title || 'Topic title' : video.title || `${label} title`}
                          </strong>
                          <span>{video.duration || 'No duration yet'}</span>
                          <span className={isVideoValid(video) ? 'status-ok' : 'status-warn'}>
                            {isVideoValid(video) ? 'Complete' : 'Missing required data'}
                          </span>
                        </button>

                        {courseType === 'series' && (
                          <div className="episode-actions">
                            <button
                              type="button"
                              className={`icon-button indicator-button ${expanded ? 'open' : ''}`}
                              onClick={() => toggleEpisode(video.id)}
                              aria-label={expanded ? 'Collapse episode' : 'Expand episode'}
                            >
                              ▸
                            </button>
                            <button type="button" className="icon-button" onClick={() => removeEpisode(video.id)}>
                              ✕
                            </button>
                          </div>
                        )}
                      </div>

                      {expanded && (
                        <div className="episode-body">
                          {courseType === 'series' && (
                            <div className="two-col">
                              <label>
                                Episode title *
                                <input
                                  value={video.title}
                                  onChange={(event) => updateVideoField(video.id, 'title', event.target.value)}
                                />
                              </label>
                              <label>
                                Duration *
                                <input
                                  value={video.duration}
                                  onChange={(event) => updateVideoField(video.id, 'duration', event.target.value)}
                                />
                              </label>
                            </div>
                          )}

                          <label>
                            Skill level *
                            <select
                              value={video.skillLevel}
                              onChange={(event) => updateVideoField(video.id, 'skillLevel', event.target.value)}
                            >
                              <option>Beginner</option>
                              <option>Intermediate</option>
                              <option>Advanced</option>
                            </select>
                          </label>

                          {courseType === 'series' && (
                            <label>
                              Episode description
                              <textarea
                                rows={4}
                                value={video.description}
                                onChange={(event) => updateVideoField(video.id, 'description', event.target.value)}
                              />
                            </label>
                          )}

                          {isPodcast && (
                            <div className="podcast-script-section">
                              <div className="podcast-script-header">
                                <h3>Script Generator</h3>
                                <div className="podcast-script-controls">
                                  <button type="button" className="podcast-custom-voice-btn">Custom Host &amp; Guest Voice</button>
                                  <div className="podcast-version-row">
                                    <span className={video.podcastScriptVersion === 'v1' ? 'version-active' : ''}>V1</span>
                                    <label className="toggle-switch">
                                      <input type="checkbox" checked={video.podcastScriptVersion === 'v2'} onChange={(e) => updateVideoField(video.id, 'podcastScriptVersion', e.target.checked ? 'v2' : 'v1')} />
                                      <span className="toggle-slider" />
                                    </label>
                                    <span className={video.podcastScriptVersion === 'v2' ? 'version-active' : ''}>V2</span>
                                  </div>
                                </div>
                              </div>
                              <textarea
                                className="podcast-instruction-area"
                                placeholder="Enter your instruction or paste a pre-made script here"
                                value={video.podcastInstruction}
                                onChange={(e) => updateVideoField(video.id, 'podcastInstruction', e.target.value)}
                                rows={4}
                              />
                              <div className="podcast-controls">
                                <select value={video.podcastHost} onChange={(e) => updateVideoField(video.id, 'podcastHost', e.target.value)} className="podcast-select">
                                  <option value="">Select Host</option>
                                  <option>Alex</option>
                                  <option>Jordan</option>
                                  <option>Sam</option>
                                  <option>Morgan</option>
                                </select>
                                <select value={video.podcastGuest} onChange={(e) => updateVideoField(video.id, 'podcastGuest', e.target.value)} className="podcast-select">
                                  <option value="">Select Guest</option>
                                  <option>Charlie</option>
                                  <option>Riley</option>
                                  <option>Taylor</option>
                                  <option>Casey</option>
                                </select>
                                <select value={video.podcastTone} onChange={(e) => updateVideoField(video.id, 'podcastTone', e.target.value)} className="podcast-select">
                                  <option value="">Select Tone</option>
                                  <option>Professional</option>
                                  <option>Casual</option>
                                  <option>Energetic</option>
                                  <option>Informative</option>
                                </select>
                                <button type="button" className="podcast-gen-script-btn" onClick={() => handleGenerateScript(video.id)}>Generate Script ↻</button>
                              </div>
                              <textarea
                                className="podcast-script-area"
                                placeholder="Generated script will appear here. You can also edit it directly."
                                value={video.podcastScript}
                                onChange={(e) => updateVideoField(video.id, 'podcastScript', e.target.value)}
                                rows={10}
                              />
                              {video.podcastScript && (
                                <div className="podcast-generate-final-row">
                                  <button type="button" className="podcast-generate-audio-btn">Generate Podcast ↻</button>
                                  <button type="button" className="podcast-gen-script-btn" onClick={() => handleGenerateScript(video.id)}>Regenerate Script ↻</button>
                                </div>
                              )}
                            </div>
                          )}

                          <div className="media-layout">
                            <div className="upload-card">
                              <div className="upload-card-head">
                                <h4>Thumbnail Image</h4>
                                <span>Optional</span>
                              </div>
                              <label className={`upload-dropzone ${video.thumbnail ? 'filled' : ''}`}>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(event) => handleFileUpload(video.id, 'thumbnail', event)}
                                />
                                {video.thumbnail ? (
                                  <div className="upload-file-row">
                                    {video.thumbnailPreview ? (
                                      <img src={video.thumbnailPreview} alt="Thumbnail preview" className="media-preview-inline" />
                                    ) : (
                                      <p className="preview-unavailable">Preview unavailable for existing file.</p>
                                    )}
                                    <div className="upload-file-head">
                                      <strong className="truncate">{video.thumbnail}</strong>
                                      <span className="upload-complete">Completed</span>
                                    </div>
                                    <div className="upload-progress">
                                      <span style={{ width: '100%' }} />
                                    </div>
                                    <div className="upload-file-actions">
                                      <span>100%</span>
                                      <button
                                        type="button"
                                        className="ghost-button"
                                        onClick={(event) => {
                                          event.preventDefault()
                                          event.stopPropagation()
                                          clearMediaField(video.id, 'thumbnail')
                                        }}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <div className="upload-icon">🖼</div>
                                    <p>
                                      <span>Choose a file</span> or drag and drop
                                    </p>
                                    <small>PNG or JPG up to 10 MB</small>
                                  </>
                                )}
                              </label>
                              {!video.thumbnail && (
                                <p className="file-name empty-file">No thumbnail uploaded yet.</p>
                              )}
                            </div>

                            <div className="upload-card">
                              <div className="upload-card-head">
                                <h4>{isPodcast ? 'Audio / Video Content *' : 'Video Content *'}</h4>
                                <span>Required</span>
                              </div>
                              <label className={`upload-dropzone ${video.videoFile ? 'filled' : ''}`}>
                                <input
                                  type="file"
                                  accept={isPodcast ? 'video/*,audio/*' : 'video/*'}
                                  onChange={(event) => handleFileUpload(video.id, 'videoFile', event)}
                                />
                                {video.videoFile ? (
                                  <div className="upload-file-row">
                                    {video.videoPreview ? (
                                      video.mediaFileType === 'audio' ? (
                                        <audio src={video.videoPreview} controls className="media-preview-inline" />
                                      ) : (
                                        <video src={video.videoPreview} controls className="media-preview-inline" />
                                      )
                                    ) : (
                                      <p className="preview-unavailable">Preview unavailable for existing file.</p>
                                    )}
                                    <div className="upload-file-head">
                                      <strong className="truncate">{video.videoFile}</strong>
                                      <span className="upload-complete">Completed</span>
                                    </div>
                                    <div className="upload-progress">
                                      <span style={{ width: '100%' }} />
                                    </div>
                                    <div className="upload-file-actions">
                                      <span>100%</span>
                                      <button
                                        type="button"
                                        className="ghost-button"
                                        onClick={(event) => {
                                          event.preventDefault()
                                          event.stopPropagation()
                                          clearMediaField(video.id, 'videoFile')
                                        }}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <div className="upload-icon">{isPodcast ? '🎙' : '🎬'}</div>
                                    <p>
                                      <span>Choose a file</span> or drag and drop
                                    </p>
                                    <small>{isPodcast ? 'MP3, WAV, MP4, MOV up to 500 MB' : 'MP4, MOV up to 500 MB'}</small>
                                  </>
                                )}
                              </label>
                              {!video.videoFile && (
                                <p className="file-name empty-file">{isPodcast ? 'No audio or video uploaded yet.' : 'No video uploaded yet.'}</p>
                              )}
                            </div>

                            <div className="subtitle-row upload-card">
                              <div className="upload-card-head">
                                <h4>Subtitles (.VTT)</h4>
                                <span>Optional</span>
                              </div>
                              <label className={`upload-dropzone subtitle-dropzone ${video.subtitleFile ? 'filled' : ''}`}>
                                <input
                                  type="file"
                                  accept=".vtt"
                                  onChange={(event) => handleFileUpload(video.id, 'subtitleFile', event)}
                                />
                                {video.subtitleFile ? (
                                  <div className="upload-file-row">
                                    <div className="upload-file-head">
                                      <strong className="truncate">{video.subtitleFile}</strong>
                                      <span className="upload-complete">Completed</span>
                                    </div>
                                    <div className="upload-progress">
                                      <span style={{ width: '100%' }} />
                                    </div>
                                    <div className="upload-file-actions">
                                      <span>100%</span>
                                      <button
                                        type="button"
                                        className="ghost-button"
                                        onClick={(event) => {
                                          event.preventDefault()
                                          event.stopPropagation()
                                          clearMediaField(video.id, 'subtitleFile')
                                        }}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <div className="upload-icon">⌨</div>
                                    <p>
                                      <span>Choose a subtitle file</span> or drag and drop
                                    </p>
                                    <small>VTT format only, up to 10 MB</small>
                                  </>
                                )}
                              </label>
                              {!video.subtitleFile && (
                                <p className="file-name empty-file">No subtitle uploaded yet.</p>
                              )}
                              <p className="upload-hint">Attach subtitle file for accessibility and multilingual support.</p>
                            </div>
                          </div>

                          <div className="episode-quiz">
                            <div className="episode-quiz-header">
                              <h4>Episode Quiz</h4>
                              <button type="button" className="primary" onClick={() => addQuizQuestion(video.id)}>
                                Add Question
                              </button>
                            </div>
                            <table>
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Question</th>
                                </tr>
                              </thead>
                              <tbody>
                                {video.quizQuestions.length === 0 ? (
                                  <tr>
                                    <td colSpan={2} className="empty">
                                      No quiz questions yet.
                                    </td>
                                  </tr>
                                ) : (
                                  video.quizQuestions.map((question) => (
                                    <tr key={question.id}>
                                      <td>{question.id}</td>
                                      <td>{question.question}</td>
                                    </tr>
                                  ))
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </article>
                  )
                })}
              </div>

              {!canSave && (
                <p className="form-note">
                  {courseType === 'single'
                    ? `Single ${isPodcast ? 'podcast' : 'video'} needs duration and uploaded ${isPodcast ? 'audio or video' : 'video'} file.`
                    : `Each episode needs title, duration, and uploaded ${isPodcast ? 'audio or video' : 'video'} file.`}
                </p>
              )}

              {isPodcast ? (
                <div className="podcast-save-row">
                  <button type="button" className="podcast-draft-btn" disabled={!topic.title.trim()} onClick={() => savePodcast('No')}>Save as Draft</button>
                  <button type="button" className="podcast-publish-btn" disabled={!topic.title.trim()} onClick={() => savePodcast('Yes')}>Publish Podcast</button>
                </div>
              ) : (
                <button type="button" className="primary center" disabled={!canSave} onClick={saveTopic}>Save Topic</button>
              )}
              <button
                type="button"
                className="center"
                onClick={() => {
                  console.info('Course payload:', normalizedPayload)
                }}
              >
                Log Payload
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
