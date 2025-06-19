import React from 'react';

const HomePage = () => {
  return (
    <div className="component-view">
      <div className="component-header">
        <h1 className="component-title">Adobe Spectrum Design System</h1>
        <p className="component-description">
          A design system that provides components and tools to help product teams work more efficiently, 
          and to make Adobe's applications more cohesive.
        </p>
      </div>
      
      <div className="home-content">
        <div className="home-section">
          <h2>Welcome to Spectrum</h2>
          <p>
            Spectrum is Adobe's design system. Spectrum provides components, tools, and guidance 
            to help teams build cohesive, beautiful, and accessible user experiences.
          </p>
          <p>
            This interactive component library showcases the React implementation of Adobe Spectrum 
            components, allowing you to explore their properties, states, and usage patterns.
          </p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>🎨 Design Tokens</h3>
            <p>
              Consistent design tokens ensure visual harmony across all components. 
              Our token system includes colors, typography, spacing, and animation values.
            </p>
          </div>

          <div className="feature-card">
            <h3>♿ Accessibility First</h3>
            <p>
              Every component is built with accessibility in mind, following WCAG guidelines 
              and ensuring inclusive experiences for all users.
            </p>
          </div>

          <div className="feature-card">
            <h3>🌙 Theme Support</h3>
            <p>
              Built-in support for light and dark themes, with seamless switching 
              and consistent visual hierarchy across all components.
            </p>
          </div>

          <div className="feature-card">
            <h3>📱 Responsive Design</h3>
            <p>
              Components adapt gracefully across different screen sizes and input methods, 
              providing optimal experiences on desktop, tablet, and mobile.
            </p>
          </div>

          <div className="feature-card">
            <h3>⚡ Performance Optimized</h3>
            <p>
              Lightweight, efficient components built with modern React patterns 
              and optimized for performance and bundle size.
            </p>
          </div>

          <div className="feature-card">
            <h3>🔧 Developer Experience</h3>
            <p>
              Comprehensive documentation, interactive examples, and TypeScript support 
              make it easy to integrate and customize components.
            </p>
          </div>
        </div>

        <div className="home-section">
          <h2>Component Categories</h2>
          <p>
            Our component library is organized into logical categories to help you find 
            what you need quickly:
          </p>

          <div className="feature-grid">
            <div className="feature-card">
              <h3>Actions</h3>
              <p>Interactive elements that trigger actions or navigation, including buttons and action groups.</p>
            </div>

            <div className="feature-card">
              <h3>Content</h3>
              <p>Components for displaying information and media, such as badges, icons, and progress indicators.</p>
            </div>

            <div className="feature-card">
              <h3>Forms</h3>
              <p>Input controls and form elements for collecting and validating user data.</p>
            </div>

            <div className="feature-card">
              <h3>Navigation</h3>
              <p>Components that help users navigate through content and application flows.</p>
            </div>

            <div className="feature-card">
              <h3>Feedback</h3>
              <p>Components for communicating system status and providing user feedback.</p>
            </div>
          </div>
        </div>

        <div className="home-section">
          <h2>Getting Started</h2>
          <p>
            Explore the component library by selecting items from the sidebar. Each component page includes:
          </p>
          <ul style={{ marginLeft: '24px', lineHeight: '1.8' }}>
            <li>Interactive component preview with live property controls</li>
            <li>Generated code examples based on your configuration</li>
            <li>Comprehensive documentation and usage guidelines</li>
            <li>Accessibility features and keyboard navigation support</li>
          </ul>
        </div>

        <div className="home-section">
          <h2>Design Philosophy</h2>
          <p>
            Spectrum is built on core principles that guide every design decision:
          </p>
          
          <div className="feature-grid">
            <div className="feature-card">
              <h3>Human-Centered</h3>
              <p>Designed for real people creating real things, with empathy and understanding at the core.</p>
            </div>

            <div className="feature-card">
              <h3>Inclusive</h3>
              <p>Built for everyone, ensuring accessibility and usability across diverse users and contexts.</p>
            </div>

            <div className="feature-card">
              <h3>Coherent</h3>
              <p>Consistent patterns and behaviors that create predictable, learnable experiences.</p>
            </div>

            <div className="feature-card">
              <h3>Purposeful</h3>
              <p>Every element serves a clear purpose, eliminating unnecessary complexity and friction.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 