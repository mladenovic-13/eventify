import { Body } from "@react-email/body";
import { Container } from "@react-email/container";
import { Heading } from "@react-email/heading";
import { Hr } from "@react-email/hr";
import { Html } from "@react-email/html";
import { Link } from "@react-email/link";
import { Preview } from "@react-email/preview";
import { Section } from "@react-email/section";
import { Text } from "@react-email/text";

interface InvitationEmailProps {
  customMessage?: string;
  eventLandingPage?: string;
}

export const InvitationEmail = ({}: InvitationEmailProps) => (
  <Html>
    <Preview>Accept Invite For This Event</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Hello! You Are Invited!</Heading>
        <Section style={body}>
          <Text style={paragraph}>
            <Link
              style={link}
              href={
                "https://events.lunique.tech/event/clw0rwyo10000zpf6x8na0fim"
              }
            >
              👉 Event Landing Page 👈
            </Link>
          </Text>
          <Text style={paragraph}>
            If you didn&apos;t request this, please ignore this email.
          </Text>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />- Lunique Tech Team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>Lunique Tech Inc.</Text>
        <Text style={footer}>Sutjeska 40, Pirot, Srbija</Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 25px 48px",
  backgroundImage: 'url("/assets/raycast-bg.png")',
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat, no-repeat",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "48px",
};

const body = {
  margin: "24px 0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const link = {
  color: "#FF6363",
};

const hr = {
  borderColor: "#dddddd",
  marginTop: "48px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  marginLeft: "4px",
};
