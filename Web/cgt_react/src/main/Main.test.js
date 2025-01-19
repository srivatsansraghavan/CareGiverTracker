import { render, screen } from "@testing-library/react";
import Main from "./Main";

test("renders text blocks", () => {
  render(<Main />);
  const mainText = screen.getByText(
    /Caregiver tracker is used to manage care given to those who need it./i
  );
  expect(mainText).toBeInTheDocument();
  const feedingTrackerText = screen.getByText(
    /Feeding tracker can be used to track different types of feeds./i
  );
  expect(feedingTrackerText).toBeInTheDocument();
  const excTrackerText = screen.getByText(
    /Excretion tracker can be used to track urine, stools and both./i
  );
  expect(excTrackerText).toBeInTheDocument();
});
