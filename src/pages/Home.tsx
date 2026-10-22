import HeroSection from '../components/HeroSection';
import GitHubActivity from '../components/GitHubActivity';
import {
  AboutPreview,
  Believe,
  ContactBand,
  Faq,
  Process,
  Promises,
  Recruiters,
  SelectedWork,
  ShippedFor,
  Writing,
} from '../components/home/HomeSections';

/*
 * Home follows the sequence the reference sites share (Jotem, Bizlift, Thina):
 * who I am → point of view → proof → the person → how I work → the process →
 * the recruiter shortcut → live activity → writing → objections → contact.
 * Bands alternate base / alt, with three deep-blue moments: hero, promises, contact.
 */
const Home = () => (
  <>
    <HeroSection />
    <ShippedFor />
    <Believe />
    <SelectedWork />
    <AboutPreview />
    <Promises />
    <Process />
    <Recruiters />
    <GitHubActivity />
    <Writing />
    <Faq />
    <ContactBand />
  </>
);

export default Home;
