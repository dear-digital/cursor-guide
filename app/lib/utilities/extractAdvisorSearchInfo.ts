export type Advisor = {
  affiliate_link: string;
  company: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
};

export type AdvisorData = {
  data: Array<{
    affiliate_link: string;
    company: string;
    email: string;
    first_name: string;
    id: number;
    last_name: string;
  }>;
};

export type ApiResponse = {
  data: Advisor[];
};

export const extractAdvisorInfo = (advisorData: AdvisorData): Advisor[] => {
  // Validate if data is present
  if (!advisorData || !Array.isArray(advisorData.data)) {
    return [];
  }

  const advisors = advisorData.data.map(
    ({affiliate_link, company, email, first_name, id, last_name}) => ({
      affiliate_link,
      company,
      email,
      first_name,
      id,
      last_name,
    }),
  );

  return advisors;
};
