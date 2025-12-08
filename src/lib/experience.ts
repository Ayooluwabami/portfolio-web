// Calculate years of experience from July 2023
export function getYearsOfExperience(): number {
  const startDate = new Date(2023, 6, 1); // July 2023 (month is 0-indexed)
  const now = new Date();
  
  const diffInMs = now.getTime() - startDate.getTime();
  const diffInYears = diffInMs / (1000 * 60 * 60 * 24 * 365.25);
  
  return Math.floor(diffInYears);
}

export function getYearsOfExperienceLabel(): string {
  const years = getYearsOfExperience();
  return `${years}+`;
}
