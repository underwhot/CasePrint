import { ShippingAddress } from "@prisma/client";
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

type ShippingAddressModified = Omit<ShippingAddress, "id" | "phoneNumber">;

export default function OrderReceivedEmail({
  shippingAddress,
  orderId,
  orderDate,
}: {
  shippingAddress: ShippingAddressModified;
  orderId: string;
  orderDate: string;
}) {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://case-print.vercel.app/";

  return (
    <Html>
      <Head />
      <Preview>Order received</Preview>

      <Body style={{}}>
        <Container>
          <Section style={{ marginBottom: "10px" }}>
            <Img
              src={`${baseUrl}/thanks.jpg`}
              alt="Thanks"
              style={{ margin: "0 auto", marginBottom: "10px" }}
            />
            <Heading style={{ marginBottom: "10px" }}>
              Thank you for your order
            </Heading>
            <Text style={{ marginBottom: "10px" }}>
              We're preparing everything for delivery and will notify you once
              your package has been shipped. Delivery usually takes 3 days.
            </Text>
            <Text style={{}}>
              If you have any questions regarding your order, please feel free
              to contact us with your order number and we're here to help.
            </Text>
          </Section>

          <Hr style={{}} />

          <Section style={{ marginBottom: "10px" }}>
            <Text style={{}}>
              Shipping to: {shippingAddress.firstName}{" "}
              {shippingAddress.lastName}
            </Text>
            <Text>
              {shippingAddress.street}, {shippingAddress.city},{" "}
              {shippingAddress.state} {shippingAddress.postalCode}
            </Text>
          </Section>

          <Hr style={{}} />

          <Section style={{ marginBottom: "10px" }}>
            <Row style={{}}>
              <Column style={{ padding: "10px" }}>
                <Text style={{}}>Order ID</Text>
                <Text style={{}}>{orderId}</Text>
              </Column>
              <Column style={{ padding: "10px" }}>
                <Text style={{}}>Order Date</Text>
                <Text style={{}}>{orderDate}</Text>
              </Column>
            </Row>
          </Section>

          <Hr style={{}} />

          <Section>
            <Text style={{}}>Thanks for shopping with us!</Text>
            <Text style={{ fontSize: "10px" }}>Don't reply to this email.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
