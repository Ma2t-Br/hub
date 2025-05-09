// Mock data for the application

export interface CardItem {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

export const cardItems: CardItem[] = [
  {
    id: '1',
    title: 'Monitoring System',
    description: 'Access real-time monitoring dashboards for all your applications and services.',
    image: 'https://images.pexels.com/photos/7101/wood-code-programming-computer-7101.jpg?auto=compress&cs=tinysrgb&w=800',
    link: '/service/monitoring'
  },
  {
    id: '2',
    title: 'User Management',
    description: 'Manage users, permissions and access control for your organization.',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: '/service/users'
  },
  {
    id: '3',
    title: 'Analytics Platform',
    description: 'Dive deep into your data with advanced analytics and visualization tools.',
    image: 'https://images.pexels.com/photos/186464/pexels-photo-186464.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: '/service/analytics'
  },
  {
    id: '4',
    title: 'Security Center',
    description: 'Monitor and manage security features, threats and vulnerabilities.',
    image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: '/service/security'
  },
  {
    id: '5',
    title: 'Deployment Tools',
    description: 'Simplify and automate your deployment pipeline with our integrated tools.',
    image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: '/service/deployment'
  },
  {
    id: '6',
    title: 'Documentation Hub',
    description: 'Access comprehensive documentation for all your projects and services.',
    image: 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: '/service/documentation'
  }
];