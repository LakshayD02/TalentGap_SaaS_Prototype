// Navigation Toggle
const navToggle = document.getElementById("navToggle")
const navLinks = document.getElementById("navLinks")

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active")
})

// Close navigation when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active")
  })
})

// Enhanced Parallax Effect for Hero Section
window.addEventListener("scroll", () => {
  const parallaxBg = document.getElementById("parallaxBg")
  const scrollPosition = window.pageYOffset

  // Parallax effect for background
  if (parallaxBg) {
    parallaxBg.style.transform = `translateY(${scrollPosition * 0.4}px)`
  }
})

// Toast Notification System
function showToast(type, title, message, duration = 5000) {
  const toastContainer = document.getElementById("toastContainer")

  // Create toast element
  const toast = document.createElement("div")
  toast.className = `toast ${type}`

  // Create toast content
  toast.innerHTML = `
    <div class="toast-icon">
      <i data-lucide="${type === "success" ? "check-circle" : type === "warning" ? "alert-triangle" : type === "error" ? "x-circle" : "info"}"></i>
    </div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close">
      <i data-lucide="x"></i>
    </button>
    <div class="toast-progress"></div>
  `

  // Add toast to container
  toastContainer.appendChild(toast)

  // Initialize Lucide icons
  lucide.createIcons({
    icons: {
      "check-circle": {},
      "alert-triangle": {},
      "x-circle": {},
      info: {},
      x: {},
    },
    nameAttr: "data-lucide",
  })

  // Add close event listener
  toast.querySelector(".toast-close").addEventListener("click", () => {
    toast.style.animation = "slideOut 0.3s ease forwards"
    setTimeout(() => {
      toast.remove()
    }, 300)
  })

  // Auto remove after duration
  setTimeout(() => {
    if (toast.parentNode) {
      toast.style.animation = "slideOut 0.3s ease forwards"
      setTimeout(() => {
        if (toast.parentNode) {
          toast.remove()
        }
      }, 300)
    }
  }, duration)
}

// Authentication Modals
const pageOverlay = document.getElementById("pageOverlay")
const loginModal = document.getElementById("loginModal")
const signupModal = document.getElementById("signupModal")
const loginBtn = document.getElementById("loginBtn")
const signupBtn = document.getElementById("signupBtn")
const showSignup = document.getElementById("showSignup")
const showLogin = document.getElementById("showLogin")
const closeModalBtns = document.querySelectorAll(".close-modal")

// Show login modal
if (loginBtn) {
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault()
    pageOverlay.style.display = "block"
    loginModal.style.display = "block"

    // Clear form fields
    document.getElementById("loginForm").reset()
  })
}

// Show signup modal
if (signupBtn) {
  signupBtn.addEventListener("click", (e) => {
    e.preventDefault()
    pageOverlay.style.display = "block"
    signupModal.style.display = "block"

    // Clear form fields
    document.getElementById("signupForm").reset()
  })
}

// Switch between modals
if (showSignup) {
  showSignup.addEventListener("click", (e) => {
    e.preventDefault()
    loginModal.style.display = "none"
    signupModal.style.display = "block"

    // Clear form fields
    document.getElementById("signupForm").reset()
  })
}

if (showLogin) {
  showLogin.addEventListener("click", (e) => {
    e.preventDefault()
    signupModal.style.display = "none"
    loginModal.style.display = "block"

    // Clear form fields
    document.getElementById("loginForm").reset()
  })
}

// Close modals
closeModalBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modalId = btn.getAttribute("data-modal")
    document.getElementById(modalId).style.display = "none"
    pageOverlay.style.display = "none"
  })
})

// Close modals when clicking on overlay
if (pageOverlay) {
  pageOverlay.addEventListener("click", () => {
    loginModal.style.display = "none"
    signupModal.style.display = "none"
    pageOverlay.style.display = "none"
  })
}

// Update the authentication handling code
document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in
  checkAuthState()

  // Setup event listeners for auth-related elements
  setupAuthListeners()

  // Initialize testimonials
  initTestimonials()

  // Initialize how it works section
  initHowItWorks()
})

// In the checkAuthState function, update to show login button after signup
function checkAuthState() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const authButtons = document.getElementById("authButtons")
  const userMenu = document.getElementById("userMenu")
  const loginBtn = document.getElementById("loginBtn")
  const signupBtn = document.getElementById("signupBtn")

  if (currentUser) {
    // User is logged in - hide auth buttons, show user menu
    authButtons.style.display = "none"
    userMenu.style.display = "flex"

    // Update user info in dropdown
    document.getElementById("userDisplayName").textContent = currentUser.name
    document.getElementById("userEmail").textContent = currentUser.email
  } else {
    // User is not logged in - show auth buttons, hide user menu
    authButtons.style.display = "flex"
    userMenu.style.display = "none"

    // Check if user has signed up but not logged in
    const hasSignedUp = localStorage.getItem("hasSignedUp")
    if (hasSignedUp === "true") {
      // Show only login button
      loginBtn.style.display = "inline-block"
      signupBtn.style.display = "none"
    } else {
      // Show both buttons
      loginBtn.style.display = "inline-block"
      signupBtn.style.display = "inline-block"
    }
  }
}

// Update the mobile dropdown toggle functionality
function setupAuthListeners() {
  // Logout button
  const logoutBtn = document.getElementById("logoutBtn")
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault()
      // Remove user from localStorage
      localStorage.removeItem("currentUser")
      // Update UI
      checkAuthState()
      // Show toast notification
      showToast("success", "Logged Out", "You have been successfully logged out.")
    })
  }

  // User avatar click (for mobile)
  const userAvatar = document.getElementById("userAvatar")
  const userDropdown = document.getElementById("userDropdown")
  if (userAvatar && userDropdown) {
    userAvatar.addEventListener("click", () => {
      // Toggle dropdown visibility for all screen sizes
      userDropdown.classList.toggle("active")
    })

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (userAvatar && !userAvatar.contains(e.target) && !userDropdown.contains(e.target)) {
        userDropdown.classList.remove("active")
      }
    })
  }

  // Login form submission
  const loginForm = document.getElementById("loginForm")
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const email = document.getElementById("loginEmail").value
      const password = document.getElementById("loginPassword").value

      // Get users from local storage
      const users = JSON.parse(localStorage.getItem("users")) || []

      // Check if user exists
      const user = users.find((u) => u.email === email && u.password === password)

      if (user) {
        // Store logged in user
        localStorage.setItem("currentUser", JSON.stringify(user))

        // Close modal and show success message
        loginModal.style.display = "none"
        pageOverlay.style.display = "none"

        // Show toast notification
        showToast("success", "Login Successful", `Welcome back, ${user.name}!`)

        // Update UI to reflect logged in state
        checkAuthState()

        // Clear form
        loginForm.reset()
      } else {
        // Show error toast
        showToast("error", "Login Failed", "Invalid email or password. Please try again.")
      }
    })
  }

  // Signup form submission
  const signupForm = document.getElementById("signupForm")
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const name = document.getElementById("signupName").value
      const email = document.getElementById("signupEmail").value
      const password = document.getElementById("signupPassword").value
      const confirmPassword = document.getElementById("signupConfirmPassword").value

      // Validate passwords match
      if (password !== confirmPassword) {
        showToast("error", "Signup Failed", "Passwords do not match. Please try again.")
        return
      }

      // Get existing users from local storage
      const users = JSON.parse(localStorage.getItem("users")) || []

      // Check if user already exists
      if (users.some((user) => user.email === email)) {
        showToast("warning", "Signup Failed", "Email already registered. Please use a different email or login.")
        return
      }

      // Add new user
      const newUser = { name, email, password }
      users.push(newUser)

      // Save to local storage
      localStorage.setItem("users", JSON.stringify(users))
      localStorage.setItem("hasSignedUp", "true")

      // Close modal and show success message
      signupModal.style.display = "none"
      pageOverlay.style.display = "none"

      // Show toast notification
      showToast(
        "success",
        "Signup Successful",
        `Account created successfully! Welcome, ${name}. Please log in to continue.`,
      )

      // Update UI to show only login button
      checkAuthState()

      // Clear form
      signupForm.reset()
    })
  }
}

// Initialize How It Works section with scroll animation
function initHowItWorks() {
  const steps = document.querySelectorAll(".step")
  const stepProgress = document.getElementById("stepProgress")

  window.addEventListener("scroll", () => {
    const howItWorksSection = document.querySelector(".how-it-works")
    if (!howItWorksSection) return

    const sectionTop = howItWorksSection.offsetTop
    const sectionHeight = howItWorksSection.offsetHeight
    const scrollPosition = window.scrollY

    // Calculate progress through the section (0 to 1)
    let progress = (scrollPosition - sectionTop + 300) / (sectionHeight - 300)
    progress = Math.min(Math.max(progress, 0), 1) // Clamp between 0 and 1

    // Set the width of the progress bar
    if (stepProgress) {
      stepProgress.style.width = `${progress * 100}%`
    }

    // Activate steps based on progress
    steps.forEach((step, index) => {
      const stepThreshold = index / (steps.length - 1)
      const stepIconFill = step.querySelector(".step-icon-fill")

      if (progress >= stepThreshold) {
        step.classList.add("active")
        if (stepIconFill) {
          stepIconFill.style.height = "100%"
        }
      } else {
        step.classList.remove("active")
        if (stepIconFill) {
          stepIconFill.style.height = "0%"
        }
      }
    })
  })
}

// Testimonials data
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer at Google",
    company: "Google",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      "TalentGap helped me identify the exact skills I needed to land my dream job. Within 3 months of following their recommendations, I received 2 job offers!",
  },
  {
    name: "Michael Chen",
    role: "UX Designer at Adobe",
    company: "Adobe",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "The skill gap analysis was eye-opening. It showed me exactly what I needed to focus on, saving me months of unfocused learning.",
  },
  {
    name: "Jessica Williams",
    role: "Data Analyst at Microsoft",
    company: "Microsoft",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    quote:
      "As a career changer, I was lost on where to start. TalentGap gave me a clear roadmap and connected me with the perfect learning resources.",
  },
  {
    name: "David Rodriguez",
    role: "Frontend Developer at Netflix",
    company: "Netflix",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    quote:
      "I was stuck in my career for years. TalentGap helped me identify the skills I needed to advance and provided a clear path forward.",
  },
  {
    name: "Emily Chang",
    role: "Product Manager at Amazon",
    company: "Amazon",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    quote:
      "The personalized roadmap was incredibly valuable. It helped me transition from engineering to product management seamlessly.",
  },
  {
    name: "James Wilson",
    role: "Data Scientist at IBM",
    company: "IBM",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    quote:
      "TalentGap identified gaps in my machine learning knowledge that I wasn't aware of. Their recommendations were spot on!",
  },
]

// Initialize testimonials carousel with auto-scroll
function initTestimonials() {
  const track = document.getElementById("testimonialsTrack")
  const dots = document.getElementById("testimonialDots")

  if (!track || !dots) return

  let currentIndex = 0
  let testimonialWidth = 0
  let visibleTestimonials = 3
  let autoScrollInterval = null
  let isPaused = false

  // Determine number of visible testimonials based on screen width
  function updateVisibleTestimonials() {
    if (window.innerWidth < 768) {
      visibleTestimonials = 1
    } else if (window.innerWidth < 992) {
      visibleTestimonials = 2
    } else {
      visibleTestimonials = 3
    }

    // Update testimonial width
    testimonialWidth = track.parentElement.offsetWidth / visibleTestimonials

    // Update testimonial card width
    const cards = track.querySelectorAll(".testimonial-card")
    cards.forEach((card) => {
      card.style.minWidth = `${testimonialWidth - 32}px` // Account for margins
    })

    // Update track position
    updateTrackPosition()
  }

  // Clear existing testimonials
  track.innerHTML = ""
  dots.innerHTML = ""

  // Populate testimonials
  testimonials.forEach((testimonial, index) => {
    // Create testimonial card
    const card = document.createElement("div")
    card.className = "testimonial-card"
    card.innerHTML = `
      <div class="testimonial-avatar">
        <img src="${testimonial.avatar}" alt="${testimonial.name}" class="animated-avatar">
      </div>
      <div class="testimonial-content">
        <p class="quote">"${testimonial.quote}"</p>
        <p class="name">${testimonial.name}</p>
        <p class="role">${testimonial.role}</p>
      </div>
    `

    // Add hover event to pause auto-scroll
    card.addEventListener("mouseenter", () => {
      isPaused = true
    })

    card.addEventListener("mouseleave", () => {
      isPaused = false
    })

    // Add to track
    track.appendChild(card)

    // Add dot
    const dot = document.createElement("div")
    dot.className = "carousel-dot"
    if (index === 0) dot.classList.add("active")
    dot.addEventListener("click", () => {
      goToTestimonial(index)
    })
    dots.appendChild(dot)
  })

  // Update track position
  function updateTrackPosition() {
    track.style.transform = `translateX(-${currentIndex * testimonialWidth}px)`

    // Update dots
    const allDots = dots.querySelectorAll(".carousel-dot")
    allDots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add("active")
      } else {
        dot.classList.remove("active")
      }
    })
  }

  // Go to specific testimonial
  function goToTestimonial(index) {
    currentIndex = index
    updateTrackPosition()
  }

  // Auto-scroll function
  function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
      if (!isPaused) {
        currentIndex = (currentIndex + 1) % (testimonials.length - visibleTestimonials + 1)
        updateTrackPosition()
      }
    }, 4000) // Change slide every 4 seconds
  }

  // Initialize
  updateVisibleTestimonials()
  startAutoScroll()

  // Update on resize
  window.addEventListener("resize", updateVisibleTestimonials)

  // Clone testimonials for infinite scroll effect
  function setupInfiniteScroll() {
    // Clone the first few testimonials and append to the end
    const cards = track.querySelectorAll(".testimonial-card")
    const cloneCount = Math.min(visibleTestimonials, cards.length)

    for (let i = 0; i < cloneCount; i++) {
      const clone = cards[i].cloneNode(true)
      track.appendChild(clone)

      // Add hover event to pause auto-scroll for clones too
      clone.addEventListener("mouseenter", () => {
        isPaused = true
      })

      clone.addEventListener("mouseleave", () => {
        isPaused = false
      })
    }
  }

  setupInfiniteScroll()
}

// Enhanced File Upload and Resume Analysis
const uploadArea = document.getElementById("uploadArea")
const fileUpload = document.getElementById("fileUpload")
const resultsArea = document.getElementById("resultsArea")
const loadingIndicator = document.getElementById("loadingIndicator")
const resultsContent = document.getElementById("resultsContent")
const skillAnalysisContent = document.getElementById("skillAnalysisContent")

if (uploadArea) {
  uploadArea.addEventListener("click", () => {
    fileUpload.click()
  })

  uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault()
    uploadArea.classList.add("border-primary")
  })

  uploadArea.addEventListener("dragleave", () => {
    uploadArea.classList.remove("border-primary")
  })

  uploadArea.addEventListener("drop", (e) => {
    e.preventDefault()
    uploadArea.classList.remove("border-primary")

    // Handle dropped files
    if (e.dataTransfer.files.length > 0) {
      fileUpload.files = e.dataTransfer.files
      simulateResumeAnalysis(e.dataTransfer.files[0])
    }
  })
}

if (fileUpload) {
  fileUpload.addEventListener("change", () => {
    if (fileUpload.files.length > 0) {
      simulateResumeAnalysis(fileUpload.files[0])
    }
  })
}

// Simulate resume analysis with dynamic content generation
function simulateResumeAnalysis(file) {
  // Show results area with loading indicator
  resultsArea.style.display = "block"
  loadingIndicator.style.display = "block"
  resultsContent.style.display = "none"

  // Scroll to results
  setTimeout(() => {
    resultsArea.scrollIntoView({ behavior: "smooth" })
  }, 100)

  // Simulate file reading and processing
  const reader = new FileReader()

  reader.onload = (e) => {
    // Simulate processing time
    setTimeout(() => {
      // Generate analysis based on file content
      generateAnalysisResults(file.name, e.target.result)

      // Hide loading, show results
      loadingIndicator.style.display = "none"
      resultsContent.style.display = "block"

      // Show success toast
      showToast("success", "Analysis Complete", "Your resume has been successfully analyzed.")

      // Animate skill bars
      animateSkillBars()
    }, 2500)
  }

  // Read file as text
  reader.readAsText(file)
}

// Enhanced job card display
function generateAnalysisResults(fileName, fileContent) {
  // Extract basic info from file content
  const content = fileContent.toLowerCase()

  // Determine skill levels based on content
  const skills = {
    technical: [
      { name: "JavaScript", level: content.includes("javascript") ? 85 : 65 },
      { name: "React", level: content.includes("react") ? 78 : 55 },
      { name: "Python", level: content.includes("python") ? 72 : 45 },
      { name: "SQL", level: content.includes("sql") ? 80 : 60 },
      { name: "HTML/CSS", level: content.includes("html") || content.includes("css") ? 90 : 70 },
    ],
    soft: [
      { name: "Communication", level: 85 },
      { name: "Leadership", level: content.includes("lead") || content.includes("manage") ? 80 : 65 },
      { name: "Teamwork", level: content.includes("team") ? 90 : 75 },
    ],
  }

  // Determine job role based on content
  let targetRole = "Frontend Developer"
  if (content.includes("data") && (content.includes("analysis") || content.includes("analytics"))) {
    targetRole = "Data Analyst"
  } else if (content.includes("backend") || content.includes("server")) {
    targetRole = "Backend Developer"
  } else if (content.includes("full") && content.includes("stack")) {
    targetRole = "Full Stack Developer"
  } else if (content.includes("design") || content.includes("ui") || content.includes("ux")) {
    targetRole = "UI/UX Designer"
  }

  // Determine skill gaps based on target role
  const skillGaps = []
  if (targetRole === "Frontend Developer") {
    if (!content.includes("typescript")) skillGaps.push("TypeScript - Intermediate level needed")
    if (!content.includes("graphql")) skillGaps.push("GraphQL - Basic knowledge required")
    if (!content.includes("test") && !content.includes("jest"))
      skillGaps.push("Testing (Jest) - Advanced level recommended")
  } else if (targetRole === "Data Analyst") {
    if (!content.includes("tableau")) skillGaps.push("Tableau - Intermediate level needed")
    if (!content.includes("power bi")) skillGaps.push("Power BI - Basic knowledge required")
    if (!content.includes("statistics")) skillGaps.push("Statistical Analysis - Advanced level recommended")
  }

  // Generate job matches
  const jobMatches = []
  if (targetRole === "Frontend Developer") {
    jobMatches.push({ title: "Frontend Developer", company: "TechCorp Inc.", match: 92 })
    jobMatches.push({ title: "UI Developer", company: "Digital Solutions", match: 87 })
    jobMatches.push({ title: "React Developer", company: "WebFuture", match: 85 })
  } else if (targetRole === "Data Analyst") {
    jobMatches.push({ title: "Data Analyst", company: "DataTech Solutions", match: 90 })
    jobMatches.push({ title: "Business Intelligence Analyst", company: "Insight Corp", match: 85 })
    jobMatches.push({ title: "Data Visualization Specialist", company: "VisData Inc.", match: 82 })
  } else {
    jobMatches.push({ title: targetRole, company: "TechCorp Inc.", match: 88 })
    jobMatches.push({ title: "Junior " + targetRole, company: "Digital Solutions", match: 92 })
    jobMatches.push({ title: "Senior " + targetRole, company: "WebFuture", match: 78 })
  }

  // Build HTML content
  let html = `
    <div class="skill-analysis">
      <div class="skill-category">
        <h4>Technical Skills</h4>
        <div class="skill-bars">
  `

  // Add technical skills
  skills.technical.forEach((skill) => {
    html += `
      <div class="skill-bar">
        <div class="skill-name">${skill.name}</div>
        <div class="skill-progress-bg">
          <div class="skill-progress" style="width: 0%" data-width="${skill.level}%"></div>
        </div>
        <div class="skill-percentage">${skill.level}%</div>
      </div>
    `
  })

  html += `
        </div>
      </div>
      <div class="skill-category">
        <h4>Soft Skills</h4>
        <div class="skill-bars">
  `

  // Add soft skills
  skills.soft.forEach((skill) => {
    html += `
      <div class="skill-bar">
        <div class="skill-name">${skill.name}</div>
        <div class="skill-progress-bg">
          <div class="skill-progress" style="width: 0%" data-width="${skill.level}%"></div>
        </div>
        <div class="skill-percentage">${skill.level}%</div>
      </div>
    `
  })

  html += `
        </div>
      </div>
    </div>
    <div class="gap-analysis">
      <h4>Skill Gaps for Your Target Role: ${targetRole}</h4>
      <ul class="gap-list">
  `

  // Add skill gaps
  if (skillGaps.length > 0) {
    skillGaps.forEach((gap) => {
      html += `<li><i data-lucide="alert-circle"></i> ${gap}</li>`
    })
  } else {
    html += `<li><i data-lucide="check-circle"></i> Your skills align well with this role!</li>`
  }

  html += `
      </ul>
    </div>
    <div class="job-matches">
      <h4>Top Job Matches</h4>
      <div class="job-cards">
  `

  // Add job matches
  jobMatches.forEach((job) => {
    html += `
      <div class="job-card">
        <h5>${job.title}</h5>
        <p class="company">${job.company}</p>
        <p class="match">${job.match}% Match</p>
      </div>
    `
  })

  html += `
      </div>
    </div>
    <div class="action-buttons">
      <a href="#" class="btn btn-primary" id="downloadReport">Download Full Report</a>
      <a href="#" class="btn btn-secondary" id="resetAnalysis">Reset Analysis</a>
    </div>
  `

  // Set HTML content
  skillAnalysisContent.innerHTML = html

  // Initialize Lucide icons
  lucide.createIcons({
    icons: {
      "alert-circle": {},
      "check-circle": {},
    },
    nameAttr: "data-lucide",
  })

  // Add event listeners for buttons
  document.getElementById("downloadReport").addEventListener("click", (e) => {
    e.preventDefault()
    downloadAnalysisReport(fileName, targetRole, skills, skillGaps, jobMatches)
  })

  document.getElementById("resetAnalysis").addEventListener("click", (e) => {
    e.preventDefault()
    resetAnalysis()
  })
}

// Animate skill bars
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress")
  skillBars.forEach((bar) => {
    const targetWidth = bar.getAttribute("data-width")
    setTimeout(() => {
      bar.style.width = targetWidth
    }, 100)
  })
}

// Download analysis report
function downloadAnalysisReport(fileName, targetRole, skills, skillGaps, jobMatches) {
  // Generate report content
  const date = new Date().toLocaleDateString()

  let reportContent = `TALENT GAP SKILL ANALYSIS REPORT
Generated on: ${date}
Resume analyzed: ${fileName}

TARGET ROLE: ${targetRole}

TECHNICAL SKILLS ASSESSMENT
---------------------------
`

  skills.technical.forEach((skill) => {
    reportContent += `${skill.name}: ${skill.level}% - ${skill.level > 80 ? "Advanced" : skill.level > 60 ? "Intermediate to Advanced" : "Intermediate"}\n`
  })

  reportContent += `
SOFT SKILLS ASSESSMENT
----------------------
`

  skills.soft.forEach((skill) => {
    reportContent += `${skill.name}: ${skill.level}% - ${skill.level > 85 ? "Excellent" : skill.level > 70 ? "Strong" : "Good"}\n`
  })

  reportContent += `
SKILL GAPS FOR TARGET ROLE: ${targetRole}
----------------------------------------------------
`

  if (skillGaps.length > 0) {
    skillGaps.forEach((gap, index) => {
      reportContent += `${index + 1}. ${gap}\n`
    })
  } else {
    reportContent += "Your skills align well with this role!\n"
  }

  reportContent += `
TOP JOB MATCHES
--------------
`

  jobMatches.forEach((job, index) => {
    reportContent += `${index + 1}. ${job.title} at ${job.company} (${job.match}% Match)\n`
  })

  reportContent += `
PERSONALIZED DEVELOPMENT PLAN
----------------------------
1. Short-term (1-3 months):
   - Focus on addressing the identified skill gaps
   - Complete relevant online courses or certifications
   
2. Medium-term (3-6 months):
   - Build portfolio projects showcasing your skills
   - Contribute to open-source projects in your field
   
3. Long-term (6-12 months):
   - Network with professionals in your target role
   - Apply for positions that match your skill profile

For personalized coaching and more detailed analysis, upgrade to TalentGap Premium.

© 2025 TalentGap - Your Career Acceleration Partner
`

  // Create a blob with the content
  const blob = new Blob([reportContent], { type: "text/plain" })

  // Create a download link
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "TalentGap_Skill_Analysis.txt"

  // Trigger download
  document.body.appendChild(a)
  a.click()

  // Clean up
  setTimeout(() => {
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }, 0)

  // Show toast notification
  showToast("success", "Report Downloaded", "Your analysis report has been downloaded successfully.")
}

// Reset analysis
function resetAnalysis() {
  // Hide results area
  resultsArea.style.display = "none"

  // Reset file input
  fileUpload.value = ""

  // Scroll back to upload area
  uploadArea.scrollIntoView({ behavior: "smooth" })

  // Show toast notification
  showToast("info", "Analysis Reset", "You can now upload a new resume for analysis.")
}

// Chatbot Functionality
const chatbotToggle = document.getElementById("chatbotToggle")
const chatbotContainer = document.getElementById("chatbotContainer")
const chatbotClose = document.getElementById("chatbotClose")
const chatbotMessages = document.getElementById("chatbotMessages")
const chatbotInput = document.getElementById("chatbotInput")
const chatbotSend = document.getElementById("chatbotSend")

if (chatbotToggle) {
  chatbotToggle.addEventListener("click", () => {
    chatbotContainer.style.display = "block"
  })
}

if (chatbotClose) {
  chatbotClose.addEventListener("click", () => {
    chatbotContainer.style.display = "none"
    // Clear chat history when closing
    clearChatHistory()
  })
}

function clearChatHistory() {
  // Keep only the initial greeting message
  while (chatbotMessages.children.length > 1) {
    chatbotMessages.removeChild(chatbotMessages.lastChild)
  }

  // Clear input field
  chatbotInput.value = ""
}

function sendMessage() {
  const message = chatbotInput.value.trim()
  if (message === "") return

  // Add user message
  addMessage(message, "user")
  chatbotInput.value = ""

  // Simulate bot response
  setTimeout(() => {
    const botResponse = getBotResponse(message)
    addMessage(botResponse, "bot")
  }, 1000)
}

function getBotResponse(message) {
  // Convert message to lowercase for easier matching
  const lowerMessage = message.toLowerCase()

  // Advanced responses based on keywords
  if (lowerMessage.includes("resume") || lowerMessage.includes("cv")) {
    return "You can upload your resume in PDF, DOC, or DOCX format. Our AI will analyze your skills and experience to provide personalized recommendations."
  } else if (lowerMessage.includes("skill") && lowerMessage.includes("gap")) {
    return "Our AI identifies skill gaps by comparing your resume with job requirements from thousands of job postings. We then recommend courses and resources to help you bridge those gaps."
  } else if (lowerMessage.includes("job") && (lowerMessage.includes("match") || lowerMessage.includes("recommend"))) {
    return "TalentGap matches you with jobs based on your current skills and potential. We consider not just what you know, but what you could quickly learn to maximize your opportunities."
  } else if (lowerMessage.includes("course") || lowerMessage.includes("learn") || lowerMessage.includes("training")) {
    return "We partner with leading education platforms to recommend courses that will help you develop the skills needed for your target roles. These recommendations are personalized based on your learning style and career goals."
  } else if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("subscription")) {
    return "TalentGap offers a free basic plan with limited features. Our premium plan at $19.99/month gives you full access to all features including unlimited skill gap analyses and personalized learning paths."
  } else if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
    return "Hello! Welcome to TalentGap. How can I help you today?"
  } else if (lowerMessage.includes("thank")) {
    return "You're welcome! Is there anything else I can help you with?"
  } else if (lowerMessage.includes("contact") || lowerMessage.includes("support") || lowerMessage.includes("help")) {
    return "You can reach our support team at support@talentgap.com or through the contact form on our website. We typically respond within 24 hours."
  } else if (lowerMessage.includes("developer") || lowerMessage.includes("lakshay")) {
    return "TalentGap was developed by Lakshay Dhoundiyal, a full-stack developer and AI enthusiast. You can learn more about him in the 'About the Developer' section of our website."
  } else if (lowerMessage.includes("download") || lowerMessage.includes("report")) {
    return "You can download a detailed skill analysis report after uploading your resume. The report includes personalized recommendations and a career development roadmap."
  } else {
    // Default responses if no keywords match
    const defaultResponses = [
      "Thanks for your message! Our team will help you bridge your skill gap.",
      "That's an interesting question. TalentGap uses advanced AI to analyze your resume and identify opportunities for growth.",
      "I'd be happy to help you with that. Is there anything specific about TalentGap you'd like to know?",
      "TalentGap has helped thousands of professionals advance their careers through targeted skill development.",
      "Our AI analyzes thousands of job postings daily to identify the most in-demand skills in your field.",
    ]
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }
}

function addMessage(text, sender) {
  const messageDiv = document.createElement("div")
  messageDiv.className = `message ${sender}`

  const messageContent = document.createElement("div")
  messageContent.className = "message-content"

  const messageParagraph = document.createElement("p")
  messageParagraph.textContent = text

  messageContent.appendChild(messageParagraph)
  messageDiv.appendChild(messageContent)
  chatbotMessages.appendChild(messageDiv)

  // Scroll to bottom
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight
}

if (chatbotSend) {
  chatbotSend.addEventListener("click", sendMessage)
}

if (chatbotInput) {
  chatbotInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  })
}

// Initialize any components that need it after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Hide animation classes until they come into view
  document.querySelectorAll(".animate__animated").forEach((el) => {
    el.style.visibility = "hidden"
  })

  // Check for animations on scroll
  window.addEventListener("scroll", animateOnScroll)

  // Initial check for animations
  animateOnScroll()
})

// Animate elements when they come into view
const animateOnScroll = () => {
  const elements = document.querySelectorAll(".animate__animated")

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top
    const screenPosition = window.innerHeight / 1.2

    if (elementPosition < screenPosition) {
      const animationClass = element.classList[1]
      if (animationClass && animationClass.includes("animate__")) {
        element.style.visibility = "visible"
        element.style.animationDelay = element.style.animationDelay || "0s"
      }
    }
  })
}

// Chatbot close on scroll for desktop only
window.addEventListener("scroll", () => {
  const chatbotContainer = document.getElementById("chatbotContainer")

  // Only close on desktop (screen width > 768px)
  if (chatbotContainer && chatbotContainer.style.display === "block" && window.innerWidth > 768) {
    const scrollPosition = window.pageYOffset

    // Close chatbot if user scrolls more than 100px
    if (scrollPosition > 100) {
      chatbotContainer.style.display = "none"
    }
  }
})

// Declare lucide variable
const lucide = window.lucide
