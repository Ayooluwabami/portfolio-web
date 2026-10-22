import HeroSection from '../components/HeroSection';
import GitHubActivity from '../components/GitHubActivity';
import {
  AboutPreview,
  Believe,
  ContactBand,
  Faq,
  Journey,
  Process,
  Promises,
  Recruiters,
  SelectedWork,
  ShippedFor,
  Writing,
  WaysToHelp,
} from '../components/home/HomeSections';

/*
 * Home follows the sequence the reference sites share (Jotem, Bizlift, Thina):
 * who I am → point of view → proof → who it's for → promises → the person → how I ship →
 * how we'd work → live activity → the recruiter shortcut → objections → writing → contact.
 * Bands alternate base / alt; the deep blue is kept for the hero, the promises and the footer.
 */
const Home = () => (
  <>
    <HeroSection />
    <ShippedFor />
    <Believe />
    <SelectedWork />
    <WaysToHelp />
    <Promises />
    <AboutPreview />
    <Process />
    <Journey />
    <GitHubActivity />
    <Recruiters />
    <Faq />
    <Writing />
    <ContactBand />
  </>
);

export default Home;
