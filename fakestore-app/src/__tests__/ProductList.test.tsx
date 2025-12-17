jest.mock("../firebaseConfig", () => ({
  db: {},
  auth: {}
}))

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
  addDoc: jest.fn(),
}));

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductList from "../components/ProductList";
import { getDocs, addDoc } from "firebase/firestore";


describe("ProductList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders products from Firestore", async () => {
    
    (getDocs as jest.Mock).mockResolvedValue({
      docs: [
        { id: "1", data: () => ({ name: "Test Product", price: 50, category: "Misc" }) },
      ],
    });

    render(<ProductList />);

    
    expect(await screen.findByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText(/\$50/)).toBeInTheDocument();
    expect(screen.getByText(/Misc/)).toBeInTheDocument();
  });

  it("adds a product when button is clicked", async () => {
    (addDoc as jest.Mock).mockResolvedValue({});
    (getDocs as jest.Mock).mockResolvedValue({
      docs: [
        { id: "1", data: () => ({ name: "New Product", price: 100, category: "Misc" }) },
      ],
    });

    render(<ProductList />);

    fireEvent.click(screen.getByText(/Add Product/i));

    await waitFor(() => {
      expect(addDoc).toHaveBeenCalled();
      expect(screen.getByText(/New Product/i)).toBeInTheDocument();
    });
  });
});