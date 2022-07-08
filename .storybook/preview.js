import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

const customViewports = {
  tablet: {
    name: "Kindle Fire 2",
    styles: {
      width: "600px",
      height: "963px",
    },
  },
  phone: {
    name: "Galaxy S9",
    styles: {
      width: "360px",
      height: "740px",
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: customViewports,

    defaultViewport: "Galaxy S9",
  },
};

export const decorators = [
  (Story) => (
    <QueryClientProvider client={queryClient}>
      <div
        style={{
          background: "#303030",
          color: "#fff",
          height: "100%",
        }}
      >
        <Story />
      </div>
    </QueryClientProvider>
  ),
];

