import { BrowserRouter } from "react-router-dom";
import { render, unmountComponentAtNode } from "react-dom";
import MyBooks from "../MyBooks";
import { screen } from "@testing-library/react";

const MockMyBooks = (
  <BrowserRouter>
    <MyBooks />
  </BrowserRouter>
);

let container = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("MyBooks component", () => {
  it("renders without crashing", () => {
    render(MockMyBooks, container);
  });

  it("has navbar present", () => {
    render(MockMyBooks, container);
    const navbarEl = screen.getByTestId("navbar");

    expect(navbarEl).toBeInTheDocument();
  });

  it("has correct page title", () => {
    render(MockMyBooks, container);
    const headingEl = screen.getByTestId("pageTitle");

    expect(headingEl).toHaveTextContent("My books");
  });

  it("has Add Book button", () => {
    render(MockMyBooks, container);
    const addBookButton = screen.getByTestId("addBook");

    expect(addBookButton).toBeInTheDocument();
  });

  it("has Add Shelf button", () => {
    render(MockMyBooks, container);
    const addShelfButton = screen.getByTestId("addShelf");

    expect(addShelfButton).toBeInTheDocument();
  });

  it("initally has shelf view enabled four shelfs present", () => {
    render(MockMyBooks, container);
    const shelfEls = screen.getAllByTestId("shelf");

    expect(shelfEls).toHaveLength(4);
  });
  it("shelfs have correct titles", () => {
    render(MockMyBooks, container);
    const shelfEls = screen.getAllByTestId("shelf");

    expect(shelfEls[0]).toHaveTextContent("Reading");
    expect(shelfEls[1]).toHaveTextContent("To Read");
    expect(shelfEls[2]).toHaveTextContent("Read");
    expect(shelfEls[3]).toHaveTextContent("Did not finish");
  });
});
