import { Button, Html, Head, Body, Tailwind, pixelBasedPreset, Container, Text, } from "@react-email/components";

export default function ResetEmail({url, name}: {url: string, name: string}) {
  return (
    <Tailwind
    config={{
      presets: [pixelBasedPreset],
      theme: {
        extend: {
          colors: {
            brand: "#007291",
          },
        },
      },
    }}
  >
    <Html>
      <Head />
      <Body className="bg-white font-sans">
        <Container className="w-full">
          <Text className="text-2xl font-bold text-center mb-4">Dubem's Auth Demo</Text>
          <Text className="text-center mb-6">
            Hi {name}, Please click here to reset your password.
          </Text>
          <Button
          href={url}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Reset Password
        </Button>
        </Container>
      </Body>
    </Html>
  </Tailwind>
  );
}