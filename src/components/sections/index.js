import { Paper } from "@mui/material";
import React, { useMemo, useState } from "react";
import { FiArrowUpRight, FiExternalLink } from "react-icons/fi";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedinIn,
  FaPhoneAlt,
} from "react-icons/fa";
import "./style.css";

const CONTACT_EMAIL = "vipin.native@gmail.com";

const projects = [
  {
    title: "ClearMatch / HealthPlanOne",
    blurb:
      "Medicare compare, enroll, and member-portal work for HealthPlanOne's ClearMatch platform — public plan shopping plus signed-in coverage, benefits, and member tools.",
    stack: ["React", "Redux", ".NET", "Python", "Django"],
    liveUrl: "https://myclearmatch.com/",
  },
  {
    title: "Personal Portfolio",
    blurb:
      "This site: a single-page React portfolio with section navigation, a downloadable resume, and a validated contact flow.",
    stack: ["React", "MUI", "CSS"],
    githubUrl: "https://github.com/vipin4771234/vipindev",
    liveUrl: "https://vipin4771234.github.io/vipindev",
  },
];

const strengths = [
  "Full-stack features across React, React Native, and .NET APIs",
  "Responsive web and mobile UIs with reusable component structure",
  "REST integrations, auth-aware flows, and production-minded delivery",
];

const skillGroups = [
  {
    title: "Frontend & Mobile",
    items: ["React", "React Native", "Redux", "JavaScript", "TypeScript", "HTML", "CSS"],
  },
  {
    title: "Backend",
    items: [".NET", "ASP.NET Core", "C#", "Python", "Django", "REST APIs"],
  },
  {
    title: "Data & Workflow",
    items: ["SQL Server", "MySQL", "GitHub", "AWS", "Azure", "Docker"],
  },
];

const experienceItems = [
  {
    period: "Feb 2026 - Present",
    title: "Full Stack Developer",
    subtitle: "Info-X Software Technology Pvt. Ltd.",
    points: [
      "Building customer-facing React features for a logistics platform, including tracking, orders, invoicing, and reporting.",
      "Maintaining .NET/C# REST APIs and integrating SMS and payment services for shipment updates and invoice payments.",
    ],
  },
  {
    period: "Apr 2024 - Feb 2026",
    title: "Full Stack Developer",
    subtitle: "Jupiter Orison Pvt Ltd, Gurugram",
    points: [
      "Built Repair India, a service marketplace, using React Native, React, and ASP.NET Core APIs.",
      "Owned booking, scheduling, provider allocation, ratings, and location-based matching end to end.",
    ],
  },
  {
    period: "Feb 2023 - Mar 2024",
    title: "Software Developer",
    subtitle: "Websultanate Software Tech., Lucknow",
    points: [
      "Shipped Pool Tester, a React Native pool-maintenance app, to the Apple App Store.",
      "Built React frontends and real-time Socket chat for the Scrooge gaming site.",
    ],
  },
];

const educationItems = [
  {
    period: "2019 - 2022",
    title: "Bachelor of Computer Application",
    subtitle: "University of Allahabad",
    points: [
      "Completed a BCA with a focus on software and web development fundamentals.",
      "Applied coursework through personal and professional product work in JavaScript, React, and .NET.",
    ],
  },
];

const contactLinks = [
  {
    label: "Email",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    icon: <FaEnvelope />,
  },
  {
    label: "Phone",
    value: "+91 7905643535",
    href: "tel:+917905643535",
    icon: <FaPhoneAlt />,
  },
  {
    label: "GitHub",
    value: "github.com/vipin4771234",
    href: "https://github.com/vipin4771234",
    icon: <FaGithub />,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/vipin-vishwakarma-6ba2111b3",
    href: "https://www.linkedin.com/in/vipin-vishwakarma-6ba2111b3",
    icon: <FaLinkedinIn />,
  },
];

const blogPosts = [
  {
    title: "Designing a Strong Portfolio Hero",
    excerpt:
      "Notes on combining branding, navigation, and clear personal positioning above the fold.",
  },
  {
    title: "What Makes a Reusable React Section",
    excerpt:
      "A short walkthrough of the patterns that keep simple portfolio pages easy to extend over time.",
  },
];

const initialFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const buildMailtoHref = ({ name, email, subject, message }) => {
  const fullSubject = subject || `Portfolio inquiry from ${name}`;
  const fullBody = [
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    message,
  ].join("\n");

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    fullSubject
  )}&body=${encodeURIComponent(fullBody)}`;
};

const validateForm = ({ name, email, subject, message }) => {
  const errors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!emailPattern.test(email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!subject.trim()) {
    errors.subject = "Please add a subject.";
  }

  if (!message.trim()) {
    errors.message = "Please write a short message.";
  } else if (message.trim().length < 20) {
    errors.message = "Please add a little more detail to your message.";
  }

  return errors;
};

const renderTimelineBlock = (items) => {
  return items.map((item) => (
    <article key={`${item.title}-${item.period}`} className="timelineItem">
      <p className="timelinePeriod">{item.period}</p>
      <p className="timelineTitle">{item.title}</p>
      <p className="timelineSubtitle">{item.subtitle}</p>
      <div className="timelinePointList">
        {item.points.map((point) => (
          <p key={point} className="timelinePoint">
            {point}
          </p>
        ))}
      </div>
    </article>
  ));
};

const Sections = ({ cvUrl }) => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState({});
  const [submitState, setSubmitState] = useState("idle");
  const [preparedDraftHref, setPreparedDraftHref] = useState("");

  const formSuccessMessage = useMemo(() => {
    if (submitState !== "success") {
      return "";
    }

    return "Your message is ready. Open your email app to send the prepared draft.";
  }, [submitState]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    setFormErrors((currentErrors) => {
      if (!currentErrors[name]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[name];
      return nextErrors;
    });

    if (submitState !== "idle") {
      setSubmitState("idle");
    }

    if (preparedDraftHref) {
      setPreparedDraftHref("");
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const errors = validateForm(formValues);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setSubmitState("error");
      setPreparedDraftHref("");
      return;
    }

    setFormErrors({});
    setPreparedDraftHref(buildMailtoHref(formValues));
    setSubmitState("success");
  };

  return (
    <div className="sectionsLayout">
      <Paper className="sectionCard" component="section" id="about" elevation={2}>
        <div className="sectionHeader">
          <p className="sectionEyebrow">ABOUT</p>
          <h2 className="sectionTitle">About Me</h2>
        </div>
        <div className="aboutGrid">
          <div>
            <p className="sectionCopy">
              I&apos;m Vipin Vishwakarma, a full-stack developer with 3+ years
              of experience building web and mobile products in React, React
              Native, .NET, Python, and Django.
            </p>
            <p className="sectionCopy">
              Recent work includes Medicare plan compare, enrollment, and
              member-portal features for HealthPlanOne&apos;s ClearMatch
              platform, along with logistics, marketplace, and mobile apps.
            </p>
            <div className="strengthList">
              {strengths.map((item) => (
                <div key={item} className="strengthItem">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="subsectionHeader">
              <p className="subsectionEyebrow">SKILLS</p>
              <h3 className="subsectionTitle">Core Stack & Tools</h3>
            </div>
            <div className="skillGroupList">
              {skillGroups.map((group) => (
                <div key={group.title} className="skillGroupCard">
                  <p className="skillGroupTitle">{group.title}</p>
                  <div className="tagList compactTagList">
                    {group.items.map((item) => (
                      <span key={item} className="tag">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Paper>

      <Paper
        className="sectionCard"
        component="section"
        id="portfolio"
        elevation={2}
      >
        <div className="sectionHeader">
          <p className="sectionEyebrow">PORTFOLIO</p>
          <h2 className="sectionTitle">Featured Work</h2>
        </div>
        <div className="projectGrid">
          {projects.map((project) => (
            <article key={project.title} className="projectCard">
              <p className="projectTitle">{project.title}</p>
              <p className="projectBlurb">{project.blurb}</p>
              <div className="tagList">
                {project.stack.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="projectLinkRow">
                {project.githubUrl ? (
                  <a
                    className="inlineActionLink"
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub <FiArrowUpRight />
                  </a>
                ) : null}
                {project.liveUrl ? (
                  <a
                    className="inlineActionLink"
                    href={project.liveUrl}
                    target={project.liveUrl.startsWith("http") ? "_blank" : undefined}
                    rel={project.liveUrl.startsWith("http") ? "noreferrer" : undefined}
                  >
                    Live Site <FiExternalLink />
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </Paper>

      <Paper className="sectionCard" component="section" id="resume" elevation={2}>
        <div className="sectionHeader">
          <p className="sectionEyebrow">RESUME</p>
          <h2 className="sectionTitle">Resume Snapshot</h2>
        </div>
        <div className="resumeGrid">
          <div className="resumeBlock">
            <div className="subsectionHeader">
              <p className="subsectionEyebrow">EXPERIENCE</p>
              <h3 className="subsectionTitle">Experience Timeline</h3>
            </div>
            <div className="timelineList">{renderTimelineBlock(experienceItems)}</div>
          </div>
          <div className="resumeBlock">
            <div className="subsectionHeader">
              <p className="subsectionEyebrow">EDUCATION</p>
              <h3 className="subsectionTitle">Education & Growth</h3>
            </div>
            <div className="timelineList">{renderTimelineBlock(educationItems)}</div>
            <div className="resumeActions">
              <a
                className="resumeLink"
                href={cvUrl}
                download="Vipin_Vishwakarma_Resume.pdf"
              >
                Download Full CV <FiArrowUpRight />
              </a>
            </div>
          </div>
        </div>
      </Paper>

      <Paper
        className="sectionCard"
        component="section"
        id="contact"
        elevation={2}
      >
        <div className="sectionHeader">
          <p className="sectionEyebrow">CONTACT</p>
          <h2 className="sectionTitle">Let&apos;s Connect</h2>
        </div>
        <div className="contactSectionLayout">
          <div className="contactGrid">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                className="contactCard"
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              >
                <span className="contactIcon">{link.icon}</span>
                <span className="contactLabel">{link.label}</span>
                <span className="contactValue">{link.value}</span>
              </a>
            ))}
          </div>

          <div className="contactFormWrap">
            <div className="subsectionHeader contactFormHeader">
              <p className="subsectionEyebrow">MESSAGE</p>
              <h3 className="subsectionTitle">Send a Project Inquiry</h3>
            </div>
            <form className="contactForm" onSubmit={handleFormSubmit} noValidate>
              <div className="formGrid">
                <label className="fieldBlock" htmlFor="name">
                  <span className="fieldLabel">Name</span>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className={`fieldInput ${formErrors.name ? "fieldError" : ""}`}
                    value={formValues.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                  />
                  {formErrors.name ? (
                    <span className="fieldMessage">{formErrors.name}</span>
                  ) : null}
                </label>
                <label className="fieldBlock" htmlFor="email">
                  <span className="fieldLabel">Email</span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`fieldInput ${formErrors.email ? "fieldError" : ""}`}
                    value={formValues.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                  />
                  {formErrors.email ? (
                    <span className="fieldMessage">{formErrors.email}</span>
                  ) : null}
                </label>
              </div>

              <label className="fieldBlock" htmlFor="subject">
                <span className="fieldLabel">Subject</span>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  className={`fieldInput ${formErrors.subject ? "fieldError" : ""}`}
                  value={formValues.subject}
                  onChange={handleInputChange}
                  placeholder="What would you like to build?"
                />
                {formErrors.subject ? (
                  <span className="fieldMessage">{formErrors.subject}</span>
                ) : null}
              </label>

              <label className="fieldBlock" htmlFor="message">
                <span className="fieldLabel">Message</span>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  className={`fieldInput fieldTextarea ${
                    formErrors.message ? "fieldError" : ""
                  }`}
                  value={formValues.message}
                  onChange={handleInputChange}
                  placeholder="Share a little about your project, timeline, or goals."
                />
                {formErrors.message ? (
                  <span className="fieldMessage">{formErrors.message}</span>
                ) : null}
              </label>

              <div className="formFooter">
                <button type="submit" className="primaryButton">
                  PREPARE MESSAGE
                </button>
                <p
                  className={`formStatus ${
                    submitState === "success"
                      ? "successStatus"
                      : submitState === "error"
                      ? "errorStatus"
                      : ""
                  }`}
                  aria-live="polite"
                >
                  {submitState === "success"
                    ? formSuccessMessage
                    : submitState === "error"
                    ? "Please fix the highlighted fields and try again."
                    : "Messages are prepared as an email draft using your default mail app."}
                </p>
              </div>

              {preparedDraftHref ? (
                <a className="inlineActionLink draftLink" href={preparedDraftHref}>
                  Open Email Draft <FiArrowUpRight />
                </a>
              ) : null}
            </form>
          </div>
        </div>
      </Paper>

      <Paper className="sectionCard" component="section" id="blog" elevation={2}>
        <div className="sectionHeader">
          <p className="sectionEyebrow">BLOG</p>
          <h2 className="sectionTitle">Writing & Notes</h2>
        </div>
        <div className="blogGrid">
          {blogPosts.map((post) => (
            <article key={post.title} className="blogCard">
              <p className="blogMeta">Coming Soon</p>
              <p className="blogTitle">{post.title}</p>
              <p className="blogExcerpt">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </Paper>
    </div>
  );
};

export default Sections;
