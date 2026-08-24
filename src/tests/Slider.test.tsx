import {
  render,
  screen,
  fireEvent
} from "@testing-library/react";

import {
  describe,
  expect,
  it
} from "vitest";

import { Slider } from "../components/Slider";

const slides = [
  {
    id: 1,
    title: "Slide One"
  },
  {
    id: 2,
    title: "Slide Two"
  },
  {
    id: 3,
    title: "Slide Three"
  }
];

describe("Slider", () => {
  it("renders slides", () => {
    render(
      <Slider slides={slides} />
    );

    expect(
      screen.getByText("Slide One")
    ).toBeInTheDocument();
  });

  it("renders empty state", () => {
    render(
      <Slider slides={[]} />
    );

    expect(
      screen.getByText(
        "No slides available."
      )
    ).toBeInTheDocument();
  });

  it("moves to next slide", () => {
    render(
      <Slider
        slides={slides}
        loop={false}
      />
    );

    const nextButton =
      screen.getByRole("button", {
        name: "Next slide"
      });

    fireEvent.click(nextButton);

    expect(
      screen.getByText("Slide Two")
    ).toBeInTheDocument();
  });
});