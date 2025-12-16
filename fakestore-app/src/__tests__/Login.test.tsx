jest.mock("../firebaseConfig", () => ({
  auth: {},
  db: {}
}), { virtual: true });

jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn().mockResolvedValue({}),
  signOut: jest.fn().mockResolvedValue({})
}));

import { render, screen, fireEvent } from "@testing-library/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import Login from "../components/Login";

describe("Login", () => {
  it("renders email and password inputs", () => {
    render(<Login />);
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  it("submits login form", async () => {
    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "test@example.com" }
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "password123" }
    });
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(),
      "test@example.com",
      "password123"
    );
  });
});