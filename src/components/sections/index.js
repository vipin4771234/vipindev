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

const projects = [
  {
    title: "Responsive Portfolio Shell",
    blurb:
      "A single-page React portfolio with smooth section navigation, downloadable resume support, and a mobile-friendly hero layout.",
    stack: ["React", "MUI", "CSS", "Responsive UI"],
    githubUrl: "https://github.com/vipin4771234/vipindev",
    liveUrl: "https://vipin4771234.github.io/vipindev",
  },
  {
    title: "Component-First UI Work",
    blurb:
      "Reusable interface patterns built around cards, navigation, and content sections that scale cleanly as new work is added.",
    stack: ["Frontend", "Reusable UI", "Design Systems"],
    githubUrl: "https://github.com/vipin4771234",
    liveUrl: "#portfolio",
  },
  {
    title: "Conversion-Focused Contact Flow",
    blurb:
      "A cleaner contact area with clear actions, quick identity cues, and a validated form that is ready to connect to a real inbox flow.",
    stack: ["UX", "Interaction", "Forms"],
    githubUrl: "https://github.com/vipin4771234",
    liveUrl: "#contact",
  },
];

const strengths = [
  "Reusable React components and clean page structure",
  "Responsive layouts that stay readable across breakpoints",
  "Dark UI styling with clear hierarchy and calm visual rhythm",
];

const skillGroups = [
  {
    title: "Frontend",
    items: ["React", "JavaScript", "HTML5", "CSS3", "Responsive Design"],
  },
  {
    title: "UI Systems",
    items: ["Material UI", "Reusable Components", "Design Tokens", "Layout"],
  },
  {
    title: "Workflow",
    items: ["GitHub", "Deployment", "Testing Basics", "Code Cleanup"],
  },
];

const experienceItems = [
  {
    period: "2024 - Present",
    title: "Frontend Developer",
    subtitle: "Independent Projects",
    points: [
      "Builds polished React layouts with a focus on clarity, structure, and maintainability.",
      "Turns simple portfolio and landing concepts into responsive interfaces with reusable sections.",
    ],
  },
  {
    period: "2023 - 2024",
    title: "UI Implementation Practice",
    subtitle: "Component-Focused Learning",
    points: [
      "Strengthened frontend fundamentals through repeated layout builds and UI experimentation.",
      "Focused on navigation, content hierarchy, mobile breakpoints, and cleaner interface polish.",
    ],
  },
];

const educationItems = [
  {
    period: "Academic Background",
    title: "Software and Web Development Learning Path",
    subtitle: "Coursework and Hands-On Practice",
    points: [
      "Built a practical foundation in JavaScript, React, and responsive web development.",
      "Applied concepts through personal projects and portfolio-focused implementation work.",
    ],
  },
];

const contactLinks = [
  {
    label: "Email",
    value: "vipin@example.com",
    href: "mailto:vipin@example.com",
    icon: <FaEnvelope />,
  },
  {
    label: "Phone",
    value: "+91 90000 00000",
    href: "tel:+919000000000",
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
    value: "linkedin.com/in/vipin-vishwakarma",
    href: "https://www.linkedin.com/in/vipin-vishwakarma",
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

  return `mailto:vipin@example.com?subject=${encodeURIComponent(
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

const Sections = () => {
  const cvUrl = `${process.env.PUBLIC_URL}/Vipin-Vishwakarma-CV.pdf`;
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
              I&apos;m Vipin Vishwakarma, a software developer focused on
              building straightforward interfaces that look polished and feel
              easy to use.
            </p>
            <p className="sectionCopy">
              This site is structured as a compact one-page portfolio, with
              room to grow into a fuller showcase of work, resume details, and
              writing over time.
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
                <a
                  className="inlineActionLink"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub <FiArrowUpRight />
                </a>
                <a
                  className="inlineActionLink"
                  href={project.liveUrl}
                  target={project.liveUrl.startsWith("http") ? "_blank" : undefined}
                  rel={project.liveUrl.startsWith("http") ? "noreferrer" : undefined}
                >
                  Live Demo <FiExternalLink />
                </a>
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
              <a className="resumeLink" href={cvUrl} download>
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
