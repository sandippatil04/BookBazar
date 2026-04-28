import { Code, Database, Palette, Users } from 'lucide-react';

const team = [
  {
    name: 'Sandip Patil',
    role: 'Full Stack Developer',
    icon: Code,
    color: 'from-emerald-500 to-teal-500',
    shadow: 'shadow-emerald-200',
    desc: 'Architected the entire application from frontend to backend, ensuring seamless integration across all layers.',
  },
  {
    name: 'Vibhuti Patil',
    role: 'Backend Developer',
    icon: Database,
    color: 'from-blue-500 to-cyan-500',
    shadow: 'shadow-blue-200',
    desc: 'Built robust APIs and database architecture with raw SQL queries for optimal performance and reliability.',
  },
  {
    name: 'Siddhi Patil',
    role: 'Frontend Developer (UI/UX)',
    icon: Palette,
    color: 'from-amber-500 to-orange-500',
    shadow: 'shadow-amber-200',
    desc: 'Crafted the modern, responsive UI with meticulous attention to design details and user experience.',
  },
  {
    name: 'Vansh Patil',
    role: 'Database Manager',
    icon: Database,
    color: 'from-rose-500 to-pink-500',
    shadow: 'shadow-rose-200',
    desc: 'Designed and managed the MySQL database schema, ensuring data integrity and efficient queries.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
            About <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">BookBazar</span>
          </h1>
          <p className="mt-4 text-lg text-gray-500 leading-relaxed">
            BookBazar is a second-hand book marketplace built with a mission to make reading affordable and sustainable. We connect book lovers who want to sell their pre-loved books with readers looking for great deals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            { title: 'Our Mission', desc: 'To make quality books accessible to everyone by creating a trusted marketplace for second-hand books at affordable prices.' },
            { title: 'Sustainability', desc: 'Every book resold is one less book in a landfill. We believe in giving books a second life and reducing waste.' },
            { title: 'Community', desc: 'We are building a community of readers who share, trade, and celebrate the joy of reading together.' },
          ].map((item) => (
            <div key={item.title} className="p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-lg hover:shadow-gray-100/50 transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 text-sm font-medium text-gray-600">
            <Users className="w-4 h-4" />
            Meet Our Team
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">The People Behind BookBazar</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => {
            const Icon = member.icon;
            return (
              <div
                key={member.name}
                className="group p-6 bg-white rounded-2xl border border-gray-100 text-center hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center shadow-lg ${member.shadow} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="mt-5 text-base font-semibold text-gray-900">{member.name}</h3>
                <p className="mt-1 text-sm font-medium text-emerald-600">{member.role}</p>
                <p className="mt-3 text-xs text-gray-400 leading-relaxed">{member.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
