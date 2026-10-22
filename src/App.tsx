import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, Component, type ReactNode, type ErrorInfo } from 'react';
import './index.css';
import Navigation from './components/Navigation';
import ScrollProgress from './components/ScrollProgress';
import CommandPalette from './components/CommandPalette';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import PageMeta from './components/PageMeta';
import Terminal from './components/Terminal';
import KeyboardShortcuts from './components/KeyboardShortcuts';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Skills = lazy(() => import('./pages/Skills'));
const CV = lazy(() => import('./pages/CV'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));
const CaseStudy = lazy(() => import('./pages/CaseStudy'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
  </div>
);

interface ErrorBoundaryState { hasError: boolean }
class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };
  static getDerivedStateFromError(): ErrorBoundaryState { return { hasError: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error('[ErrorBoundary]', error, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center text-center px-6">
          <div>
            <p className="text-lg font-semibold mb-2">Something went wrong.</p>
            <button className="btn-primary text-sm" onClick={() => this.setState({ hasError: false })}>
              Try again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const App = () => (
  <Router>
    <ScrollToTop />
    <PageMeta />
    <div className="min-h-screen bg-background text-foreground">
      {/* Grain overlay — subtle noise that breaks digital flatness */}
      <div className="noise-overlay" aria-hidden="true" />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Navigation />
      <CommandPalette />
      <Terminal />
      <KeyboardShortcuts />
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <main id="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/cv" element={<CV />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/projects/:slug" element={<CaseStudy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </Suspense>
      </ErrorBoundary>
      <Footer />
    </div>
  </Router>
);

export default App;
