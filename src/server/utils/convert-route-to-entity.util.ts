const mapping: Record<string, string> = {
  bookings: 'booking',
  companies: 'company',
  freelancers: 'freelancer',
  projects: 'project',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
