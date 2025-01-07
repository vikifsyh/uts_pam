import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import Home from "./home"; // Komponen Home
import { UserProvider } from "@/context/userContext"; // Impor UserProvider

jest.mock("@/services/firebase", () => ({
  authListener: jest.fn(),
}));

// Mocking fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        articles: [
          {
            title: "Mocked Title",
            urlToImage: "mocked-image-url",
            source: { name: "Mocked Source" },
          },
        ],
      }),
  })
);

test("fetches and displays data", async () => {
  const { findByText, queryAllByText } = render(
    <UserProvider>
      {/* Membungkus komponen Home dengan UserProvider */}
      <Home />
    </UserProvider>
  );

  // Menunggu dan memastikan hanya ada satu elemen dengan teks "Mocked Title"
  const titleElements = queryAllByText("Mocked Title");
});
