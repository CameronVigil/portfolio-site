<script setup lang="ts">
  import AsciiAnimation from '../components/AsciiAnimation.vue'

  interface Project {
    name: string
    description: string
    url: string
    tech: string[]
  }

  // Replace with your actual projects
  const projects: Project[] = [
    {
      name: 'Music Stats',
      description: 'Display recent Apple music listening history using Apple Music API integration.',
      url: 'https://music-stats-7y55.vercel.app/',
      tech: ['React', 'Node.js', 'Vercel']
    },
    {
      name: 'Sound Design Recipes',
      description: 'Transcribe Tiktok videos about sound design into a readable format using AI.',
      url: 'https://github.com/CameronVigil/sound-design-recipes',
      tech: ['Angular']
    }
  ]

  const personalInfo = {
    name: 'CAMERON VIGIL',
    title: 'Full Stack Developer',
    email: 'cameronvigil4@gmail.com',
    github: 'https://github.com/CameronVigil',
    linkedin: 'https://www.linkedin.com/in/cameron-vigil/'
  }
  import { RouterView } from 'vue-router'
</script>

<template>
  <div class="portfolio-container">
    <!-- Left Panel: ASCII Animation (40%) -->
    <div class="left-panel">
      <AsciiAnimation />
    </div>

    <!-- Right Panel: Content (60%) -->
    <div class="right-panel">
      <div class="content">
        <!-- Header Section -->
        <header class="header">
          <h1 class="name">{{ personalInfo.name }}</h1>
          <p class="title">{{    personalInfo.title }}</p>
        </header>


        <!-- Projects Section -->
        <section class="projects">
          <h2 class="section-title">PROJECTS</h2>
          <div class="project-list">
            <a v-for="project in projects"
               :key="project.name"
               :href="project.url"
               target="_blank"
               rel="noopener noreferrer"
               class="project-item">
              <div class="project-header">
                <h3 class="project-name">{{ project.name }}</h3>
                <span class="arrow">→</span>
              </div>
              <p class="project-description">{{ project.description }}</p>
              <div class="tech-stack">
                <span v-for="tech in project.tech" :key="tech" class="tech-tag">
                  {{ tech }}
                </span>
              </div>
            </a>
          </div>
        </section>

        <!-- Contact Section -->
        <section class="contact">
          <h2 class="section-title">CONTACT</h2>
          <div class="contact-links">
            <a :href="`mailto:${personalInfo.email}`" class="contact-link">
              EMAIL
            </a>
            <a :href="personalInfo.github" target="_blank" rel="noopener noreferrer" class="contact-link">
              GITHUB
            </a>
            <a :href="personalInfo.linkedin" target="_blank" rel="noopener noreferrer" class="contact-link">
              LINKEDIN
            </a>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style >
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box; /* Optional, but good practice */
  }

  body, html {
    margin: 0;
    padding: 0;
  }

  .portfolio-container {
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    
  }

  /* Left Panel - ASCII Animation */
  .left-panel {
    width: 40%;
    height: 100vh;
    position: relative;
    border-right: 2px solid #333;
    background: #000;
  }

  /* Right Panel - Content */
  .right-panel {
    width: 60%;
    height: 100vh;
    background: #020e01;
    color: #fff;
    overflow-y: auto;
    position: relative;
  }

  .content {
    max-width: 800px;
    padding: 80px 60px;
    margin: 0 auto;
  }

  /* Header */
  .header {
    margin-bottom: 80px;
    border-bottom: 1px solid #333;
    padding-bottom: 40px;
  }

  .name {
    font-size: 48px;
    font-weight: 400;
    letter-spacing: -1px;
    margin: 0 0 12px 0;
    font-family: 'Segoe UI', monospace;
    background: linear-gradient(135deg, #ffffff 0%, #a8ff78 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 0 20px rgba(168, 255, 120, 0.3);
    position: relative;
    display: inline-block;
    animation: breathe 4s ease-in-out infinite;
  }
  @keyframes breathe {
    0%, 100% {
      text-shadow: 0 0 20px rgba(168, 255, 120, 0.3);
    }

    50% {
      text-shadow: 0 0 30px rgba(168, 255, 120, 0.6);
    }
  }
  .title {
    font-size: 18px;
    color: #999;
    margin: 0;
    font-family: 'Segoe UI', monospace;
    letter-spacing: 1px;
  }

  /* Sections */
  .section-title {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 3px;
    color: #666;
    margin: 0 0 30px 0;
    font-family: 'Segoe UI', monospace;
  }

  /* Projects */
  .projects {
    margin-bottom: 80px;
  }

  .project-list {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .project-item {
    display: block;
    padding: 24px;
    border: 1px solid #222;
    text-decoration: none;
    color: #fff;
    transition: all 0.3s ease;
  }

    .project-item:hover {
      border-color: #fff;
      transform: translateX(4px);
      background: #0a0a0a;
    }

  .project-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .project-name {
    font-size: 20px;
    font-weight: 400;
    margin: 0;
    font-family: 'Courier New', monospace;
  }

  .arrow {
    font-size: 20px;
    transition: transform 0.3s ease;
  }

  .project-item:hover .arrow {
    transform: translateX(4px);
  }

  .project-description {
    font-size: 14px;
    line-height: 1.6;
    color: #999;
    margin: 0 0 16px 0;
    font-family: 'Segoe UI', monospace;
  }

  .tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .tech-tag {
    font-size: 11px;
    padding: 4px 10px;
    border: 1px solid #333;
    color: #666;
    font-family: 'Courier New', monospace;
    letter-spacing: 0.5px;
  }

  /* Contact */
  .contact {
    margin-bottom: 40px;
  }

  .contact-links {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .contact-link {
    display: inline-block;
    color: #fff;
    text-decoration: none;
    font-size: 16px;
    font-family: 'Segoe UI', monospace;
    letter-spacing: 2px;
    transition: all 0.3s ease;
    position: relative;
    padding-left: 20px;
  }

    .contact-link::before {
      content: '>';
      position: absolute;
      left: 0;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .contact-link:hover {
      color: #fff;
      padding-left: 24px;
    }

      .contact-link:hover::before {
        opacity: 1;
      }

  /* Scrollbar styling */
  .right-panel::-webkit-scrollbar {
    width: 8px;
  }

  .right-panel::-webkit-scrollbar-track {
    background: #000;
  }

  .right-panel::-webkit-scrollbar-thumb {
    background: #333;
  }

    .right-panel::-webkit-scrollbar-thumb:hover {
      background: #555;
    }

  /* Responsive */
  @media () {
    .portfolio-container {
      flex-direction: column;
    }

    .left-panel {
      width: 100vw;
      height: 40vh;
      border-right: none;
      border-bottom: 2px solid #333;
    }

    .right-panel {
      width: 100vw;
      height: 60vh;
    }

    .content {
      padding: 40px 30px;
    }

    .name {
      font-size: 36px;
    }
  }
</style>
