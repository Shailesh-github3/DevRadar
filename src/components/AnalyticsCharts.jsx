import { useMemo } from 'react';
import LanguagePieChart from './LanguagePieChart';
import TopReposBarChart from './TopReposBarChart';
import ActivityLineChart from './ActivityLineChart';
import {
  getLanguageDistribution,
  getTopReposByStars,
  getCreationTimeline,
} from '../utils/analyticsUtils';

/**
 * AnalyticsCharts Component
 * 
 * Purpose: Container that transforms raw repository data into chart-ready formats
 * and renders the three visualization components.
 * 
 * Analogy: A Service Facade that applies three different transformations (like SQL queries)
 * and passes the results to three separate View templates.
 * 
 * @param {Array} repos - Array of repository objects from the API.
 */
function AnalyticsCharts({ repos }) {
  // Memoize each transformation to prevent unnecessary recalculations.
  // Only recompute when the 'repos' array reference changes.
  const languageData = useMemo(() => getLanguageDistribution(repos), [repos]);
  const topReposData = useMemo(() => getTopReposByStars(repos), [repos]);
  const timelineData = useMemo(() => getCreationTimeline(repos), [repos]);

  return (
    <>
      <LanguagePieChart data={languageData} />
      <TopReposBarChart data={topReposData} />
      <ActivityLineChart data={timelineData} />
    </>
  );
}

export default AnalyticsCharts;