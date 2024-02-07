import { render, screen } from "@testing-library/react"
import { Products } from "./Products"
import { useGetProductsQuery } from "./productsAPI"

describe("Products", () => {
  vitest.mock
  // Renders a grid of ProductListing components with data from useGetProductsQuery
  it("should render a grid of ProductListing components with data from useGetProductsQuery", () => {
    // Arrange
    // Mock the useGetProductsQuery hook to return some data
    const mockData = [
      { shopify_id: 1, image_url: "image1.jpg", description: "Product 1" },
      { shopify_id: 2, image_url: "image2.jpg", description: "Product 2" },
    ]
    // useGetProductsQuery.vite({
    //   data: mockData,
    //   isError: false,
    //   isLoading: false,
    //   isSuccess: true,
    // })

    // Act
    render(<Products />)

    // Assert
    // Check if the ProductListing components are rendered with the correct data
    expect(screen.getByText("Product 1")).toBeInTheDocument()
    expect(screen.getByText("Product 2")).toBeInTheDocument()
  })

  // Displays a loading message when isLoading is true
  it("should display a loading message when isLoading is true", () => {
    // Arrange
    // Mock the useGetProductsQuery hook to return isLoading as true
    useGetProductsQuery.mockReturnValue({ isLoading: true })

    // Act
    render(<Products />)

    // Assert
    // Check if the loading message is displayed
    expect(screen.getByText("Loading...")).toBeInTheDocument()
  })

  // Displays an error message when isError is true
  it("should display an error message when isError is true", () => {
    // Arrange
    // Mock the useGetProductsQuery hook to return isError as true
    useGetProductsQuery.mockReturnValue({ isError: true })

    // Act
    render(<Products />)

    // Assert
    // Check if the error message is displayed
    expect(screen.getByText("Something went wrong")).toBeInTheDocument()
  })

  // Renders correctly when data contains only one product
  it("should render correctly when data contains only one product", () => {
    // Arrange
    // Mock the useGetProductsQuery hook to return data with one product
    const mockData = [
      { shopify_id: 1, image_url: "image1.jpg", description: "Product 1" },
    ]
    useGetProductsQuery.mockReturnValue({
      data: mockData,
      isError: false,
      isLoading: false,
      isSuccess: true,
    })

    // Act
    render(<Products />)

    // Assert
    // Check if the ProductListing component is rendered with the correct data
    expect(screen.getByText("Product 1")).toBeInTheDocument()
  })

  // Renders correctly when data contains multiple products
  it("should render correctly when data contains multiple products", () => {
    // Arrange
    // Mock the useGetProductsQuery hook to return data with multiple products
    const mockData = [
      { shopify_id: 1, image_url: "image1.jpg", description: "Product 1" },
      { shopify_id: 2, image_url: "image2.jpg", description: "Product 2" },
    ]
    useGetProductsQuery.mockReturnValue({
      data: mockData,
      isError: false,
      isLoading: false,
      isSuccess: true,
    })

    // Act
    render(<Products />)

    // Assert
    // Check if the ProductListing components are rendered with the correct data
    expect(screen.getByText("Product 1")).toBeInTheDocument()
    expect(screen.getByText("Product 2")).toBeInTheDocument()
  })

  // Renders correctly when image_url is null
  it("should render correctly when image_url is null", () => {
    // Arrange
    // Mock the useGetProductsQuery hook to return data with null image_url
    const mockData = [
      { shopify_id: 1, image_url: null, description: "Product 1" },
    ]
    useGetProductsQuery.mockReturnValue({
      data: mockData,
      isError: false,
      isLoading: false,
      isSuccess: true,
    })

    // Act
    render(<Products />)

    // Assert
    // Check if the ProductListing component is rendered without an image
    expect(screen.getByText("Product 1")).toBeInTheDocument()
    expect(screen.queryByRole("img")).toBeNull()
  })
})
