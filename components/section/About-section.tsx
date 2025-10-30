"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Award,
  BookOpen,
  Briefcase,
  Building,
  Calendar,
  ChevronRight,
  Clock,
  Code,
  Download,
  GraduationCap,
  Mail,
  MapPin,
  Star,
  Target,
  Users,
} from "lucide-react";

export function AboutSection() {
  const personalInfo = [
    { icon: MapPin, label: "Location", value: "San Francisco, CA" },
    { icon: Mail, label: "Email", value: "hello@johndoe.dev" },
    { icon: Calendar, label: "Birthday", value: "March 15, 1995" },
    { icon: Briefcase, label: "Freelance", value: "Available" },
  ];

  const stats = [
    { number: "50+", label: "Projects Completed", icon: Code },
    { number: "3+", label: "Years Experience", icon: Award },
    { number: "25+", label: "Happy Clients", icon: Users },
    { number: "15+", label: "Technologies", icon: BookOpen },
  ];

  const experiences = [
    {
      company: "TechCorp Inc.",
      position: "Senior Full Stack Developer",
      duration: "2022 - Present",
      description: [
        "Lead development of customer-facing web applications using React and Node.js",
        "Mentored 3 junior developers and conducted code reviews",
        "Improved application performance by 40% through optimization techniques",
        "Collaborated with UX team to implement responsive designs",
      ],
      technologies: ["React", "Node.js", "TypeScript", "MongoDB", "AWS"],
      type: "full-time",
    },
    {
      company: "StartupXYZ",
      position: "Full Stack Developer",
      duration: "2020 - 2022",
      description: [
        "Developed and maintained multiple client projects using modern web technologies",
        "Implemented RESTful APIs and integrated third-party services",
        "Worked closely with clients to gather requirements and deliver solutions",
        "Participated in agile development processes and sprint planning",
      ],
      technologies: ["Vue.js", "Express", "PostgreSQL", "Docker", "Firebase"],
      type: "full-time",
    },
    {
      company: "Freelance",
      position: "Web Developer",
      duration: "2019 - 2020",
      description: [
        "Built custom websites and web applications for various clients",
        "Specialized in e-commerce solutions and portfolio websites",
        "Managed project timelines and client communications",
        "Provided ongoing maintenance and support services",
      ],
      technologies: ["JavaScript", "PHP", "WordPress", "CSS3", "HTML5"],
      type: "freelance",
    },
  ];

  const education = [
    {
      year: "2018-2020",
      degree: "Master of Science in Computer Science",
      institution: "Stanford University",
      grade: "GPA: 3.8/4.0",
      description:
        "Specialized in Web Technologies and Distributed Systems. Thesis on 'Optimizing React Applications for Performance'.",
      achievements: [
        "Graduated with Honors",
        "Research Assistant",
        "ACM Chapter President",
      ],
    },
    {
      year: "2014-2018",
      degree: "Bachelor of Science in Software Engineering",
      institution: "MIT",
      grade: "GPA: 3.9/4.0",
      description:
        "Focus on Software Development Methodologies and Database Systems. Minor in Business Administration.",
      achievements: [
        "Summa Cum Laude",
        "Dean's List All Semesters",
        "Hackathon Winner 2017",
      ],
    },
  ];

  const skills = [
    {
      category: "Frontend",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express", "Python", "PostgreSQL", "MongoDB"],
    },
    { category: "Tools", items: ["Git", "Docker", "AWS", "Figma", "Jest"] },
  ];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Award className="h-3 w-3 mr-1" />
            About Me
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My Professional Journey
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Passionate full-stack developer with 3+ years of experience creating
            digital solutions that make a difference in people's lives.
          </p>
        </div>

        {/* Main Content - Single Column */}
        <div className="max-w-4xl mx-auto space-y-16">
          {/* About Section */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold">About Me</h3>
            </div>

            {/* Personal Info & Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Info Card */}
              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-semibold text-lg mb-4">
                    Personal Information
                  </h4>
                  <div className="space-y-4">
                    {personalInfo.map((info, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <info.icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">
                            {info.label}
                          </p>
                          <p className="font-medium">{info.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-6" asChild>
                    <a href="/resume.pdf" download>
                      <Download className="h-4 w-4 mr-2" />
                      Download CV
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Stats Card */}
              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-semibold text-lg mb-4">At a Glance</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, index) => (
                      <div
                        key={index}
                        className="text-center p-4 bg-muted/50 rounded-lg"
                      >
                        <stat.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                        <p className="text-2xl font-bold">{stat.number}</p>
                        <p className="text-sm text-muted-foreground">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* About Text */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Hello! I'm John Doe, a passionate full-stack developer with
                    over 3 years of experience in creating digital experiences.
                    My journey in web development started during my computer
                    science studies, and I've been hooked ever since.
                  </p>
                  <p>
                    I specialize in modern JavaScript frameworks like React and
                    Next.js for frontend development, and Node.js with various
                    databases for backend solutions. I'm passionate about
                    writing clean, maintainable code and creating user-friendly
                    applications that solve real-world problems.
                  </p>
                  <p>
                    What drives me is the opportunity to transform complex
                    challenges into elegant, efficient solutions. I believe in
                    continuous learning and staying updated with the latest
                    technologies and best practices in the ever-evolving web
                    development landscape.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Skills Grid */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-center">
                Technical Skills
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {skills.map((skillCategory, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <h5 className="font-semibold mb-4 text-lg text-center">
                        {skillCategory.category}
                      </h5>
                      <div className="space-y-3">
                        {skillCategory.items.map((skill, skillIndex) => (
                          <div
                            key={skillIndex}
                            className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                          >
                            <span className="font-medium">{skill}</span>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <Briefcase className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold">Work Experience</h3>
            </div>

            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="pt-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Building className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="text-xl font-bold">
                              {exp.position}
                            </h4>
                            <p className="text-primary font-semibold">
                              {exp.company}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{exp.duration}</span>
                          <Badge variant="outline" className="ml-2">
                            {exp.type}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h5 className="font-semibold mb-2">
                        Key Responsibilities:
                      </h5>
                      <ul className="space-y-2">
                        {exp.description.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-muted-foreground"
                          >
                            <ChevronRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-semibold mb-2">Technologies Used:</h5>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Career Highlights */}
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold text-lg mb-6 text-center">
                  Career Highlights
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Star className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h5 className="font-semibold mb-2">
                      40% Performance Improvement
                    </h5>
                    <p className="text-sm text-muted-foreground">
                      Optimized application performance at TechCorp
                    </p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h5 className="font-semibold mb-2">Team Leadership</h5>
                    <p className="text-sm text-muted-foreground">
                      Mentored 3 junior developers to senior roles
                    </p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h5 className="font-semibold mb-2">Project Delivery</h5>
                    <p className="text-sm text-muted-foreground">
                      Successfully delivered 50+ projects on time
                    </p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-800 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Target className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h5 className="font-semibold mb-2">Client Satisfaction</h5>
                    <p className="text-sm text-muted-foreground">
                      Maintained 100% client satisfaction rate
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Education Section */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <GraduationCap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold">Education & Qualifications</h3>
            </div>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="pt-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <GraduationCap className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="text-xl font-bold">{edu.degree}</h4>
                            <p className="text-primary font-semibold">
                              {edu.institution}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-muted-foreground mb-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{edu.year}</span>
                          </div>
                          <Badge variant="secondary">{edu.grade}</Badge>
                        </div>
                        <p className="text-muted-foreground mb-4">
                          {edu.description}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-semibold mb-2">Key Achievements:</h5>
                      <div className="flex flex-wrap gap-2">
                        {edu.achievements.map(
                          (achievement, achievementIndex) => (
                            <Badge
                              key={achievementIndex}
                              variant="outline"
                              className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                            >
                              {achievement}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Certifications */}
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold text-lg mb-6 text-center">
                  Certifications & Courses
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">AWS Certified Developer</p>
                      <p className="text-sm text-muted-foreground">
                        Amazon Web Services
                      </p>
                    </div>
                    <Badge variant="secondary">2023</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">React Advanced Patterns</p>
                      <p className="text-sm text-muted-foreground">
                        Frontend Masters
                      </p>
                    </div>
                    <Badge variant="secondary">2022</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Node.js Microservices</p>
                      <p className="text-sm text-muted-foreground">
                        Pluralsight
                      </p>
                    </div>
                    <Badge variant="secondary">2022</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">TypeScript Mastery</p>
                      <p className="text-sm text-muted-foreground">
                        Total TypeScript
                      </p>
                    </div>
                    <Badge variant="secondary">2021</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-none">
              <CardContent className="py-8">
                <h3 className="text-2xl font-bold mb-2">
                  Ready to Work Together?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  I'm always excited to take on new challenges and work with
                  cutting-edge technologies. Let's discuss how we can bring your
                  vision to life.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <a href="#contact">Get In Touch</a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href="#projects">View My Projects</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
