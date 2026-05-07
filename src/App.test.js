import { act } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

jest.mock('typewriter-effect', () => {
  return function MockTypewriter(props) {
    return (
      <span className={props.options?.wrapperClassName}>
        I&apos;m Software Developer
      </span>
    );
  };
});

test("renders the portfolio sections and download action", () => {
  render(<App />);
  expect(
    screen.getByRole("heading", {
      name: /building clean, responsive interfaces/i,
    })
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /featured work/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /core stack & tools/i })
  ).toBeInTheDocument();
  expect(screen.getAllByRole("link", { name: /download cv/i }).length).toBeGreaterThan(0);
});

test("shows validation feedback on an incomplete contact form", () => {
  render(<App />);

  act(() => {
    fireEvent.click(screen.getByRole("button", { name: /prepare message/i }));
  });

  expect(screen.getByText(/please enter your name/i)).toBeInTheDocument();
  expect(
    screen.getByText(/please enter your email address/i)
  ).toBeInTheDocument();
  expect(screen.getByText(/please add a subject/i)).toBeInTheDocument();
});
