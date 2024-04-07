import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("renders without crashing", function(){
  render(<Carousel/>);
})

it("matches snapshot", ()=>{
  const {asFragment} = render(<Carousel/>)
  expect(asFragment()).toMatchSnapshot
});

it("should go to the left picture", ()=>{
  const {getByTestId, getByText} = render(<Carousel/>)
  const rightBtn = getByTestId("right-arrow")
  expect(getByText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument;

  fireEvent.click(rightBtn);
  expect(getByText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument

  const leftBtn = getByTestId("left-arrow")
  fireEvent.click(leftBtn);
  expect(getByText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument;
})

it("should hide arrow buttons", ()=>{
  const{getByTestId, getByText, queryByTestId}=render(<Carousel/>);
  const rightBtn = getByTestId("right-arrow")
  const leftBtn = queryByTestId("left-arrow")//so it does not throw an error since it is initially hidden

  expect(getByText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument;
  expect(leftBtn).toBeNull();

  fireEvent.click(rightBtn);
  expect(getByText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument

  fireEvent.click(rightBtn);
  expect(getByText("Photo by Josh Post on Unsplash")).toBeInTheDocument
  expect(queryByTestId("left-arrow")).not.toBeNull();
  expect(rightBtn).not.toBeInTheDocument();
})